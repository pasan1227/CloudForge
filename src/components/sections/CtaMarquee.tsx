import { partnerLogos } from "@/data/site";
import MagneticButton from "@/components/motion/MagneticButton";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function CtaMarquee() {
  // Double the logos so the marquee wraps without a visible seam.
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="paint-skip relative py-28 sm:py-36" style={{ containIntrinsicSize: "1px 900px" }}>
      <div className="mx-auto w-full max-w-7xl px-6">
        <RevealOnScroll className="relative overflow-hidden rounded-[2.75rem] glass-strong p-10 sm:p-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 80% at 80% 10%, color-mix(in srgb, var(--teal-400) 45%, transparent), transparent 65%), radial-gradient(40% 60% at 10% 90%, color-mix(in srgb, var(--coral-500) 35%, transparent), transparent 65%)",
            }}
          />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <h2 className="font-display text-balance text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.98]">
                Got a thing
                <br />
                <span className="font-serif italic text-gradient-warm">
                  worth building?
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-lg text-mist-200">
                We take on a small number of engagements each quarter. If your
                deadline is real, the brief is sharp, and you&rsquo;d like a
                senior team on it, we&rsquo;d love to talk.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <MagneticButton href="/contact" variant="warm">
                Book a call
                <span aria-hidden="true">→</span>
              </MagneticButton>
              <MagneticButton
                href="/services"
                variant="ghost"
                strength={0.18}
              >
                Browse services
              </MagneticButton>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Marquee */}
      <div
        className="mt-20 overflow-hidden relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
        aria-hidden="true"
      >
        <div className="marquee py-4">
          {logos.map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="flex items-center gap-12 px-8"
            >
              <span className="font-display text-4xl sm:text-5xl text-mist-200/70 tracking-tight whitespace-nowrap">
                {logo}
              </span>
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-mist-400/40"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
