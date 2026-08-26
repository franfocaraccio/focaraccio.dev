import Image from "next/image";
import { profile } from "@/content/cv";

/**
 * Cut-out portrait. The subject sits directly on the page with no frame, over
 * a soft accent glow so the figure has something to stand against rather than
 * floating in empty space.
 */
export function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[26rem]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-[8%] bottom-[12%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, var(--accent-soft), transparent 70%)",
        }}
      />
      <Image
        src={profile.photo}
        alt={profile.name}
        width={900}
        height={852}
        sizes="(max-width: 460px) 100vw, 26rem"
        priority
        className="relative h-auto w-full"
      />
    </div>
  );
}
