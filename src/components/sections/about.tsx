import { Reveal } from "@/components/reveal";
import { Section } from "@/components/sections/section";
import type { Dictionary } from "@/content/cv";
import { yearsOfExperience } from "@/lib/experience";

// Resolved once at module load so the render stays pure. The page is
// prerendered, so this refreshes on every build.
const years = yearsOfExperience();

export function About({ dict }: { dict: Dictionary }) {
  return (
    <Section id="about" title={dict.sections.about}>
      <Reveal className="flex flex-col gap-4">
        {dict.about.paragraphs.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}

        <p className="mt-2 flex items-baseline gap-3">
          <span className="tabular font-mono text-4xl font-semibold text-accent">
            {years}+
          </span>
          <span className="text-sm text-subtle">{dict.about.yearsLabel}</span>
        </p>
      </Reveal>
    </Section>
  );
}
