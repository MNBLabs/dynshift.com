import type { ArticleMeta } from "../../lib/articles";
import cover from "./cover.webp";

export const meta: ArticleMeta = {
  slug: "introducing-phonepad",
  title: "Introducing PhonePad",
  dek: "An Android phone as a wireless Xbox-compatible controller for Windows: what it is for, how it is put together, and what it deliberately leaves out.",
  category: "Product",
  author: { name: "Nishan Bhuinya", url: "https://github.com/nishanbhuinya" },
  coverAlt:
    "A small bright body sending a thin, steady stream of light across dark space into a much larger planet, in grey light.",
  cover: { image: cover },
  published: "2026-11-09",
  weight: 4,
  related: [
    { label: "PhonePad", href: "/projects/phonepad/", note: "The project page: status, measurements, limitations" },
    { label: "phonepad.dynshift.com", href: "https://phonepad.dynshift.com/", note: "Setup guide, documentation and troubleshooting" },
    { label: "Source and releases", href: "https://github.com/MNBLabs/phonepad", note: "GPL-3.0, on GitHub" },
    { label: "Inside PhonePad", href: "/articles/inside-phonepad/", note: "The engineering behind it" },
  ],
};
