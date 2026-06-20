import { Reveal } from "./Reveal";
import { socials } from "../lib/data";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-[var(--color-bone-2)]/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-[var(--color-bone-2)]/20 pb-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/55">
                SECTION / 07 — CONTACT
              </div>
              <h2 className="mt-3 font-display text-[14vw] uppercase leading-[0.86] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
                <span className="text-[var(--color-paper)]/30">SAY</span>
                <span className="text-[var(--color-paper)]"> HELLO</span>
              </h2>
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/45 sm:block">
              04 CHANNELS
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10 lg:gap-x-10">
          <Reveal className="col-span-12 lg:col-span-5" delay={100}>
            <p className="font-display text-[clamp(28px,4.6vw,46px)] uppercase leading-[0.96] tracking-[-0.02em] text-[var(--color-paper)] text-balance">
              Saya tidak fast response. Tapi saya{" "}
              <span className="text-[var(--color-paper)]/30">pasti</span>{" "}
              membaca.
            </p>
            <p className="mt-6 max-w-[44ch] text-[14px] leading-[1.7] text-[var(--color-paper)]/70 sm:text-[15px]">
              Untuk kolaborasi, pesanan, atau hanya ingin bertukar catatan,
              silakan hubungi melalui salah satu kanal di bawah. Setiap
              pesan adalah berkas yang berharga.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://saweria.co/riznotdev"
                target="_blank"
                rel="noreferrer"
                className="btn-brut btn-brut-fill"
              >
                Donate / Saweria
                <Arrow />
              </a>
              <a href="https://github.com/rixz-dev" className="btn-brut">
                GitHub / rixz-dev
                <Arrow />
              </a>
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-7" delay={200}>
            <ul className="border border-[var(--color-bone-2)]/20">
              {socials.map((s, i) => (
                <li
                  key={s.label}
                  className="group border-b border-[var(--color-bone-2)]/15 last:border-b-0"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid grid-cols-12 items-center gap-x-4 px-4 py-5 transition-colors hover:bg-[var(--color-dusk)] sm:px-6"
                  >
                    <div className="col-span-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-11 sm:col-span-3">
                      <div className="font-condensed text-base uppercase tracking-[0.06em] text-[var(--color-paper)]/85">
                        {s.label}
                      </div>
                    </div>
                    <div className="col-span-12 truncate font-mono text-[12px] tracking-[0.04em] text-[var(--color-paper)] sm:col-span-6">
                      {s.value}
                    </div>
                    <div className="col-span-12 sm:col-span-2 sm:text-right">
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/60 transition-colors group-hover:text-[var(--color-paper)]">
                        Open
                        <Arrow />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
      <path
        d="M1 4.5h10m0 0L8 1m3 3.5L8 8"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="square"
      />
    </svg>
  );
}
