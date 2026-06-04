"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
} from "@/lib/gsap";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
  selector?: string;
  once?: boolean;
}

/**
 * Fades and lifts children into view as they enter the viewport.
 * If `selector` is provided, each matching child is staggered.
 */
export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  y = 28,
  stagger = 0.08,
  selector,
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (prefersReducedMotion()) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        if (selector) gsap.set(ref.current.querySelectorAll(selector), { opacity: 1, y: 0 });
        return;
      }
      const targets: gsap.TweenTarget = selector
        ? ref.current.querySelectorAll(selector)
        : ref.current;

      gsap.fromTo(
        targets,
        { opacity: 0, y, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "expo.out",
          delay,
          stagger: selector ? stagger : 0,
          force3D: true,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: once ? "play none none none" : "play none none reverse",
            // Cap how often this runs when the viewport flicks past start/end.
            fastScrollEnd: true,
          },
          onComplete: () => {
            // Free composited layers once we're settled.
            const toClear = selector
              ? ref.current?.querySelectorAll<HTMLElement>(selector)
              : ref.current
              ? [ref.current]
              : [];
            toClear?.forEach((el) => {
              el.style.willChange = "auto";
            });
          },
        }
      );

      return () => {
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === ref.current)
          .forEach((st) => st.kill());
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
