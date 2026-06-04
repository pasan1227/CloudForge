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

const accentGrad: Record<TeamMember["accent"], string> = {
  teal: "from-teal-300 to-cyan-400",
  cyan: "from-cyan-300 to-teal-400",
  coral: "from-coral-300 to-coral-500",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A studio for the long arc."
        description={
          <>
            We started CloudForge because most agencies stop one step short of
            where the interesting work begins. We wanted a place where{" "}
            <em className="font-serif text-mist-100">making</em> and{" "}
            <em className="font-serif text-mist-100">growing</em> sit at the
            same table — and stay there long after launch.
          </>
        }
      />

      {/* Story */}
      <section className="relative py-20">
        <div className="mx-auto w-full max-w-7xl px-6 grid lg:grid-cols-12 gap-10">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Story"
            title={
              <>
                Founded 2019,
                <br />
                <span className="font-serif italic text-gradient">
                  built on patience.
                </span>
              </>
            }
          />
          <RevealOnScroll className="lg:col-span-7 space-y-6 text-mist-200 text-lg leading-relaxed">
            <p>
              CloudForge began as a Slack channel between three friends — an
              engineer, a designer, and a marketer — who kept getting hired to
              fix what the last agency had broken.
            </p>
            <p>
              Six years and 80-odd launches later, we&apos;re a 30-person studio
              with offices in {company.location.replaceAll(" · ", ", ")}. We
              still work the way we did at the start: small senior teams, short
              loops, weekly demos, no waterfalls.
            </p>
            <p>
              Most of our work comes from the people we&apos;ve shipped with
              before. We like it that way.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Stats */}
      <StatsStrip />

      {/* Values */}
      <section
        className="paint-skip relative py-28"
        style={{ containIntrinsicSize: "1px 900px" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6">
          <SectionHeading
            eyebrow="Operating principles"
            title={
              <>
                The four things we
                <br />
                <span className="font-serif italic text-gradient-warm">
                  refuse to compromise on.
                </span>
              </>
            }
          />
          <RevealOnScroll
            selector=".value-card"
            className="mt-14 grid gap-5 md:grid-cols-2"
          >
            {values.map((v, i) => (
              <article
                key={v.title}
                className="value-card relative rounded-3xl glass p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-7 top-7 font-display text-sm uppercase tracking-[0.22em] text-mist-400"
                >
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl tracking-tight">
                  {v.title}
                </h3>
                <p className="mt-3 text-mist-300 leading-relaxed">{v.blurb}</p>
              </article>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* Team */}
      <section
        className="paint-skip relative py-20"
        style={{ containIntrinsicSize: "1px 1200px" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6">
          <SectionHeading
            eyebrow="People"
            title={
              <>
                Senior on the floor.
                <br />
                <span className="font-serif italic text-gradient">
                  Always.
                </span>
              </>
            }
            description="The partners you meet in the pitch are the partners you work with on the project. We don't do bait-and-switch staffing."
          />
          <RevealOnScroll
            selector=".team-card"
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {team.map((m) => (
              <article
                key={m.name}
                className="team-card group relative overflow-hidden rounded-3xl glass p-7"
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className={`grid place-items-center size-14 rounded-2xl bg-gradient-to-br ${accentGrad[m.accent]} text-ink-950 font-display text-lg tracking-tight`}
                  >
                    {m.initials}
                  </span>
                  <div>
                    <h3 className="font-display text-xl tracking-tight">
                      {m.name}
                    </h3>
                    <div className="text-sm text-mist-300">{m.role}</div>
                  </div>
                </div>
                <p className="mt-5 text-sm text-mist-300 leading-relaxed">
                  {m.bio}
                </p>
              </article>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      <CtaMarquee />
    </>
  );
}
