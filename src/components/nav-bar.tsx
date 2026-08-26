"use client";

import { useEffect, useState } from "react";
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

/** Share of the hero that must still be visible for the bar to stay at the bottom. */
const PIN_THRESHOLD = 0.4;

type NavBarProps = {
  dict: Dictionary;
  locale: Locale;
};

/**
 * Rests against the bottom of the hero, then pins to the top of the viewport
 * once the hero is scrolled past — so the opening screen stays uninterrupted
 * and the navigation is always reachable afterwards.
 */
export function NavBar({ dict, locale }: NavBarProps) {
  const active = useActiveSection(SECTION_IDS);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      // Pins once most of the hero has scrolled away, rather than on the first
      // few pixels of movement.
      ([entry]) => setPinned(entry.intersectionRatio < PIN_THRESHOLD),
      { threshold: [0, PIN_THRESHOLD, 1] },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-40 transition-[opacity,transform] duration-300",
        pinned
          ? "top-0 border-b border-border bg-background/85 backdrop-blur-md"
          : "bottom-0",
      )}
    >
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
