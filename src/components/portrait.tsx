import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { profile } from "@/content/cv";

const socials = [
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: profile.github, label: "GitHub", Icon: GithubIcon },
];

/**
 * Photo card: the portrait fills a rounded frame with the social links laid
 * over it. The photo was shot against a plain light wall, which here becomes
 * the card's own background — no cut-out needed, and the dark chips give the
 * light frame something to anchor against.
 */
export function Portrait() {
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
    </div>
  );
}
