import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";

const phrases = [
  "I write software, slowly.",
  "I learn, in public.",
  "I read, a lot.",
  "I build, what I need.",
];

export function Hero() {
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "erasing">("typing");

  useEffect(() => {
    const target = phrases[i];
    let t: number;
    if (phase === "typing") {
      if (typed.length < target.length) {
        t = window.setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 55);
      } else {
        t = window.setTimeout(() => setPhase("hold"), 1600);
      }
    } else if (phase === "hold") {
      setPhase("erasing");
    } else {
      if (typed.length > 0) {
        t = window.setTimeout(() => setTyped(target.slice(0, typed.length - 1)), 28);
      } else {
        setI((p) => (p + 1) % phrases.length);
        setPhase("typing");
        return;
      }
    }
    return () => window.clearTimeout(t);
  }, [typed, phase, i]);

  return (
    <section id="hero" className="relative isolate overflow-hidden pt-24 sm:pt-28">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 0%, rgba(243,241,236,0.18), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(243,241,236,0.10), transparent 60%)",
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="g" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="rgba(243,241,236,0.5)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>

        {/* Decorative concentric rings */}
        <div className="pointer-events-none absolute right-[-8%] top-[28%] hidden md:block">
          <div className="relative h-[420px] w-[420px] lg:h-[520px] lg:w-[520px]">
            <div className="ring-spin absolute inset-0 rounded-full border border-[var(--color-paper)]/15" />
            <div
              className="ring-spin-slow absolute inset-6 rounded-full border border-dashed border-[var(--color-paper)]/15"
              style={{ borderRadius: "50%" }}
            />
            <div className="ring-spin absolute inset-12 rounded-full border border-[var(--color-paper)]/10" />
            <div className="ring-spin-slow absolute inset-20 rounded-full border border-dashed border-[var(--color-paper)]/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[var(--color-paper)]/70 ticker-blink" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--color-paper)]/35 rotate-90">
                REIZ / ARCHIVE
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3 pt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/55">
          <span className="led inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-paper)]" />
          <span>FILE 001 — OPEN</span>
          <span className="hidden h-px flex-1 bg-[var(--color-bone-2)]/15 sm:block" />
          <span className="hidden sm:inline">RIZS // EST. 2009</span>
        </div>

        <Reveal className="mt-8 sm:mt-12">
          <h1 className="font-display uppercase leading-[0.86] tracking-[-0.025em] text-[var(--color-paper)] text-[18vw] sm:text-[14vw] lg:text-[12.4rem]">
            <span className="block">ACHMAD</span>
            <span className="block">
              <span className="text-[var(--color-paper)]/35">FARIZY</span>
            </span>
          </h1>
        </Reveal>

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8 sm:mt-14 lg:gap-x-10">
          <Reveal className="col-span-12 lg:col-span-7" delay={120}>
            <p className="max-w-[60ch] font-sans text-[15px] leading-[1.65] text-[var(--color-paper)]/75 sm:text-base">
              Saya bukan fullstack developer, saya masih awam. Saya tidak
              sekolah, berhenti di kelas 9 SMP. Tapi dengan teknologi yang
              ada, saya memilih untuk terus belajar tanpa ijazah — dan
              menulis perangkat lunak yang pelan, hati-hati, dan jujur.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 border border-[var(--color-bone-2)]/25 px-3 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/55">
                CURRENT LINE
              </span>
              <span className="font-mono text-[12px] tracking-[0.04em] text-[var(--color-paper)]">
                {typed}
                <span className="ml-0.5 inline-block h-3 w-[2px] -mb-[2px] bg-[var(--color-paper)] align-middle led" />
              </span>
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-5" delay={220}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border border-[var(--color-bone-2)]/20 p-5 sm:grid-cols-3 lg:grid-cols-2">
              {[
                ["NAME", "ACHMAD FARIZY"],
                ["HANDLE", "@REIZ"],
                ["BORN", "04 / 03 / 2009"],
                ["AGE", "17"],
                ["CITY", "IDN / WIB"],
                ["STAGE", "LEARNING"],
              ].map(([k, v]) => (
                <div key={k} className="space-y-1">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
                    {k}
                  </dt>
                  <dd className="font-condensed text-[14px] uppercase tracking-[0.06em] text-[var(--color-paper)]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-3" delay={320}>
          <a href="#work" className="btn-brut btn-brut-fill">
            <span>View Work</span>
            <Arrow />
          </a>
          <a href="#contact" className="btn-brut">
            <span>Get in Touch</span>
            <Arrow />
          </a>
          <a
            href="https://github.com/rixz-dev"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 px-2 py-2 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-paper)]/70 hover:text-[var(--color-paper)]"
          >
            <Github />
            <span className="underline-grow">rixz-dev</span>
          </a>
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-x-6 border-t border-[var(--color-bone-2)]/15 pt-5 pb-12 sm:mt-24 lg:gap-x-10">
          <Reveal className="col-span-12 sm:col-span-6" delay={400}>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/45">
              READING
            </div>
            <div className="mt-2 font-condensed text-[15px] uppercase tracking-[0.04em] text-[var(--color-paper)]/85">
              Crypto, manuals, and old blog posts
            </div>
          </Reveal>
          <Reveal className="col-span-12 sm:col-span-6" delay={480}>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/45">
              DOING
            </div>
            <div className="mt-2 font-condensed text-[15px] uppercase tracking-[0.04em] text-[var(--color-paper)]/85">
              Writing code, taking notes, learning daily
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-500 group-hover:translate-x-1"
    >
      <path
        d="M1 5h12m0 0L9 1m4 4L9 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Github() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5z" />
    </svg>
  );
}
