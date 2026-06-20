import { cn } from "../utils/cn";

interface MarqueeProps {
  items: string[];
  speed?: "normal" | "slow";
  separator?: string;
  className?: string;
  textClassName?: string;
}

export function Marquee({
  items,
  speed = "normal",
  separator = "///",
  className,
  textClassName,
}: MarqueeProps) {
  const loop = [...items, ...items];
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-[var(--color-bone-2)]/15 bg-[var(--color-ink)] py-3",
        className
      )}
    >
      <div
        className={cn(
          "marquee-track flex shrink-0 gap-10 whitespace-nowrap will-change-transform",
          speed === "slow" && "marquee-slow"
        )}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className={cn(
              "font-condensed text-sm uppercase tracking-[0.32em] text-[var(--color-paper)]/80",
              textClassName
            )}
          >
            {item}
            <span className="ml-10 text-[var(--color-bone-3)]/60">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
