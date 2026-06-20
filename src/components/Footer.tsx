import { useNow } from "../hooks/useNow";
import { formatDateID, formatTime } from "../lib/format";

export function Footer() {
  const now = useNow(1000);
  return (
    <footer className="relative border-t border-[var(--color-bone-2)]/20">
      <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/45">
              COLOPHON
            </div>
            <p className="mt-3 max-w-[44ch] text-[13px] leading-[1.7] text-[var(--color-paper)]/65">
              Dibuat tangan dengan React, Tailwind, dan sedikit kesabaran.
            </p>
          </div>

          <div className="col-span-6 lg:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/45">
              BUILD
            </div>
            <ul className="mt-3 space-y-1 font-condensed text-[13px] uppercase tracking-[0.06em] text-[var(--color-paper)]/80">
              <li>v 1.0 / REIZ</li>
              <li>REACT 19 / VITE</li>
              <li>TAILWIND 4</li>
            </ul>
          </div>

          <div className="col-span-6 lg:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/45">
              SYSTEM CLOCK
            </div>
            <div className="mt-3 font-mono text-[15px] tracking-[0.06em] text-[var(--color-paper)]">
              {formatDateID(now)}
            </div>
            <div className="font-mono text-[15px] tracking-[0.06em] text-[var(--color-paper)]/65">
              {formatTime(now)} WIB
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-bone-2)]/15 pt-5 sm:flex-row sm:items-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
            (C) ACHMAD FARIZY / 2026 / IDN
          </div>
          <div className="font-condensed text-[12px] uppercase tracking-[0.18em] text-[var(--color-paper)]/45">
            Built slowly, read often.
          </div>
        </div>
      </div>
    </footer>
  );
}
