import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

/**
 * A content section with a heading that sticks to the top on small screens,
 * where the sidebar navigation is not visible.
 */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mb-20 scroll-mt-20 xl:mb-28 xl:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-6 bg-background/85 px-6 py-4 backdrop-blur-sm xl:relative xl:top-auto xl:mx-0 xl:px-0 xl:py-0 xl:backdrop-blur-none">
        <h2
          id={`${id}-heading`}
          className="font-mono text-xs font-semibold tracking-[0.16em] text-subtle uppercase"
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
