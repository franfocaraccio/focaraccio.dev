import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/cv";
import { readDownloadStats, type DownloadStats } from "@/lib/cv-downloads";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { isStatsAuthorized } from "@/lib/stats-auth";

/** Argentina's zone: UTC-3 all year, with no daylight saving time. */
const timeFormat = new Intl.DateTimeFormat("es-AR", {
  timeZone: "America/Argentina/Buenos_Aires",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const formatTime = (iso: string) => timeFormat.format(new Date(iso));

const regionNames = new Intl.DisplayNames(["es"], { type: "region" });

/** Language names in Spanish, the page's language, rather than in each language's own. */
const languageNames = getDictionary("es").hero.resumeLanguages;

function countryName(code: string) {
  if (code === "XX") return "Desconocido";
  try {
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

const sum = (counts: Record<Locale, number>) => locales.reduce((total, l) => total + counts[l], 0);

/**
 * Private CV download counts. The proxy asks for the password; checking it
 * again here keeps the data locked even if the proxy's matcher ever changes.
 */
export default async function StatsPage() {
  if (!isStatsAuthorized((await headers()).get("authorization"))) notFound();

  let stats: DownloadStats;
  try {
    stats = await readDownloadStats();
  } catch (error) {
    console.error("Could not read CV download stats", error);
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold">Descargas del CV</h1>
        <p className="mt-4 text-muted">No se pudieron leer los datos de Upstash Redis.</p>
      </main>
    );
  }

  const total = sum(stats.totals);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold">Descargas del CV</h1>
      <p className="mt-1 text-sm text-muted">
        Clicks en el botón de descarga de focaraccio.dev, sin contar bots.
      </p>

      <section className="mt-8 grid grid-cols-3 gap-3">
        <Stat label="Total" value={total} />
        {locales.map((l) => (
          <Stat key={l} label={languageNames[l]} value={stats.totals[l]} />
        ))}
      </section>

      <Card title="Países">
        {stats.countries.length === 0 ? (
          <Empty />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
                <th className="py-2 font-medium">País</th>
                {locales.map((l) => (
                  <th key={l} className="w-14 py-2 text-right font-medium">
                    {localeNames[l].short}
                  </th>
                ))}
                <th className="w-14 py-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {stats.countries.map(({ code, counts, total: countryTotal }) => (
                <tr key={code} className="border-t border-border">
                  <td className="py-2">
                    <CountryCode code={code} />
                    {countryName(code)}
                  </td>
                  {locales.map((l) => (
                    <td key={l} className="py-2 text-right tabular-nums text-muted">
                      {counts[l]}
                    </td>
                  ))}
                  <td className="py-2 text-right font-medium tabular-nums">{countryTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card title="Descargas">
        {stats.downloads.length === 0 ? (
          <Empty />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
                <th className="py-2 pr-3 font-medium">Fecha y hora (UTC-3)</th>
                <th className="py-2 pr-3 font-medium">Lugar</th>
                <th className="py-2 text-right font-medium">Idioma</th>
              </tr>
            </thead>
            <tbody>
              {stats.downloads.map(({ at, locale, country, city }, index) => (
                <tr key={`${at}-${index}`} className="border-t border-border">
                  <td className="py-2 pr-3 font-mono text-xs whitespace-nowrap text-muted">
                    <time dateTime={at}>{formatTime(at)}</time>
                  </td>
                  <td className="py-2 pr-3">
                    <CountryCode code={country} />
                    {city ? `${city}, ${countryName(country)}` : countryName(country)}
                  </td>
                  <td className="py-2 text-right">{languageNames[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </main>
  );
}

/** The code rather than a flag emoji, which Windows renders as two letters anyway. */
function CountryCode({ code }: { code: string }) {
  return (
    <span
      aria-hidden
      className="mr-2 inline-block w-7 rounded border border-border text-center font-mono text-[0.625rem] text-subtle"
    >
      {code === "XX" ? "··" : code}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 rounded-lg border border-border bg-surface p-4 sm:p-5">
      <h2 className="mb-2 font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Empty() {
  return <p className="py-2 text-sm text-muted">Todavía no hay descargas.</p>;
}
