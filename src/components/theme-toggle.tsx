"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
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

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
