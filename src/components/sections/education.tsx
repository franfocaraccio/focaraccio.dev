import { Reveal } from "@/components/reveal";
import { Section } from "@/components/sections/section";
import type { Dictionary } from "@/content/cv";

export function Education({ dict }: { dict: Dictionary }) {
  return (
    <Section id="education" title={dict.sections.education}>
      <Reveal className="flex flex-col gap-6">
        <ol className="flex flex-col gap-5">
          {dict.education.items.map((item) => (
            <li
              key={item.degree}
              className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
            >
              <p className="tabular pt-0.5 font-mono text-xs tracking-wide text-subtle uppercase">
                {item.period}
              </p>
              <div>
                <h3 className="text-base font-medium">{item.degree}</h3>
                <p className="mt-0.5 text-sm text-muted">{item.school}</p>
                {item.note ? (
                  <p className="tabular mt-0.5 font-mono text-xs text-subtle">
                    {item.note}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h3 className="font-mono text-[0.6875rem] font-semibold tracking-[0.14em] text-subtle uppercase">
            {dict.education.languagesTitle}
          </h3>
          <ul className="mt-3 flex flex-col gap-1.5">
            {dict.education.languages.map((language) => (
              <li key={language.name} className="flex items-baseline gap-2 text-sm">
                <span className="font-medium">{language.name}</span>
                <span className="text-subtle">— {language.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
