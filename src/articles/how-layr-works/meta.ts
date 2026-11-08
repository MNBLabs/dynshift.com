import type { ArticleMeta } from "../../lib/articles";
import cover from "./cover.webp";

export const meta: ArticleMeta = {
  slug: "how-layr-works",
  title: "How LAYR works",
  dek: "The compiler, the unit model that turns design pixels into CSS, the rules that decide layout, and the cascade that lets any object be changed from anywhere without losing track of why.",
  category: "Engineering",
  author: { name: "Nishan Bhuinya", url: "https://github.com/nishanbhuinya" },
  coverAlt:
    "A regular grid of light bending evenly into a well around a small bright mass, with a thin orbit traced around it.",
  cover: { image: cover },
  published: "2026-11-09",
  weight: 1,
  related: [
    { label: "Introducing LAYR", href: "/articles/introducing-layr/", note: "What it is and who it is for" },
    { label: "Design Scale", href: "https://layr.dynshift.com/docs/design-scale", note: "Frames, ds units and interpolation, with live examples" },
    { label: "Layout and adaptation", href: "https://layr.dynshift.com/docs/layout", note: "Fixed, hug and fill, and what happens when space runs out" },
    { label: "Export, Inject, Extract, Duplicate", href: "https://layr.dynshift.com/docs/export-extract-inject", note: "The full EIED guide" },
    { label: "Source", href: "https://github.com/nishanbhuinya/layr", note: "The compiler, runtime and tooling, MIT" },
  ],
};
