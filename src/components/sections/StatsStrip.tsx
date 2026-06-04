import { stats } from "@/data/site";
import Counter from "@/components/motion/Counter";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function StatsStrip() {
  const [shipped, revenue, lift, partners] = stats;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="ops-label">01 / Numbers</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[0.98] text-balance max-w-2xl">
              Six years of work,{" "}
              <span className="italic text-amber-300">on the record.</span>
            </h2>
          </div>
          <span className="hidden lg:inline ops-label">
            Refreshed 2026-06-04 · UTC−05
          </span>
        </div>

        {/* Column header — gives the table a real, operator-grade reading. */}
        <div className="mt-14 hidden sm:grid grid-cols-12 gap-x-8 ops-label text-mist-500 pb-3 border-b border-hairline-strong">
          <span className="col-span-1">#</span>
          <span className="col-span-5">Metric</span>
          <span className="col-span-3">Trend, last 12mo</span>
          <span className="col-span-3 text-right">Detail</span>
        </div>

        <RevealOnScroll
          selector=".stat-row"
          className="divide-y divide-[color:var(--hairline)]"
          stagger={0.1}
        >
          {/* Revenue */}
          <article className="stat-row group relative grid grid-cols-12 gap-x-4 sm:gap-x-8 py-10 sm:py-14 items-baseline">
            <div className="col-span-2 sm:col-span-1 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-mist-500 pt-3">
              01
            </div>
            <div className="col-span-10 sm:col-span-5">
              <Counter
                to={revenue.value}
                prefix={revenue.prefix}
                suffix={revenue.suffix}
                className="block font-serif italic text-[clamp(4.5rem,12vw,9.5rem)] leading-[0.85] tracking-[-0.045em] text-gradient-warm"
              />
              <p className="mt-4 max-w-md text-base text-mist-200">
                Client revenue influenced —{" "}
                <span className="font-serif italic text-mist-100">in dollars, not vibes</span>.
              </p>
            </div>
            <div className="col-span-7 sm:col-span-3 mt-4 sm:mt-0">
              <Sparkline
                points={[18, 22, 26, 31, 36, 44, 52, 61, 78, 96, 118, 142]}
                accent="amber"
              />
              <div className="mt-3 ops-label flex items-center gap-2">
                <span className="text-signal-300">+24% YoY</span>
                <span aria-hidden="true" className="h-px w-4 bg-hairline-strong" />
                <span>compounded</span>
              </div>
            </div>
            <div className="col-span-5 sm:col-span-3 mt-2 sm:mt-0 text-right">
              <div className="ops-label">Status</div>
              <div className="mt-2 inline-flex items-center gap-2 text-mist-100">
                <span aria-hidden="true" className="live-dot" />
                <span className="text-sm">Compounding</span>
              </div>
            </div>
          </article>

          {/* Shipped products */}
          <article className="stat-row grid grid-cols-12 gap-x-4 sm:gap-x-8 py-10 sm:py-14 items-baseline">
            <div className="col-span-2 sm:col-span-1 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-mist-500 pt-3">
              02
            </div>
            <div className="col-span-10 sm:col-span-5">
              <Counter
                to={shipped.value}
                prefix={shipped.prefix}
                suffix={shipped.suffix}
                className="block font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.85] tracking-[-0.035em] text-mist-50"
              />
              <p className="mt-4 max-w-md text-base text-mist-200">
                Products shipped to production —{" "}
                <span className="font-serif italic text-mist-100">since 2019</span>.
              </p>
            </div>
            <div className="col-span-7 sm:col-span-3 mt-4 sm:mt-0">
              <BarChart points={[6, 8, 11, 14, 17, 22, 24, 28]} />
              <div className="mt-3 ops-label">
                <span className="text-signal-300">+16 this year</span>
              </div>
            </div>
            <div className="col-span-5 sm:col-span-3 mt-2 sm:mt-0 text-right">
              <div className="ops-label">P95 LCP</div>
              <div className="mt-2 font-display text-2xl text-mist-50 tracking-tight">
                1.1<span className="text-mist-400 text-base">s</span>
              </div>
            </div>
          </article>

          {/* Pipeline lift */}
          <article className="stat-row grid grid-cols-12 gap-x-4 sm:gap-x-8 py-10 sm:py-14 items-baseline">
            <div className="col-span-2 sm:col-span-1 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-mist-500 pt-3">
              03
            </div>
            <div className="col-span-10 sm:col-span-5">
              <Counter
                to={lift.value}
                prefix={lift.prefix}
                suffix={lift.suffix}
                className="block font-serif italic text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.85] tracking-[-0.035em] text-amber-300"
              />
              <p className="mt-4 max-w-md text-base text-mist-200">
                Median lift in qualified pipeline across paid + lifecycle —{" "}
                <span className="font-serif italic text-mist-100">P50, n=24</span>.
              </p>
            </div>
            <div className="col-span-7 sm:col-span-3 mt-4 sm:mt-0 flex items-end gap-4">
              <RingChart percent={lift.value} />
              <div>
                <div className="ops-label">Range</div>
                <div className="mt-1 font-mono text-sm text-mist-100">
                  18% – 64%
                </div>
              </div>
            </div>
            <div className="col-span-5 sm:col-span-3 mt-2 sm:mt-0 text-right">
              <div className="ops-label">Method</div>
              <div className="mt-2 font-mono text-xs text-mist-100">
                Pre/post engagement, blended.
              </div>
            </div>
          </article>

          {/* Partners */}
          <article className="stat-row grid grid-cols-12 gap-x-4 sm:gap-x-8 py-10 sm:py-14 items-baseline">
            <div className="col-span-2 sm:col-span-1 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-mist-500 pt-3">
              04
            </div>
            <div className="col-span-10 sm:col-span-5">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <Counter
                  to={partners.value}
                  prefix={partners.prefix}
                  suffix={partners.suffix}
                  className="font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-none tracking-[-0.035em] text-mist-50"
                />
                <span className="font-serif italic text-xl text-mist-300">
                  senior partners — on every brief.
                </span>
              </div>
              <p className="mt-4 max-w-md text-base text-mist-200">
                The names you meet in the pitch are the names you work with day to day.
              </p>
            </div>
            <div className="col-span-7 sm:col-span-3 mt-4 sm:mt-0">
              <ul aria-hidden="true" className="flex items-end gap-[6px] h-12">
                {Array.from({ length: partners.value }).map((_, i) => (
                  <li
                    key={i}
                    className="w-1 bg-gradient-to-t from-amber-500 to-amber-200"
                    style={{
                      height: `${60 + (i % 3) * 12}%`,
                    }}
                  />
                ))}
              </ul>
              <div className="mt-3 ops-label">
                <span className="text-mist-200">0 churn since 2021</span>
              </div>
            </div>
            <div className="col-span-5 sm:col-span-3 mt-2 sm:mt-0 text-right">
              <div className="ops-label">Tenure</div>
              <div className="mt-2 font-display text-2xl text-mist-50 tracking-tight">
                4.3<span className="text-mist-400 text-base">yr avg.</span>
              </div>
            </div>
          </article>
        </RevealOnScroll>

        <span aria-hidden="true" className="block tick-rule mt-2" />
      </div>
    </section>
  );
}

