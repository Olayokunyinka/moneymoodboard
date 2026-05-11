/**
 * "In This Guide" table of contents.
 * Pass an array of H2 section labels — each is rendered as an anchor link
 * to the matching `#slug` (slugified label). Pair with `scroll-mt-20` on the
 * H2 wrappers in the article.
 */
export function TableOfContents({ sections }: { sections: string[] }) {
  if (!sections.length) return null;
  return (
    <nav
      aria-label="In this guide"
      className="mt-8 rounded-2xl border border-border bg-card p-5 md:p-6"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        In This Guide
      </p>
      <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {sections.map((s, i) => (
          <li key={s} className="text-sm">
            <a
              href={`#${tocSlug(s)}`}
              className="text-foreground/85 hover:text-primary hover:underline"
            >
              <span className="text-muted-foreground tabular-nums mr-2">
                {String(i + 1).padStart(2, "0")}.
              </span>
              {s}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function tocSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
