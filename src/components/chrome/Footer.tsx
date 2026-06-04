import Link from "next/link";
import { company, nav, services } from "@/data/site";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="paint-skip relative z-10 mt-32"
      style={{ containIntrinsicSize: "1px 800px" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <span aria-hidden="true" className="block tick-rule" />
      </div>

      {/* Editorial colophon — running head + four columns. */}
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 pt-16 pb-10 grid gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="ops-label">Studio</div>
          <p className="font-display text-3xl tracking-[-0.015em] leading-tight text-mist-100 max-w-sm">
            {company.blurb}
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-mist-400">
            {company.location}
          </p>
        </div>

        <FooterColumn title="Sections">
          {nav.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group inline-flex items-center gap-2 text-mist-200 hover:text-amber-300 transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-mist-500 group-hover:text-amber-300 transition-colors"
                >
                  →
                </span>
                {l.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Services">
          {services.map((s) => (
            <li key={s.id}>
              <Link
                href="/services"
                className="text-mist-200 hover:text-amber-300 transition-colors"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact">
          <li>
            <a
              href={`mailto:${company.email}`}
              className="font-serif italic text-mist-100 hover:text-amber-300 transition-colors text-base"
            >
              {company.email}
            </a>
          </li>
          <li className="text-mist-300">{company.phone}</li>
          <li className="pt-4">
            <ul className="flex flex-wrap gap-2">
              {company.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full ring-hairline-strong px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-200 hover:text-amber-300 transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </FooterColumn>
      </div>

      {/* Giant wordmark — pure brand moment, Fraunces italic for drama. */}
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 pb-6 mt-10 relative">
        <span aria-hidden="true" className="block h-px bg-hairline-strong" />
        <span className="block font-serif italic text-[clamp(4rem,22vw,18rem)] leading-[0.82] tracking-[-0.04em] text-gradient-warm mt-4">
          CloudForge
        </span>
      </div>

      {/* System status strip — real-looking operator footer. */}
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <span aria-hidden="true" className="block h-px bg-hairline" />
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-5 ops-label">
          <span className="inline-flex items-center gap-2 text-mist-100">
            <span aria-hidden="true" className="live-dot" />
            All systems nominal
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-hairline-strong" />
          <span>
            Last deploy <span className="text-mist-100">v6.2.1 · 2026-06-04</span>
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-hairline-strong" />
          <span>
            Uptime <span className="text-mist-100">99.98%</span> · 90d
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-hairline-strong" />
          <span>
            Mailbox <span className="text-mist-100">&lt; 4h reply</span>
          </span>
          <span className="ml-auto normal-case tracking-normal font-serif italic text-mist-300 text-sm">
            Typeset in Instrument Serif &amp; IBM Plex.
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 pb-10 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ops-label">
        <p>© {currentYear} CloudForge Ltd. — All rights reserved.</p>
        <p>Brooklyn · Lisbon · Singapore</p>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className="lg:col-span-2 lg:col-end-auto">
      <h4 className="ops-label">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}
