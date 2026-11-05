import { after, NextResponse, type NextRequest } from "next/server";
import { profile } from "@/content/cv";
import { isBot, recordDownload } from "@/lib/cv-downloads";
import { isLocale } from "@/lib/i18n";

/**
 * Where the CV download links point: counts the download, then redirects to
 * the static PDF. Counting runs after the response is sent, so a slow or
 * unreachable Redis never delays or breaks the download itself.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/api/cv/[locale]">) {
  const { locale } = await ctx.params;
  if (!isLocale(locale)) return new NextResponse(null, { status: 404 });

  const counted = request.method === "GET" && !isBot(request.headers.get("user-agent"));
  if (counted) {
    const country = request.headers.get("x-vercel-ip-country") ?? "XX";
    after(() =>
      recordDownload(locale, country).catch((error) =>
        console.error("Could not record CV download", error),
      ),
    );
  }

  const response = NextResponse.redirect(new URL(profile.resumes[locale], request.url), 302);
  // Every click has to reach this handler to be counted.
  response.headers.set("Cache-Control", "no-store");
  return response;
}
