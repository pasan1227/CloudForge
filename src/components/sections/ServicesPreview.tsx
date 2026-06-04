import Link from "next/link";
import { services } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import type { Service } from "@/lib/types";

const accentRing: Record<Service["accent"], string> = {
  teal: "from-teal-300/40",
  cyan: "from-cyan-400/40",
  coral: "from-coral-400/40",
  mist: "from-mist-200/30",
};

const accentText: Record<Service["accent"], string> = {
  teal: "text-teal-300",
  cyan: "text-cyan-300",
  coral: "text-coral-300",
  mist: "text-mist-100",
};

export default function ServicesPreview() {
  return (
    <section className="paint-skip relative py-28 sm:py-36" style={{ containIntrinsicSize: "1px 1100px" }}>
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Four disciplines,{" "}
              <span className="font-serif italic text-gradient">
                one team.
              </span>
            </>
          }
          description="We staff every engagement with senior partners across engineering, growth, brand, and strategy — so the work stays joined-up from the first call to the second launch."
        />

        <RevealOnScroll
          selector=".service-card"
          className="mt-16 grid gap-5 lg:grid-cols-2"
        >
          {services.map((s) => (
            <Link
              key={s.id}
              href="/services"
              className={[
                "service-card group relative overflow-hidden rounded-3xl glass p-7 sm:p-9 transition-transform duration-500 hover:-translate-y-1",
              ].join(" ")}
            >
              <div
                aria-hidden="true"
                className={`absolute -top-32 -right-32 size-72 rounded-full bg-gradient-radial ${accentRing[s.accent]} to-transparent opacity-60 blur-3xl`}
                style={{
                  background: `radial-gradient(closest-side, var(--${s.accent}-${s.accent === "mist" ? "200" : "400"}), transparent 65%)`,
                  opacity: 0.35,
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-display text-2xl ${accentText[s.accent]}`}
                  >
                    {s.glyph}
                  </span>
                  <span className="text-xs uppercase tracking-[0.22em] text-mist-400">
                    0{services.indexOf(s) + 1}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-3xl sm:text-4xl tracking-tight">
                  {s.name}
                </h3>
                <p className="mt-2 font-serif italic text-mist-200 text-lg">
                  {s.tagline}
                </p>
                <p className="mt-5 text-mist-300 leading-relaxed max-w-md">
                  {s.blurb}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {s.capabilities.slice(0, 4).map((c) => (
                    <li
                      key={c}
                      className="rounded-full bg-surface-2 ring-hairline px-3 py-1 text-xs text-mist-200"
                    >
                      {c}
                    </li>
                  ))}
                </ul>

                <span className="mt-8 inline-flex items-center gap-2 text-sm text-mist-200 group-hover:text-mist-50 transition">
                  Explore {s.name.toLowerCase()}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
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
