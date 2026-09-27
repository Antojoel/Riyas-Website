import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { Gallery } from "@/components/Gallery";
import { TransitionLink } from "@/components/PageTransition";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  return { title: project ? `${project.name} — Riyas` : "Project — Riyas" };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug) + 1;

  return (
    <>
      <Nav />
      <main className="flex-1 bg-ink">
        <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
          <Image
            src={project.cover.src}
            alt={project.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto max-w-7xl w-full px-6 md:px-10 pb-14">
              <TransitionLink
                href="/#work"
                className="text-xs uppercase tracking-widest text-paper-dim hover:text-accent"
              >
                &larr; Back to Work
              </TransitionLink>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-display text-2xl text-accent">
                  {String(index).padStart(2, "0")}
                </span>
                <h1 className="font-display text-4xl md:text-6xl text-paper">
                  {project.name}
                </h1>
              </div>
              <p className="mt-3 text-xs uppercase tracking-widest text-paper-dim">
                {project.groups.join(" / ")}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 md:px-10 py-20">
          <Gallery images={project.images} groups={project.groups} />
        </section>

        <nav className="mx-auto max-w-7xl px-6 md:px-10 pb-20 flex justify-between text-sm uppercase tracking-widest">
          <AdjacentProjectLink direction="prev" currentSlug={slug} />
          <AdjacentProjectLink direction="next" currentSlug={slug} />
        </nav>
      </main>
      <Contact />
    </>
  );
}

function AdjacentProjectLink({
  direction,
  currentSlug,
}: {
  direction: "prev" | "next";
  currentSlug: string;
}) {
  const idx = projects.findIndex((p) => p.slug === currentSlug);
  const target =
    direction === "prev"
      ? projects[(idx - 1 + projects.length) % projects.length]
      : projects[(idx + 1) % projects.length];

  return (
    <TransitionLink
      href={`/projects/${target.slug}`}
      className="text-paper-dim hover:text-accent transition-colors"
    >
      {direction === "prev" ? "← " : ""}
      {target.name}
      {direction === "next" ? " →" : ""}
    </TransitionLink>
  );
}
