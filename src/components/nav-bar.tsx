"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
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

/** Below this width the full link row does not fit, so it collapses into a menu. */
const DESKTOP_QUERY = "(min-width: 1024px)";

const MENU_ID = "mobile-menu";

type NavBarProps = {
  dict: Dictionary;
  locale: Locale;
};

/**
 * Fixed to the top of the viewport for the whole page. On wide screens it
 * shows every section inline; on narrow ones the links move into a panel
 * behind a menu button.
 */
export function NavBar({ dict, locale }: NavBarProps) {
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const barRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // While the panel is open: lock page scroll, start focus inside it, and
  // close on Escape or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep Tab cycling through what is on screen: the bar (so language and
      // theme stay reachable) and the panel's links, nothing behind them.
      const focusables = [
        ...Array.from(barRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []),
        ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
      ].filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  // The page is scroll-locked while the panel is open, so a plain anchor jump
  // would be swallowed. A link click only records where to go and closes the
  // menu; the jump happens below, once the lock above has been released.
  const pendingTarget = useRef<string | null>(null);

  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    pendingTarget.current = id;
    setOpen(false);
  };

  // React runs every effect cleanup before any new effect, so by the time this
  // runs the scroll lock is gone. Scroll, then move focus to the section the
  // way a native in-page link would.
  useEffect(() => {
    if (open || !pendingTarget.current) return;
    const id = pendingTarget.current;
    pendingTarget.current = null;

    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView();
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
      once: true,
    });
    history.pushState(null, "", `#${id}`);
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div
          ref={barRef}
          className="mx-auto flex h-16 w-full max-w-[100rem] items-center gap-4 px-4 sm:px-6 lg:px-10"
        >
          <a
            href="#home"
            aria-label={dict.nav.home}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg bg-accent text-on-accent lg:hidden"
          >
            <Monogram />
          </a>

          <nav aria-label={dict.a11y.mainNav} className="hidden min-w-0 flex-1 lg:block">
            <ul className="flex items-center gap-1">
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

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <LanguageToggle current={locale} labels={dict.a11y} />
            <ThemeToggle labels={dict.a11y} />
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={open ? dict.a11y.closeMenu : dict.a11y.openMenu}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors duration-200 hover:border-accent hover:text-accent lg:hidden"
            >
              {open ? (
                <X className="size-[18px]" strokeWidth={1.75} aria-hidden />
              ) : (
                <Menu className="size-[18px]" strokeWidth={1.75} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      {/*
        A sibling of the bar rather than a child: the bar's backdrop-filter
        makes it the containing block for fixed descendants, which would
        clip the panel to the bar's 64px.
      */}
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id={MENU_ID}
            className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-background lg:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            // Tapping the empty area under the links closes the menu.
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <nav aria-label={dict.a11y.mainNav} className="mx-auto w-full max-w-[100rem] px-4 py-4 sm:px-6">
              <ul className="flex flex-col">
                {SECTION_IDS.map((id, index) => {
                  const isActive = active === id;
                  return (
                    <li key={id}>
                      <a
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={`#${id}`}
                        onClick={(event) => goTo(event, id)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "flex h-14 cursor-pointer items-center justify-between border-b border-border font-mono text-sm font-medium tracking-[0.14em] uppercase transition-colors duration-200",
                          isActive ? "text-accent" : "text-foreground hover:text-accent",
                        )}
                      >
                        {dict.nav[id]}
                        {isActive ? (
                          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                        ) : null}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/** The F monogram from the favicon, drawn in the current text colour. */
function Monogram() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" fill="currentColor" aria-hidden>
      <rect x="10" y="7" width="12" height="4" rx="1" />
      <rect x="10" y="13.5" width="8.5" height="4" rx="1" />
      <rect x="10" y="7" width="4" height="18" rx="1" />
    </svg>
  );
}
