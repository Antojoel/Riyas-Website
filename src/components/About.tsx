"use client";

import { useRef } from "react";
import type { ElementType } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Camera,
  Briefcase,
  Palette,
  Mail,
  MessageCircle,
  ArrowUpRight,
  PenTool,
  Box,
  Sun,
  Sparkles,
  Layers,
  Image as ImageIcon,
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

const skillIcons: Record<string, ElementType> = {
  AutoCAD: PenTool,
  SketchUp: Box,
  Lumion: Sun,
  "V-Ray": Sparkles,
  Revit: Layers,
  Photoshop: ImageIcon,
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="overflow-hidden bg-ink py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <EyebrowLabel index="01">About</EyebrowLabel>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-[1.15fr_1fr] gap-16 md:gap-12 items-center">
          <Reveal className="relative flex flex-col items-center md:items-start">
            <div className="relative w-full max-w-md md:max-w-none mx-auto">
              <motion.div
                style={{ opacity: glowOpacity }}
                className="absolute inset-x-0 top-1/4 mx-auto h-3/4 w-3/4 rounded-full bg-accent/40 blur-[100px]"
              />
              <motion.div
                style={{ opacity: glowOpacity }}
                className="absolute -inset-x-6 top-10 h-40 rounded-full bg-accent-soft/20 blur-3xl"
              />

              <div className="absolute -top-2 left-2 md:left-6 z-20 text-center md:text-left">
                <p className="text-xs uppercase tracking-widest text-paper-dim">
                  Hello, I am
                </p>
                <p className="font-display text-4xl md:text-5xl text-paper">
                  {profile.name}
                </p>
              </div>

              <motion.div style={{ scale }}>
                <PortraitTilt
                  src={profile.portrait}
                  alt={profile.name}
                  width={profile.portraitWidth}
                  height={profile.portraitHeight}
                />
              </motion.div>
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
                {skills.map((skill) => {
                  const Icon = skillIcons[skill] ?? PenTool;
                  return (
                    <span
                      key={skill}
                      className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-paper-dim"
                    >
                      <Icon className="h-4 w-4 text-accent" />
                      {skill}
                    </span>
                  );
                })}
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
