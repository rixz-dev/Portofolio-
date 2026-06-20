import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { useNow } from "../hooks/useNow";
import { formatDateID, formatTime } from "../lib/format";

const links = [
  { label: "INDEX", href: "#hero" },
  { label: "WORK", href: "#work" },
  { label: "STORY", href: "#story" },
  { label: "PATH", href: "#path" },
  { label: "STACK", href: "#stack" },
  { label: "SERVICE", href: "#service" },
  { label: "CONTACT", href: "#contact" },
];

export function Header() {
  const now = useNow(1000);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-[var(--color-bone-2)]/15 bg-[var(--color-ink)]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-10">
        <a
          href="#hero"
          className="group flex items-center gap-3"
          aria-label="RIZS — home"
        >
          <span className="relative inline-flex h-7 w-7 items-center justify-center border border-[var(--color-paper)]/60">
            <span className="font-display text-[11px] leading-none">R</span>
            <span className="led absolute -right-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-[var(--color-paper)]" />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-condensed text-[11px] uppercase tracking-[0.32em] text-[var(--color-paper)]/80">
              REIZ / ARCHIVE
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-paper)]/40">
              {formatDateID(now)} · {formatTime(now)} WIB
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative px-3 py-2 font-condensed text-[11px] uppercase tracking-[0.32em] text-[var(--color-paper)]/70 transition-colors hover:text-[var(--color-paper)]"
            >
              <span className="relative">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--color-paper)] transition-[width] duration-500 group-hover:w-full" />
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden border border-[var(--color-paper)]/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/80 transition-colors hover:border-[var(--color-paper)] hover:text-[var(--color-paper)] sm:inline-flex"
          >
            Available / 2026
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative inline-flex h-9 w-9 items-center justify-center border border-[var(--color-paper)]/40 lg:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-4 bg-[var(--color-paper)] transition-transform duration-300",
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              )}
            />
            <span
              className={cn(
                "absolute h-px w-4 bg-[var(--color-paper)] transition-transform duration-300",
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              )}
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-[var(--color-bone-2)]/15 bg-[var(--color-ink)]/95 transition-[grid-template-rows,opacity] duration-500 lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col px-4 py-3 sm:px-6" aria-label="Mobile">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-[var(--color-bone-2)]/10 py-3 font-condensed text-sm uppercase tracking-[0.3em] text-[var(--color-paper)]/80 last:border-b-0"
              >
                <span>{l.label}</span>
                <span className="font-mono text-[10px] text-[var(--color-paper)]/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
