"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/data/site";
import Logo from "./Logo";
import StatusBar from "./StatusBar";

const SCROLL_THRESHOLD = 12;

function subscribeScroll(cb: () => void): () => void {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}
function getScrolledSnapshot(): boolean {
  return window.scrollY > SCROLL_THRESHOLD;
}
function getScrolledServerSnapshot(): boolean {
  return false;
}

export default function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrolledSnapshot,
    getScrolledServerSnapshot
  );
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "pt-0" : "pt-0",
      ].join(" ")}
    >
      {/* Operator status strip — only visible when not scrolled, fades out as
       * the user starts moving through the page. */}
      <div
        className={[
          "mx-auto w-full max-w-7xl px-4 sm:px-6 transition-all duration-500",
          scrolled
            ? "opacity-0 -translate-y-2 pointer-events-none h-0 overflow-hidden"
            : "opacity-100 translate-y-0",
        ].join(" ")}
      >
        <StatusBar />
      </div>

      <div
        className={[
          "mx-auto w-full max-w-7xl px-4 sm:px-6 transition-all duration-500",
          scrolled ? "pt-3" : "pt-3",
        ].join(" ")}
      >
        <nav
          className={[
            "flex items-center justify-between gap-6 pl-5 pr-2 py-2.5 transition-all duration-500",
            scrolled
              ? "paper-strong rounded-full"
              : "border border-transparent bg-transparent",
          ].join(" ")}
          aria-label="Primary"
        >
          <Logo />

          <ul className="hidden md:flex items-center gap-1 text-sm">
            {nav.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative inline-flex items-center px-4 py-2 rounded-full transition-colors",
                      active
                        ? "text-mist-50"
                        : "text-mist-300 hover:text-mist-50",
                    ].join(" ")}
                  >
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-amber-400"
                      />
                    ) : null}
                    <span className="relative ops-label text-current">
                      {l.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full paper-bone px-4 py-2 text-sm font-medium hover:brightness-95 transition"
            >
              Start a build
              <span aria-hidden="true" className="font-mono">↗</span>
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden paper relative h-10 w-10 rounded-full grid place-items-center"
            >
              <span
                aria-hidden="true"
                className={[
                  "block h-px w-4 bg-mist-100 transition-all duration-300",
                  open ? "translate-y-[3px] rotate-45" : "-translate-y-[3px]",
                ].join(" ")}
              />
              <span
                aria-hidden="true"
                className={[
                  "absolute h-px w-4 bg-mist-100 transition-all duration-300",
                  open ? "-translate-y-0 -rotate-45" : "translate-y-[3px]",
                ].join(" ")}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          "md:hidden fixed inset-x-0 top-20 mx-4 origin-top transition-all duration-400",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
        ].join(" ")}
      >
        <div className="paper-strong rounded-3xl p-3">
          <ul className="flex flex-col">
            {nav.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={[
                      "flex items-center justify-between rounded-2xl px-4 py-4 text-base",
                      active
                        ? "bg-surface-2 text-mist-50"
                        : "text-mist-200 hover:bg-surface-1",
                    ].join(" ")}
                  >
                    <span className="font-display text-xl">{l.label}</span>
                    <span aria-hidden="true" className="text-mist-400 font-mono">→</span>
                  </Link>
                </li>
              );
            })}
            <li className="mt-2">
              <Link
                href="/contact"
                className="flex items-center justify-center rounded-2xl paper-bone px-4 py-4 font-medium"
              >
                Start a build
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
