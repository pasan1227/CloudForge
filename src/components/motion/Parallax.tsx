"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface ParallaxProps {
  depth?: number; // -1 = far behind, 1 = close. Drives y travel.
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Translates a layer at a rate proportional to its `depth`.
 * Tied to scroll via ScrollTrigger so it works inside sections too.
 */
export default function Parallax({
  depth = 0.3,
  className = "",
  style,
  children,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (prefersReducedMotion()) return;
      const yTo = -90 * depth;
      const tween = gsap.to(ref.current, {
        y: yTo,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: ref, dependencies: [depth] }
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
