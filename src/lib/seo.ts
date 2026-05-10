export const SITE_URL = "https://moneymoodboard.com";

export const absUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Canonical link tag object for TanStack head().links */
export const canonical = (path: string) => ({
  rel: "canonical" as const,
  href: absUrl(path),
});

/** og:image meta tag pair (image + secure_url + width/height) */
export const ogImage = (path: string) => [
  { property: "og:image", content: absUrl(path) },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { name: "twitter:image", content: absUrl(path) },
];
