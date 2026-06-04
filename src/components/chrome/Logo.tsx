import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="CloudForge home"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span
        aria-hidden="true"
        className="relative grid h-7 w-7 place-items-center"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-7 w-7 transition-transform duration-500 group-hover:rotate-180"
        >
          <defs>
            <linearGradient id="ino-g" x1="0" y1="0" x2="32" y2="32">
              <stop offset="0" stopColor="var(--teal-300)" />
              <stop offset="1" stopColor="var(--cyan-400)" />
            </linearGradient>
          </defs>
          <path
            d="M8 8c4-4 12-4 16 0s4 12 0 16-12 4-16 0M8 24c-4-4-4-12 0-16"
            stroke="url(#ino-g)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <circle cx="22" cy="10" r="1.6" fill="var(--coral-400)" />
        </svg>
      </span>
      <span className="font-display text-[1.05rem] font-semibold tracking-tight">
        CloudForge
      </span>
    </Link>
  );
}
