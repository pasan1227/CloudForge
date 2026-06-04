import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  as?: "div" | "article" | "section";
}

export default function GlassCard({
  children,
  className = "",
  strong = false,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={[
        "relative rounded-3xl p-7 sm:p-8",
        strong ? "glass-strong" : "glass",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
