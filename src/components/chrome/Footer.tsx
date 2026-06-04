import Link from "next/link";
import { company, nav, services } from "@/data/site";
import Logo from "./Logo";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="paint-skip relative z-10 mt-32"
      style={{ containIntrinsicSize: "1px 700px" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="hairline" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-16 grid gap-12 lg:gap-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-sm text-sm text-mist-300">
            {company.blurb}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-mist-400">
            {company.location}
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-mist-400">
            Pages
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-mist-200 hover:text-mist-50 transition"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-mist-400">
            Services
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href="/services"
                  className="text-mist-200 hover:text-mist-50 transition"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-mist-400">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${company.email}`}
                className="text-mist-200 hover:text-mist-50 transition"
              >
                {company.email}
              </a>
            </li>
            <li className="text-mist-200">{company.phone}</li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            {company.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full glass px-3 py-1.5 text-xs text-mist-200 hover:text-mist-50 transition"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="leading-none">
          <span className="block font-display text-[clamp(4rem,18vw,16rem)] tracking-tighter text-gradient">
            CloudForge
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-mist-400">
        <p>© {currentYear} CloudForge Ltd. All rights reserved.</p>
        <p>
          Built with care — and an unreasonable amount of font kerning — in
          Brooklyn.
        </p>
      </div>
    </footer>
  );
}
