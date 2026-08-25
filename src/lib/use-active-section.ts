"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the sidebar nav can highlight
 * it. Picks the topmost intersecting section rather than the last one to fire,
 * which keeps the highlight stable when scrolling upwards.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A band across the upper-middle of the viewport: a section counts as
      // active once its heading area reaches reading position.
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
