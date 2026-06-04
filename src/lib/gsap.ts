"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

function register(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Force GPU compositing on all transform/opacity tweens. Big win
  // for parallax + reveal pipelines.
  gsap.config({ force3D: true, nullTargetWarn: false });
  // Don't reflow ScrollTrigger on every keyboard-induced viewport
  // resize on mobile (the address bar collapse). Massive scroll-jank fix.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

register();

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, useGSAP };
