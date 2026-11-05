import { NextResponse, type NextRequest } from "next/server";
import { locales, negotiateLocale } from "@/lib/i18n";
import { isStatsAuthorized } from "@/lib/stats-auth";

/**
 * Redirects the bare root to a locale-prefixed URL, picking the visitor's
 * language from Accept-Language. Every other path already carries its locale,
 * except the private /stats page, which asks for a password instead.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/stats") {
    if (isStatsAuthorized(request.headers.get("authorization"))) return NextResponse.next();
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="stats", charset="UTF-8"' },
    });
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = negotiateLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and anything with a file extension (PDFs, images, etc.).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
