"use client";

import { useRef } from "react";
import MagneticButton from "@/components/motion/MagneticButton";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Editorial hero with an operator-grade right column.
export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const root = ref.current;
      const reduce = prefersReducedMotion();

      const eyebrow = root.querySelector(".hero-eyebrow");
      const lineA = root.querySelector(".hero-line-a");
      const accent = root.querySelector(".hero-accent");
      const lineB = root.querySelector(".hero-line-b");
      const sub = root.querySelector(".hero-sub");
      const cta = root.querySelector(".hero-cta");
      const panelEls = root.querySelectorAll(".hero-panel-el");
      const ticker = root.querySelectorAll(".hero-ticker > *");

      if (reduce) {
        gsap.set(
          [eyebrow, lineA, accent, lineB, sub, cta, ...Array.from(panelEls), ...Array.from(ticker)],
          { opacity: 1, y: 0, clipPath: "none" }
        );
        return;
      }

      gsap.set([eyebrow, sub, cta], { opacity: 0, y: 22 });
      gsap.set([lineA, lineB], { opacity: 0, y: 28 });
      gsap.set(accent, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(panelEls, { opacity: 0, y: 14 });
      gsap.set(ticker, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out", force3D: true },
      });

      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.7 }, 0.05)
        .to(lineA, { opacity: 1, y: 0, duration: 0.95 }, 0.15)
        .to(
          accent,
          { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "expo.out" },
          0.45
        )
        .to(lineB, { opacity: 1, y: 0, duration: 0.95 }, 0.6)
        .to(sub, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
        .to(cta, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
        .to(panelEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.75)
        .to(ticker, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 1.15);

      return () => tl.kill();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-44 pb-24 sm:pt-56 sm:pb-32"
    >
      {/* Single warm glow. */}
      <div className="glow" aria-hidden="true">
        <div className="glow__orb glow__orb--amber -top-40 -right-32" />
        <div className="glow__orb glow__orb--bone bottom-[-12rem] left-[10%]" />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(closest-side,white,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--mist-100) 1px, transparent 1px), linear-gradient(to bottom, var(--mist-100) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        {/* Eyebrow — practical, not affected. */}
        <div className="hero-eyebrow flex flex-wrap items-center justify-between gap-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mist-400">
          <span className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="live-dot" />
            <span className="text-mist-100">Open for Q3 — 2 of 4 slots filled</span>
          </span>
          <span className="hidden sm:inline">
            A senior-led product &amp; growth studio
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-14">
          {/* Headline column */}
          <div className="lg:col-span-7 relative">
            <h1 className="font-display text-[clamp(3rem,7.5vw,7.5rem)] leading-[0.94] tracking-[-0.025em] text-balance">
              <span className="hero-line-a block">Software &amp; growth,</span>
              <span className="hero-line-b block mt-2 sm:mt-3">
                in&nbsp;
                <span className="hero-accent inline-block clip-reveal italic font-serif text-gradient-warm">
                  lockstep
                </span>
                <span className="text-mist-400">.</span>
              </span>
            </h1>

            <p className="hero-sub mt-9 max-w-xl text-lg sm:text-xl text-mist-200 leading-relaxed">
              A senior-led studio that designs, ships, and grows the products
              you care about — engineering, marketing, brand, and strategy,
              briefed on the same page.
            </p>

            <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href="/contact" variant="primary">
                Start a project
                <span aria-hidden="true" className="font-mono">↗</span>
              </MagneticButton>
              <MagneticButton href="/work" variant="ghost" strength={0.18}>
                See the work
              </MagneticButton>
            </div>

            <ul className="hero-ticker mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mist-500">
              <li>Trusted by founders at</li>
              <li aria-hidden="true" className="h-px w-6 bg-hairline-strong" />
              <li className="text-mist-200">Lumen</li>
              <li className="text-mist-200">Halcyon</li>
              <li className="text-mist-200">Northwind</li>
              <li className="text-mist-200">Kernel OS</li>
            </ul>
          </div>

          {/* System panel — engineering credibility moment. */}
          <aside className="lg:col-span-5">
            <SystemPanel />
          </aside>
        </div>

        <div className="mt-24 flex items-center gap-5">
          <span aria-hidden="true" className="hairline flex-1" />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-mist-500">
            scroll
          </span>
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rotate-45 border-r border-b border-mist-400"
          />
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * System panel — the signature moment.
 *
 * Reads as a small, working-looking ops console. Two stacked tiles:
 *   1. Active engagement card with a live sparkline.
 *   2. Recent activity log — three rows with status dots.
 * Everything is static data; the *feeling* is dynamic.
 * --------------------------------------------------------- */

function SystemPanel() {
  // Sparkline data — a synthetic but credible weekly pipeline curve.
  const points = [12, 17, 14, 22, 19, 28, 32, 30, 38, 44, 41, 48];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 220;
  const h = 56;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="relative flex flex-col gap-3">
      {/* Header strip — looks like a window chrome row. */}
      <div className="hero-panel-el flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-500 px-4 py-2 panel rounded-t-2xl border-b-0">
        <span className="inline-flex items-center gap-2 text-mist-200">
          <span aria-hidden="true" className="live-dot" />
          CFG-OPS · LIVE
        </span>
        <span>{new Date().toISOString().slice(0, 10)}</span>
      </div>

      {/* Tile 1 — active engagement w/ sparkline. */}
      <div className="hero-panel-el panel rounded-2xl p-5">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist-400">
              Active engagement · Kernel OS
            </div>
            <div className="mt-2 font-display text-3xl tracking-[-0.02em] text-mist-50">
              Sprint <span className="font-serif italic text-amber-300">23 / 32</span>
            </div>
          </div>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-signal-400 inline-flex items-center gap-2">
            <span aria-hidden="true" className="live-dot" />
            On track
          </span>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto] gap-x-5 items-end">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            width="100%"
            height={h}
            aria-hidden="true"
            className="sparkline"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="cf-spark" x1="0" y1="0" x2={w} y2="0">
                <stop offset="0" stopColor="var(--amber-200)" stopOpacity="0.5" />
                <stop offset="1" stopColor="var(--amber-500)" />
              </linearGradient>
              <linearGradient id="cf-spark-fill" x1="0" y1="0" x2="0" y2={h}>
                <stop offset="0" stopColor="var(--amber-400)" stopOpacity="0.25" />
                <stop offset="1" stopColor="var(--amber-400)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${path} L${w} ${h} L0 ${h} Z`} fill="url(#cf-spark-fill)" stroke="none" />
            <path d={path} stroke="url(#cf-spark)" />
            {/* Last point — a small marker. */}
            <circle
              cx={w}
              cy={h - ((points[points.length - 1] - min) / range) * h}
              r="2.5"
              fill="var(--amber-300)"
            />
          </svg>
          <div className="text-right">
            <div className="font-serif italic text-3xl tracking-[-0.02em] text-gradient-warm leading-none">
              +118%
            </div>
            <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-400">
              wow pipeline
            </div>
          </div>
        </div>

        <ul className="mt-5 grid grid-cols-3 gap-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-400 border-t border-hairline pt-4">
          <li>
            <div className="text-mist-100 text-sm">12d</div>
            <div>to launch</div>
          </li>
          <li>
            <div className="text-mist-100 text-sm">7</div>
            <div>squad size</div>
          </li>
          <li>
            <div className="text-mist-100 text-sm">99.97%</div>
            <div>p99 uptime</div>
          </li>
        </ul>
      </div>

      {/* Tile 2 — recent activity log. */}
      <div className="hero-panel-el panel rounded-2xl p-5">
        <div className="flex items-baseline justify-between mb-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist-400">
            Recent
          </div>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist-500">
            Last 24h
          </span>
        </div>
        <ul className="space-y-3">
          <LogRow
            time="14:02"
            project="Lumen Bank"
            event="Cashflow forecast v3 shipped to App Store."
            status="signal"
          />
          <LogRow
            time="11:21"
            project="Northwind"
            event="Paid funnel rebuilt; ROAS 2.4× holding into week 6."
            status="amber"
          />
          <LogRow
            time="09:48"
            project="Halcyon"
            event="Pricing migration started — 0 logo churn so far."
            status="mist"
          />
        </ul>
      </div>
    </div>
  );
}

interface LogRowProps {
  time: string;
  project: string;
  event: string;
  status: "signal" | "amber" | "mist";
}

function LogRow({ time, project, event, status }: LogRowProps) {
  const dotClass = {
    signal: "bg-signal-400 shadow-[0_0_10px_var(--signal-400)]",
    amber: "bg-amber-400 shadow-[0_0_10px_var(--amber-400)]",
    mist: "bg-mist-300",
  }[status];

  return (
    <li className="grid grid-cols-[auto_auto_1fr] gap-x-3 items-start">
      <span aria-hidden="true" className={`mt-1.5 inline-block size-1.5 rounded-full ${dotClass}`} />
      <span className="font-mono text-[0.65rem] tabular-nums text-mist-400 pt-0.5">{time}</span>
      <div className="text-sm leading-snug">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mist-300 mr-2">
          {project}
        </span>
        <span className="text-mist-100">{event}</span>
      </div>
    </li>
  );
}
