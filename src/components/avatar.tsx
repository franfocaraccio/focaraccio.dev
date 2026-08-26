"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/content/cv";
import { cn } from "@/lib/utils";

/**
 * Profile picture with a monogram fallback, so the layout still looks finished
 * while the real photo has not been dropped into /public yet.
 */
export function Avatar({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  if (failed) {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex size-16 shrink-0 items-center justify-center rounded-full border border-border bg-surface-raised font-mono text-4xl font-medium text-accent",
          className,
        )}
      >
        {initials}
      </span>
    );
  }

  return (
    <Image
      src={profile.photo}
      alt={profile.name}
      width={512}
      height={512}
      sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
      priority
      onError={() => setFailed(true)}
      className={cn(
        "size-16 shrink-0 rounded-full border border-border object-cover",
        className,
      )}
    />
  );
}
