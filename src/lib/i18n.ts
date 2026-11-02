export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

/**
 * English first: it is what a visitor gets when their browser asks for no
 * language or one the site does not have, and what link-preview crawlers that
 * send no Accept-Language end up seeing.
 */
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** The label shown on the language switcher for each locale. */
export const localeNames: Record<Locale, { short: string; long: string }> = {
  es: { short: "ES", long: "Español" },
  en: { short: "EN", long: "English" },
};

/**
 * Picks the best locale from an Accept-Language header, falling back to the
 * default when the header is missing or lists nothing we support.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        tag: tag.trim().toLowerCase(),
        quality: q ? Number.parseFloat(q.split("=")[1]) || 0 : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}
