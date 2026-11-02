import { Reveal } from "@/components/reveal";
import { Section } from "@/components/sections/section";
import { TechTag } from "@/components/tech-tag";
import type { Dictionary } from "@/content/cv";

export function Experience({ dict }: { dict: Dictionary }) {
  return (
    <Section id="experience" title={dict.sections.experience} tinted>
      <div className="relative mx-auto max-w-5xl">
        {/* Fills the rail in the accent colour as the reader scrolls through
            it. Pure CSS (see .timeline-progress); where scroll-driven
            animations are unsupported it stays hidden and the grey rail
            remains. A sibling of the list, since an <ol> may only hold <li>. */}
        <span aria-hidden className="timeline-progress" />

        {/* A rail down the left edge ties the roles into one timeline. */}
        <ol className="flex flex-col gap-10 border-l border-border pl-6 sm:gap-12 sm:pl-10">
          {dict.experience.items.map((job, index) => (
            <li key={job.company} className="relative">
              <span
                aria-hidden
                className="absolute top-2 -left-[1.6875rem] size-2.5 rounded-full border-2 border-background bg-accent sm:-left-[2.6875rem]"
              />
              <Reveal delay={index * 0.05}>
                <article>
                  <p className="tabular font-mono text-xs tracking-[0.14em] text-subtle uppercase">
                    {job.period}
                  </p>

                  <h3 className="mt-2 text-lg font-medium sm:text-xl">
                    {job.role}
                    <span className="text-muted"> · {job.company}</span>
                  </h3>

                  <ul className="mt-4 flex flex-col gap-2">
                    {job.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="measure relative pl-4 text-sm leading-relaxed text-muted before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-border"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {job.stack.map((tech) => (
                      <li key={tech}>
                        <TechTag>{tech}</TechTag>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
