import Link from "next/link";
import { projects } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function FeaturedWork() {
  const featured = projects.slice(0, 4);

  return (
    <section
      className="paint-skip relative py-28 sm:py-36"
      style={{ containIntrinsicSize: "1px 1300px" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Casework"
            index="03 / Selected work"
            title={
              <>
                Outcomes,
                <br />
                <span className="italic text-amber-300">not deliverables.</span>
              </>
            }
          />
          <Link
            href="/work"
            className="hidden sm:inline-flex items-center gap-2 rounded-full ring-hairline-strong px-5 py-3 text-sm text-mist-100 hover:text-amber-300 transition"
          >
            <span className="font-serif italic">See all 24 case studies</span>
            <span aria-hidden="true" className="font-mono">↗</span>
          </Link>
        </div>

        <span aria-hidden="true" className="block tick-rule mt-16" />

        <RevealOnScroll
          selector=".work-row"
          className="divide-y divide-[color:var(--hairline)]"
          stagger={0.1}
        >
          {featured.map((p, i) => (
            <article
              key={p.slug}
              className="work-row group relative grid grid-cols-12 gap-x-4 sm:gap-x-8 py-10 sm:py-16 items-start"
            >
              {/* Index column — case number + small status */}
              <div className="col-span-2 sm:col-span-1 pt-3">
                <div className="ops-label text-mist-500">Case</div>
                <div className="mt-1 font-serif italic text-3xl text-amber-300 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Headline + blurb column */}
              <div className="col-span-10 sm:col-span-7 lg:col-span-6">
                <div className="ops-label flex items-center gap-3">
                  <span className="text-mist-200">{p.client}</span>
                  <span aria-hidden="true" className="h-px w-4 bg-hairline-strong" />
                  <span>{p.industry}</span>
                  <span aria-hidden="true" className="h-px w-4 bg-hairline-strong" />
                  <span>{p.year}</span>
                  <span aria-hidden="true" className="h-px w-4 bg-hairline-strong" />
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className="size-1 rounded-full bg-signal-400" />
                    <span className="text-signal-300">Shipped</span>
                  </span>
                </div>
                <h3 className="mt-5 font-display text-3xl sm:text-4xl lg:text-[3rem] tracking-[-0.022em] leading-[1.04] text-balance">
                  {p.title}
                </h3>
                <p className="mt-4 text-mist-300 leading-relaxed max-w-xl text-[15px]">
                  {p.blurb}
                </p>
                <p className="mt-5 font-serif italic text-mist-100 text-lg">
                  &ldquo;{p.result}&rdquo;
                </p>
              </div>

              {/* Metric column */}
              <div className="col-span-12 sm:col-span-4 lg:col-span-5 mt-6 sm:mt-0 sm:pl-6 sm:border-l sm:border-hairline">
                <div className="flex flex-wrap gap-x-10 gap-y-6">
                  {p.metric.map((m) => (
                    <div key={m.label} className="min-w-[8rem]">
                      <div className="font-serif italic text-4xl sm:text-5xl tracking-[-0.02em] text-gradient-warm">
                        {m.value}
                      </div>
                      <div className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-400">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-300">
                  {p.tags.map((t, ti) => (
                    <li key={t} className="inline-flex items-center gap-3">
                      {ti > 0 ? (
                        <span aria-hidden="true" className="size-1 rounded-full bg-mist-500" />
                      ) : null}
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amber underline reveal across full width on hover */}
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 -bottom-px h-px origin-left scale-x-0 bg-amber-400 transition-transform duration-700 group-hover:scale-x-100"
              />
            </article>
          ))}
        </RevealOnScroll>

        <span aria-hidden="true" className="block tick-rule mt-2" />

        <div className="mt-12 sm:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full ring-hairline-strong px-5 py-3 text-sm text-mist-100"
          >
            <span className="font-serif italic">See all case studies</span>{" "}
            <span aria-hidden="true" className="font-mono">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
