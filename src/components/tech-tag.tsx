import type { ReactNode } from "react";

/** A small, non-interactive chip for technology names. */
export function TechTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-accent">
      {children}
    </span>
  );
}
