import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import StatsStrip from "@/components/sections/StatsStrip";
import CtaMarquee from "@/components/sections/CtaMarquee";
import { team, values, company } from "@/data/site";
import type { TeamMember } from "@/lib/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "A senior-led studio built around one idea: the best product work and the best growth work belong on the same team.",
};

const accentClass: Record<TeamMember["accent"], string> = {
  teal: "bg-gradient-to-br from-teal-200 to-teal-400 text-ink-900",
  cyan: "bg-gradient-to-br from-bone-50 to-amber-300 text-ink-900",
  coral: "bg-gradient-to-br from-amber-300 to-amber-500 text-ink-900",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About / A studio for the long arc"
        section="Profile · 30 people · est. 2019"
        title="A studio for the long arc."
        accentWord="long arc"
        description={
          <>
            We started CloudForge because most agencies stop one step short of
            where the interesting work begins. We wanted a place where{" "}
            <em className="font-serif italic text-mist-100">making</em> and{" "}
            <em className="font-serif italic text-mist-100">growing</em> sit at
            the same table — and stay there long after launch.
          </>
        }
      />

      {/* Story — magazine spread, large dropcap. */}
      <section className="relative py-24">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 grid lg:grid-cols-12 gap-x-10 gap-y-10">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Story"
            index="01 / Origin"
            title={
              <>
                Founded 2019,
                <br />
                <span className="italic text-amber-300">
                  built on patience.
                </span>
              </>
            }
          />
          <RevealOnScroll className="lg:col-span-7 space-y-7 text-mist-200 text-lg leading-relaxed">
            <p className="first-letter:font-serif first-letter:italic first-letter:text-amber-300 first-letter:text-7xl first-letter:float-left first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-1">
              CloudForge began as a Slack channel between three friends — an
              engineer, a designer, and a marketer — who kept getting hired to
              fix what the last agency had broken.
            </p>
            <p>
              Six years and 80-odd launches later, we&apos;re a 30-person studio
              with offices in {company.location.replaceAll(" · ", ", ")}. We
              still work the way we did at the start:{" "}
              <em className="font-serif italic text-mist-100">
                small senior teams, short loops, weekly demos, no waterfalls.
              </em>
            </p>
            <p>
              Most of our work comes from the people we&apos;ve shipped with
              before. We like it that way.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <StatsStrip />

      {/* Operating principles */}
      <section
        className="paint-skip relative py-28"
        style={{ containIntrinsicSize: "1px 900px" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <SectionHeading
            eyebrow="Operating principles"
            index="02 / What we won't bend on"
            title={
              <>
                The four things we{" "}
                <span className="italic text-amber-300">
                  refuse to compromise on.
                </span>
              </>
            }
          />
          <RevealOnScroll
            selector=".value-card"
            className="mt-16 grid gap-px bg-[color:var(--hairline)] rounded-3xl overflow-hidden ring-hairline-strong md:grid-cols-2"
          >
            {values.map((v, i) => (
              <article
                key={v.title}
                className="value-card relative bg-ink-900 p-8 sm:p-10 hover:bg-ink-850 transition-colors"
              >
                <div className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.28em] text-mist-400">
                  <span>0{i + 1} / 04</span>
                  <span aria-hidden="true">⌥</span>
                </div>
                <h3 className="mt-8 font-display text-3xl sm:text-4xl tracking-[-0.018em] leading-[1.05] text-balance">
                  {v.title}
                </h3>
                <p className="mt-5 text-mist-300 leading-relaxed max-w-md">
                  {v.blurb}
                </p>
              </article>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* People */}
      <section
        className="paint-skip relative py-24"
        style={{ containIntrinsicSize: "1px 1200px" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <SectionHeading
            eyebrow="People"
            index="03 / Senior partners"
            title={
              <>
                Senior on the floor.
                <br />
                <span className="italic text-amber-300">Always.</span>
              </>
            }
            description="The partners you meet in the pitch are the partners you work with on the project. We don't do bait-and-switch staffing."
          />

          <span aria-hidden="true" className="block tick-rule mt-16" />

          <RevealOnScroll
            selector=".team-row"
            className="divide-y divide-[color:var(--hairline)]"
            stagger={0.08}
          >
            {team.map((m, i) => (
              <article
                key={m.name}
                className="team-row group relative grid grid-cols-12 gap-x-4 sm:gap-x-8 py-8 sm:py-10 items-center"
              >
                <div className="col-span-2 sm:col-span-1 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-mist-500">
                  0{i + 1}
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <span
                    aria-hidden="true"
                    className={`grid place-items-center size-14 sm:size-16 rounded-2xl ${accentClass[m.accent]} font-display text-xl tracking-tight`}
                  >
                    {m.initials}
                  </span>
                </div>
                <div className="col-span-7 sm:col-span-4">
                  <h3 className="font-display text-2xl sm:text-3xl tracking-[-0.018em]">
                    {m.name}
                  </h3>
                  <div className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-mist-400">
                    {m.role}
                  </div>
                </div>
                <p className="col-span-12 sm:col-span-5 mt-4 sm:mt-0 text-mist-300 leading-relaxed text-[15px]">
                  {m.bio}
                </p>
              </article>
            ))}
          </RevealOnScroll>

          <span aria-hidden="true" className="block tick-rule mt-2" />
        </div>
      </section>

      <CtaMarquee />
    </>
  );
}
