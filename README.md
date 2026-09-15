# dynshift.com

The DynShift home page: the gateway to the studio's projects, served by
GitHub Pages at the apex domain. Product sites live on subdomains
(`phonepad.dynshift.com`, `layr.dynshift.com`) and are maintained in their
own repositories.

## Working on it

```sh
npm ci
npm run dev      # http://localhost:4321
npm run check    # types and templates
npm run build    # dist/
```

A push to `main` builds and deploys through `.github/workflows/site.yml`.

## Adding a project

Add an entry to `src/data/projects.ts` and put its icon under
`public/brand/`. The page has no per-project markup.

## The hero

`src/hero/` is the [vgpu](https://vgpu.sh) "Optimized Black Hole" example,
pulled from the published gallery and verified file by file against its
manifest hashes. It is used as published: the renderer, its pipeline and
its shaders are untouched. `src/components/BlackHole.astro` mounts it,
shows it only once the first frame is ready, and leaves the poster in place
wherever WebGPU is unavailable.

The poster (`public/brand/sky.webp`) is a frame of the same renderer, drawn
headlessly. Regenerate it with `npm run poster` (needs ImageMagick 7 on
PATH as `magick`) after changing anything under `src/hero/`.

## The root domain and AdSense

Two things live here because AdSense reads them from the root domain on
behalf of every subdomain, and both are generated from the one publisher id
in `src/consts.ts`:

- the `google-adsense-account` meta tag in every page head, and
- `/ads.txt` (`src/pages/ads.txt.ts`).

Do not remove either. No advertisements are served on this site.

## Fonts

Onest, under `public/fonts/OFL.txt`.
