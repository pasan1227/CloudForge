"use client";

import { useRef } from "react";
import { process } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
} from "@/lib/gsap";

const ACCENT_CYCLE = [
  "numeral-outline",
  "numeral-outline-warm",
  "numeral-outline",
  "numeral-outline-warm",
] as const;

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const rows = ref.current.querySelectorAll(".process-row");
      const spine = ref.current.querySelector(".process-spine");

      if (prefersReducedMotion()) {
        gsap.set(rows, { opacity: 1, y: 0 });
        gsap.set(spine, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        rows,
        { opacity: 0, y: 40, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.14,
          force3D: true,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            toggleActions: "play none none none",
            fastScrollEnd: true,
          },
        }
      );

      gsap.fromTo(
        spine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 72%",
            end: "bottom 35%",
            scrub: 0.6,
          },
        }
      );

      return () => {
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === ref.current)
          .forEach((st) => st.kill());
      };
    },
    { scope: ref }
  );

  return (
    <section className="paint-skip relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A short loop.
              <br />
              <span className="font-serif italic text-gradient">
                Run on repeat.
              </span>
            </>
          }
          description="We've shipped enough launches to know what works. The process is light, the artifacts are few, and the work stays close to the people who'll have to live with it."
        />

        <div ref={ref} className="relative mt-24">
          {/* Animated spine — sits at the seam between numeral and content columns. */}
          <span
            aria-hidden="true"
            className="process-spine pointer-events-none absolute top-2 bottom-2 w-px origin-top left-[calc(41.66%-0.5px)] lg:left-[calc(33.33%-0.5px)] bg-gradient-to-b from-transparent via-teal-300/45 to-transparent"
          />

          <ol className="space-y-0">
            {process.map((step, i) => (
              <li
                key={step.index}
                className="process-row relative grid grid-cols-12 gap-x-4 sm:gap-x-8 py-12 sm:py-16 border-t border-hairline first:border-t-0"
              >
                {/* Outlined editorial numeral */}
                <div className="col-span-5 lg:col-span-4 relative flex items-center">
                  <span
                    aria-hidden="true"
                    className={`block font-serif italic leading-[0.85] tracking-tight text-[clamp(5rem,15vw,12rem)] ${ACCENT_CYCLE[i % ACCENT_CYCLE.length]}`}
                  >
                    {step.index}
                  </span>
                </div>

                {/* Spine anchor dot — sits where the row meets the spine. */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 size-2.5 rounded-full bg-gradient-to-br from-teal-300 to-cyan-400 left-[calc(41.66%-5px)] lg:left-[calc(33.33%-5px)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--teal-400)_18%,transparent)]"
                />

                {/* Content */}
                <div className="col-span-7 lg:col-span-8 pl-6 sm:pl-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-mist-400">
                    <span>Phase {i + 1}</span>
                    <span aria-hidden="true" className="h-px w-8 bg-hairline-strong" />
                    <span className="text-mist-500">of {process.length}</span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[3.25rem] tracking-tight leading-[1.04] text-balance">
                    {step.title}
                    <span aria-hidden="true" className="font-serif italic text-mist-500/60">.</span>
                  </h3>
                  <p className="mt-5 max-w-prose text-mist-300 text-base sm:text-lg leading-relaxed">
                    {step.blurb}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Loop close — small editorial flourish that the process repeats. */}
          <div className="mt-10 flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.3em] text-mist-400">
            <span aria-hidden="true" className="h-px w-12 bg-hairline-strong" />
            <span>
              and then — <em className="font-serif italic text-mist-200 normal-case tracking-normal text-sm">back to listening.</em>
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
          </div>
        </div>
      </div>
    </section>
  );
}
