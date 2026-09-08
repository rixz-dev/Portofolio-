import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function Doodle({ kind = 'star', className = '' }: { kind?: 'star' | 'arrow' | 'flower' | 'heart' | 'spark' | 'loop'; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.25 });
  return <svg ref={ref} data-drawn={visible} className={`doodle ${className}`} width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {kind === 'star' && <path pathLength="1" d="M49 7 59 38 91 28 70 52 90 78 58 67 43 94 39 64 8 67 29 46 13 22 42 32 49 7Z" />}
    {kind === 'arrow' && <><path pathLength="1" d="M13 13C60 8 94 27 73 51S23 55 39 40 85 56 65 88" /><path pathLength="1" d="m55 78 9 13 13-9" /></>}
    {kind === 'flower' && <><path pathLength="1" d="M49 37C13-3 82-4 59 37 102 2 106 72 64 54 107 89 41 115 45 67 16 112-13 48 36 49-6 27 49-7 49 37Z" /><circle cx="50" cy="51" r="8" /></>}
    {kind === 'heart' && <path pathLength="1" d="M50 82C35 69 8 52 14 31S44 13 50 32C62 7 91 18 88 40S67 68 50 82Z" />}
    {kind === 'spark' && <><path pathLength="1" d="m50 7 1 30M50 66l-2 29M9 51l29-2M67 50l27-2M20 19l21 23M66 65l18 20M79 18 62 37M34 66 15 85" /></>}
    {kind === 'loop' && <path pathLength="1" d="M8 69C25 85 70 82 67 49S31 22 33 44 72 74 91 24M76 23l16-3-3 18" />}
  </svg>;
}
