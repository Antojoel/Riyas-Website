import type { ElementType } from "react";
import {
  Camera,
  Briefcase,
  Palette,
  Mail,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { contact, education, profile, skills } from "@/data/site-content";
import { EyebrowLabel } from "./EyebrowLabel";
import { Reveal } from "./Reveal";
import { PortraitTilt } from "./PortraitTilt";

const socialIcons: Record<string, ElementType> = {
  Instagram: Camera,
  LinkedIn: Briefcase,
  Behance: Palette,
};

export function About() {
  return (
    <section id="about" className="bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <EyebrowLabel index="01">About</EyebrowLabel>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-[1.15fr_1fr] gap-16 md:gap-12 items-center">
          <Reveal className="relative flex flex-col items-center md:items-start">
            <div className="relative w-full max-w-md md:max-w-none mx-auto">
              <div className="absolute inset-x-0 top-1/4 mx-auto h-3/4 w-3/4 rounded-full bg-accent/40 blur-[100px]" />
              <div className="absolute -inset-x-6 top-10 h-40 rounded-full bg-accent-soft/20 blur-3xl" />

              <div className="absolute -top-2 left-2 md:left-6 z-20 text-center md:text-left">
                <p className="text-xs uppercase tracking-widest text-paper-dim">
                  Hello, I am
                </p>
                <p className="font-display text-4xl md:text-5xl text-paper">
                  {profile.name}
                </p>
              </div>

              <PortraitTilt
                src={profile.portrait}
                alt={profile.name}
                width={profile.portraitWidth}
                height={profile.portraitHeight}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-10">
            <div>
              <h3 className="font-display text-2xl text-paper mb-3">
                About Me
              </h3>
              <p className="text-paper-dim leading-relaxed max-w-lg">
                {profile.philosophy}
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl text-paper mb-3">
                Education
              </h3>
              <ul className="space-y-1">
                {education.map((e) => (
                  <li key={e.school} className="text-paper-dim">
                    <span className="text-accent-soft">{e.year}</span> &middot;{" "}
                    {e.degree}, {e.school}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-2xl text-paper mb-3">
                Tools &amp; Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-line px-3 py-2 text-sm text-paper-dim"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${contact.email}`}
                aria-label="Email"
                className="group relative h-11 w-11 rounded-xl border border-line flex items-center justify-center text-paper hover:border-accent hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
                <ArrowUpRight className="absolute -top-1.5 -right-1.5 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                aria-label="WhatsApp"
                className="group relative h-11 w-11 rounded-xl border border-line flex items-center justify-center text-paper hover:border-accent hover:text-accent transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <ArrowUpRight className="absolute -top-1.5 -right-1.5 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              {contact.socials.map((s) => {
                const Icon = socialIcons[s.label] ?? ArrowUpRight;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="group relative h-11 w-11 rounded-xl border border-line flex items-center justify-center text-paper hover:border-accent hover:text-accent transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <ArrowUpRight className="absolute -top-1.5 -right-1.5 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
