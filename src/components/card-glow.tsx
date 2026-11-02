"use client";

import { useEffect, useRef } from "react";

/**
 * A soft glow, plus a brighter rim on the card's border, that follows the
 * pointer while it is over the card. Drop it in as the first child of a card
 * that has `relative isolate`; the styling lives in globals.css (`.card-glow`).
 *
 * Only wired up on devices with a precise, hovering pointer — there is nothing
 * to follow on touch screens.
 */
export function CardGlow() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const glow = ref.current;
    const card = glow?.parentElement;
    if (!glow || !card) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const bounds = card.getBoundingClientRect();
      glow.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
      glow.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
    };

    card.addEventListener("pointermove", onMove);
    return () => card.removeEventListener("pointermove", onMove);
  }, []);

  return <span ref={ref} aria-hidden className="card-glow" />;
}
