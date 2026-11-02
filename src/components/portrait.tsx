import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { profile, type Dictionary } from "@/content/cv";
import { yearsOfExperience } from "@/lib/experience";

const years = yearsOfExperience();

const socials = [
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: profile.github, label: "GitHub", Icon: GithubIcon },
];

/**
 * Photo card: the portrait fills a rounded frame with the interface laid over
 * it. The photo was shot against a plain light wall, which here becomes the
 * card's own background — no cut-out needed, and the dark overlays give the
 * light frame something to anchor against.
 *
 * The 4:5 crop puts the face in the upper half so the name card at the bottom
 * lands on the shirt.
 */
export function Portrait({ dict }: { dict: Dictionary }) {
  return (
    <div className="relative mx-auto w-full max-w-[24rem] overflow-hidden rounded-3xl border border-border sm:max-w-[26rem]">
      <Image
        src={profile.photo}
        alt={profile.name}
        width={1000}
        height={1250}
        sizes="(min-width: 640px) 26rem, 24rem"
        className="h-auto w-full"
      />

      <ul className="absolute top-4 left-4 flex items-center gap-2 sm:top-5 sm:left-5">
        {socials.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-overlay/85 text-on-overlay backdrop-blur-sm transition-colors duration-200 hover:text-on-overlay-accent"
            >
              <Icon className="size-[18px]" aria-hidden />
            </a>
          </li>
        ))}
      </ul>

      <p className="absolute top-4 right-4 inline-flex h-11 items-center gap-2 rounded-full bg-overlay/85 px-4 text-xs font-medium text-on-overlay backdrop-blur-sm sm:top-5 sm:right-5">
        <span aria-hidden className="size-2 shrink-0 rounded-full bg-on-overlay-accent" />
        {dict.about.available}
      </p>

      <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-overlay/90 p-5 text-on-overlay backdrop-blur-sm sm:inset-x-5 sm:bottom-5">
        <p className="text-sm text-on-overlay-muted">{dict.about.intro}</p>
        <p className="mt-0.5 text-lg font-semibold tracking-tight">
          {profile.name}
        </p>
        <p className="mt-1 font-mono text-xs tracking-wide text-on-overlay-accent">
          {dict.hero.role}
        </p>
        <p className="mt-3 border-t border-overlay-border pt-3 text-xs text-on-overlay-muted">
          <span className="tabular font-mono text-sm font-medium text-on-overlay">
            {years}+
          </span>{" "}
          {dict.about.yearsLabel}
        </p>
      </div>
    </div>
  );
}
