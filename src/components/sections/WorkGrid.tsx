"use client";

import { useMemo, useState } from "react";
import { projects, projectCategoryLabels } from "@/data/site";
import type { Project } from "@/lib/types";

type Filter = Project["category"] | "all";

const filterKeys: readonly Filter[] = [
  "all",
  "engineering",
  "growth",
  "brand",
  "strategy",
] as const;

function countFor(filter: Filter): number {
  if (filter === "all") return projects.length;
  return projects.filter((p) => p.category === filter).length;
}

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section className="paint-skip relative" style={{ containIntrinsicSize: "1px 1400px" }}>
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* Filter bar */}
        <div
          role="tablist"
          aria-label="Filter projects by discipline"
          className="glass rounded-full p-1.5 inline-flex flex-wrap gap-1 max-w-full overflow-x-auto"
        >
          {filterKeys.map((key) => {
            const active = key === filter;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(key)}
                className={[
                  "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                  active
                    ? "bg-mist-50 text-ink-950"
                    : "text-mist-200 hover:text-mist-50",
                ].join(" ")}
              >
                <span>{projectCategoryLabels[key]}</span>
                <span
                  className={[
                    "text-xs tabular-nums rounded-full px-1.5 py-0.5",
                    active
                      ? "bg-ink-900/15 text-ink-900"
                      : "bg-surface-2 text-mist-300",
                  ].join(" ")}
                >
                  {countFor(key)}
                </span>
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <div
            className="mt-16 rounded-3xl glass p-12 text-center"
            role="status"
            aria-live="polite"
          >
            <p className="font-display text-3xl tracking-tight">
              Nothing to show — <em className="font-serif text-mist-200">yet.</em>
            </p>
            <p className="mt-3 text-mist-300 max-w-md mx-auto">
              We just don&apos;t have a public case study in this discipline.
              Drop us a line if you&apos;d like to talk privately about prior
              work.
            </p>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-mist-50 text-ink-950 px-4 py-2 text-sm font-medium"
            >
              See all work
            </button>
          </div>
        ) : (
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {visible.map((p) => (
              <li
                key={p.slug}
                className="group relative overflow-hidden rounded-3xl glass p-7 flex flex-col gap-6 min-h-[20rem] transition-transform duration-500 hover:-translate-y-1 hover:[box-shadow:var(--shadow-pop)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 size-72 rounded-full blur-3xl opacity-25 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(closest-side, var(--teal-400), transparent 70%)",
                  }}
                />
                <div className="relative flex items-center justify-between text-xs uppercase tracking-[0.2em] text-mist-400">
                  <span>{projectCategoryLabels[p.category]}</span>
                  <span>{p.year}</span>
                </div>
                <div className="relative">
                  <div className="text-sm text-mist-300">{p.client}</div>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl tracking-tight text-balance">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-mist-300 max-w-md leading-relaxed">
                    {p.blurb}
                  </p>
                </div>

                <div className="relative mt-auto flex flex-wrap items-end justify-between gap-4">
                  <div className="flex gap-5">
                    {p.metric.map((m) => (
                      <div key={m.label}>
                        <div className="font-display text-2xl tracking-tight text-gradient">
                          {m.value}
                        </div>
                        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-mist-400 mt-1">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-serif italic text-mist-200 text-sm max-w-[14rem] text-right">
                    {p.result}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
