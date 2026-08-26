import { Mail, MapPin, Phone } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/sections/section";
import { profile, type Dictionary } from "@/content/cv";
import { yearsOfExperience } from "@/lib/experience";

// Resolved once at module load so the render stays pure. The page is
// prerendered, so this refreshes on every build.
const years = yearsOfExperience();

export function About({ dict }: { dict: Dictionary }) {
  return (
    <Section id="about" title={dict.sections.about}>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <Reveal className="flex flex-col gap-5">
          <p className="font-mono text-sm tracking-wide text-accent">
            {dict.hero.greeting}
          </p>

          {dict.about.paragraphs.map((paragraph, index) => (
            <p key={index} className="measure leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}

          <p className="mt-2 flex items-baseline gap-3">
            <span className="tabular font-mono text-5xl font-semibold text-accent">
              {years}+
            </span>
            <span className="text-sm text-subtle">{dict.about.yearsLabel}</span>
          </p>

          <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
            <li className="flex items-center gap-3">
              <Mail
                className="size-4 shrink-0 text-subtle"
                strokeWidth={1.75}
                aria-hidden
              />
              <a
                href={`mailto:${profile.email}`}
                className="cursor-pointer transition-colors duration-200 hover:text-accent"
              >
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone
                className="size-4 shrink-0 text-subtle"
                strokeWidth={1.75}
                aria-hidden
              />
              <span className="tabular">{profile.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin
                className="size-4 shrink-0 text-subtle"
                strokeWidth={1.75}
                aria-hidden
              />
              {dict.hero.location}
            </li>
          </ul>
        </Reveal>

        {/* Photo leads on narrow screens, sits alongside the copy on wide ones. */}
        <Reveal delay={0.1} className="order-first lg:order-none">
          <Avatar className="mx-auto size-48 rounded-2xl sm:size-64 lg:size-80" />
        </Reveal>
      </div>
    </Section>
  );
}
