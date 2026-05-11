import { ArticleCard } from "./Cards";
import type { ClusterPost, PillarSlug } from "@/lib/pillars";

/**
 * Bottom-of-post "Related reads" grid. Mirrors the AdSense matched-content
 * unit slot — increases pages-per-session.
 */
export function RelatedReads({
  posts,
  pillarSlug,
  heading = "Related reads",
}: {
  posts: ClusterPost[];
  pillarSlug: PillarSlug;
  heading?: string;
}) {
  if (!posts.length) return null;
  return (
    <section
      className="mt-16"
      data-ad-slot="matched-content"
      aria-label={heading}
    >
      <h2 className="text-2xl font-bold text-foreground">{heading}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 6).map((post) => (
          <ArticleCard key={post.slug} pillarSlug={pillarSlug} post={post} />
        ))}
      </div>
    </section>
  );
}
