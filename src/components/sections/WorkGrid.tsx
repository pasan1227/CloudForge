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
    <section
      className="paint-skip relative pt-4 pb-24"
      style={{ containIntrinsicSize: "1px 1400px" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        {/* Filter — editorial label row, not a pill chooser. */}
        <div
          role="tablist"
          aria-label="Filter projects by discipline"
          className="flex flex-wrap items-end justify-between gap-y-6 gap-x-10 border-b border-hairline-strong pb-6"
        >
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.22em]">
            <span className="text-mist-500">Filter by —</span>
            {filterKeys.map((key) => {
              const active = key === filter;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(key)}
                  className={[
                    "relative inline-flex items-baseline gap-2 transition-colors",
                    active
                      ? "text-amber-300"
                      : "text-mist-300 hover:text-mist-50",
                  ].join(" ")}
                >
                  <span>{projectCategoryLabels[key]}</span>
                  <span className="text-mist-500 normal-case">
                    ({countFor(key)})
                  </span>
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[1.55rem] left-0 right-0 h-px bg-amber-400"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-mist-500">
            Showing {visible.length} of {projects.length}
          </span>
        </div>

        {visible.length === 0 ? (
          <div
            className="mt-16 paper-strong rounded-3xl p-12 text-center"
            role="status"
            aria-live="polite"
          >
            <p className="font-display text-4xl tracking-[-0.025em]">
              Nothing to show —{" "}
              <em className="font-serif italic text-amber-300">yet.</em>
            </p>
            <p className="mt-4 text-mist-300 max-w-md mx-auto">
              We just don&apos;t have a public case study in this discipline.
              Drop us a line if you&apos;d like to talk privately about prior
              work.
            </p>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="mt-7 inline-flex items-center gap-2 rounded-full paper-bone px-4 py-2 text-sm font-medium"
            >
              See all work
            </button>
          </div>
        ) : (
          <ul className="mt-12 grid gap-px bg-[color:var(--hairline)] rounded-3xl overflow-hidden ring-hairline-strong md:grid-cols-2">
            {visible.map((p, i) => (
              <li
                key={p.slug}
                className="group relative bg-ink-900 p-8 sm:p-10 flex flex-col gap-7 min-h-[22rem] transition-colors duration-500 hover:bg-ink-850"
              >
                {/* Amber underline on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-10 bottom-0 h-px origin-left scale-x-0 bg-amber-400 transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="relative flex items-center justify-between ops-label">
                  <span className="inline-flex items-center gap-3">
                    <span>
                      Case {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="h-px w-4 bg-hairline-strong" />
                    <span>{projectCategoryLabels[p.category]}</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="size-1 rounded-full bg-signal-400" />
                    <span className="text-signal-300">{p.year}</span>
                  </span>
                </div>
                <div className="relative">
                  <div className="ops-label text-mist-200">{p.client}</div>
                  <h3 className="mt-3 font-display text-2xl sm:text-3xl tracking-[-0.018em] leading-[1.05] text-balance">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm text-mist-300 max-w-md leading-relaxed">
                    {p.blurb}
                  </p>
                </div>

                <div className="relative mt-auto flex flex-wrap items-end justify-between gap-4">
                  <div className="flex gap-7">
                    {p.metric.map((m) => (
                      <div key={m.label}>
                        <div className="font-serif italic text-3xl tracking-[-0.02em] text-amber-300">
                          {m.value}
                        </div>
                        <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-400 mt-1.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-serif italic text-mist-200 text-sm max-w-[14rem] text-right leading-snug">
                    &ldquo;{p.result}&rdquo;
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
