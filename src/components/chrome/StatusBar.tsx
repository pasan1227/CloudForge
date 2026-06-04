/**
 * Operator-grade status strip — sits above the rounded nav.
 *
 * Pure presentational; values come from a single config block so they
 * are easy to swap without touching layout.
 */
const status = {
  availability: "Open for Q3 — 2 of 4 slots filled",
  region: "BKN · LIS · SGP",
  lastDeploy: "v6.2.1 · 4h ago",
  clock: "UTC−05",
};

export default function StatusBar() {
  return (
    <div
      className="hidden lg:flex items-center gap-6 px-5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mist-400 border-b border-hairline"
      aria-label="Site status"
    >
      <span className="inline-flex items-center gap-2">
        <span aria-hidden="true" className="live-dot" />
        <span className="text-mist-100">{status.availability}</span>
      </span>
      <span aria-hidden="true" className="h-3 w-px bg-hairline-strong" />
      <span>{status.region}</span>
      <span aria-hidden="true" className="h-3 w-px bg-hairline-strong" />
      <span>
        Deploy <span className="text-mist-200">{status.lastDeploy}</span>
      </span>
      <span className="ml-auto inline-flex items-center gap-2">
        <span className="text-mist-500">UTC offset</span>
        <span className="text-mist-100">{status.clock}</span>
      </span>
    </div>
  );
}
