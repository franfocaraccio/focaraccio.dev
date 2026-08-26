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
| `src/app/icon.svg`      | Favicon: an F monogram drawn as rects, no font dependency.     |
| `public/cv/`            | Downloadable CV PDFs, one per language.                        |

## Content updates

Everything shown on the page comes from `src/content/cv.ts`. Adding a job means
adding one entry to `experience.items` in **both** the `en` and `es`
dictionaries — TypeScript will flag a mismatch in shape.

Featured projects are a curated list, not a GitHub API pull: `projects` holds
the repo URL and stack, and each dictionary holds the description under the
matching key. Adding one means adding the entry plus both descriptions.

When the CV PDFs change, replace the files in `public/cv/` keeping the same
names.

## Assets

- `public/portrait.webp` — cut-out portrait with a transparent background,
  900×852, cropped to head and shoulders and faded out just past the sleeve
  seam.

  To regenerate it from a new photo, background removal needs a real
  segmentation model — colour keying fails because skin tones sit too close to
  a light wall in LAB space:

  ```bash
  pip install rembg onnxruntime
  ```

  Then run `rembg` with the `u2net_human_seg` model and alpha matting. The
  matte it produces still leaves wall-coloured pixels clinging to the
  silhouette, so clean those up afterwards: build a band around the edge from a
  *low* alpha threshold (the contaminated rim is semi-transparent — around alpha
  77 — so a high threshold misses most of it), and inside that band scale alpha
  by the pixel's LAB distance from the wall colour. Hair sits far enough from
  the wall in that space that it survives untouched.

  Note that replacing the file without clearing `.next` will keep serving the
  previously optimised version, since Next caches by URL.

## Deployment

Built for Vercel with the `focaraccio.dev` domain. `npm run build` produces a
statically prerendered page per locale plus a small proxy for the root redirect.
