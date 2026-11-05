import { isLocale, locales, type Locale } from "@/lib/i18n";
import { pipeline, toCounts } from "@/lib/redis";

/*
 * Download records in Redis:
 *   cv:downloads             hash  locale  → total
 *   cv:countries:<locale>    hash  country → count (ISO code from Vercel, "XX" if unknown)
 *   cv:log                   list  one JSON entry per download, newest first, capped at LOG_LIMIT
 * Each log entry holds the time, language, country and city Vercel reports.
 * No IP, user agent or anything else that identifies a visitor is stored.
 */

const LOG_LIMIT = 1000;

/** Link-preview crawlers and scripts that fetch the URL without anyone downloading. */
const BOT_PATTERN =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|linkedin|whatsapp|telegram|slack|discord|curl|wget|python|headless|lighthouse/i;

export function isBot(userAgent: string | null) {
  return !userAgent || BOT_PATTERN.test(userAgent);
}

export type Download = {
  /** ISO timestamp, UTC. */
  at: string;
  locale: Locale;
  country: string;
  city: string | null;
};

export async function recordDownload({ at, locale, country, city }: Download) {
  await pipeline([
    ["HINCRBY", "cv:downloads", locale, 1],
    ["HINCRBY", `cv:countries:${locale}`, country, 1],
    ["LPUSH", "cv:log", JSON.stringify({ at, locale, country, city })],
    ["LTRIM", "cv:log", 0, LOG_LIMIT - 1],
  ]);
}

export type DownloadStats = {
  totals: Record<Locale, number>;
  /** Country code → downloads per locale, busiest first. */
  countries: { code: string; counts: Record<Locale, number>; total: number }[];
  /** Every logged download, newest first. */
  downloads: Download[];
};

const perLocale = (counts: Record<string, number>) =>
  Object.fromEntries(locales.map((l) => [l, counts[l] ?? 0])) as Record<Locale, number>;

function parseDownload(entry: unknown): Download | null {
  try {
    const value = JSON.parse(String(entry)) as Partial<Download>;
    if (typeof value.at !== "string" || !value.locale || !isLocale(value.locale)) return null;
    return {
      at: value.at,
      locale: value.locale,
      country: value.country ?? "XX",
      city: value.city ?? null,
    };
  } catch {
    return null;
  }
}

export async function readDownloadStats(): Promise<DownloadStats> {
  const [totals, ...rest] = await pipeline(
    [
      ["HGETALL", "cv:downloads"],
      ...locales.map((l) => ["HGETALL", `cv:countries:${l}`]),
      ["LRANGE", "cv:log", 0, LOG_LIMIT - 1],
    ],
    { readOnly: true },
  );
  const countryReplies = rest.slice(0, locales.length).map(toCounts);
  const log = rest[locales.length];

  const codes = new Set(countryReplies.flatMap((counts) => Object.keys(counts)));
  const countries = [...codes]
    .map((code) => {
      const counts = perLocale(
        Object.fromEntries(locales.map((l, i) => [l, countryReplies[i][code] ?? 0])),
      );
      return { code, counts, total: locales.reduce((sum, l) => sum + counts[l], 0) };
    })
    .sort((a, b) => b.total - a.total);

  return {
    totals: perLocale(toCounts(totals)),
    countries,
    downloads: (Array.isArray(log) ? log : [])
      .map(parseDownload)
      .filter((d): d is Download => d !== null),
  };
}
