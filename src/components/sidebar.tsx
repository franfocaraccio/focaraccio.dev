"use client";

import { Download, Mail, MapPin } from "lucide-react";
import { useMemo } from "react";
import { Avatar } from "@/components/avatar";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile, type Dictionary } from "@/content/cv";
import type { Locale } from "@/lib/i18n";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "stack",
  "education",
] as const;

type SidebarProps = {
  dict: Dictionary;
  locale: Locale;
};

export function Sidebar({ dict, locale }: SidebarProps) {
  const ids = useMemo(() => [...SECTION_IDS], []);
  const active = useActiveSection(ids);

  const socials = [
    { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: profile.github, label: "GitHub", Icon: GithubIcon },
    { href: `mailto:${profile.email}`, label: dict.contact.cta, Icon: Mail },
  ];

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[45%] lg:flex-col lg:justify-between lg:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {profile.name}
              </h1>
              <p className="mt-1 font-mono text-sm text-accent">
                {dict.hero.role}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle current={locale} labels={dict.a11y} />
            <ThemeToggle labels={dict.a11y} />
          </div>
        </div>

        <p className="max-w-sm text-base leading-relaxed text-muted text-balance">
          {dict.hero.tagline}
        </p>

        <p className="flex items-center gap-2 text-sm text-subtle">
          <MapPin className="size-4" strokeWidth={1.75} aria-hidden />
          {dict.hero.location}
        </p>

        <nav aria-label={dict.a11y.openMenu} className="hidden lg:block">
          <ul className="flex flex-col gap-1">
            {SECTION_IDS.map((id) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex cursor-pointer items-center gap-4 py-2"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-px transition-all duration-300",
                        isActive
                          ? "w-16 bg-accent"
                          : "w-8 bg-border group-hover:w-16 group-hover:bg-muted",
                      )}
                    />
                    <span
                      className={cn(
                        "font-mono text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200",
                        isActive
                          ? "text-accent"
                          : "text-subtle group-hover:text-foreground",
                      )}
                    >
                      {dict.nav[id]}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-0">
        <a
          href={dict.hero.resumeHref}
          download
          className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-on-accent transition-opacity duration-200 hover:opacity-90"
        >
          <Download className="size-4" strokeWidth={2} aria-hidden />
          {dict.hero.resumeCta}
        </a>

        <ul className="flex items-center gap-1">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg text-subtle transition-colors duration-200 hover:text-accent"
              >
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