/* Sparkline — area chart with single accent line. */
interface SparklineProps {
  points: number[];
  accent?: "amber" | "signal";
}
function Sparkline({ points, accent = "amber" }: SparklineProps) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 180;
  const h = 44;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const stroke =
    accent === "amber" ? "var(--amber-400)" : "var(--signal-400)";
  const fillFrom =
    accent === "amber" ? "var(--amber-400)" : "var(--signal-400)";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      height={h}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`fill-${accent}`} x1="0" y1="0" x2="0" y2={h}>
          <stop offset="0" stopColor={fillFrom} stopOpacity="0.28" />
          <stop offset="1" stopColor={fillFrom} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${path} L${w} ${h} L0 ${h} Z`}
        fill={`url(#fill-${accent})`}
        stroke="none"
      />
      <path
        d={path}
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={w}
        cy={h - ((points[points.length - 1] - min) / range) * h}
        r="2.4"
        fill={stroke}
      />
    </svg>
  );
}

/* Bar chart — discrete launches per year. */
function BarChart({ points }: { points: number[] }) {
  const max = Math.max(...points) || 1;
  const w = 180;
  const h = 44;
  const gap = 3;
  const barW = (w - gap * (points.length - 1)) / points.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      height={h}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {points.map((p, i) => {
        const x = i * (barW + gap);
        const bh = (p / max) * h;
        return (
          <rect
            key={i}
            x={x}
            y={h - bh}
            width={barW}
            height={bh}
            fill={i === points.length - 1 ? "var(--amber-400)" : "var(--mist-300)"}
            opacity={i === points.length - 1 ? 1 : 0.4}
            rx="0.5"
          />
        );
      })}
    </svg>
  );
}

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
        stroke="var(--amber-400)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        transform="rotate(-90 28 28)"
      />
    </svg>
  );
}
