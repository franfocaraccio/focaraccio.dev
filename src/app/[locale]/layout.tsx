import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Raleway } from "next/font/google";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary, profile } from "@/content/cv";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display face, used only for the name in the hero. Raleway is a variable
// font, so no explicit weights: asking for a list of them emits one @font-face
// per weight, which `next dev` fails to resolve ("next/font/google queries have
// exactly one entry"). Production builds happen to survive it; dev does not.
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Every route lives under a locale segment, so this doubles as the app's root
 * layout — it owns <html> and can therefore set `lang` per language.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2ede3" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f14" },
  ],
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);
  const title = `${profile.name} — ${dict.hero.role}`;

  return {
    metadataBase: new URL(profile.site),
    title,
    description: dict.hero.tagline,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "profile",
      title,
      description: dict.hero.tagline,
      url: `/${locale}`,
      locale: locale === "es" ? "es_AR" : "en_US",
      siteName: profile.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.hero.tagline,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${raleway.variable} ${jetBrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
