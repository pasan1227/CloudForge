import type { ReactNode } from "react";
import Aurora from "./Aurora";
import CharReveal from "@/components/motion/CharReveal";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      <Aurora intensity="soft" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <RevealOnScroll>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-mist-200">
            <span
              aria-hidden="true"
              className="inline-block size-1.5 rounded-full bg-coral-400 shadow-[0_0_12px_var(--coral-400)]"
            />
            {eyebrow}
          </span>
        </RevealOnScroll>
        <CharReveal
          as="h1"
          text={title}
          className="mt-6 font-display text-[clamp(2.75rem,7.5vw,7rem)] leading-[0.98] tracking-tight text-balance"
          stagger={0.018}
        />
        <RevealOnScroll className="mt-8 max-w-2xl" delay={0.35}>
          <p className="text-lg sm:text-xl text-mist-200 leading-relaxed">
            {description}
          </p>
        </RevealOnScroll>
        {children ? (
          <RevealOnScroll className="mt-10" delay={0.5}>
            {children}
          </RevealOnScroll>
        ) : null}
      </div>
    </section>
  );
}
