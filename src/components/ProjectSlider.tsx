import { useEffect, useRef, useState } from "react";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { projects, type Project } from "../lib/data";
import { cn } from "../utils/cn";

const statusLabel: Record<Project["status"], string> = {
  DONE: "DONE",
  WIP: "IN PROGRESS",
  ARCHIVED: "ARCHIVED",
};

export function ProjectSlider() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dragRef = useRef<{ x: number; dx: number } | null>(null);
  const suppressClickRef = useRef(false);
  const activeRef = useRef(active);
  const transitioningRef = useRef(false);
  const total = projects.length;

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = cardRefs.current[active];
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    const trackRect = el.getBoundingClientRect();
    const offset =
      cardRect.left - trackRect.left - trackRect.width / 2 + cardRect.width / 2;
    el.scrollTo({ left: el.scrollLeft + offset, behavior: "smooth" });
  }, [active]);

  // autoplay (paused on hover, focus, or tab hidden)
  const hoverRef = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      if (hoverRef.current) return;
      setActive((p) => (p + 1) % total);
    }, 6500);
    return () => window.clearInterval(id);
  }, [total]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go((active + 1) % total);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go((active - 1 + total) % total);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, total]);

  function go(idx: number) {
    if (!total) return;
    const next = (idx + total) % total;
    if (next === activeRef.current) return;
    if (transitioningRef.current) return;

    transitioningRef.current = true;
    setActive(next);
    window.setTimeout(() => {
      transitioningRef.current = false;
    }, 620);
  }

  // touch / drag
  // Ref-based drag prevents stale state and stops the post-swipe click from
  // selecting the card under the finger/mouse (common mobile slider bug).
  function onPointerDown(e: React.PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    dragRef.current = { x: e.clientX, dx: 0 };
    suppressClickRef.current = false;
  }
  function onPointerMove(e: React.PointerEvent) {
    const drag = dragRef.current;
    if (!drag) return;
    drag.dx = e.clientX - drag.x;
    if (Math.abs(drag.dx) > 8) suppressClickRef.current = true;
  }
  function onPointerUp(e: React.PointerEvent) {
    const drag = dragRef.current;
    if (!drag) return;

    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    dragRef.current = null;

    const threshold = 60;
    if (drag.dx > threshold) go(activeRef.current - 1);
    else if (drag.dx < -threshold) go(activeRef.current + 1);
  }

  const p = projects[active];

  return (
    <section id="work" className="relative border-t border-[var(--color-bone-2)]/15 py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-[var(--color-bone-2)]/20 pb-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/55">
                SECTION / 02 — SELECTED WORK
              </div>
              <h2 className="mt-3 font-display text-[14vw] uppercase leading-[0.86] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
                <span className="text-[var(--color-paper)]">PROJECTS,</span>
                <span className="text-[var(--color-paper)]/30"> ON REEL</span>
              </h2>
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/45 sm:block">
              {String(total).padStart(2, "0")} ITEMS / {String(active + 1).padStart(2, "0")} OF {String(total).padStart(2, "0")}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-12 gap-x-6 lg:gap-x-10">
          {/* Preview */}
          <Reveal className="col-span-12 lg:col-span-7" delay={80}>
            <div className="relative">
              <div className="relative border border-[var(--color-bone-2)]/25 bg-[var(--color-dusk)]">
                <div className="relative overflow-hidden">
                  <div
                    key={p.id}
                    className="animate-[fadeIn_0.6s_var(--ease-brut)]"
                  >
                    <ProjectMedia project={p} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--color-bone-2)]/10" />
                  <div className="scanline" />
                </div>
                <div className="flex items-center justify-between border-t border-[var(--color-bone-2)]/20 bg-[var(--color-ink)]/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/55">
                  <div className="flex items-center gap-2">
                    <span className="led inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-paper)]" />
                    <span>LIVE / {p.id.toUpperCase()}</span>
                  </div>
                  <div className="hidden sm:block">{p.category}</div>
                  <div>{p.year}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/55">
                  <span>PROGRESS</span>
                  <span>{p.progress}% / {statusLabel[p.status]}</span>
                </div>
                <div className="mt-2 h-[6px] w-full overflow-hidden border border-[var(--color-bone-2)]/25">
                  <div
                    className="h-full bg-[var(--color-paper)] transition-[width] duration-700"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Description */}
          <Reveal className="col-span-12 mt-8 lg:col-span-5 lg:mt-0" delay={160}>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
                <span>{p.index}</span>
                <span className="h-px flex-1 bg-[var(--color-bone-2)]/20" />
                <span>{p.year}</span>
              </div>
              <h3 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-[-0.02em] sm:text-5xl">
                {p.name}
              </h3>
              <p className="mt-2 font-condensed text-[15px] uppercase tracking-[0.04em] text-[var(--color-paper)]/65">
                {p.tagline}
              </p>
              <p className="mt-5 max-w-[58ch] text-[14px] leading-[1.7] text-[var(--color-paper)]/72 sm:text-[15px]">
                {p.description}
              </p>

              {p.collaborators && (
                <div className="mt-5 border border-[var(--color-bone-2)]/20 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/45">
                    COLLABORATORS
                  </div>
                  <ul className="mt-2 space-y-1 font-condensed text-[13px] uppercase tracking-[0.06em] text-[var(--color-paper)]/80">
                    {p.collaborators.map((c) => (
                      <li key={c} className="flex items-center gap-2">
                        <span className="inline-block h-1 w-1 bg-[var(--color-paper)]/50" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-[var(--color-bone-2)]/25 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-paper)]/70"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-brut btn-brut-fill"
                  >
                    Open
                    <Arrow />
                  </a>
                ) : (
                  <span className="btn-brut opacity-60">
                    No Link
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => go((active + 1) % total)}
                  className="btn-brut"
                >
                  Next Project
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Slider / Reel */}
        <Reveal delay={240}>
          <div className="mt-12 border border-[var(--color-bone-2)]/20">
            <div className="flex items-center justify-between border-b border-[var(--color-bone-2)]/20 bg-[var(--color-ink)]/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/55">
              <span>REEL / {String(total).padStart(2, "0")}</span>
              <span className="hidden sm:block">DRAG · SWIPE · ARROW KEYS</span>
              <span>{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            </div>
            <div
              ref={trackRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onMouseEnter={() => (hoverRef.current = true)}
              onMouseLeave={() => (hoverRef.current = false)}
              onFocus={() => (hoverRef.current = true)}
              onBlur={() => (hoverRef.current = false)}
              className="no-scrollbar relative flex snap-x snap-mandatory gap-px overflow-x-auto bg-[var(--color-bone-2)]/15"
            >
              {projects.map((proj, i) => (
                <button
                  key={proj.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => {
                    if (suppressClickRef.current) {
                      suppressClickRef.current = false;
                      return;
                    }
                    go(i);
                  }}
                  className={cn(
                    "group relative h-slide min-w-[78%] snap-center bg-[var(--color-ink)] p-5 text-left transition-colors sm:min-w-[44%] lg:min-w-[28%] xl:min-w-[24%]",
                    i === active
                      ? "bg-[var(--color-dusk)]"
                      : "hover:bg-[var(--color-dusk)]/50"
                  )}
                  aria-pressed={i === active}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
                    <span>{proj.index}</span>
                    <span
                      className={cn(
                        "px-1.5 py-0.5",
                        proj.status === "DONE" && "border border-[var(--color-moss)]/60 text-[var(--color-moss)]",
                        proj.status === "WIP" && "border border-[var(--color-rust)]/60 text-[var(--color-rust)]",
                        proj.status === "ARCHIVED" && "border border-[var(--color-paper)]/40 text-[var(--color-paper)]/60"
                      )}
                    >
                      {proj.status}
                    </span>
                  </div>
                  <div className="mt-4 font-display text-2xl uppercase leading-[0.92] tracking-[-0.02em] text-[var(--color-paper)]">
                    {proj.name}
                  </div>
                  <div className="mt-1 font-condensed text-[12px] uppercase tracking-[0.06em] text-[var(--color-paper)]/60">
                    {proj.tagline}
                  </div>
                  <div className="mt-5 h-[2px] w-full overflow-hidden bg-[var(--color-bone-2)]/15">
                    <div
                      className={cn(
                        "h-full bg-[var(--color-paper)] transition-[width] duration-700",
                        i === active ? "w-full" : "w-0 group-hover:w-1/2"
                      )}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--color-paper)]/45">
                    <span>{proj.progress}%</span>
                    <span>{proj.year}</span>
                  </div>
                  <span
                    className={cn(
                      "pointer-events-none absolute inset-0 ring-1 ring-inset transition-colors",
                      i === active
                        ? "ring-[var(--color-paper)]/50"
                        : "ring-transparent group-hover:ring-[var(--color-paper)]/15"
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-[var(--color-bone-2)]/20 px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go((active - 1 + total) % total)}
                  className="inline-flex h-9 w-9 items-center justify-center border border-[var(--color-bone-2)]/25 transition-colors hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
                  aria-label="Previous project"
                >
                  <Arrow dir="left" />
                </button>
                <button
                  type="button"
                  onClick={() => go((active + 1) % total)}
                  className="inline-flex h-9 w-9 items-center justify-center border border-[var(--color-bone-2)]/25 transition-colors hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
                  aria-label="Next project"
                >
                  <Arrow />
                </button>
              </div>
              <div className="flex items-center gap-1">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    className={cn(
                      "h-2 transition-[width] duration-500",
                      i === active
                        ? "w-8 bg-[var(--color-paper)]"
                        : "w-2 bg-[var(--color-bone-2)]/40 hover:bg-[var(--color-bone-2)]"
                    )}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bonus projects */}
        <Reveal delay={320}>
          <div className="mt-10 grid grid-cols-1 gap-px border border-[var(--color-bone-2)]/20 bg-[var(--color-bone-2)]/15 sm:grid-cols-2">
            {[
              { name: "MONOP GAMES", note: "Web-based monopoly game. Still in construction." },
              {
                name: "DEV-TOOLSBOX",
                note: "A collection of small experimental projects in one place.",
                href: "https://dev-toolsbox-two.vercel.app/",
              },
            ].map((b) => (
              <div
                key={b.name}
                className="group relative flex flex-col gap-3 bg-[var(--color-ink)] p-6"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
                  <span>BONUS / UPCOMING</span>
                  <span>SOON</span>
                </div>
                <div className="font-display text-3xl uppercase leading-[0.92] tracking-[-0.02em]">
                  {b.name}
                </div>
                <div className="font-condensed text-[13px] uppercase tracking-[0.04em] text-[var(--color-paper)]/60">
                  {b.note}
                </div>
                {b.href && (
                  <a
                    href={b.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto self-start font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-paper)] underline-grow"
                  >
                    Visit ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translate3d(0,8px,0); } to { opacity: 1; transform: translate3d(0,0,0); } }`}</style>
    </section>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const [fallback, setFallback] = useState(false);
  const screenshotSrc = getProjectScreenshotUrl(project);

  if (project.media.kind === "video" && project.media.src) {
    return (
      <div className="relative aspect-[4/3] w-full bg-[var(--color-ink)]">
        <video
          className="h-full w-full object-cover"
          src={project.media.src}
          poster={project.media.poster || screenshotSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  const imageSrc =
    project.media.kind === "image" && project.media.src
      ? project.media.src
      : screenshotSrc;

  if (imageSrc && !fallback) {
    return (
      <div className="relative aspect-[4/3] w-full bg-[var(--color-ink)]">
        <img
          src={imageSrc}
          alt={`${project.name} website preview`}
          className="h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFallback(true)}
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Placeholder
        label={project.name}
        index={project.index}
        hint={project.href ? "SCREENSHOT UNAVAILABLE" : "PREVIEW UNAVAILABLE"}
        ratio="4/3"
      />
    </div>
  );
}

function getProjectScreenshotUrl(project: Project) {
  if (!project.href) return "";

  const params = new URLSearchParams({
    url: project.href,
    width: "1280",
    height: "960",
    scaleFactor: "1",
    disableAnimations: "true",
    wait_before_screenshot_ms: "800",
  });

  return `https://capture-website-api.vercel.app/api/capture?${params.toString()}`;
}

function Arrow({ dir = "right" }: { dir?: "left" | "right" }) {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden="true"
      className={dir === "left" ? "rotate-180" : ""}
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
