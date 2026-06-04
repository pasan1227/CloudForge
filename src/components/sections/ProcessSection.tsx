import { process } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function ProcessSection() {
  return (
    <section className="paint-skip relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A short loop.
              <br />
              <span className="font-serif italic text-gradient">
                Run on repeat.
              </span>
            </>
          }
          description="We've shipped enough launches to know what works. The process is light, the artifacts are few, and the work stays close to the people who'll have to live with it."
        />

        <RevealOnScroll
          selector=".process-step"
          className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {process.map((step, i) => (
            <div
              key={step.index}
              className="process-step relative rounded-3xl glass p-7 min-h-[15rem]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl tracking-tighter text-gradient">
                  {step.index}
                </span>
                <span
                  aria-hidden="true"
                  className="text-mist-500 text-xs uppercase tracking-[0.22em]"
                >
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-mist-300 leading-relaxed">
                {step.blurb}
              </p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
