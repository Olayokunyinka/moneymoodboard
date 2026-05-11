import type { Pillar, ClusterPost } from "./pillars";
import type { ArticleBody } from "./articles";

export interface PaaItem {
  q: string;
  a: string;
}

/**
 * Build a "People also ask" block for a cluster post.
 * Combines:
 *  - manually-authored FAQs from the article body
 *  - sibling-title-derived questions (cross-cluster topical coverage)
 *  - pillar/intent template questions (cost / how-long / who-for / where-start)
 * Guaranteed to return ≥6 entries when the article has siblings.
 */
export function buildPaa(
  pillar: Pillar,
  post: ClusterPost,
  body: ArticleBody | undefined,
  options: { limit?: number } = {},
): PaaItem[] {
  const limit = options.limit ?? 8;
  const out: PaaItem[] = [];
  const seen = new Set<string>();

  const push = (q: string, a: string) => {
    const k = q.trim().toLowerCase();
    if (seen.has(k) || !a) return;
    seen.add(k);
    out.push({ q: q.trim(), a: a.trim() });
  };

  // 1. Manual FAQs win first
  if (body?.faqs) for (const f of body.faqs) push(f.q, f.a);

  // 2. Sibling-title derived questions (topical coverage signal)
  const siblings = pillar.clusters
    .flatMap((c) => c.posts)
    .filter((p) => p.slug !== post.slug);

  const summary = body?.summary ?? post.excerpt;
  const titleLc = post.title.toLowerCase();

  for (const s of siblings) {
    if (out.length >= limit) break;
    push(
      `How does ${post.title.replace(/[?.!]$/, "")} compare to ${s.title.replace(/[?.!]$/, "")}?`,
      `${s.excerpt} For a side-by-side breakdown, read our ${pillar.shortName} guide on ${s.title}.`,
    );
  }

  // 3. Intent / entity templates — at least 4 useful PAA-style Qs
  const templates: PaaItem[] = [
    {
      q: `What is ${post.title.replace(/[?.!]$/, "")} in simple terms?`,
      a: summary,
    },
    {
      q: `Is ${titleLc.includes("how") ? post.title : `learning about ${post.title.toLowerCase()}`} worth it for beginners?`,
      a: `Yes — ${pillar.name.toLowerCase()} concepts like this one are foundational for anyone building financial confidence. Our complete ${pillar.name} pillar walks through every related topic, in order.`,
    },
    {
      q: `How long does it take to apply ${post.title.toLowerCase()}?`,
      a: `Most readers can apply the core ideas in 15–30 minutes. The article includes a step-by-step plan and links to a free calculator where one exists.`,
    },
    {
      q: `Where should I go next after reading this?`,
      a: `Continue with the ${pillar.name} pillar hub for the full topic map, or use one of the free calculators in the article. Every guide on MoneyMoodBoard is reviewed quarterly against primary sources.`,
    },
    {
      q: `Who is this guide written for?`,
      a: `${pillar.shortName} readers at any level — first-time earners, freelancers, and anyone who wants plain-English answers without sales pitches. The guide is reviewed by our founding editor, Yinka Olayokun.`,
    },
  ];
  for (const t of templates) {
    if (out.length >= limit) break;
    push(t.q, t.a);
  }

  return out.slice(0, limit);
}
