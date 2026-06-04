import Link from "next/link";
import { services } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function ServicesPreview() {
  return (
    <section
      className="paint-skip relative py-28 sm:py-36"
      style={{ containIntrinsicSize: "1px 1100px" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Disciplines"
          index="02 / What we do"
          title={
            <>
              Four disciplines,{" "}
              <span className="italic text-amber-300">one team.</span>
            </>
          }
          description="We staff every engagement with senior partners across engineering, growth, brand, and strategy — so the work stays joined-up from the first call to the second launch."
        />

        <RevealOnScroll
          selector=".service-card"
          className="mt-20 grid gap-px bg-[color:var(--hairline)] rounded-3xl overflow-hidden ring-hairline-strong sm:grid-cols-2"
        >
          {services.map((s, i) => (
            <Link
              key={s.id}
              href="/services"
              className="service-card group relative overflow-hidden bg-ink-900 p-8 sm:p-10 lg:p-12 transition-colors duration-500 hover:bg-ink-850"
            >
              {/* Amber underline on hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-10 bottom-0 h-px origin-left scale-x-0 bg-amber-400 transition-transform duration-500 group-hover:scale-x-100"
              />

              {/* Single warm radial in the corner — amber, no rainbow. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 -right-32 size-72 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in srgb, var(--amber-400) 35%, transparent), transparent 70%)",
                }}
              />

              <div className="relative">
                <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.28em] text-mist-400">
                  <span>0{i + 1}</span>
                  <span aria-hidden="true">{s.glyph}</span>
                </div>

                <h3 className="mt-8 font-display text-4xl sm:text-5xl lg:text-[3.5rem] tracking-[-0.022em] leading-[1.0]">
                  {s.name}
                </h3>
                <p className="mt-3 font-serif italic text-mist-200 text-lg sm:text-xl">
                  {s.tagline}
                </p>
                <p className="mt-6 text-mist-300 leading-relaxed max-w-md text-[15px]">
                  {s.blurb}
                </p>

                <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist-300">
                  {s.capabilities.slice(0, 4).map((c, ci) => (
                    <li key={c} className="inline-flex items-center gap-2">
                      {ci > 0 ? (
                        <span aria-hidden="true" className="size-1 rounded-full bg-mist-500" />
                      ) : null}
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                {/* Stack signature — credibility row. */}
                <div className="mt-10 pt-6 border-t border-hairline">
                  <div className="flex items-baseline justify-between">
                    <span className="ops-label">Stack</span>
                    <span className="ops-label text-mist-500">{s.stack.length} tools</span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.stack.map((tool) => (
                      <li key={tool} className="code-chip">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="mt-8 inline-flex items-center gap-3 text-sm text-mist-200 group-hover:text-amber-300 transition-colors">
                  <span className="font-serif italic">Explore {s.name.toLowerCase()}</span>
                  <span
                    aria-hidden="true"
                    className="inline-block font-mono transition-transform duration-300 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
