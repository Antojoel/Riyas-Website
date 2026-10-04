"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MessageCircle, Camera, ArrowUpRight } from "lucide-react";
import type { ElementType } from "react";
import { contact, education, profile } from "@/data/site-content";
import { tools } from "@/data/tools";
import { ToolBadge } from "./ToolBadge";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const socialIcons: Record<string, ElementType> = {
  Instagram: Camera,
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.innerWidth < 768;

      // Card is positioned/sized with real layout props (not clip-path or
      // scale), anchored from the edge it ends up flush against so it can
      // never overshoot the viewport: left-anchored on desktop (photo ends
      // as the left 55%), left-anchored on mobile (photo ends full-width).
      // Width uses % of the pinned wrapper, never vw, so a reserved
      // scrollbar gutter can't push it past the visible edge.
      const cardStart = isMobile
        ? { left: "7.5%", top: "27.5vh", width: "85%", height: "45vh", borderRadius: 24 }
        : { left: "27.5%", top: "25vh", width: "45%", height: "50vh", borderRadius: 24 };
      const cardEnd = isMobile
        ? { left: "0%", top: 0, width: "100%", height: "60vh", borderRadius: 0 }
        : { left: "0%", top: 0, width: "55%", height: "100vh", borderRadius: 0 };

      if (reduceMotion) {
        gsap.set(cardRef.current, {
          position: "absolute",
          ...cardEnd,
          filter: "blur(0px) brightness(1)",
        });
        gsap.set([titleRef.current, hintRef.current], { opacity: 0 });
        gsap.set([...revealRefs.current, ...badgeRefs.current], {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        });
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 }
        );
        return;
      }

      gsap.set(cardRef.current, {
        position: "absolute",
        ...cardStart,
        filter: "blur(20px) brightness(0.5)",
      });
      gsap.set(revealRefs.current, { opacity: 0, y: 30, filter: "blur(8px)" });
      gsap.set(badgeRefs.current, { opacity: 0, scale: 0.8 });

      // Normalized 0→1 timeline so each position param below IS the
      // scroll-progress fraction: card expand 0→0.45, title fade 0→0.3,
      // hint fades fast, content stagger 0.4→0.85, then a hold from 0.85→1.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        cardRef.current,
        {
          ...cardEnd,
          filter: "blur(0px) brightness(1)",
          ease: "none",
          duration: 0.45,
        },
        0
      )
        .to(
          titleRef.current,
          {
            opacity: 0,
            y: -20,
            scale: 0.9,
            filter: "blur(6px)",
            ease: "none",
            duration: 0.3,
          },
          0
        )
        .to(hintRef.current, { opacity: 0, ease: "none", duration: 0.15 }, 0)
        .to(
          revealRefs.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            ease: "power2.out",
            duration: 0.25,
          },
          0.4
        )
        .to(
          badgeRefs.current,
          {
            opacity: 1,
            scale: 1,
            stagger: 0.025,
            ease: "power3.out",
            duration: 0.15,
          },
          0.5
        )
        // drop the filter once sharp so the card isn't left on its own
        // compositing layer (can show a seam at its edge)
        .set(cardRef.current, { filter: "none" }, 0.45)
        // without this the timeline ends at 0.85 and GSAP stretches it over
        // the whole scroll — this pads it to 1 so 0.85→1 is a real hold
        .to({}, { duration: 0.15 }, 0.85);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink"
    >
      <div className="relative h-screen min-h-[640px] max-w-full overflow-hidden">
        {/* stage 1 + 2: card that resizes/repositions from a small centered
            box to its final place — left 55% of the viewport on desktop,
            top 60vh on mobile. Real layout props (left/right/top/width/
            height), never transform: scale, so the image keeps native
            resolution the whole time. Positioned flush against the edge it
            ends at (right:0 desktop, left:0 mobile) with % widths so it can
            never overshoot past a reserved scrollbar gutter. */}
        <div
          ref={cardRef}
          className="overflow-hidden bg-transparent will-change-[left,right,top,width,height]"
        >
          <Image
            src={profile.portrait}
            alt={profile.fullName}
            fill
            priority
            quality={90}
            sizes="55vw"
            className="object-cover object-[50%_15%] max-md:object-[50%_10%]"
          />
          <div className="absolute inset-0 bg-ink/35" />
          {/* permanent soft fade so the photo's inner edges melt into the
              page background instead of ending in a hard line */}
          <div className="about-photo-fade pointer-events-none absolute inset-0" />
        </div>

        {/* stage 1 title + hint */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
        >
          <h2 className="font-display text-5xl font-semibold text-paper md:text-7xl">
            About Me
          </h2>
        </div>
        <div
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-paper-dim"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Scroll to expand
        </div>

        {/* stage 3: revealed content — stacked below the photo on mobile
            (pt clears the 60vh photo band, no overlap), right column on
            desktop so it never sits under the face on the left */}
        <div className="relative z-10 flex h-full items-start justify-center overflow-y-auto px-6 pt-[calc(60vh+24px)] pb-6 md:items-center md:justify-end md:overflow-visible md:pt-0 md:pb-0 md:pl-0 md:pr-[clamp(24px,8vw,140px)]">
          <div className="relative z-10 w-full space-y-7 md:max-w-[600px]">
            <div
              ref={(el) => {
                revealRefs.current[0] = el;
              }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/40 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-paper-dim"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              01 About
            </div>

            <div
              ref={(el) => {
                revealRefs.current[1] = el;
              }}
            >
              <p className="text-xs uppercase tracking-widest text-paper-dim">
                Hello, I am
              </p>
              <p className="font-display text-3xl font-semibold text-paper md:text-5xl">
                {profile.fullName}
              </p>
            </div>

            <div
              ref={(el) => {
                revealRefs.current[2] = el;
              }}
            >
              <h3 className="mb-3 font-display text-2xl font-semibold text-paper">About Me</h3>
              <p className="max-w-lg leading-relaxed text-paper-dim">
                {profile.philosophy}
              </p>
            </div>

            <div
              ref={(el) => {
                revealRefs.current[3] = el;
              }}
            >
              <h3 className="mb-3 font-display text-2xl font-semibold text-paper">Education</h3>
              <ul className="space-y-1">
                {education.map((e) => (
                  <li key={e.school} className="text-paper-dim">
                    <span className="text-accent-soft">{e.year}</span> &middot;{" "}
                    {e.degree}, {e.school}
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={(el) => {
                revealRefs.current[4] = el;
              }}
            >
              <h3 className="mb-3 font-display text-2xl font-semibold text-paper">
                Tools &amp; Skills
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {tools.map((tool, i) => (
                  <div
                    key={tool.name}
                    ref={(el) => {
                      badgeRefs.current[i] = el;
                    }}
                  >
                    <ToolBadge tool={tool} />
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={(el) => {
                revealRefs.current[5] = el;
              }}
              className="flex flex-wrap gap-3"
            >
              <a
                href={`mailto:${contact.email}`}
                aria-label="Email"
                className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-line text-paper transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                <ArrowUpRight className="absolute -top-1.5 -right-1.5 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                aria-label="WhatsApp"
                className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-line text-paper transition-colors hover:border-accent hover:text-accent"
              >
                <MessageCircle className="h-4 w-4" />
                <ArrowUpRight className="absolute -top-1.5 -right-1.5 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              {contact.socials.map((s) => {
                const Icon = socialIcons[s.label] ?? ArrowUpRight;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-line text-paper transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                    <ArrowUpRight className="absolute -top-1.5 -right-1.5 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
