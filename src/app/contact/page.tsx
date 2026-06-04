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
        eyebrow="Contact"
        title="Tell us the brief."
        description={
          <>
            We take on a small number of engagements each quarter. Send us a few
            sentences about what you&apos;re building — or send the deck, the
            pitch, the back-of-the-napkin idea. We read everything.
          </>
        }
      />

      <section className="relative">
        <div className="mx-auto w-full max-w-7xl px-6 grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <ContactForm />

          <aside className="space-y-6">
            <div className="rounded-3xl glass p-7">
              <h3 className="text-xs uppercase tracking-[0.22em] text-mist-400">
                Reach us directly
              </h3>
              <a
                href={`mailto:${company.email}`}
                className="mt-3 block font-display text-2xl tracking-tight text-gradient hover:brightness-110 transition"
              >
                {company.email}
              </a>
              <p className="mt-1 text-sm text-mist-300">{company.phone}</p>
              <div className="hairline my-6" />
              <h3 className="text-xs uppercase tracking-[0.22em] text-mist-400">
                Where we work
              </h3>
              <ul className="mt-3 space-y-3 text-sm text-mist-100">
                {company.location.split(" · ").map((l) => (
                  <li key={l} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-block size-1.5 rounded-full bg-teal-300 shadow-[0_0_10px_var(--teal-300)]"
                    />
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl glass p-7">
              <h3 className="text-xs uppercase tracking-[0.22em] text-mist-400">
                Before you write
              </h3>
              <ul className="mt-3 space-y-3 text-sm text-mist-200">
                <li className="flex gap-3">
                  <span
                    className="font-display text-mist-400 text-xs w-5 shrink-0 pt-0.5"
                    aria-hidden="true"
                  >
                    01
                  </span>
                  <span>
                    A working deadline is more useful than a polished brief.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="font-display text-mist-400 text-xs w-5 shrink-0 pt-0.5"
                    aria-hidden="true"
                  >
                    02
                  </span>
                  <span>
                    If you have a number you&apos;re trying to move, tell us
                    what it is and what it&apos;s at today.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="font-display text-mist-400 text-xs w-5 shrink-0 pt-0.5"
                    aria-hidden="true"
                  >
                    03
                  </span>
                  <span>
                    No deck? No problem. Three bullet points are a fine place to
                    start.
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <div className="h-32" />
    </>
  );
}
