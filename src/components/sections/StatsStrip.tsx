import { stats } from "@/data/site";
import Counter from "@/components/motion/Counter";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function StatsStrip() {
  // Tuple destructure — order matches site.ts.
  const [shipped, revenue, lift, partners] = stats;

  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-7xl px-6">
        <RevealOnScroll
          selector=".stat-block"
          className="grid grid-cols-12 gap-3 sm:gap-4"
          stagger={0.13}
        >
          {/* Feature stat — $142M revenue, dominates left column on lg+. */}
          <article className="stat-block group relative col-span-12 lg:col-span-7 lg:row-span-2 glass-strong rounded-3xl p-7 sm:p-10 overflow-hidden min-h-[22rem] lg:min-h-[26rem]">
            {/* Ambient radial — paints once, no filter blur. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -bottom-40 size-[32rem] rounded-full opacity-55"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in srgb, var(--teal-400) 35%, transparent), transparent 70%)",
              }}
            />
            {/* Subtle dot field for editorial texture. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
                maskImage:
                  "linear-gradient(120deg, black 0%, black 35%, transparent 75%)",
                WebkitMaskImage:
                  "linear-gradient(120deg, black 0%, black 35%, transparent 75%)",
              }}
            />

            <div className="relative h-full flex flex-col justify-between gap-10">
              <header className="flex items-start justify-between gap-6 text-[0.7rem] uppercase tracking-[0.3em] text-mist-400">
                <span className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-teal-300 shadow-[0_0_0_4px_color-mix(in_srgb,var(--teal-300)_20%,transparent)]" />
                  In market
                </span>
                <span className="hidden sm:inline">2019 — today</span>
              </header>

              <div>
                <Counter
                  to={revenue.value}
                  prefix={revenue.prefix}
                  suffix={revenue.suffix}
                  className="block font-display text-[clamp(5rem,13vw,11rem)] leading-[0.82] tracking-[-0.045em] text-gradient"
                />
                <p className="mt-7 font-serif italic text-xl sm:text-2xl text-mist-200 max-w-md leading-snug">
                  client revenue we&apos;ve influenced since opening the doors.
                </p>
              </div>
            </div>
          </article>

          {/* Stat — Products shipped, with delicate dot-matrix decoration. */}
          <article className="stat-block relative col-span-12 sm:col-span-6 lg:col-span-5 glass rounded-3xl p-7 sm:p-8 overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Counter
                  to={shipped.value}
                  prefix={shipped.prefix}
                  suffix={shipped.suffix}
                  className="block font-display text-[clamp(3.25rem,6.5vw,5rem)] leading-none tracking-tight text-gradient"
                />
                <div className="mt-4 text-sm text-mist-100">{shipped.label}</div>
                {shipped.hint ? (
                  <div className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-mist-400">
                    {shipped.hint}
                  </div>
                ) : null}
              </div>
              <DotMatrix className="shrink-0 text-teal-300/65" />
            </div>
            <span aria-hidden="true" className="mt-6 block h-px w-12 bg-gradient-to-r from-teal-300/70 to-transparent" />
          </article>

          {/* Stat — pipeline lift %, with ring chart. */}
          <article className="stat-block relative col-span-12 sm:col-span-6 lg:col-span-5 glass rounded-3xl p-7 sm:p-8 overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Counter
                  to={lift.value}
                  prefix={lift.prefix}
                  suffix={lift.suffix}
                  className="block font-display text-[clamp(3.25rem,6.5vw,5rem)] leading-none tracking-tight text-gradient-warm"
                />
                <div className="mt-4 text-sm text-mist-100">{lift.label}</div>
                {lift.hint ? (
                  <div className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-mist-400">
                    {lift.hint}
                  </div>
                ) : null}
              </div>
              <RingChart percent={lift.value} />
            </div>
            <span aria-hidden="true" className="mt-6 block h-px w-12 bg-gradient-to-r from-coral-400/70 to-transparent" />
          </article>

          {/* Stat — 11 partners, wide bottom row with tally markers. */}
          <article className="stat-block relative col-span-12 glass rounded-3xl p-7 sm:p-8 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
              <div className="flex items-baseline gap-5 min-w-0">
                <Counter
                  to={partners.value}
                  prefix={partners.prefix}
                  suffix={partners.suffix}
                  className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-none tracking-tight text-mist-50"
                />
                <span className="font-serif italic text-mist-200 text-lg sm:text-xl leading-snug">
                  {partners.label.toLowerCase()}.
                </span>
              </div>
              <ul aria-hidden="true" className="flex items-center gap-2 flex-wrap">
                {Array.from({ length: partners.value }).map((_, i) => (
                  <li
                    key={i}
                    className="size-2.5 rounded-full bg-gradient-to-br from-teal-300 to-cyan-400"
                    style={{
                      boxShadow:
                        "0 0 0 3px color-mix(in srgb, var(--teal-400) 10%, transparent)",
                    }}
                  />
                ))}
              </ul>
            </div>
          </article>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* 6×5 dot matrix — 30 dots as a decorative texture in the corner of the
 * shipped-products card. Not a literal count; the suggestion is plenty. */
function DotMatrix({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 50"
      width="60"
      height="50"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {Array.from({ length: 6 }).flatMap((_, c) =>
        Array.from({ length: 5 }).map((_, r) => (
          <circle key={`${c}-${r}`} cx={c * 10 + 5} cy={r * 10 + 5} r="1.4" />
        ))
      )}
    </svg>
  );
}

/* Ring chart — fills to the percentage. The track is a hairline; the fill is
 * the coral accent. Could be animated via GSAP later, but a static SVG reads
 * well at this size. */
function RingChart({ percent }: { percent: number }) {
  const r = 22;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * (Math.min(100, Math.max(0, percent)) / 100);

  return (
    <svg
      viewBox="0 0 56 56"
      width="56"
      height="56"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke="var(--mist-500)"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke="var(--coral-400)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        transform="rotate(-90 28 28)"
      />
    </svg>
  );
}
