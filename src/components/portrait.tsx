import Image from "next/image";
import { profile } from "@/content/cv";

const SIZE = 800;
const SIZES = "(min-width: 640px) 22rem, 20rem";
const SHARED = "mx-auto h-auto w-full max-w-[20rem] sm:max-w-[22rem]";

/**
 * Circular portrait whose edge dissolves into the page instead of ending on a
 * hard rim.
 *
 * Two assets rather than one: the photo was shot against a light wall, so the
 * fade alone melts into a light page but reads as a glowing disc on a dark one.
 * The dark variant has its highlights pulled down to stop that; applying the
 * same treatment in light mode would leave a grey halo instead. They are
 * swapped with CSS, since the theme is a class on <html>, not a media query —
 * only one is ever displayed, so both can carry the same alt text without a
 * screen reader announcing it twice.
 */
export function Portrait() {
  return (
    <div className="relative">
      <Image
        src={profile.photoDark}
        alt={profile.name}
        width={SIZE}
        height={SIZE}
        sizes={SIZES}
        className={`${SHARED} hidden dark:block`}
      />
      <Image
        src={profile.photoLight}
        alt={profile.name}
        width={SIZE}
        height={SIZE}
        sizes={SIZES}
        className={`${SHARED} block dark:hidden`}
      />
    </div>
  );
}
