import { partnerLogos } from "@/data/site";
import MagneticButton from "@/components/motion/MagneticButton";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function CtaMarquee() {
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <section
      className="paint-skip relative py-28 sm:py-36"
      style={{ containIntrinsicSize: "1px 900px" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <RevealOnScroll className="relative overflow-hidden rounded-[2.75rem] paper-strong p-10 sm:p-16 lg:p-20">
          {/* Warm glow corner — single amber bloom, no rainbow. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 80% at 95% 0%, color-mix(in srgb, var(--amber-500) 38%, transparent), transparent 65%), radial-gradient(40% 60% at 5% 100%, color-mix(in srgb, var(--bone-50) 12%, transparent), transparent 65%)",
            }}
          />
          {/* Tick rule along the inside top edge. */}
          <span
            aria-hidden="true"
            className="absolute left-12 right-12 top-8 h-1 tick-rule opacity-60"
          />

          <div className="relative grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
            <div>
              <p className="ops-label">05 / Next step</p>
              <h2 className="mt-5 font-display text-balance text-5xl sm:text-6xl lg:text-[5.5rem] tracking-[-0.03em] leading-[0.95]">
                Got a thing
                <br />
                <span className="font-serif italic text-gradient-warm">worth building?</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg text-mist-200 leading-relaxed">
                We take on a small number of engagements each quarter. If your
                deadline is real, the brief is sharp, and you&rsquo;d like a
                senior team on it,{" "}
                <span className="font-serif italic text-mist-100">
                  we&rsquo;d love to talk.
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <MagneticButton href="/contact" variant="bone">
                Book a call
                <span aria-hidden="true" className="font-mono">↗</span>
              </MagneticButton>
              <MagneticButton href="/services" variant="ghost" strength={0.18}>
                Browse services
              </MagneticButton>
              <p className="mt-4 max-w-[18rem] text-right font-mono text-[0.7rem] uppercase tracking-[0.22em] text-mist-400 lg:text-right">
                Replies within <span className="text-mist-100">one working day.</span>
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Marquee — display serif at scale instead of generic uppercase. */}
      <div
        className="mt-24 overflow-hidden relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
        aria-hidden="true"
      >
        <div className="marquee py-5">
          {logos.map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="flex items-center gap-12 px-8"
            >
              <span className="font-serif italic text-5xl sm:text-6xl text-mist-300/80 tracking-tight whitespace-nowrap">
                {logo}
              </span>
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-amber-400/70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
