/**
 * Articles: long-form writing about the work.
 *
 * Each article is a folder with two files:
 *
 *   meta.ts      export const meta: ArticleMeta, and the cover (an SVG
 *                imported with ?raw, or an image path)
 *   Body.astro   the article itself, under the shared article layout
 *
 * Published articles live in src/articles/<slug>/. Drafts live in
 * src/drafts/articles/<slug>/, which git ignores, and are loaded only by the
 * dev server: a production build never sees them, so unapproved writing
 * cannot reach dist/ or the public repository. Publishing an article is
 * moving its folder from drafts to articles and setting `published`.
 *
 * Every import below goes through import.meta.glob, so a missing or empty
 * drafts folder is simply no drafts, never a build error.
 */
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export type Category = "Product" | "Engineering" | "Studio";

export interface ArticleMeta {
  slug: string;
  title: string;
  /** One or two sentences under the title, and the meta description. */
  dek: string;
  category: Category;
  /** ISO date. Required to publish; drafts show "Draft" instead. */
  published?: string;
  /** ISO date of the last substantive revision, when there is one. */
  updated?: string;
  author: { name: string; url: string };
  /** Pages this article is about, linked at its end. */
  related: { label: string; href: string; note?: string }[];
  /** Words the cover stands for, for screen readers. */
  coverAlt: string;
  /**
   * Inline SVG markup for the cover, or an image: an imported asset (resized
   * and used for the social card too) or a path under /public.
   */
  cover: { svg: string } | { image: string | ImageMetadata };
  /** The social card, a path under /public. */
  og?: string;
  /** Ordering among articles published the same day, highest first. */
  weight?: number;
}

export interface Article extends ArticleMeta {
  draft: boolean;
  /** Approximate minutes to read, from the body's word count. */
  minutes: number;
  load: () => Promise<{ default: AstroComponentFactory }>;
}

type MetaModule = { meta: ArticleMeta };
type BodyModule = { default: AstroComponentFactory };
type Lazy<T> = Record<string, () => Promise<T>>;

const publishedMeta: Lazy<MetaModule> = import.meta.glob<MetaModule>("../articles/*/meta.ts");
const publishedBody: Lazy<BodyModule> = import.meta.glob<BodyModule>("../articles/*/Body.astro");
const publishedRaw: Lazy<string> = import.meta.glob<string>("../articles/*/Body.astro", {
  query: "?raw",
  import: "default",
});

// Lazy, and only in dev: in a production build these are empty objects and
// the draft modules are never part of the module graph at all.
const draftMeta: Lazy<MetaModule> = import.meta.env.DEV
  ? import.meta.glob<MetaModule>("../drafts/articles/*/meta.ts")
  : {};
const draftBody: Lazy<BodyModule> = import.meta.env.DEV
  ? import.meta.glob<BodyModule>("../drafts/articles/*/Body.astro")
  : {};
const draftRaw: Lazy<string> = import.meta.env.DEV
  ? import.meta.glob<string>("../drafts/articles/*/Body.astro", { query: "?raw", import: "default" })
  : {};

/** Words in the prose, ignoring markup and the frontmatter. */
function minutesOf(raw: string | undefined): number {
  if (!raw) return 1;
  const text = raw
    .replace(/^---[\s\S]*?---/, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]*\}/g, " ");
  const words = text.split(/\s+/).filter((w) => /\w/.test(w)).length;
  return Math.max(1, Math.round(words / 230));
}

async function collect(
  metas: Lazy<MetaModule>,
  bodies: Lazy<BodyModule>,
  raws: Lazy<string>,
  draft: boolean,
): Promise<Article[]> {
  return Promise.all(
    Object.entries(metas).map(async ([path, loadMeta]) => {
      const body = path.replace(/meta\.ts$/, "Body.astro");
      const load = bodies[body];
      if (!load) throw new Error(`${path} has no Body.astro beside it`);
      const { meta } = await loadMeta();
      if (!draft && !meta.published) throw new Error(`${path} is published without a date`);
      const raw = raws[body] ? await raws[body]() : undefined;
      return { ...meta, draft, minutes: minutesOf(raw), load };
    }),
  );
}

let cache: Promise<Article[]> | undefined;

/** Every article this build can show: published ones, plus drafts in dev. */
export function getArticles(): Promise<Article[]> {
  cache ??= Promise.all([
    collect(publishedMeta, publishedBody, publishedRaw, false),
    collect(draftMeta, draftBody, draftRaw, true),
  ]).then(([pub, drafts]) =>
    [...pub, ...drafts].sort((a, b) => {
      const d = (b.published ?? "9999").localeCompare(a.published ?? "9999");
      return d !== 0 ? d : (b.weight ?? 0) - (a.weight ?? 0);
    }),
  );
  return cache;
}

export function formatDate(iso: string | undefined): string {
  if (!iso) return "Draft";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
