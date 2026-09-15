export const SITE_NAME = "DynShift";
export const DESCRIPTION =
  "DynShift is an independent software studio. It builds focused, well-made tools, most of them open source, and ships them finished.";

export const GITHUB = "https://github.com/MNBLabs";
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
