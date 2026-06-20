import { Reveal } from "./Reveal";
import { stack } from "../lib/data";

export function Stack() {
  return (
    <section
      id="stack"
      className="relative border-t border-[var(--color-bone-2)]/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-[var(--color-bone-2)]/20 pb-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/55">
                SECTION / 05 — WHAT I LEARN
              </div>
              <h2 className="mt-3 font-display text-[14vw] uppercase leading-[0.86] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
                <span className="text-[var(--color-paper)]/30">THE</span>
                <span className="text-[var(--color-paper)]"> STACK</span>
              </h2>
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/45 sm:block">
              08 ITEMS / SELF-ASSESSED
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={120}>
          <ul className="border border-[var(--color-bone-2)]/20">
            {stack.map((s, i) => (
              <li
                key={s.name}
                className="group grid grid-cols-12 items-center gap-x-4 border-b border-[var(--color-bone-2)]/15 px-4 py-4 last:border-b-0 sm:px-6"
              >
                <div className="col-span-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-11 sm:col-span-3">
                  <div className="font-display text-2xl uppercase leading-[0.92] tracking-[-0.02em] sm:text-3xl">
                    {s.name}
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-5">
                  <div className="h-[6px] w-full overflow-hidden border border-[var(--color-bone-2)]/20">
                    <div
                      className="h-full bg-[var(--color-paper)] transition-[width] duration-1000"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
                <div className="col-span-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/55 sm:col-span-2">
                  LV / {s.level}
                </div>
                <div className="col-span-6 text-right font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/55 sm:col-span-1">
                  {s.since}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-8" delay={220}>
          <div className="border border-[var(--color-bone-2)]/20 p-5 sm:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
              CERTIFICATES
            </div>
            <div className="mt-3 font-display text-3xl uppercase leading-[0.92] tracking-[-0.02em] sm:text-5xl">
              NONE :)
            </div>
            <p className="mt-3 max-w-[60ch] text-[14px] leading-[1.7] text-[var(--color-paper)]/65 sm:text-[15px]">
              Tidak ada sertifikat. Hanya catatan, kode sumber yang berjalan, dan
              rasa ingin tahu yang tidak pernah padam.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
