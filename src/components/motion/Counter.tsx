"use client";

import { useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
} from "@/lib/gsap";

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
}

function defaultFormat(n: number, target: number): string {
  if (Number.isInteger(target)) return Math.round(n).toLocaleString();
  return n.toFixed(1);
}

export default function Counter({
  to,
  prefix,
  suffix,
  duration = 1.6,
  className = "",
  format,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (prefersReducedMotion()) {
        ref.current.textContent = format ? format(to) : defaultFormat(to, to);
        return;
      }
      const obj = { val: 0 };
      const node = ref.current;
      gsap.to(obj, {
        val: to,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          node.textContent = format ? format(obj.val) : defaultFormat(obj.val, to);
        },
        scrollTrigger: {
          trigger: node,
          start: "top 85%",
          once: true,
        },
      });

      return () => {
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === node)
          .forEach((st) => st.kill());
      };
    },
    { dependencies: [to] }
  );

  return (
    <span className={className}>
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
