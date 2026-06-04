import { stats } from "@/data/site";
import Counter from "@/components/motion/Counter";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function StatsStrip() {
  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-7xl px-6">
        <RevealOnScroll
          selector=".stat-card"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-card glass rounded-3xl p-6 sm:p-7"
            >
              <Counter
                to={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="font-display text-5xl sm:text-6xl tracking-tight text-gradient"
              />
              <div className="mt-3 text-sm text-mist-200">{s.label}</div>
              {s.hint ? (
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-mist-400">
                  {s.hint}
                </div>
              ) : null}
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
