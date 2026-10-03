import { contact, profile } from "@/data/site-content";
import { EyebrowLabel } from "./EyebrowLabel";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="bg-ink-soft py-28 md:py-36 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <EyebrowLabel index="04">Contact</EyebrowLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl mt-6 max-w-3xl text-paper">
            Get in Touch
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 grid gap-8 sm:grid-cols-[1.6fr_1fr] max-w-3xl">
            <a
              href={`mailto:${contact.email}`}
              className="group border-t border-line pt-4 min-w-0"
            >
              <div className="text-xs uppercase tracking-widest text-paper-dim">
                Email
              </div>
              <div className="mt-2 truncate text-paper group-hover:text-accent transition-colors sm:text-base" title={contact.email}>
                {contact.email}
              </div>
            </a>
            <div className="border-t border-line pt-4">
              <div className="text-xs uppercase tracking-widest text-paper-dim">
                Phone
              </div>
              <div className="mt-2 text-paper">{contact.phone}</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-wrap gap-6">
            {contact.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm uppercase tracking-widest text-paper-dim hover:text-accent transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-24 pt-8 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs uppercase tracking-widest text-paper-dim">
          <span>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <span className="flex flex-col gap-1 sm:items-end">
            <span>Design &amp; Architecture Portfolio</span>
            <span>
              Built by{" "}
              <a
                href="https://zenanvibe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper transition-colors hover:text-accent"
              >
                Zenanvibe
              </a>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
