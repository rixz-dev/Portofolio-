import { useInView } from "../hooks/useInView";
import { Reveal } from "./Reveal";
import { experiences, type ExperienceItem } from "../lib/data";
import { cn } from "../utils/cn";

const dotColor: Record<ExperienceItem["type"], string> = {
  GRAY: "bg-[var(--color-rust)]",
  WHITE: "bg-[var(--color-paper)]",
  PROMPT: "bg-[var(--color-bone-2)]",
  AI: "bg-[var(--color-moss)]",
  SOFTWARE: "bg-[var(--color-paper)]",
};

export function Experience() {
  return (
    <section
      id="path"
      className="relative border-t border-[var(--color-bone-2)]/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-[var(--color-bone-2)]/20 pb-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-paper)]/55">
                SECTION / 04 — TIMELINE
              </div>
              <h2 className="mt-3 font-display text-[14vw] uppercase leading-[0.86] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
                <span className="text-[var(--color-paper)]">A LINE,</span>
                <span className="text-[var(--color-paper)]/30"> DRAWN</span>
              </h2>
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-paper)]/45 sm:block">
              05 STATIONS
            </div>
          </div>
        </Reveal>

        <div className="relative mt-12">
          {/* vertical track for desktop */}
          <div className="pointer-events-none absolute left-[18px] top-0 hidden h-full w-px bg-[var(--color-bone-2)]/20 lg:left-1/2 lg:block" />
          {/* mobile track */}
          <div className="pointer-events-none absolute left-[18px] top-0 h-full w-px bg-[var(--color-bone-2)]/20 lg:hidden" />

          <ul className="space-y-12 lg:space-y-20">
            {experiences.map((item, i) => (
              <ExperienceRow key={item.id} item={item} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ExperienceRow({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.4 });
  const isLeft = index % 2 === 0;
  return (
    <li
      ref={ref}
      className={cn(
        "relative grid grid-cols-12 items-start gap-x-6 lg:gap-x-10",
        inView ? "is-in" : ""
      )}
    >
      {/* connector line (horizontal) */}
      <div
        className={cn(
          "hidden lg:block absolute top-9 h-px bg-[var(--color-bone-2)]/30",
          isLeft
            ? "right-1/2 left-0 mr-[18px]"
            : "left-1/2 right-0 ml-[18px]"
        )}
        style={{ transform: "scaleX(0)", transformOrigin: isLeft ? "right center" : "left center" }}
      >
        <div
          className={cn(
            "h-full w-full bg-[var(--color-paper)]/70 transition-transform duration-1000",
            inView ? "scale-x-100" : ""
          )}
          style={{
            transform: inView ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: isLeft ? "right center" : "left center",
            transitionDelay: "120ms",
            transitionTimingFunction: "var(--ease-brut)",
          }}
        />
      </div>

      {/* node */}
      <span
        className={cn(
          "absolute left-[18px] top-7 -translate-x-1/2 lg:left-1/2",
          "inline-block h-3 w-3 rounded-full border border-[var(--color-paper)]",
          dotColor[item.type]
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full",
            inView ? "animate-[ping_1.6s_var(--ease-brut)_1]" : ""
          )}
        />
      </span>

      {/* content */}
      <div
        className={cn(
          "col-span-12 pl-12 lg:pl-0",
          isLeft ? "lg:col-span-5 lg:pr-12" : "lg:col-span-5 lg:col-start-8 lg:pl-12"
        )}
      >
        <div
          className="reveal"
          style={{
            transform: inView ? "translate3d(0,0,0)" : "translate3d(0,14px,0)",
            opacity: inView ? 1 : 0,
            transition: "all 0.9s var(--ease-brut)",
            transitionDelay: `${index * 80}ms`,
          }}
        >
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/45">
            <span>X / {String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-[var(--color-bone-2)]/30" />
            <span>{item.range}</span>
          </div>
          <h3 className="mt-3 font-display text-3xl uppercase leading-[0.92] tracking-[-0.02em] sm:text-4xl">
            {item.role}
          </h3>
          <p className="mt-3 max-w-[44ch] text-[14px] leading-[1.7] text-[var(--color-paper)]/70 sm:text-[15px]">
            {item.note}
          </p>
          {item.type === "GRAY" && (
            <div className="mt-3 inline-block border border-[var(--color-rust)]/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-rust)]">
              JANGAN DITIRU
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
