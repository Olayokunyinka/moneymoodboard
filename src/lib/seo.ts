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
