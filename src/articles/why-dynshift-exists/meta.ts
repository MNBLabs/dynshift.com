import type { ArticleMeta } from "../../lib/articles";

export const meta: ArticleMeta = {
  slug: "why-dynshift-exists",
  title: "Why DynShift exists",
  dek: "An independent studio that makes a few tools, one at a time, and does not call one finished until it has been measured doing its job. What that means in practice, and where it is going.",
  category: "Studio",
  author: { name: "Nishan Bhuinya", url: "https://github.com/nishanbhuinya" },
  coverAlt: "A black hole rendered in grey light against a field of stars: the image on DynShift's home page.",
  cover: { image: "/brand/sky.webp" },
  og: "/og.jpg",
  published: "2026-11-09",
  weight: 5,
  related: [
    { label: "The studio", href: "/studio/", note: "Licences, names, who runs it, how to reach it" },
    { label: "Projects", href: "/projects/", note: "Everything released, and where each stands" },
    { label: "Packages", href: "/packages/", note: "The Flutter libraries on pub.dev" },
    { label: "MNBLabs on GitHub", href: "https://github.com/MNBLabs", note: "The public source" },
  ],
};
