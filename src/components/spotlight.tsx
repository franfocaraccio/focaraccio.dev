"use client";

import { useEffect, useState } from "react";

/**
 * A soft radial glow that follows the pointer. Purely decorative, so it is
 * skipped entirely on touch devices and when reduced motion is requested.
 */
export function Spotlight() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        setPosition({ x: event.clientX, y: event.clientY }),
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!position) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden transition-opacity duration-300 lg:block"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--accent-soft), transparent 70%)`,
      }}
    />
  );
}
