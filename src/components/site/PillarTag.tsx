import { pillars, type PillarSlug } from "@/lib/pillars";
import { Link } from "@tanstack/react-router";

export function PillarTag({ slug, asLink = true }: { slug: PillarSlug; asLink?: boolean }) {
  const p = pillars.find((x) => x.slug === slug);
  if (!p) return null;
  const cls = `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${p.tagClass}`;
  if (asLink) {
    return (
      <Link to={`/${p.slug}` as string} className={cls}>
        {p.shortName}
      </Link>
    );
  }
  return <span className={cls}>{p.shortName}</span>;
}
