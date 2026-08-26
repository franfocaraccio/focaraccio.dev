import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/sections/section";
import { TechTag } from "@/components/tech-tag";
import { profile, projects, type Dictionary } from "@/content/cv";

export function Projects({ dict }: { dict: Dictionary }) {
  return (
    <Section id="projects" title={dict.sections.projects}>
      <ul className="flex flex-col gap-3">
        {projects.map((project, index) => (
          <li key={project.key}>
            <Reveal delay={index * 0.05}>
              {/* The whole card is one link: no nested interactive elements. */}
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="group block cursor-pointer rounded-xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-accent"
              >
                <h3 className="flex items-center gap-2 text-base font-medium transition-colors duration-200 group-hover:text-accent">
                  <GithubIcon className="size-4 shrink-0 text-subtle transition-colors duration-200 group-hover:text-accent" />
                  {project.name}
                  <ArrowUpRight
                    className="size-4 text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="sr-only">— {dict.projects.repoLabel}</span>
                </h3>

                <p className="measure mt-2 text-sm leading-relaxed text-muted">
                  {dict.projects.descriptions[project.key]}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
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

      <Reveal delay={projects.length * 0.05}>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group mt-5 inline-flex cursor-pointer items-center gap-2 font-mono text-xs tracking-wide text-subtle uppercase transition-colors duration-200 hover:text-accent"
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
