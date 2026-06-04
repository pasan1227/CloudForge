import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import ServicesPreview from "@/components/sections/ServicesPreview";
import FeaturedWork from "@/components/sections/FeaturedWork";
import ProcessSection from "@/components/sections/ProcessSection";
import CtaMarquee from "@/components/sections/CtaMarquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ServicesPreview />
      <FeaturedWork />
      <ProcessSection />
      <CtaMarquee />
    </>
  );
}
