"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/cv";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  current: Locale;
  labels: Dictionary["a11y"];
};

/**
 * A two-option segmented control. Each option is a real link so the language
 * choice is shareable, crawlable, and works without JavaScript.
 */
export function LanguageToggle({ current, labels }: LanguageToggleProps) {
  const pathname = usePathname();

  const pathWithout = (locale: Locale) =>
    pathname.replace(new RegExp(`^/${current}`), `/${locale}`) || `/${locale}`;

  return (
    <div
      role="group"
      aria-label={labels.languageSwitch}
      className="inline-flex h-11 items-center rounded-lg border border-border bg-surface p-1"
    >
      {locales.map((locale) => {
        const isActive = locale === current;
        return (
          <Link
            key={locale}
            href={pathWithout(locale)}
            hrefLang={locale}
            aria-current={isActive ? "true" : undefined}
            title={localeNames[locale].long}
            className={cn(
              "inline-flex h-full min-w-11 cursor-pointer items-center justify-center rounded-md px-3 font-mono text-xs font-medium tracking-wide transition-colors duration-200",
              isActive
                ? "bg-accent-soft text-accent"
                : "text-subtle hover:text-foreground",
            )}
          >
            {localeNames[locale].short}
            <span className="sr-only"> — {localeNames[locale].long}</span>
          </Link>
        );
      })}
    </div>
  );
}
