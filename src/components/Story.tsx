import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";

export function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden border-t border-[var(--color-bone-2)]/15 py-20 sm:py-28"
    >
      {/* Blurred monochrome portrait background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -right-20 top-10 h-[60vw] w-[60vw] max-h-[680px] max-w-[680px] opacity-30 blur-3xl saturate-0"
          aria-hidden="true"
        >
          <Placeholder
            label=""
            index=""
            ratio="1/1"
            className="!aspect-square !border-0"
          />
        </div>
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-ink)_0%,transparent_30%,transparent_70%,var(--color-ink)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute -left-32 bottom-10 h-[50vw] w-[50vw] max-h-[520px] max-w-[520px] opacity-20 blur-3xl saturate-0"
          aria-hidden="true"
        >
          <Placeholder
            label=""
            index=""
            ratio="1/1"
            className="!aspect-square !border-0"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-[var(--color-bone-2)]/20 pb-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/55">
                SECTION / 03 — SELF / BIOGRAPHY
              </div>
              <h2 className="mt-3 font-display text-[14vw] uppercase leading-[0.86] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
                <span className="text-[var(--color-paper)]/30">A SHORT</span>
                <span className="text-[var(--color-paper)]"> ELEGY</span>
              </h2>
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/45 sm:block">
              CHAPTER I — {2026 - 2009} YRS
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 lg:gap-x-10">
          {/* Photo */}
          <Reveal className="col-span-12 lg:col-span-5" delay={100}>
            <div className="relative">
              <div className="relative overflow-hidden border border-[var(--color-bone-2)]/25">
                <div className="relative aspect-square">
                  <Placeholder
                    label="ACHMAD FARIZY"
                    index="P / 01"
                    hint="REPLACE WITH YOUR PHOTO"
                    ratio="1/1"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0)_40%,rgba(10,10,10,0.85)_100%)]" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/45">
                <span>PORTRAIT / 1:1</span>
                <span>04.03.2009</span>
              </div>
            </div>
          </Reveal>

          {/* Body */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={180}>
              <p className="font-display text-[clamp(28px,5.4vw,52px)] uppercase leading-[0.96] tracking-[-0.02em] text-[var(--color-paper)] text-balance">
                Saya bukan{" "}
                <span className="text-[var(--color-paper)]/30">fullstack</span>{" "}
                developer. Saya masih awam. Saya tidak sekolah — berhenti di
                kelas 9 SMP, karena faktor ekonomi.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-8 max-w-[60ch] text-[15px] leading-[1.75] text-[var(--color-paper)]/72 sm:text-[16px]">
                Saya adalah seorang pemuda yang haus ilmu. Saya pernah
                hacking, newbie software developer, dan AI enthusiast. Hobi
                saya membaca buku, menulis, dan berhitung. Saya mungkin
                belum tentu tahu semua — tapi dengan canggihnya teknologi
                sekarang, saya yakin saya bisa sukses tanpa ijazah.
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-10 grid grid-cols-2 gap-px border border-[var(--color-bone-2)]/20 bg-[var(--color-bone-2)]/15 sm:grid-cols-4">
                {[
                  ["BORN", "04 / 03 / 2009"],
                  ["AGE", "17"],
                  ["CITY", "INDONESIA"],
                  ["POSTURE", "LEARNING"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-[var(--color-ink)] p-4">
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
                      {k}
                    </div>
                    <div className="mt-1.5 font-condensed text-base uppercase tracking-[0.04em] text-[var(--color-paper)]">
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-8 space-y-3 font-condensed text-[13px] uppercase leading-[1.5] tracking-[0.04em] text-[var(--color-paper)]/55">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[var(--color-bone-2)]/40" />
                  <span>Reading books</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[var(--color-bone-2)]/40" />
                  <span>Writing notes and small software</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[var(--color-bone-2)]/40" />
                  <span>Counting, by hand, slowly</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Pull quote */}
        <Reveal delay={520}>
          <div className="mt-16 border-y border-[var(--color-bone-2)]/20 py-10">
            <blockquote className="font-display text-[clamp(28px,5.6vw,60px)] uppercase leading-[0.96] tracking-[-0.02em] text-[var(--color-paper)] text-balance">
              <span className="text-[var(--color-paper)]/30">"</span>
              Belajar tanpa ijazah, menulis tanpa suara besar, dan tetap
              hidup di antara baris kode.
              <span className="text-[var(--color-paper)]/30">"</span>
            </blockquote>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/45">
              — RIZS / 2026
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
