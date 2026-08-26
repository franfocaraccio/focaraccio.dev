import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { NavBar } from "@/components/nav-bar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { Spotlight } from "@/components/spotlight";
import { getDictionary, profile } from "@/content/cv";
import { isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Spotlight />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-on-accent"
      >
        {dict.a11y.skipToContent}
      </a>

      <NavBar dict={dict} locale={locale} />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <Hero dict={dict} />

        <main>
          <About dict={dict} />
          <Experience dict={dict} />
          <Projects dict={dict} />
          <TechStack dict={dict} />
          <Education dict={dict} />
          <Contact dict={dict} />
        </main>

        <footer className="border-t border-border px-6 py-10 text-center text-xs leading-relaxed text-subtle">
          <p>
            © {new Date().getFullYear()} {profile.name}. {dict.footer.rights}
          </p>
          <p className="mt-1">{dict.footer.builtWith}</p>
        </footer>
      </div>
    </>
  );
}
