import { locales, type Locale } from "@/lib/i18n";
import { pipeline, toCounts } from "@/lib/redis";

/*
 * Download counters, all Redis hashes:
 *   cv:downloads             locale  → total
 *   cv:countries:<locale>    country → count (ISO code from Vercel, "XX" if unknown)
 *   cv:daily:<YYYY-MM-DD>    locale  → count (UTC day)
 * No IP, user agent or anything else that identifies a visitor is stored.
 */

/** Link-preview crawlers and scripts that fetch the URL without anyone downloading. */
const BOT_PATTERN =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|linkedin|whatsapp|telegram|slack|discord|curl|wget|python|headless|lighthouse/i;

export function isBot(userAgent: string | null) {
  return !userAgent || BOT_PATTERN.test(userAgent);
}

const utcDay = (date: Date) => date.toISOString().slice(0, 10);

export async function recordDownload(locale: Locale, country: string) {
  await pipeline([
    ["HINCRBY", "cv:downloads", locale, 1],
    ["HINCRBY", `cv:countries:${locale}`, country, 1],
    ["HINCRBY", `cv:daily:${utcDay(new Date())}`, locale, 1],
  ]);
}

export type DownloadStats = {
  totals: Record<Locale, number>;
  /** Country code → downloads per locale, busiest first. */
  countries: { code: string; counts: Record<Locale, number>; total: number }[];
  /** The last `days` UTC days, most recent first, including days without downloads. */
  daily: { day: string; counts: Record<Locale, number> }[];
};

const perLocale = (counts: Record<string, number>) =>
  Object.fromEntries(locales.map((l) => [l, counts[l] ?? 0])) as Record<Locale, number>;

export async function readDownloadStats(days = 30): Promise<DownloadStats> {
  const today = Date.now();
  const dayKeys = Array.from({ length: days }, (_, i) => utcDay(new Date(today - i * 86_400_000)));

  const [totals, ...rest] = await pipeline(
    [
      ["HGETALL", "cv:downloads"],
      ...locales.map((l) => ["HGETALL", `cv:countries:${l}`]),
      ...dayKeys.map((day) => ["HGETALL", `cv:daily:${day}`]),
    ],
    { readOnly: true },
  );
  const countryReplies = rest.slice(0, locales.length).map(toCounts);
  const dailyReplies = rest.slice(locales.length).map(toCounts);

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
    daily: dayKeys.map((day, i) => ({ day, counts: perLocale(dailyReplies[i]) })),
  };
}
