import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProcessSection from "@/components/sections/ProcessSection";
import CtaMarquee from "@/components/sections/CtaMarquee";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { services } from "@/data/site";
import type { Service } from "@/lib/types";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Engineering, growth, brand, and strategy — under one roof and on one timeline.",
};

const accentBorder: Record<Service["accent"], string> = {
  teal: "before:from-teal-300/70",
  cyan: "before:from-cyan-300/70",
  coral: "before:from-coral-400/70",
  mist: "before:from-mist-200/60",
};

const accentBg: Record<Service["accent"], string> = {
  teal: "var(--teal-400)",
  cyan: "var(--cyan-400)",
  coral: "var(--coral-500)",
  mist: "var(--mist-200)",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Four disciplines. One timeline."
        description={
          <>
            Engineering, growth, brand, and strategy — staffed as a single team,
            briefed on a single document, measured against a single outcome.
          </>
        }
      />

      <section
        className="paint-skip relative"
        style={{ containIntrinsicSize: "1px 3200px" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 space-y-10">
          {services.map((s, idx) => (
            <RevealOnScroll key={s.id}>
              <article
                id={s.id}
                className={[
                  "relative overflow-hidden rounded-[2.25rem] glass p-8 sm:p-12 lg:p-16",
                  "before:absolute before:inset-0 before:rounded-[2.25rem] before:pointer-events-none",
                  `before:bg-gradient-to-br ${accentBorder[s.accent]} before:to-transparent before:[mask-image:linear-gradient(black,transparent_45%)]`,
                ].join(" ")}
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-32 right-[-8rem] size-[28rem] rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{
                    background: `radial-gradient(closest-side, ${accentBg[s.accent]}, transparent 70%)`,
                  }}
                />

                <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-12">
                  <div>
                    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-mist-400">
                      <span
                        className="font-display text-3xl text-mist-100"
                        aria-hidden="true"
                      >
                        {s.glyph}
                      </span>
                      <span>0{idx + 1} · {s.name}</span>
                    </div>
                    <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-balance">
                      {s.name}
                    </h2>
                    <p className="mt-3 font-serif italic text-xl text-mist-100">
                      {s.tagline}
                    </p>
                    <p className="mt-6 text-mist-300 max-w-xl leading-relaxed">
                      {s.blurb}
                    </p>

                    <div className="mt-10">
                      <h3 className="text-xs uppercase tracking-[0.22em] text-mist-400">
                        Capabilities
                      </h3>
                      <ul className="mt-4 grid grid-cols-2 gap-2">
                        {s.capabilities.map((c) => (
                          <li
                            key={c}
                            className="rounded-2xl bg-surface-1 ring-hairline px-4 py-3 text-sm text-mist-100"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:pl-10">
                    <div className="rounded-3xl glass-strong p-8">
                      <h3 className="text-xs uppercase tracking-[0.22em] text-mist-400">
                        What you take home
                      </h3>
                      <ul className="mt-5 divide-y divide-[color:var(--hairline)]">
                        {s.deliverables.map((d, i) => (
                          <li
                            key={d}
                            className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                          >
                            <span
                              className="font-display text-mist-400 text-sm w-6 shrink-0"
                              aria-hidden="true"
                            >
                              0{i + 1}
                            </span>
                            <span className="text-mist-100">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <ProcessSection />
      <CtaMarquee />
    </>
  );
}
