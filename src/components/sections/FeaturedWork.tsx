import Link from "next/link";
import { projects } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function FeaturedWork() {
  const featured = projects.slice(0, 4);

  return (
    <section className="paint-skip relative py-28 sm:py-36" style={{ containIntrinsicSize: "1px 1100px" }}>
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Outcomes,
                <br />
                <span className="font-serif italic text-gradient-warm">
                  not deliverables.
                </span>
              </>
            }
          />
          <Link
            href="/work"
            className="hidden sm:inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm hover:[box-shadow:var(--shadow-pop)] transition"
          >
            See all 24 case studies <span aria-hidden="true">→</span>
          </Link>
        </div>

        <RevealOnScroll
          selector=".work-card"
          className="mt-16 grid gap-5 lg:grid-cols-12"
        >
          {featured.map((p, i) => {
            // Layout: first card spans 7 cols, second 5, third 5, fourth 7.
            const span = i % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5";
            return (
              <article
                key={p.slug}
                className={`work-card ${span} relative overflow-hidden rounded-3xl glass p-8 min-h-[22rem] flex flex-col justify-between`}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-50 pointer-events-none"
                  style={{
                    background:
                      i % 2 === 0
                        ? "radial-gradient(60% 80% at 90% 10%, color-mix(in srgb, var(--teal-400) 35%, transparent), transparent 70%)"
                        : "radial-gradient(60% 80% at 10% 90%, color-mix(in srgb, var(--coral-400) 32%, transparent), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-mist-400">
                    <span>{p.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{p.industry}</span>
                    <span aria-hidden="true">·</span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl sm:text-4xl tracking-tight text-balance">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-mist-300 max-w-md">{p.blurb}</p>
                </div>

                <div className="relative mt-8 flex flex-wrap items-end justify-between gap-6">
                  <div className="flex gap-6">
                    {p.metric.map((m) => (
                      <div key={m.label}>
                        <div className="font-display text-3xl tracking-tight text-gradient">
                          {m.value}
                        </div>
                        <div className="text-xs uppercase tracking-[0.18em] text-mist-400 mt-1">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-surface-2 ring-hairline px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-mist-200"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </RevealOnScroll>

        <div className="mt-12 sm:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm"
          >
            See all case studies <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
