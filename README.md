# focaraccio.dev

Personal CV site for Francisco Focaraccio — Backend Software Engineer.

Bilingual (Spanish / English), dark-first, single page.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static prerendering)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) for scroll reveals
- [next-themes](https://github.com/pacocoursey/next-themes) for the dark/light toggle
- [Lucide](https://lucide.dev) icons

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000, which redirects to `/es` or `/en`
depending on the browser's `Accept-Language` header.

## Project layout

| Path                    | What lives there                                              |
| ----------------------- | ------------------------------------------------------------- |
| `src/content/cv.ts`     | All CV copy, in both languages. Edit here, not in components.  |
| `src/lib/i18n.ts`       | Supported locales and `Accept-Language` negotiation.           |
| `src/proxy.ts`          | Redirects `/` to the visitor's locale.                         |
| `src/app/[locale]/`     | Root layout and page, one static build per locale.             |
| `src/components/`       | UI. `sections/` holds the page sections.                       |
| `src/app/globals.css`   | Design tokens for both themes.                                 |
| `public/cv/`            | Downloadable CV PDFs, one per language.                        |

## Content updates

Everything shown on the page comes from `src/content/cv.ts`. Adding a job means
adding one entry to `experience.items` in **both** the `en` and `es`
dictionaries — TypeScript will flag a mismatch in shape.

When the CV PDFs change, replace the files in `public/cv/` keeping the same
names.

## Assets

- `public/profile.jpg` — profile photo, square, at least 256×256. Until it is
  added, the sidebar falls back to a monogram avatar.

## Deployment

Built for Vercel with the `focaraccio.dev` domain. `npm run build` produces a
statically prerendered page per locale plus a small proxy for the root redirect.
