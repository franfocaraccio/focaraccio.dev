"use client";

import { ArrowDown, Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { profile, type Dictionary } from "@/content/cv";

const socials = [
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: profile.github, label: "GitHub", Icon: GithubIcon },
];

/**
 * Full-viewport opening screen. Holds the identity at a size the rest of the
 * page never repeats, then hands off to the navigation once scrolled past.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  const prefersReducedMotion = useReducedMotion();

  const rise = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="home"
      aria-label={dict.nav.home}
      // Leaves room for the navigation resting against the bottom edge.
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 pt-24 pb-32 text-center"
    >
      {/* Faint grid, fading out towards the edges, to keep the field from reading as flat black. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative flex flex-col items-center">
        <motion.h1
          {...rise(0)}
          className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] font-bold tracking-[-0.045em] text-balance"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          {...rise(0.08)}
          className="mt-4 font-mono text-[clamp(0.875rem,2vw,1.375rem)] tracking-wide text-accent"
        >
          {dict.hero.role}
        </motion.p>

        <motion.p
          {...rise(0.16)}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted text-balance sm:text-lg"
        >
          {dict.hero.tagline}
        </motion.p>

        <motion.div
          {...rise(0.24)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#about"
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-lg bg-accent px-6 text-sm font-medium text-on-accent transition-opacity duration-200 hover:opacity-90"
          >
            {dict.hero.secondaryCta}
          </a>
          {/* Only offered in languages that actually have a CV to download. */}
          {dict.hero.resumeHref ? (
            <a
              href={dict.hero.resumeHref}
              download
              className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-lg border border-border bg-surface px-6 text-sm font-medium transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Download className="size-4" strokeWidth={2} aria-hidden />
              {dict.hero.resumeCta}
            </a>
          ) : null}

          <ul className="flex items-center gap-1">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="inline-flex size-12 cursor-pointer items-center justify-center rounded-lg text-subtle transition-colors duration-200 hover:text-accent"
                >
                  <Icon className="size-5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.a
        {...rise(0.36)}
        href="#about"
        aria-label={dict.hero.scrollHint}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 font-mono text-[0.625rem] tracking-[0.2em] text-subtle uppercase transition-colors duration-200 hover:text-accent lg:flex"
      >
        {dict.hero.scrollHint}
        <ArrowDown className="size-4 animate-bounce" strokeWidth={1.75} aria-hidden />
      </motion.a>
    </section>
  );
}
