"use client";

import { ChevronDown, Download } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Download button that offers the CV in every language, whichever language the
 * page is in. A disclosure rather than an ARIA menu: the options are plain
 * links, so Tab moves through them and they work as links do.
 */
export function ResumeMenu({
  label,
  languages,
}: {
  label: string;
  languages: Record<Locale, string>;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      // Close once focus leaves the button and its options.
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-12 cursor-pointer items-center gap-2 rounded-lg border bg-surface px-6 text-sm font-medium transition-colors duration-200 hover:border-accent hover:text-accent",
          open ? "border-accent text-accent" : "border-border",
        )}
      >
        <Download className="size-4" strokeWidth={2} aria-hidden />
        {label}
        <ChevronDown
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      <ul
        id={listId}
        hidden={!open}
        className="absolute top-full left-1/2 z-20 mt-2 w-full min-w-40 -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-surface p-1 text-left shadow-lg"
      >
        {locales.map((locale) => (
          <li key={locale}>
            <a
              // Through the counting route, which redirects to profile.resumes[locale].
              href={`/api/cv/${locale}`}
              download
              hrefLang={locale}
              type="application/pdf"
              onClick={() => setOpen(false)}
              className="flex h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-3 text-sm transition-colors duration-200 hover:bg-surface-raised hover:text-accent focus-visible:bg-surface-raised"
            >
              <span>{languages[locale]}</span>
              <span className="font-mono text-[0.6875rem] tracking-wide text-subtle">PDF</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
