"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

interface PageHeroProps {
  eyebrow: string;
  section?: string;
  title: string;
  accentWord?: string;
  description: ReactNode;
  children?: ReactNode;
}

/**
 * Editorial page hero — one serif statement, an italic accent word that
 * clip-reveals on a single beat, and a small chapter mark.
 */
export default function PageHero({
  eyebrow,
  section,
  title,
  accentWord,
  description,
  children,
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Split title around the accent word so we can clip-reveal just that span.
  const split = (() => {
    if (!accentWord) return { before: title, accent: "", after: "" };
    const idx = title.toLowerCase().indexOf(accentWord.toLowerCase());
    if (idx === -1) return { before: title, accent: "", after: "" };
    return {
      before: title.slice(0, idx),
      accent: title.slice(idx, idx + accentWord.length),
      after: title.slice(idx + accentWord.length),
    };
  })();

  useGSAP(
    () => {
      if (!ref.current) return;
      const root = ref.current;
      const reduce = prefersReducedMotion();

      const eyebrowEl = root.querySelector(".ph-eyebrow");
      const titleEl = root.querySelector(".ph-title");
      const accentEl = root.querySelector(".ph-accent");
      const descEl = root.querySelector(".ph-desc");
      const childEl = root.querySelector(".ph-children");

      if (reduce) {
        gsap.set([eyebrowEl, titleEl, descEl, childEl], { opacity: 1, y: 0 });
        gsap.set(accentEl, { clipPath: "none" });
        return;
      }

      gsap.set([eyebrowEl, descEl, childEl], { opacity: 0, y: 22 });
      gsap.set(titleEl, { opacity: 0, y: 28 });
      gsap.set(accentEl, { clipPath: "inset(0 100% 0 0)" });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out", force3D: true },
      });
      tl.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.7 }, 0.05)
        .to(titleEl, { opacity: 1, y: 0, duration: 0.95 }, 0.2)
        .to(
          accentEl,
          { clipPath: "inset(0 0% 0 0)", duration: 1.1 },
          0.55
        )
        .to(descEl, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
        .to(childEl, { opacity: 1, y: 0, duration: 0.7 }, 1.05);

      return () => tl.kill();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-48 pb-24 sm:pt-56 sm:pb-32"
    >
      <div className="glow" aria-hidden="true">
        <div className="glow__orb glow__orb--amber -top-44 -right-32" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="ph-eyebrow flex flex-wrap items-center justify-between gap-4 ops-label">
          <span className="inline-flex items-center gap-3 text-mist-200">
            <span aria-hidden="true" className="live-dot" />
            {eyebrow}
          </span>
          {section ? (
            <span className="text-mist-500">{section}</span>
          ) : null}
        </div>

        <h1 className="ph-title mt-10 font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.03em] text-balance">
          {split.accent ? (
            <>
              {split.before}
              <span className="ph-accent inline-block italic font-serif text-gradient-warm">
                {split.accent}
              </span>
              {split.after}
            </>
          ) : (
            <span className="ph-accent inline-block">{title}</span>
          )}
        </h1>

        <p className="ph-desc mt-8 max-w-2xl text-lg sm:text-xl text-mist-200 leading-relaxed">
          {description}
        </p>

        {children ? (
          <div className="ph-children mt-10">
            {children}
          </div>
        ) : null}

        <RevealOnScroll className="mt-16 flex items-center gap-5">
          <span aria-hidden="true" className="hairline flex-1" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-mist-500">
            keep reading
          </span>
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rotate-45 border-r border-b border-mist-400"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
