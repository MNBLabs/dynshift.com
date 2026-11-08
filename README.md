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

## Brand assets

`brand/source/` holds the designer's exports, unmodified: the mark
(`mark-white.svg`, `mark-black.svg`) and the stylised logo
(`styled-outline-white.svg`, `styled-outline-black.svg`). Nothing on the site
redraws them.

- The header is the name set in type (`Wordmark.astro`), with no symbol.
- The footer draws the stylised logo straight from its export
  (`Logo.astro`), recoloured to `currentColor` and cropped to its lettering.
- Every icon (`favicon.svg`, `favicon.ico`, `favicon.png`, `apple-touch-icon.png`,
  `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`) is generated from the
  mark by `node tools/icons.mjs`. Run it again if the mark changes.

## Articles and drafts

Articles live in `src/articles/<slug>/` as a `meta.ts` and a `Body.astro`
(see `src/lib/articles.ts`). `/articles/` and the home page's Articles section
appear only once one is published.

Unpublished editorial work lives in `src/drafts/`, which git ignores. The dev
server loads it and marks it "Draft · awaiting approval"; a production build
never sees it. `/review/` (dev server only) lists every draft. Publishing an
article is moving its folder from `src/drafts/articles/` to `src/articles/` and
giving it a `published` date; a draft home section moves into
`src/components/` and is imported directly.

## The hero

`src/hero/` is the [vgpu](https://vgpu.sh) "Optimized Black Hole" example,
pulled from the published gallery and verified file by file against its
manifest hashes. It is used as published: the renderer, its pipeline and
its shaders are untouched. `src/components/BlackHole.astro` mounts it,
shows it only once the first frame is ready, and leaves the poster in place
wherever WebGPU is unavailable.

The posters (`public/brand/sky.webp`, `public/brand/sky-portrait.webp` for the
phone layout) are frames of the same renderer, drawn headlessly. Regenerate
them with `npm run poster` (needs ImageMagick 7 on
PATH as `magick`) after changing anything under `src/hero/`.

## AdSense

Everything is generated from the two constants in `src/consts.ts`, so nothing
can drift apart:

- `ADSENSE_PUBLISHER` produces the `google-adsense-account` meta tag, the
  loader `<script>` and `/ads.txt` (`src/pages/ads.txt.ts`). AdSense reads the
  ownership tag and ads.txt from the root domain on behalf of every subdomain,
  which is why they live here. Do not remove any of the three.
- `ADSENSE_SLOT` is the single responsive display unit. While it is empty
  `AdSlot` renders nothing at all — no placeholder, no reserved space.

The loader sits in `Base.astro`, in the head of every page and written once.
It is deliberately not gated behind a banner of our own: it is what delivers
Google's consent message to visitors in the EEA, the UK and Switzerland, and
the US state opt-out, and Google's message is a certified consent platform.
Auto ads are off in the AdSense account; ads appear only in placed slots.

## Privacy

`public/privacy.js` is the privacy runtime shared, byte for byte, by all three
DynShift sites; change all three together. It loads first in the head, before
the AdSense loader, and:

- sets Consent Mode v2 defaults: analytics denied everywhere, advertising
  denied in the EEA, the UK and Switzerland until Google's message answers,
  personalisation denied under Global Privacy Control;
- loads Google Analytics (`GA_ID` in `src/consts.ts`; empty means none) only
  after consent, and never under GPC;
- pushes ad slots only when they near the viewport, with restricted data
  processing under GPC, and never on a legal page;
- opens the footer's **Privacy settings** panel, and Google's US opt-out from
  the footer's Do Not Sell or Share link where it applies.

`src/components/AdSlot.astro` is the only place ad markup exists. It takes no
room and shows no label until Google fills it. One slot per page, mid-prose,
on `studio`, `projects/phonepad`, `projects/layr` and `packages`. Not on the
home page, not on `projects/`, never on `privacy`, `cookies`, `terms` or
`contact` (the component refuses), and never beside a link someone is
reaching for. Adding a slot anywhere else is a decision to argue for, not a
default.

The legal pages describe only what the site actually does; the analytics
paragraphs appear only while `GA_ID` is set. Change them together with the
code.

## Fonts

Geist and Geist Mono, under `public/fonts/OFL.txt`.
