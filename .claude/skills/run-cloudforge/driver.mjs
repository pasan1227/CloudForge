#!/usr/bin/env node
/* CloudForge run/screenshot driver.
 *
 * Wraps headless Chrome with the flags needed to get a clean,
 * deterministic capture of any route:
 *  - --force-prefers-reduced-motion bypasses GSAP ScrollTrigger reveals
 *    (the app's motion code checks prefers-reduced-motion and skips
 *    animations, so every section renders at its final state without
 *    needing programmatic scroll).
 *  - --hide-scrollbars + a tall window gives a faux full-page shot.
 *  - --virtual-time-budget lets fonts and counters settle before capture.
 *
 * Usage:
 *   node driver.mjs                          # captures /
 *   node driver.mjs / /about /services
 *   OUT=/tmp/shots node driver.mjs /work
 *   URL=http://localhost:3001 node driver.mjs /
 *   H=8000 node driver.mjs /                 # taller capture
 *   CHROME=/path/to/chrome node driver.mjs /
 *
 * Exits 1 on any failed capture or unreachable base URL.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["/"];
const baseUrl = process.env.URL ?? "http://localhost:3000";
const outDir = process.env.OUT ?? "screenshots";
const width = process.env.W ?? "1440";
const height = process.env.H ?? "5400";
const wait = process.env.WAIT ?? "3000";

const chromeCandidates = [
  process.env.CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const chrome = chromeCandidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("[driver] No Chrome/Chromium binary found.");
  console.error("[driver] Tried:");
  for (const c of chromeCandidates) console.error("  - " + c);
  console.error("[driver] Set CHROME=/path/to/chrome or install Chrome/Chromium.");
  process.exit(1);
}

try {
  const res = await fetch(baseUrl, { method: "HEAD" });
  if (!res.ok) throw new Error(`HEAD ${baseUrl} → ${res.status}`);
} catch (err) {
  console.error(`[driver] Cannot reach ${baseUrl}: ${err.message}`);
  console.error("[driver] Start the dev server first: `npm run dev`");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

function slug(route) {
  const r = route.replace(/^\/+|\/+$/g, "") || "home";
  return r.replaceAll("/", "_");
}

function shoot(route) {
  return new Promise((res, rej) => {
    const file = resolve(outDir, `${slug(route)}.png`);
    const url = new URL(route, baseUrl).href;
    const args = [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-prefers-reduced-motion",
      `--window-size=${width},${height}`,
      `--virtual-time-budget=${wait}`,
      `--screenshot=${file}`,
      url,
    ];
    const proc = spawn(chrome, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    proc.stderr.on("data", (chunk) => (stderr += chunk));
    proc.on("error", rej);
    proc.on("close", (code) => {
      if (!existsSync(file)) {
        rej(new Error(`exit ${code}: ${stderr.split("\n").slice(-3).join(" | ")}`));
        return;
      }
      res({ route, file });
    });
  });
}

let failed = 0;
for (const route of routes) {
  process.stdout.write(`→ ${route} `);
  try {
    const { file } = await shoot(route);
    console.log(`ok → ${file}`);
  } catch (err) {
    console.log(`FAIL — ${err.message}`);
    failed += 1;
  }
}
process.exit(failed === 0 ? 0 : 1);
