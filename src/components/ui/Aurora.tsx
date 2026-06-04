"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface AuroraProps {
  className?: string;
  intensity?: "soft" | "normal" | "loud";
}

/**
 * Drifting aurora orbs behind content. Pure background art —
 * gently animated, killed under reduced motion.
 */
export default function Aurora({
  className = "",
  intensity = "normal",
}: AuroraProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (prefersReducedMotion()) return;

      const orbs = ref.current.querySelectorAll<HTMLDivElement>(".aurora__orb");
      orbs.forEach((orb, i) => {
        // Slow, large-amplitude drift. Long durations mean fewer keyframe
        // recalculations per second, and translate3d is GPU-composited.
        gsap.to(orb, {
          x: `random(-60, 60)`,
          y: `random(-40, 40)`,
          duration: 28 + i * 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.8,
          force3D: true,
        });
      });
    },
    { scope: ref }
  );

  const opacityClass =
    intensity === "loud"
      ? "opacity-100"
      : intensity === "soft"
      ? "opacity-60"
      : "opacity-80";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`aurora ${opacityClass} ${className}`}
    >
      <div className="aurora__orb aurora__orb--teal top-[-8rem] left-[-6rem]" />
      <div className="aurora__orb aurora__orb--cyan top-[6rem] right-[-10rem]" />
      <div className="aurora__orb aurora__orb--coral bottom-[-10rem] left-[20%]" />
    </div>
  );
}
