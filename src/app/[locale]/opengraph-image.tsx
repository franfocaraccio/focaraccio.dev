import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary, profile } from "@/content/cv";
import { isLocale, defaultLocale, locales } from "@/lib/i18n";

/**
 * Share card for link previews (LinkedIn, WhatsApp, Slack, X...), generated
 * per locale from the same content the page renders.
 *
 * The renderer behind next/og only reads static TTF/OTF fonts and PNG/JPEG
 * images — not the woff2 files next/font serves or the site's WebP portrait —
 * so both come from /assets. Everything is read once, at module scope.
 */

// The image sits under the [locale] segment, so without this it is rendered
// on every request instead of once per language at build time.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = profile.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (path: string) => readFile(join(process.cwd(), "assets", path));

const [raleway, jetBrainsMono, inter, portrait] = await Promise.all([
  asset("fonts/Raleway-Bold.ttf"),
  asset("fonts/JetBrainsMono-Medium.ttf"),
  asset("fonts/Inter-Regular.ttf"),
  asset("og-portrait.jpg"),
]);
const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

// The dark theme's tokens, inlined: the renderer has no access to the CSS.
const colors = {
  background: "#0b0f14",
  foreground: "#e6edf3",
  muted: "#8b98a5",
  ring: "#16202a",
  accent: "#2dd4bf",
  onAccent: "#04211d",
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  const [firstName, ...rest] = profile.name.split(" ");
  const domain = new URL(profile.site).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: colors.background,
          fontFamily: "Inter",
        }}
      >
        {/* No background grid like the hero's: the renderer ignores repeating
            gradients with a background-size, so it would draw nothing. */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 96px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Raleway",
                fontSize: 96,
                lineHeight: 1.02,
                letterSpacing: -4,
                color: colors.foreground,
              }}
            >
              <span>{firstName}</span>
              <span>{rest.join(" ")}</span>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontFamily: "JetBrains Mono",
                fontSize: 34,
                letterSpacing: 1,
                color: colors.accent,
              }}
            >
              {dict.hero.role}
            </div>

            <div style={{ display: "flex", alignItems: "center", marginTop: 72 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: colors.accent,
                }}
              >
                {/* The F monogram from the favicon. */}
                <svg width="30" height="30" viewBox="0 0 32 32" fill={colors.onAccent}>
                  <rect x="10" y="7" width="12" height="4" rx="1" />
                  <rect x="10" y="13.5" width="8.5" height="4" rx="1" />
                  <rect x="10" y="7" width="4" height="18" rx="1" />
                </svg>
              </div>
              <span style={{ marginLeft: 18, fontSize: 28, color: colors.muted }}>{domain}</span>
            </div>
          </div>

          {/* Same ring treatment as the About section. next/image does not
              apply here: this tree is rendered to a PNG, not to the DOM. */}
          <div
            style={{
              display: "flex",
              padding: 20,
              borderRadius: 9999,
              backgroundColor: colors.ring,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portraitSrc}
              width={340}
              height={340}
              style={{ borderRadius: 9999 }}
              alt=""
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Raleway", data: raleway, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: jetBrainsMono, weight: 500, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
      ],
    },
  );
}
