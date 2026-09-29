export const SITE_NAME = "DynShift";
export const DESCRIPTION =
  "DynShift is an independent software studio. It builds focused, well-made tools, most of them open source, and ships them finished.";

export const GITHUB = "https://github.com/MNBLabs";
export const INSTAGRAM = "https://www.instagram.com/dynshift/";
export const CONTACT = "official@dynshift.com";

/**
 * The AdSense publisher id, written once.
 *
 * It is not a secret: ads.txt publishes it in plain text by design, so hiding
 * it behind a build variable would add a way for the ownership tag to vanish
 * (an unset variable on a new runner) without protecting anything. The tag
 * in the page head and /ads.txt are both generated from this constant, so
 * they cannot drift apart.
 */
export const ADSENSE_PUBLISHER = "pub-1564512150436986";

/**
 * The one ad unit ("DynShift root inline", a responsive display unit), reused
 * by every slot on the site. Empty would mean `AdSlot` renders nothing: no
 * placeholder, no reserved space. Until the AdSense site is approved Google
 * returns no ad, and the slot stays collapsed. The loader in the page head
 * does not depend on this: it carries Google's consent message and must run
 * whether or not a page shows an advertisement.
 */
export const ADSENSE_SLOT = "2749664210";

/**
 * The GA4 measurement id for dynshift.com. Public by design (it is in every
 * page), so a constant like the publisher id. Empty means no analytics and no
 * banner. Even when set, nothing loads until the visitor allows it: see
 * public/privacy.js, the runtime shared by all three DynShift sites.
 */
export const GA_ID = "G-VFDZ9S1DQ7";

/** The data controller as named in the policies. Not a registered company (yet). */
export const CONTROLLER = "DynShift";
export const POLICY_DATE = "30 September 2026";
