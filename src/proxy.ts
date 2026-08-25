import { NextResponse, type NextRequest } from "next/server";
import { locales, negotiateLocale } from "@/lib/i18n";

/**
 * Redirects the bare root to a locale-prefixed URL, picking the visitor's
 * language from Accept-Language. Every other path already carries its locale.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
