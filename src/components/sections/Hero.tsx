"use client";

import { useRef } from "react";
import Aurora from "@/components/ui/Aurora";
import MagneticButton from "@/components/motion/MagneticButton";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// The signature scroll moment: char-stagger headline reveal,
// glass cards parallaxing at different depths, aurora drift.
export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const reduce = prefersReducedMotion();
      const root = ref.current;

      const chars = root.querySelectorAll<HTMLSpanElement>(".hero-char");
      const subline = root.querySelector(".hero-sub");
      const eyebrow = root.querySelector(".hero-eyebrow");
      const ctaRow = root.querySelector(".hero-cta");
      const tickerEls = root.querySelectorAll(".hero-ticker > *");
      const cards = root.querySelectorAll<HTMLElement>(".hero-card");

      if (reduce) {
        gsap.set(chars, { yPercent: 0, opacity: 1 });
        gsap.set([subline, eyebrow, ctaRow, ...Array.from(tickerEls)], {
          opacity: 1,
          y: 0,
        });
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(chars, { yPercent: 110, y: 0, opacity: 0 });
      gsap.set([eyebrow, subline, ctaRow], { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 28, force3D: true });
      gsap.set(tickerEls, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out", force3D: true },
      });
      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8 }, 0.05)
        .to(
          chars,
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.022 },
          0.1
        )
        .to(subline, { opacity: 1, y: 0, duration: 0.8 }, 0.45)
        .to(ctaRow, { opacity: 1, y: 0, duration: 0.7 }, 0.6)
        .to(tickerEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.7)
        .to(
          cards,
          { opacity: 1, y: 0, duration: 1.0, stagger: 0.12 },
          0.5
        );

      // Free up `will-change` once the entry animation has finished —
      // keeping it set forever forces a permanent compositor layer.
      tl.eventCallback("onComplete", () => {
        chars.forEach((c) => {
          c.style.willChange = "auto";
        });
      });

      // Single shared ScrollTrigger that scrubs a master tween,
      // then each card is offset by its depth. Cuts ScrollTrigger
      // overhead from N to 1 for the hero.
      const parallaxProgress = { v: 0 };
      const scrubTween = gsap.to(parallaxProgress, {
        v: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const p = parallaxProgress.v;
          cards.forEach((card) => {
            const depth = Number(card.dataset.depth ?? "0.3");
            // translate3d via gsap.set with the same prop — GSAP caches
            // the transform string so this stays cheap.
            gsap.set(card, { y: -90 * depth * p, force3D: true });
          });
        },
      });

      return () => {
        scrubTween.scrollTrigger?.kill();
        scrubTween.kill();
      };
    },
    { scope: ref }
  );

  // Split into word segments so the browser can wrap on real whitespace.
  // The final word stays italic / gradient as the visual accent.
  const headline = "Software & growth, in lockstep.";
  const headlineSegments = headline.split(/(\s+)/).filter((s) => s.length > 0);
  const accentWordIndex = headlineSegments.findLastIndex(
    (s) => !/^\s+$/.test(s)
  );

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32"
    >
      <Aurora intensity="loud" />

      {/* Faint grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(closest-side,white,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--mist-100) 1px, transparent 1px), linear-gradient(to bottom, var(--mist-100) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <span className="hero-eyebrow inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-mist-200">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-teal-300 shadow-[0_0_14px_var(--teal-300)]"
              />
              A full-service studio · est. 2019
            </span>

            <h1
              className="char-reveal mt-8 font-display text-[clamp(2.75rem,5.4vw,5rem)] tracking-tight leading-none text-balance"
              aria-label={headline}
            >
              <span className="sr-only">{headline}</span>
              <span aria-hidden="true">
                {headlineSegments.map((seg, i) => {
                  if (/^\s+$/.test(seg)) {
                    return <span key={i}>{seg}</span>;
                  }
                  const isAccent = i === accentWordIndex;
                  return (
                    <span
                      key={i}
                      className={[
                        "char-reveal__word",
                        isAccent ? "font-serif italic" : "",
                      ].join(" ")}
                    >
                      {Array.from(seg).map((c, j) => (
                        <span
                          key={j}
                          className={[
                            "hero-char char",
                            isAccent ? "text-gradient" : "",
                          ].join(" ")}
                        >
                          {c}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </span>
            </h1>

            <p className="hero-sub mt-7 max-w-xl text-lg sm:text-xl text-mist-200 leading-relaxed">
              CloudForge is a senior-led studio that designs, ships, and grows
              the products you care about — engineering, marketing, brand, and
              strategy, all on the same Notion.
            </p>

            <div className="hero-cta mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton href="/contact" variant="primary">
                Start a project
                <span aria-hidden="true">→</span>
              </MagneticButton>
              <MagneticButton href="/work" variant="ghost" strength={0.2}>
                See the work
              </MagneticButton>
            </div>

            <ul className="hero-ticker mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.22em] text-mist-400">
              <li>Trusted by founders at</li>
              <li className="text-mist-200">Lumen</li>
              <li className="text-mist-200">Halcyon</li>
              <li className="text-mist-200">Northwind</li>
              <li className="text-mist-200">Kernel OS</li>
            </ul>
          </div>

          {/* Glass cards — parallaxed at different depths */}
          <div className="lg:col-span-5 relative h-[34rem] hidden lg:block">
            <article
              data-depth="0.15"
              className="hero-card absolute top-2 right-2 w-[20rem] rounded-3xl glass-strong p-6 [box-shadow:var(--shadow-pop)]"
            >
              <div className="flex items-center justify-between text-xs text-mist-300">
                <span>Lumen Bank · iOS</span>
                <span>+118% retention</span>
              </div>
              <div className="mt-4 font-display text-3xl tracking-tight">
                Cashflow,
                <br />
                forecast forward.
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-[0.7rem] text-mist-300">
                {["Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m, i) => (
                  <div
                    key={m}
                    className="rounded-md bg-surface-1 px-2 py-3 text-center"
                  >
                    <span className="block text-mist-100">${(7 + i * 1.3).toFixed(1)}k</span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </article>

            <article
              data-depth="0.45"
              className="hero-card absolute top-44 left-2 w-[18rem] rounded-3xl glass p-6"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-teal-300">
                Live experiment · 03
              </div>
              <div className="mt-3 font-display text-2xl tracking-tight">
                Pricing test, week 2
              </div>
              <p className="mt-2 text-sm text-mist-300">
                Tier B is outperforming on conversion <em className="font-serif text-mist-100">and</em> ARPU.
              </p>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-3xl text-gradient-warm">+24.6%</span>
                <span className="text-xs text-mist-400">vs. control</span>
              </div>
            </article>

            <article
              data-depth="0.75"
              className="hero-card absolute bottom-2 right-6 w-[15rem] rounded-3xl glass-strong p-5"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-coral-300">
                Sprint review
              </div>
              <ul className="mt-3 space-y-2 text-sm text-mist-200">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-teal-300" /> Shipped onboarding v3
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-cyan-400" /> Reduced LCP to 1.1s
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-coral-400" /> Launched referral loop
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
