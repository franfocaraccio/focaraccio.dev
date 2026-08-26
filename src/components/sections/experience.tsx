import { Reveal } from "@/components/reveal";
import { Section } from "@/components/sections/section";
import { TechTag } from "@/components/tech-tag";
import type { Dictionary } from "@/content/cv";

export function Experience({ dict }: { dict: Dictionary }) {
  return (
    <Section id="experience" title={dict.sections.experience}>
      <ol className="flex flex-col">
        {dict.experience.items.map((job, index) => (
          <li key={job.company}>
            <Reveal delay={index * 0.05}>
              {/* The card lifts on hover to signal a single, coherent block. */}
              <article className="group relative grid gap-2 rounded-xl p-4 transition-colors duration-300 sm:grid-cols-[8.5rem_1fr] sm:gap-6 xl:grid-cols-[10rem_1fr] xl:gap-8 xl:hover:bg-surface-raised">
                <p className="tabular pt-1 font-mono text-xs tracking-wide text-subtle uppercase">
                  {job.period}
                </p>

                <div>
                  <h3 className="text-base font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                    {job.role}
                    <span className="text-muted"> · {job.company}</span>
                  </h3>

                  <ul className="mt-3 flex flex-col gap-2">
                    {job.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="measure relative pl-4 text-sm leading-relaxed text-muted before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-border"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {job.stack.map((tech) => (
                      <li key={tech}>
                        <TechTag>{tech}</TechTag>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
