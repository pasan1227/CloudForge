import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="CloudForge home"
      className={`group inline-flex items-baseline gap-2.5 ${className}`}
    >
      {/* Editorial-pressed mark: a single rule + amber dot.
       * The whole mark slides one notch on hover. */}
      <span
        aria-hidden="true"
        className="relative inline-flex items-center gap-1.5"
      >
        <span className="h-[1.6em] w-px bg-mist-300 group-hover:bg-amber-400 transition-colors" />
        <span className="size-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_var(--amber-400)] transition-transform duration-500 group-hover:translate-x-0.5" />
      </span>
      <span className="font-display text-[1.25rem] tracking-[-0.01em] text-mist-50 leading-none">
        CloudForge
      </span>
      <span
        aria-hidden="true"
        className="hidden sm:inline font-mono text-[0.6rem] uppercase tracking-[0.28em] text-mist-500 self-center pl-2"
      >
        — Est. 2019
      </span>
    </Link>
  );
}
