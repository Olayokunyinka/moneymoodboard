export const SITE_URL = "https://moneymoodboard.com";

/** Returns url unchanged if absolute (http/https), otherwise prepends SITE_URL. */
export const toAbsUrl = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;

export const absUrl = (path: string) => toAbsUrl(path);

/** Canonical link tag object for TanStack head().links */
export const canonical = (path: string) => ({
  rel: "canonical" as const,
  href: absUrl(path),
});

/** og:image meta tag pair (image + secure_url + width/height) */
export const ogImage = (path: string) => [
  { property: "og:image", content: toAbsUrl(path) },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { name: "twitter:image", content: toAbsUrl(path) },
];

/**
 * hreflang link tags for TanStack head().links — English + x-default fallback.
 * Currently the site only ships en content; when a non-English locale is
 * added, extend this with the localized URLs.
 */
export const hreflangLinks = (path: string) => {
  const href = absUrl(path);
  return [
    { rel: "alternate" as const, hrefLang: "en", href },
    { rel: "alternate" as const, hrefLang: "x-default", href },
  ];
};

/**
 * Locally-hosted hero/OG asset paths for an article, produced by
 * `scripts/fetch-images.ts`. Returns undefined when the pipeline hasn't
 * been run (so callers can fall back to the original remote URL).
 *
 * NOTE: existence is determined at build time by relying on the assets
 * having been generated. We don't fs.existsSync here because this module
 * runs in the browser too. The build script is responsible for keeping
 * the manifest below in sync, OR callers can pass a known-good slug.
 */
export const localHeroFor = (pillarSlug: string, postSlug: string) => {
  const base = `/og/articles/${pillarSlug}__${postSlug}`;
  return {
    avif1600: `${base}-1600.avif`,
    webp1600: `${base}-1600.webp`,
    jpg1600: `${base}-1600.jpg`,
    avif800: `${base}-800.avif`,
    webp800: `${base}-800.webp`,
    jpg800: `${base}-800.jpg`,
    card: `/og/cards/${pillarSlug}__${postSlug}.png`,
  };
};
