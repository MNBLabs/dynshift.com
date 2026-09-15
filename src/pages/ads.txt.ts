import type { APIRoute } from "astro";
import { ADSENSE_PUBLISHER } from "../consts";

/**
 * AdSense reads ads.txt from the root domain and applies it to every
 * subdomain, which is why it lives here and not on a product site.
 * Generated from the same constant as the ownership tag.
 */
export const GET: APIRoute = () =>
  new Response(`google.com, ${ADSENSE_PUBLISHER}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
