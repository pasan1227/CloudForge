"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface CharRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
}

/**
 * Split text into words first so the browser can wrap on real
 * whitespace. Each word is its own `overflow: hidden` mask box;
 * the chars inside the mask slide up from below.
 */
function splitWords(text: string): string[] {
  return text.split(/(\s+)/).filter((seg) => seg.length > 0);
}

export default function CharReveal({
  text,
  className = "",
  as: Tag = "h1",
  delay = 0,
  stagger = 0.022,
}: CharRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const segments = splitWords(text);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (prefersReducedMotion()) {
        gsap.set(ref.current.querySelectorAll(".char"), {
          yPercent: 0,
          opacity: 1,
        });
        return;
      }
      const chars = ref.current.querySelectorAll<HTMLSpanElement>(".char");
      // Reset `y` explicitly — GSAP otherwise reads the CSS fallback
      // `translateY(110%)` as an absolute pixel offset and never clears it,
      // leaving chars stuck at their hidden position after the tween.
      gsap.set(chars, { yPercent: 110, y: 0, opacity: 0 });
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger,
        delay,
        ease: "expo.out",
        force3D: true,
        onComplete: () => {
          chars.forEach((c) => {
            c.style.willChange = "auto";
          });
        },
      });
    },
    { scope: ref, dependencies: [text, delay, stagger] }
  );

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`char-reveal ${className}`}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {segments.map((seg, i) => {
          // Whitespace segments stay as real text nodes so the browser
          // can break lines at them.
          if (/^\s+$/.test(seg)) {
            return <span key={i}>{seg}</span>;
          }
          return (
            <span key={i} className="char-reveal__word">
              {Array.from(seg).map((c, j) => (
                <span key={j} className="char">
                  {c}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
