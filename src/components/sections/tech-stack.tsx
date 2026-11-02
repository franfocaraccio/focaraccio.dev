import { CardGlow } from "@/components/card-glow";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/sections/section";
import { TechTag } from "@/components/tech-tag";
import { skillGroups, type Dictionary } from "@/content/cv";

export function TechStack({ dict }: { dict: Dictionary }) {
  return (
    <Section id="stack" title={dict.sections.stack} tinted>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {skillGroups.map((group, index) => (
          <Reveal key={group.key} delay={index * 0.04} className="h-full">
            <div className="relative isolate h-full rounded-2xl border border-border bg-surface p-6">
              <CardGlow />
              <h3 className="font-mono text-[0.6875rem] font-semibold tracking-[0.14em] text-subtle uppercase">
                {dict.stack.groups[group.key]}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
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
