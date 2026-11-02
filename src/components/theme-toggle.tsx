"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore, type MouseEvent } from "react";
import type { Dictionary } from "@/content/cv";

export function ThemeToggle({ labels }: { labels: Dictionary["a11y"] }) {
  const { resolvedTheme, setTheme } = useTheme();

  // The resolved theme is only known on the client, so the first client render
  // must still match the server's. This reads false during hydration and true
  // from then on, without an effect-driven state update.
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";
  // Before mount the label must match what the server rendered, or React
  // reports a hydration mismatch on the attributes.
  const label = isDark ? labels.switchToLight : labels.switchToDark;

  // Reveals the new theme as a circle growing out of the button. Falls back to
  // an instant switch where View Transitions are unsupported or motion is
  // reduced.
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    // Far enough to cover the corner of the viewport furthest from the button.
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const root = document.documentElement;
    const transition = document.startViewTransition(() => {
      setTheme(next);
      // next-themes applies the class in an effect after the state update, so
      // wait for it to land before the browser captures the new state.
      return new Promise<void>((resolve) => {
        const observer = new MutationObserver(() => {
          if (root.classList.contains(next)) {
            observer.disconnect();
            resolve();
          }
        });
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });
        setTimeout(() => {
          observer.disconnect();
          resolve();
        }, 500);
      });
    });

    transition.ready
      .then(() =>
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        ),
      )
      .catch(() => {
        // A skipped or aborted transition still applies the theme; nothing to do.
      });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-[18px]" strokeWidth={1.75} aria-hidden />
        ) : (
          <Moon className="size-[18px]" strokeWidth={1.75} aria-hidden />
        )
      ) : (
        <span className="size-[18px]" />
      )}
    </button>
  );
}

/** The "is hydrated" store never changes after mount, so there is nothing to subscribe to. */
function subscribeToNothing() {
  return () => {};
}
