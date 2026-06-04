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
        { opacity: 0, y: 36, force3D: true },
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
    <section
      className="paint-skip relative py-28 sm:py-36"
      style={{ containIntrinsicSize: "1px 1400px" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Process"
          index="04 / How we work"
          title={
            <>
              A short loop.
              <br />
              <span className="italic text-amber-300">Run on repeat.</span>
            </>
          }
          description="We've shipped enough launches to know what works. The process is light, the artifacts are few, and the work stays close to the people who'll have to live with it."
        />

        <div ref={ref} className="relative mt-24">
          {/* Animated spine. */}
          <span
            aria-hidden="true"
            className="process-spine pointer-events-none absolute top-2 bottom-2 w-px origin-top left-[calc(41.66%-0.5px)] lg:left-[calc(33.33%-0.5px)] bg-gradient-to-b from-transparent via-amber-400/45 to-transparent"
          />

          <ol className="space-y-0">
            {process.map((step, i) => (
              <li
                key={step.index}
                className="process-row relative grid grid-cols-12 gap-x-4 sm:gap-x-8 py-12 sm:py-20 border-t border-hairline first:border-t-0"
              >
                {/* Editorial outlined numeral, italic display serif. */}
                <div className="col-span-5 lg:col-span-4 relative flex items-center">
                  <span
                    aria-hidden="true"
                    className="block font-serif italic leading-[0.82] tracking-[-0.04em] text-[clamp(5rem,16vw,13rem)] numeral-outline"
                  >
                    {step.index}
                  </span>
                </div>

                {/* Spine anchor dot. */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 size-2.5 rounded-full bg-amber-400 left-[calc(41.66%-5px)] lg:left-[calc(33.33%-5px)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--amber-400)_18%,transparent)]"
                />

                {/* Content */}
                <div className="col-span-7 lg:col-span-8 pl-6 sm:pl-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-mist-400">
                    <span>Phase {i + 1}</span>
                    <span aria-hidden="true" className="h-px w-8 bg-hairline-strong" />
                    <span className="text-mist-500">of {process.length}</span>
                  </div>
                  <h3 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.75rem] tracking-[-0.022em] leading-[1.0] text-balance">
                    {step.title}
                    <span
                      aria-hidden="true"
                      className="italic text-mist-500/60"
                    >
                      .
                    </span>
                  </h3>
                  <p className="mt-5 max-w-prose text-mist-300 text-base sm:text-lg leading-relaxed">
                    {step.blurb}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Loop close. */}
          <div className="mt-12 flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-mist-400">
            <span aria-hidden="true" className="h-px w-12 bg-hairline-strong" />
            <span>
              and then —{" "}
              <em className="font-serif italic text-mist-200 normal-case tracking-normal text-base">
                back to listening.
              </em>
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
            <span aria-hidden="true" className="font-mono text-mist-500">↻</span>
          </div>
        </div>
      </div>
    </section>
  );
}
