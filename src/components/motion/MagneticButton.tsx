"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "warm" | "bone";
  strength?: number;
}

export default function MagneticButton({
  href,
  children,
  className = "",
  variant = "primary",
  strength = 0.32,
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLAnchorElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!wrapRef.current || !innerRef.current) return;
      if (prefersReducedMotion()) return;

      const wrap = wrapRef.current;
      const inner = innerRef.current;

      const onMove = (e: globalThis.MouseEvent): void => {
        const rect = wrap.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        gsap.to(wrap, {
          x: relX * strength,
          y: relY * strength,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(inner, {
          x: relX * strength * 0.4,
          y: relY * strength * 0.4,
          duration: 0.5,
          ease: "power3.out",
        });
      };

      const onLeave = (): void => {
        gsap.to([wrap, inner], {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        });
      };

      wrap.addEventListener("mousemove", onMove);
      wrap.addEventListener("mouseleave", onLeave);
      return () => {
        wrap.removeEventListener("mousemove", onMove);
        wrap.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: wrapRef, dependencies: [strength] }
  );

  const base =
    "relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors will-change-transform";

  const variants: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
    primary:
      "paper-bone hover:brightness-95 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.55)] border-0",
    bone:
      "paper-bone hover:brightness-95 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.55)] border-0",
    warm:
      "bg-gradient-to-br from-amber-400 to-amber-600 text-ink-900 hover:brightness-105 shadow-[0_18px_40px_-12px_color-mix(in_srgb,var(--amber-500)_45%,transparent)]",
    ghost:
      "ring-hairline-strong text-mist-100 hover:text-mist-50 hover:[box-shadow:var(--shadow-pop)]",
  };

  return (
    <Link
      ref={wrapRef}
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span ref={innerRef} className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}
