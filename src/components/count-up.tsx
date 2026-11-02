"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
};

/**
 * A number that counts up from zero the first time it scrolls into view.
 *
 * The final value is what the server renders, so crawlers, no-JS visitors and
 * anyone with reduced motion simply see the real figure. Screen readers get it
 * from a static copy rather than the animating one.
 */
export function CountUp({ value, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!inView || prefersReducedMotion || !element) return;

    const controls = animate(0, value, {
      duration: 2.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (current) => {
        element.textContent = `${Math.round(current)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, prefersReducedMotion, value, suffix]);

  return (
    <>
      <span ref={ref} aria-hidden>
        {`${value}${suffix}`}
      </span>
      <span className="sr-only">{`${value}${suffix}`}</span>
    </>
  );
}
