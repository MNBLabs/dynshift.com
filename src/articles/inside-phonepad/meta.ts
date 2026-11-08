import type { ArticleMeta } from "../../lib/articles";
import cover from "./cover.webp";

export const meta: ArticleMeta = {
  slug: "inside-phonepad",
  title: "Inside PhonePad: 40 bytes, up to 250 times a second",
  dek: "How a touch on a phone becomes an Xbox controller state on a Windows PC in about five milliseconds, and the decisions, measurements and corrections behind it.",
  category: "Engineering",
  author: { name: "Nishan Bhuinya", url: "https://github.com/nishanbhuinya" },
  coverAlt:
    "A pulsar in grey light: a tiny bright star with two thin beams, ringed by evenly spaced pulses spreading outward.",
  cover: { image: cover },
  published: "2026-11-09",
  weight: 3,
  related: [
    { label: "Introducing PhonePad", href: "/articles/introducing-phonepad/", note: "What it is and who it is for" },
    { label: "PhonePad", href: "/projects/phonepad/", note: "The project page" },
    { label: "Architecture decision record", href: "https://github.com/MNBLabs/phonepad/blob/main/docs/ADR-001-architecture.md", note: "The options considered, in full" },
    { label: "Wire protocol", href: "https://github.com/MNBLabs/phonepad/blob/main/protocol/PROTOCOL.md", note: "Apache-2.0, every packet byte by byte" },
    { label: "Measured performance", href: "https://github.com/MNBLabs/phonepad/blob/main/docs/benchmarks.md", note: "Method, raw output and the gaps" },
  ],
};
