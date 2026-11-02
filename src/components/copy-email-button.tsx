"use client";

import { Check, Copy, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { profile, type Dictionary } from "@/content/cv";
import { cn } from "@/lib/utils";

type Status = "copied" | "failed" | null;

type CopyEmailButtonProps = {
  labels: Dictionary["contact"];
  size?: "sm" | "md";
};

const TOAST_MS = 2500;

/**
 * Copies the email address to the clipboard and confirms it with a toast.
 *
 * The toast is portalled to <body>: it is position: fixed, and the sections it
 * is used in sit inside reveal animations whose transforms would otherwise
 * become its containing block. Screen readers are told through a live region
 * that stays mounted next to the button, which announces more reliably than
 * one that appears together with its message.
 */
export function CopyEmailButton({ labels, size = "md" }: CopyEmailButtonProps) {
  const [status, setStatus] = useState<Status>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribeToNothing, () => true, () => false);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    const next: Status = (await writeToClipboard(profile.email)) ? "copied" : "failed";
    setStatus(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(null), TOAST_MS);
  };

  const message = status === "copied" ? labels.copied : status === "failed" ? labels.copyFailed : "";
  const Icon = status === "copied" ? Check : Copy;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={labels.copyEmail}
        title={labels.copyEmail}
        className={cn(
          "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors duration-200 hover:border-accent hover:text-accent",
          size === "md" ? "size-12" : "size-8",
          status === "copied" && "border-accent text-accent",
        )}
      >
        <Icon className={size === "md" ? "size-[18px]" : "size-3.5"} strokeWidth={1.75} aria-hidden />
      </button>
      <span role="status" className="sr-only">
        {message}
      </span>

      {hydrated
        ? createPortal(
            <AnimatePresence>
              {status ? (
                <motion.div
                  key={status}
                  aria-hidden
                  className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-lg"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {status === "copied" ? (
                    <Check className="size-4" strokeWidth={2} aria-hidden />
                  ) : (
                    <X className="size-4" strokeWidth={2} aria-hidden />
                  )}
                  {message}
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}

/**
 * Tries the Clipboard API first, then the legacy copy command. The fallback
 * matters in embedded browsers — the in-app browsers of LinkedIn and similar
 * apps among them — which can deny the clipboard-write permission outright.
 */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fall through to the legacy path.
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    field.remove();
  }
}

/** The "is hydrated" store never changes after mount, so there is nothing to subscribe to. */
function subscribeToNothing() {
  return () => {};
}
