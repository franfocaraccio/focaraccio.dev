# focaraccio.dev

Personal CV site for Francisco Focaraccio — Software Engineer.

Bilingual (Spanish / English), dark-first, single page.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static prerendering)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) for scroll reveals
- [next-themes](https://github.com/pacocoursey/next-themes) for the dark/light toggle
- [Lucide](https://lucide.dev) icons
- [Vercel Web Analytics](https://vercel.com/docs/analytics) for cookieless page views

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000, which redirects to `/en` or `/es`
depending on the browser's `Accept-Language` header. English is the default:
a request that asks for no language, or only for ones the site lacks, gets
`/en` — which is also what most link-preview crawlers end up showing.

## Project layout

| Path                    | What lives there                                              |
| ----------------------- | ------------------------------------------------------------- |
| `src/content/cv.ts`     | All CV copy, in both languages. Edit here, not in components.  |
| `src/lib/i18n.ts`       | Supported locales and `Accept-Language` negotiation.           |
| `src/proxy.ts`          | Redirects `/` to the visitor's locale.                         |
| `src/app/[locale]/`     | Root layout and page, one static build per locale.             |
| `src/components/`       | UI. `sections/` holds the page sections.                       |
| `src/app/globals.css`   | Design tokens for both themes.                                 |
| `src/app/icon.svg`      | Favicon: an F monogram drawn as rects, no font dependency.     |
| `public/cv/`            | Downloadable CV PDFs, one per language.                        |
| `src/app/api/cv/`       | Counts a CV download, then redirects to the PDF.               |
| `src/app/stats/`        | Private download stats, behind a password.                     |

## Content updates

Everything shown on the page comes from `src/content/cv.ts`. Adding a job means
adding one entry to `experience.items` in **both** the `en` and `es`
dictionaries — TypeScript will flag a mismatch in shape.

Featured projects are a curated list, not a GitHub API pull: `projects` holds
the repo URL and stack, and each dictionary holds the description under the
matching key. Adding one means adding the entry plus both descriptions.

When the CV changes, replace the file in `public/cv/` keeping the same name.
The hero's download button offers every CV listed in `profile.resumes`,
whichever language the page is in.

## CV download stats

The download links point at `/api/cv/en` and `/api/cv/es`, not at the PDFs.
That route counts the download in Upstash Redis and redirects to the file;
counting happens after the response, so a Redis outage never blocks a
download. Link-preview crawlers and scripts are not counted, and nothing that
identifies a visitor is stored: only the time, the language, and the country
and city Vercel reports.

`/stats` shows the totals, a breakdown by country and the latest 1,000
downloads one by one, with times in UTC-3. The browser asks for a password
(any username) that must match `STATS_PASSWORD`.

Environment variables, all set in the Vercel project:

| Variable                      | Source                                      |
| ----------------------------- | ------------------------------------------- |
| `KV_REST_API_URL`             | Added by the Upstash for Redis integration. |
| `KV_REST_API_TOKEN`           | Same; used to count.                        |
| `KV_REST_API_READ_ONLY_TOKEN` | Same; used by `/stats`.                     |
| `STATS_PASSWORD`              | Set by hand. Without it `/stats` is locked. |

## Assets

- `public/avatar.webp` — square portrait, 720×720, black and white. Rendered as
  a circle inside a ring of the raised surface colour, so the frame follows the
  theme while the photo does not.

  Black and white on purpose: the photo was taken under flat light against a
  plain wall, and dropping the colour reads as a studio portrait rather than as
  something that needs correcting. Switching back to colour means regenerating
  the file without the greyscale step — nothing in the markup assumes it.

  The crop is tight enough that the head fills the circle; a wider one leaves a
  ring of bare wall that makes the frame look empty.

  Note that replacing a file without clearing `.next` will keep serving the
  previously optimised version, since Next caches by URL.

- `src/app/[locale]/opengraph-image.tsx` — the 1200×630 share card shown when
  the link is posted on LinkedIn, WhatsApp, Slack or X. One per locale,
  prerendered at build time, built from the same dictionary as the page.

  The renderer behind `next/og` only reads static TTF/OTF fonts and PNG/JPEG
  images, so it cannot reuse what the page loads:

  - `assets/fonts/` holds static TTF cuts of Raleway Bold, JetBrains Mono Medium
    and Inter Regular from Google Fonts (SIL Open Font License).
  - `assets/og-portrait.jpg` is a JPEG copy of `public/avatar.webp`.
    **Regenerate it whenever the portrait changes**, or the share card will keep
    showing the old photo.

  In development the image URLs in the page's meta tags point at `localhost`;
  that is deliberate on Next's side. Production builds use `metadataBase`
  (`https://focaraccio.dev`).

## Deployment

Built for Vercel with the `focaraccio.dev` domain. `npm run build` produces a
statically prerendered page per locale plus a small proxy for the root redirect.
