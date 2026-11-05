import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { readDownloadStats, type DownloadStats } from "@/lib/cv-downloads";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { isStatsAuthorized } from "@/lib/stats-auth";

const DAYS = 30;

const regionNames = new Intl.DisplayNames(["es"], { type: "region" });

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
    stats = await readDownloadStats(DAYS);
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
  const lastDays = stats.daily.reduce((acc, { counts }) => acc + sum(counts), 0);
  const busiestDay = Math.max(1, ...stats.daily.map(({ counts }) => sum(counts)));

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold">Descargas del CV</h1>
      <p className="mt-1 text-sm text-muted">
        Clicks en el botón de descarga de focaraccio.dev, sin contar bots.
      </p>

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total" value={total} />
        {locales.map((l) => (
          <Stat key={l} label={localeNames[l].long} value={stats.totals[l]} />
        ))}
        <Stat label={`Últimos ${DAYS} días`} value={lastDays} />
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
                    {/* The code rather than a flag emoji, which Windows renders as two letters anyway. */}
                    <span
                      aria-hidden
                      className="mr-2 inline-block w-7 rounded border border-border text-center font-mono text-[0.625rem] text-subtle"
                    >
                      {code === "XX" ? "··" : code}
                    </span>
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

      <Card title={`Por día (UTC, últimos ${DAYS})`}>
        {lastDays === 0 ? (
          <Empty />
        ) : (
          <ul className="text-sm">
            {stats.daily.map(({ day, counts }) => {
              const dayTotal = sum(counts);
              return (
                <li
                  key={day}
                  className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-3 border-t border-border py-1.5 first:border-t-0"
                >
                  <span className="font-mono text-xs text-muted">{day}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-surface-raised">
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{ width: `${(dayTotal / busiestDay) * 100}%` }}
                    />
                  </span>
                  <span className="w-28 text-right tabular-nums text-muted">
                    {locales.map((l) => `${localeNames[l].short} ${counts[l]}`).join(" · ")}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </main>
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
