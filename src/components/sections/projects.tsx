import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { CardGlow } from "@/components/card-glow";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/sections/section";
import { TechTag } from "@/components/tech-tag";
import { profile, projects, type Dictionary } from "@/content/cv";

export function Projects({ dict }: { dict: Dictionary }) {
  return (
    <Section id="projects" title={dict.sections.projects}>
      {/* Flex rather than grid so an incomplete last row is centred instead of
          leaving empty columns on the right. Widths mirror a 1/2/3-column grid
          with the 1.25rem gap taken out. */}
      <ul className="flex flex-wrap justify-center gap-5">
        {projects.map((project, index) => (
          <li key={project.key} className="w-full md:w-[calc(50%-0.625rem)] xl:w-[calc((100%-2.5rem)/3)]">
            <Reveal delay={index * 0.06} className="h-full">
              {/* The whole card is one link: no nested interactive elements. */}
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="group relative isolate flex h-full cursor-pointer flex-col rounded-2xl border border-border bg-surface p-6"
              >
                <CardGlow />
                <h3 className="flex items-center gap-2 text-lg font-medium transition-colors duration-200 group-hover:text-accent">
                  <GithubIcon className="size-5 shrink-0 text-subtle transition-colors duration-200 group-hover:text-accent" />
                  {project.name}
                  <ArrowUpRight
                    className="size-4 text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="sr-only">— {dict.projects.repoLabel}</span>
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {dict.projects.descriptions[project.key]}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <TechTag>{tech}</TechTag>
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={projects.length * 0.06} className="mt-10 text-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex cursor-pointer items-center gap-2 font-mono text-xs tracking-[0.14em] text-subtle uppercase transition-colors duration-200 hover:text-accent"
        >
          {dict.projects.viewAll}
          <ArrowUpRight
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
            aria-hidden
          />
        </a>
      </Reveal>
    </Section>
  );
}
