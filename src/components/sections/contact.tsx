import { ArrowUpRight, CalendarDays } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { CopyEmailButton } from "@/components/copy-email-button";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/sections/section";
import { profile, type Dictionary } from "@/content/cv";

const socials = [
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: profile.github, label: "GitHub", Icon: GithubIcon },
];

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <Section id="contact" title={dict.contact.title} tinted>
      <Reveal className="flex flex-col items-center text-center">
        <p className="measure leading-relaxed text-muted">{dict.contact.body}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Booking is the primary action: it skips the back-and-forth of
              agreeing on a time over email. */}
          <a
            href={profile.booking}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-12 cursor-pointer items-center gap-2 rounded-lg bg-accent px-6 text-sm font-medium text-on-accent transition-opacity duration-200 hover:opacity-90"
          >
            <CalendarDays className="size-4" strokeWidth={2} aria-hidden />
            {dict.contact.bookCall}
            <ArrowUpRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </a>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-12 cursor-pointer items-center rounded-lg border border-border bg-surface px-5 text-sm font-medium transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              {profile.email}
            </a>
            <CopyEmailButton labels={dict.contact} />
          </div>
        </div>

        <ul className="mt-6 flex items-center gap-1">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex size-12 cursor-pointer items-center justify-center rounded-lg text-subtle transition-colors duration-200 hover:text-accent"
              >
                <Icon className="size-5" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
