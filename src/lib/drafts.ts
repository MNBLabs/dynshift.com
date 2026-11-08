/**
 * Editorial drafts outside the articles: new home-page sections and revised
 * project copy awaiting the owner's approval.
 *
 * They live in src/drafts/ (ignored by git) and load only on the dev server.
 * A production build gets `undefined` for every one of them and renders the
 * published page exactly as before. Approving a draft means moving it out of
 * src/drafts/ and importing it directly where it is used.
 */
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

type Lazy = Record<string, () => Promise<Record<string, unknown>>>;

const modules: Lazy = import.meta.env.DEV
  ? import.meta.glob<Record<string, unknown>>(["../drafts/**/*.astro", "../drafts/**/*.ts", "!../drafts/articles/**"])
  : {};

/** True on the dev server, where drafts are shown with a "Draft" marker. */
export const SHOW_DRAFTS = import.meta.env.DEV;

/** A draft component by its path under src/drafts, e.g. "home/Faq.astro". */
export async function draftComponent(path: string): Promise<AstroComponentFactory | undefined> {
  const load = modules[`../drafts/${path}`];
  return load ? ((await load()).default as AstroComponentFactory) : undefined;
}

/** A draft data module's export by path and name, e.g. ("projects.ts", "layr"). */
export async function draftData<T>(path: string, name: string): Promise<T | undefined> {
  const load = modules[`../drafts/${path}`];
  return load ? ((await load())[name] as T) : undefined;
}
