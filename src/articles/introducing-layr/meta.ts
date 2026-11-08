import type { ArticleMeta } from "../../lib/articles";
import cover from "./cover.webp";

export const meta: ArticleMeta = {
  slug: "introducing-layr",
  title: "Introducing LAYR",
  dek: "A compiled language for the layout of web pages: you write what the page is, in your design's own numbers, and the compiler turns it into CSS and React.",
  category: "Product",
  author: { name: "Nishan Bhuinya", url: "https://github.com/nishanbhuinya" },
  coverAlt:
    "A planet in grey light inside many thin, evenly spaced rings, stacked like layers.",
  cover: { image: cover },
  published: "2026-11-09",
  weight: 2,
  related: [
    { label: "LAYR", href: "/projects/layr/", note: "The project page" },
    { label: "layr.dynshift.com", href: "https://layr.dynshift.com/", note: "Documentation, reference and playground" },
    { label: "Playground", href: "https://layr.dynshift.com/playground", note: "Write LAYR in the browser, nothing to install" },
    { label: "Source", href: "https://github.com/nishanbhuinya/layr", note: "MIT, on GitHub" },
    { label: "How LAYR works", href: "/articles/how-layr-works/", note: "The system behind the language" },
  ],
};
