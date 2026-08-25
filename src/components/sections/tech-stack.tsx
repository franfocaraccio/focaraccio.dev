import { Reveal } from "@/components/reveal";
import { Section } from "@/components/sections/section";
import { TechTag } from "@/components/tech-tag";
import { skillGroups, type Dictionary } from "@/content/cv";

export function TechStack({ dict }: { dict: Dictionary }) {
  return (
    <Section id="stack" title={dict.sections.stack}>
      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.key} delay={index * 0.04}>
            <div className="h-full rounded-xl border border-border bg-surface p-5">
              <h3 className="font-mono text-[0.6875rem] font-semibold tracking-[0.14em] text-subtle uppercase">
                {dict.stack.groups[group.key]}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <TechTag>{item}</TechTag>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
