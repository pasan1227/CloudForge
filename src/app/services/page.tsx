import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProcessSection from "@/components/sections/ProcessSection";
import CtaMarquee from "@/components/sections/CtaMarquee";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Engineering, growth, brand, and strategy — under one roof and on one timeline.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services / Four disciplines"
        section="Engineering · Growth · Brand · Strategy"
        title="Four disciplines. One timeline."
        accentWord="One timeline."
        description={
          <>
            Engineering, growth, brand, and strategy — staffed as a single team,
            briefed on a single document, measured against a single outcome.
          </>
        }
      />

      <section
        className="paint-skip relative"
        style={{ containIntrinsicSize: "1px 3400px" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 space-y-px bg-[color:var(--hairline)] rounded-[2.25rem] overflow-hidden ring-hairline-strong">
          {services.map((s, idx) => (
            <RevealOnScroll key={s.id}>
              <article
                id={s.id}
                className="relative overflow-hidden bg-ink-900 p-8 sm:p-12 lg:p-16"
              >
                {/* Single warm radial in the corner. */}
                <div
                  aria-hidden="true"
                  className="absolute -top-32 right-[-8rem] size-[28rem] rounded-full opacity-25 pointer-events-none"
                  style={{
                    background: `radial-gradient(closest-side, var(--amber-500), transparent 70%)`,
                  }}
                />

                <div className="relative grid lg:grid-cols-12 gap-x-10 gap-y-10">
                  <div className="lg:col-span-1 ops-label">
                    {String(idx + 1).padStart(2, "0")} / 04
                  </div>

                  <div className="lg:col-span-7">
                    <h2 className="font-display text-5xl sm:text-6xl lg:text-[5rem] tracking-[-0.022em] leading-[0.98] text-balance">
                      {s.name}
                    </h2>
                    <p className="mt-4 font-serif italic text-xl sm:text-2xl text-amber-300">
                      {s.tagline}
                    </p>
                    <p className="mt-6 text-mist-300 max-w-xl leading-relaxed text-[15px]">
                      {s.blurb}
                    </p>

                    <div className="mt-10">
                      <h3 className="ops-label">Capabilities</h3>
                      <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
                        {s.capabilities.map((c) => (
                          <li
                            key={c}
                            className="group flex items-baseline gap-3 border-b border-hairline pb-3"
                          >
                            <span
                              aria-hidden="true"
                              className="font-mono text-mist-500 text-xs"
                            >
                              ↳
                            </span>
                            <span className="text-mist-100 text-[15px]">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10">
                      <div className="flex items-baseline justify-between">
                        <h3 className="ops-label">Working stack</h3>
                        <span className="ops-label text-mist-500">{s.stack.length} tools</span>
                      </div>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {s.stack.map((tool) => (
                          <li key={tool} className="code-chip">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="paper rounded-3xl p-8">
                      <h3 className="ops-label">What you take home</h3>
                      <ul className="mt-5 divide-y divide-[color:var(--hairline)]">
                        {s.deliverables.map((d, i) => (
                          <li
                            key={d}
                            className="flex items-baseline gap-4 py-4 first:pt-0 last:pb-0"
                          >
                            <span
                              className="font-mono text-amber-300 text-xs w-6 shrink-0"
                              aria-hidden="true"
                            >
                              0{i + 1}
                            </span>
                            <span className="text-mist-100 text-[15px] leading-relaxed">
                              {d}
                            </span>
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
