import { notFound } from "next/navigation";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { Sidebar } from "@/components/sidebar";
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
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-on-accent"
      >
        {dict.a11y.skipToContent}
      </a>

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[100rem] px-6 py-12 sm:px-10 lg:px-12 xl:flex xl:justify-between xl:gap-20 xl:px-16 xl:py-0 2xl:gap-24 2xl:px-24">
        <Sidebar dict={dict} locale={locale} />

        <main id="content" className="pt-16 xl:min-w-0 xl:flex-1 xl:py-24">
          <About dict={dict} />
          <Experience dict={dict} />
          <Projects dict={dict} />
          <TechStack dict={dict} />
          <Education dict={dict} />
          <Contact dict={dict} />

          <footer className="text-xs leading-relaxed text-subtle">
            <p>
              © {new Date().getFullYear()} {profile.name}. {dict.footer.rights}
            </p>
            <p className="mt-1">{dict.footer.builtWith}</p>
          </footer>
        </main>
      </div>
    </>
  );
}
