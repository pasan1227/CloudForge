import type { ReactNode } from "react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

interface SectionHeadingProps {
  eyebrow: string;
  index?: string; // e.g. "02 / Disciplines"
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass =
    align === "center"
      ? "text-center mx-auto items-center"
      : "text-left items-start";

  return (
    <RevealOnScroll
      className={`flex flex-col gap-6 max-w-3xl ${alignClass} ${className}`}
    >
      <div
        className={`flex items-center gap-4 ops-label ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {index ? <span className="text-mist-200">{index}</span> : null}
        {index ? (
          <span aria-hidden="true" className="h-px w-8 bg-hairline-strong" />
        ) : null}
        <span className="text-mist-400">{eyebrow}</span>
      </div>
      <h2 className="font-display text-balance text-4xl sm:text-5xl lg:text-[4.25rem] tracking-[-0.02em] leading-[0.98]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-lg text-mist-200 leading-relaxed">
          {description}
        </p>
      ) : null}
    </RevealOnScroll>
  );
}
