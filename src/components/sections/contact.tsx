import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { profile, type Dictionary } from "@/content/cv";

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mb-20 scroll-mt-24"
    >
      <Reveal className="rounded-2xl border border-border bg-surface p-8">
        <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight">
          {dict.contact.title}
        </h2>
        <p className="measure mt-3 leading-relaxed text-muted">
          {dict.contact.body}
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="group mt-6 inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-on-accent transition-opacity duration-200 hover:opacity-90"
        >
          {profile.email}
          <ArrowUpRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
            aria-hidden
          />
        </a>
      </Reveal>
    </section>
  );
}
