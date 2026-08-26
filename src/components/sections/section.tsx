import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  /** Tints the band so consecutive sections read as separate blocks. */
  tinted?: boolean;
};

/** A full-width band with a centred heading. */
export function Section({ id, title, children, tinted = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-16 py-20 sm:py-28",
        tinted && "bg-surface/40",
      )}
    >
      <div className="mx-auto w-full max-w-[100rem] px-6 sm:px-10 lg:px-16">
        <Reveal className="mb-12 text-center sm:mb-16">
          <h2
            id={`${id}-heading`}
            className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {title}
          </h2>
          <span aria-hidden className="mx-auto mt-5 block h-px w-16 bg-accent" />
        </Reveal>
        {children}
      </div>
    </section>
  );
}
