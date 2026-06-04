import type { ReactNode } from "react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <RevealOnScroll
      className={`flex flex-col gap-5 max-w-3xl ${alignClass} ${className}`}
    >
      <span className="inline-flex items-center gap-2 self-start rounded-full glass px-3 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-mist-200">
        <span
          aria-hidden="true"
          className="inline-block size-1.5 rounded-full bg-teal-300 shadow-[0_0_12px_var(--teal-300)]"
        />
        {eyebrow}
      </span>
      <h2 className="font-display text-balance text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-lg text-mist-300 leading-relaxed">
          {description}
        </p>
      ) : null}
    </RevealOnScroll>
  );
}
