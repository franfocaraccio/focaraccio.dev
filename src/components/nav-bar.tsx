"use client";

import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Dictionary } from "@/content/cv";
import type { Locale } from "@/lib/i18n";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "projects",
  "stack",
  "education",
  "contact",
] as const;

type NavBarProps = {
  dict: Dictionary;
  locale: Locale;
};

/** Fixed to the top of the viewport for the whole page. */
export function NavBar({ dict, locale }: NavBarProps) {
  const active = useActiveSection(SECTION_IDS);

  return (
    <div className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[100rem] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <nav aria-label={dict.a11y.openMenu} className="min-w-0 flex-1">
          {/* Scrolls sideways on narrow screens rather than wrapping to two rows. */}
          <ul className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SECTION_IDS.map((id) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative inline-flex h-11 shrink-0 cursor-pointer items-center rounded-md px-3 font-mono text-[0.6875rem] font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-200",
                      isActive
                        ? "text-accent"
                        : "text-subtle hover:text-foreground",
                    )}
                  >
                    {dict.nav[id]}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 bottom-2 h-px transition-opacity duration-200",
                        isActive ? "bg-accent opacity-100" : "opacity-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle current={locale} labels={dict.a11y} />
          <ThemeToggle labels={dict.a11y} />
        </div>
      </div>
    </div>
  );
}
