import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import WorkGrid from "@/components/sections/WorkGrid";
import CtaMarquee from "@/components/sections/CtaMarquee";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects across engineering, growth, brand, and strategy.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work / Selected case studies"
        section="24 engagements · 2019 — present"
        title="The receipts."
        accentWord="receipts"
        description={
          <>
            A representative sample of recent engagements. Every project below
            shipped on time and against a number we agreed to before we started.
          </>
        }
      />
      <WorkGrid />
      <CtaMarquee />
    </>
  );
}
