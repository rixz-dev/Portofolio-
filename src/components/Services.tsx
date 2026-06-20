import { Reveal } from "./Reveal";
import { services } from "../lib/data";

export function Services() {
  return (
    <section
      id="service"
      className="relative border-t border-[var(--color-bone-2)]/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-[var(--color-bone-2)]/20 pb-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/55">
                SECTION / 06 — SERVICE
              </div>
              <h2 className="mt-3 font-display text-[14vw] uppercase leading-[0.86] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
                <span className="text-[var(--color-paper)]">JASA,</span>
                <span className="text-[var(--color-paper)]/30"> BIASA</span>
              </h2>
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/45 sm:block">
              03 LAYANAN
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-px border border-[var(--color-bone-2)]/20 bg-[var(--color-bone-2)]/15 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.id}
              className="group relative flex h-full flex-col bg-[var(--color-ink)] p-6 sm:p-7"
              delay={100 + i * 80}
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
                <span>{s.index}</span>
                <span className="px-1.5 py-0.5 border border-[var(--color-bone-2)]/30">
                  {s.meta}
                </span>
              </div>
              <h3 className="mt-5 font-display text-3xl uppercase leading-[0.92] tracking-[-0.02em] sm:text-[2.1rem]">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[44ch] text-[14px] leading-[1.7] text-[var(--color-paper)]/70 sm:text-[15px]">
                {s.description}
              </p>
              <div className="mt-7 border-t border-[var(--color-bone-2)]/15 pt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
                  PRICE
                </div>
                <div className="mt-1 font-condensed text-xl uppercase tracking-[0.04em] text-[var(--color-paper)]">
                  {s.price}
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between pt-6">
                <a
                  href="#contact"
                  className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-paper)] underline-grow"
                >
                  Pesan
                </a>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/35">
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
              </div>
              <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--color-bone-2)]/0 transition-colors group-hover:ring-[var(--color-paper)]/25" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
