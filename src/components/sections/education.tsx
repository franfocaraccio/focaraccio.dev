import { Reveal } from "@/components/reveal";
import { Section } from "@/components/sections/section";
import type { Dictionary } from "@/content/cv";

export function Education({ dict }: { dict: Dictionary }) {
  return (
    <Section id="education" title={dict.sections.education}>
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <Reveal>
          <ol className="flex flex-col gap-8">
            {dict.education.items.map((item) => (
              <li key={item.degree}>
                <p className="tabular font-mono text-xs tracking-[0.14em] text-subtle uppercase">
                  {item.period}
                </p>
                <h3 className="mt-2 text-lg font-medium">{item.degree}</h3>
                <p className="mt-1 text-sm text-muted">{item.school}</p>
                {item.note ? (
                  <p className="tabular mt-1 font-mono text-xs text-subtle">
                    {item.note}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-mono text-[0.6875rem] font-semibold tracking-[0.14em] text-subtle uppercase">
              {dict.education.languagesTitle}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {dict.education.languages.map((language) => (
                <li key={language.name}>
                  <p className="font-medium">{language.name}</p>
                  <p className="text-sm text-subtle">{language.level}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
