import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about the work. We take on a small number of engagements each quarter — if your brief is sharp and your deadline is real, we'd love to talk.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact / Start a conversation"
        section="Replies within one working day"
        title="Tell us the brief."
        accentWord="brief"
        description={
          <>
            We take on a small number of engagements each quarter. Send us a few
            sentences about what you&apos;re building — or send the deck, the
            pitch, the back-of-the-napkin idea.{" "}
            <em className="font-serif italic text-mist-100">We read everything.</em>
          </>
        }
      />

      <section className="relative">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 grid lg:grid-cols-12 gap-x-10 gap-y-10">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="paper-strong rounded-3xl p-8">
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-mist-400">
                Reach us directly
              </h3>
              <a
                href={`mailto:${company.email}`}
                className="mt-4 block font-serif italic text-3xl sm:text-4xl tracking-[-0.018em] text-gradient-warm hover:brightness-110 transition"
              >
                {company.email}
              </a>
              <p className="mt-2 font-mono text-sm text-mist-300">
                {company.phone}
              </p>
              <span aria-hidden="true" className="block tick-rule my-7" />
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-mist-400">
                Where we work
              </h3>
              <ul className="mt-4 grid grid-cols-3 gap-3 text-mist-100">
                {company.location.split(" · ").map((l, i) => (
                  <li
                    key={l}
                    className="paper rounded-2xl px-3 py-3.5 text-center"
                  >
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist-400">
                      0{i + 1}
                    </span>
                    <span className="mt-1.5 block font-display text-lg tracking-tight">
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="paper rounded-3xl p-8">
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-mist-400">
                Before you write
              </h3>
              <ol className="mt-5 space-y-5">
                {[
                  "A working deadline is more useful than a polished brief.",
                  "If you have a number you're trying to move, tell us what it is and what it's at today.",
                  "No deck? No problem. Three bullet points are a fine place to start.",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex gap-5 border-b border-hairline last:border-b-0 pb-5 last:pb-0"
                  >
                    <span
                      aria-hidden="true"
                      className="font-serif italic text-amber-300 text-3xl tracking-tight leading-none shrink-0"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-mist-200 text-[15px] leading-relaxed">
                      {text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <div className="h-32" />
    </>
  );
}
