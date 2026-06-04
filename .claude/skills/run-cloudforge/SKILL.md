---
name: run-cloudforge
description: Use to run, build, screenshot, smoke-test, or visually verify the CloudForge Next.js site. Triggers — "run cloudforge", "start the site", "screenshot the home page", "screenshot /about", "verify the page renders", "build cloudforge", "is the site broken".
---

# Run CloudForge

CloudForge is a Next.js 16 (Turbopack) + React 19 + Tailwind v4 marketing
site for the agency. Animations are GSAP + ScrollTrigger; fonts are
Bricolage Grotesque + Fraunces from `next/font/google`.

All paths in this file are relative to the repo root
(`/Users/pasanratnayake/Desktop/Dev/cloudforge`).

The agent path is a Node screenshot driver
(`.claude/skills/run-cloudforge/driver.mjs`) that wraps headless Chrome
with the right flags to bypass GSAP and capture every section at its
final state. See **Run (agent path)** below.

## Prerequisites

- **Node 22+** (`node --version`)
- **Google Chrome** (or Chromium). The driver auto-detects:
  - macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
  - Linux: `/usr/bin/google-chrome[-stable]`, `/usr/bin/chromium[-browser]`
  - Override: `CHROME=/path/to/chrome`

No `apt-get` step verified — this skill was authored on macOS with
Chrome already installed. On a fresh Linux container, install with:

```bash
apt-get update && apt-get install -y chromium fonts-liberation
```

(Untested in this session — add an `apt-get` line you actually ran.)

## Install + sanity checks

```bash
npm install
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
```

All three completed cleanly this session.

## Run (agent path)

The driver assumes the dev server is already running. In one shell:

```bash
npm run dev   # Next 16 + Turbopack, defaults to :3000
```

In another shell, capture screenshots:

```bash
node .claude/skills/run-cloudforge/driver.mjs
# → ./screenshots/home.png

node .claude/skills/run-cloudforge/driver.mjs / /about /services /work /contact
# → ./screenshots/{home,about,services,work,contact}.png
```

Knobs (all env vars):

| var      | default                   | what it controls |
|----------|---------------------------|------------------|
| `URL`    | `http://localhost:3000`   | base URL the routes resolve against |
| `OUT`    | `./screenshots`           | output directory |
| `W`      | `1440`                    | viewport width  |
| `H`      | `5400`                    | viewport height (tall for full-page) |
| `WAIT`   | `3000`                    | `--virtual-time-budget` ms |
| `CHROME` | (auto-detect)             | full path to chrome binary |

Example — screenshot work and contact at a wider viewport into `/tmp`:

```bash
W=1920 H=6500 OUT=/tmp/cf-shots node .claude/skills/run-cloudforge/driver.mjs /work /contact
```

The driver exits non-zero if any route fails or if the base URL is
unreachable, so it can be piped into CI-style checks.

### Smoke check without screenshots

```bash
for r in / /about /services /work /contact; do
  curl -sS -o /dev/null -w "%{http_code} $r\n" "http://localhost:3000$r"
done
```

All five returned `200` this session.

## Run (human path)

```bash
npm run dev
# → open http://localhost:3000 in any browser
```

Browse routes manually. Animations and ScrollTrigger reveals work as
designed — they're only suppressed by the driver, which forces
`prefers-reduced-motion`.

## Build

```bash
npm run build   # production bundle
npm run start   # serve the built bundle on :3000
```

(Build wasn't exercised this session — the dev server was used for
verification. Add a verified `time` for build duration when you run it.)

## How the screenshot harness works

The app's GSAP wrappers (`RevealOnScroll`, `Counter`, the custom
ScrollTrigger in `ProcessSection`) all check
`lib/gsap.ts → prefersReducedMotion()` and set elements to their
final state instead of animating. Chrome's
`--force-prefers-reduced-motion` flag triggers that code path, so
the driver gets a deterministic snapshot of every section at its
finished state without doing any programmatic scroll.

Without that flag, a headless capture would show:
- Hero chars at `translateY(110%)` (mid char-reveal)
- Counter caught mid-tween (e.g. `$30M` instead of `$142M`)
- Anything in `RevealOnScroll` below the fold at `opacity: 0`

## Gotchas

- **Dev server port conflict.** `npm run dev` defaults to `:3000` but
  silently falls forward to `:3001` if `:3000` is taken, then refuses
  to start a second instance in the same repo. If `curl :3000` returns
  but you can't reach a *new* server you tried to spawn, check whether
  an old one is still running: `lsof -ti tcp:3000`.
- **Counter values look wrong on raw headless captures.** The Counter
  component animates from `0`. Without the reduced-motion flag the
  driver passes, captures freeze at whatever fraction reached the
  GSAP `ScrollTrigger.start`. Always use the driver, not raw
  `--screenshot=`, when you want correct numbers.
- **Chrome stderr is noisy.** Headless Chrome on macOS logs
  `task_policy_set` / `CVDisplayLinkCreateWithCGDisplay` /
  `gcm/engine/registration_request` errors that look alarming but
  don't affect the capture. The driver swallows stderr unless the
  PNG fails to materialize.
- **ESLint config lives at `eslint.config.mjs` (flat config).** Don't
  expect a `.eslintrc.json`; `npm run lint` just runs `eslint` with
  no args.
- **Next.js 16 has breaking changes** (per `AGENTS.md` at the repo
  root). If you're modifying anything that touches the Next.js public
  API (routing, metadata, fonts), read the relevant guide in
  `node_modules/next/dist/docs/` before guessing.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `[driver] Cannot reach http://localhost:3000` | Start the dev server: `npm run dev`. The driver only screenshots; it doesn't boot. |
| `[driver] No Chrome/Chromium binary found` | Install Chrome/Chromium, or set `CHROME=/abs/path/to/chrome`. The candidate list is printed. |
| Screenshot is mostly blank / hero text invisible | You ran headless Chrome directly without `--force-prefers-reduced-motion`. Use the driver. |
| Counter shows `$0M` or a partial number | Same root cause as above — use the driver. |
| `tsc` complains about a CSS utility class | New utilities in `globals.css` (`numeral-outline`, `numeral-outline-warm`) aren't typed — Tailwind v4 treats them as plain CSS. If a class isn't applying, search `globals.css` for it as `@utility <name>`. |
