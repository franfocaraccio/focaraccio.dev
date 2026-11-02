import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { profile } from "@/content/cv";

const socials = [
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: profile.github, label: "GitHub", Icon: GithubIcon },
];

/**
 * Circular portrait inside a thick ring.
 *
 * The ring is a filled circle of the raised surface colour rather than a
 * border, so it reads as a mat the photo is mounted on and follows the theme.
 * The photo itself is black and white: it was shot against a plain light wall
 * under flat light, and dropping the colour turns that into a studio look
 * instead of something to correct.
 */
export function Portrait() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="rounded-full bg-surface-raised p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] sm:p-5">
        <Image
          src={profile.photo}
          alt={profile.name}
          width={720}
          height={720}
          sizes="(min-width: 640px) 20rem, 16rem"
          className="size-64 rounded-full object-cover sm:size-80"
        />
      </div>

      <ul className="flex items-center gap-2">
        {socials.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Icon className="size-[18px]" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
