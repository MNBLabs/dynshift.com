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
 * The one ad unit, reused by every slot on the site.
 *
 * Empty until a responsive display unit exists in the AdSense account, which
 * cannot happen before the account is approved. Empty means `AdSlot` renders
 * nothing: no placeholder, no reserved space. The loader in the page head does
 * not depend on this — it carries Google's consent message for the EEA, the UK
 * and Switzerland and must run whether or not a page shows an advertisement.
 */
export const ADSENSE_SLOT = "";
