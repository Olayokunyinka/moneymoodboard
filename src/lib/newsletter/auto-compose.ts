// Auto-assembles a NewsletterDraft from the latest entries in articleBodies.
// Pure logic, safe to import on server. No env access here.
import { articleBodies, type ArticleBody } from "@/lib/articles";
import { findPost, type PillarSlug } from "@/lib/pillars";
import type { NewsletterDraft, NewsletterMore } from "./types";

export interface ResolvedArticle {
  key: string; // "pillar/slug"
  pillar: PillarSlug;
  postSlug: string;
  title: string;
  url: string; // site-relative, e.g. /budgeting/zero-based-budgeting
  body: ArticleBody;
  publishedAt: number; // ms
}

function toMs(iso?: string): number {
  if (!iso) return 0;
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : 0;
}

/** Resolve every article body into a {pillar, post, title, url} record, sorted newest-first. */
export function listArticlesNewestFirst(now: Date = new Date()): ResolvedArticle[] {
  const cutoff = now.getTime();
  const out: ResolvedArticle[] = [];
  for (const [key, body] of Object.entries(articleBodies)) {
    const [pillarSlug, postSlug] = key.split("/");
    const found = findPost(pillarSlug, postSlug);
    if (!found) continue;
    const publishedAt = Math.max(toMs(body.published), 0);
    // Skip future-dated drafts so they don't go out before their date.
    if (publishedAt > cutoff) continue;
    out.push({
      key,
      pillar: found.pillar.slug,
      postSlug,
      title: found.post.title,
      url: `/${pillarSlug}/${postSlug}`,
      body,
      publishedAt,
    });
  }
  out.sort((a, b) => b.publishedAt - a.publishedAt);
  return out;
}

function pickTip(body: ArticleBody): { title: string; body: string } | null {
  // Prefer first key takeaway, it's already a self-contained sentence.
  if (body.keyTakeaways && body.keyTakeaways.length > 0) {
    return { title: "Try this this week", body: body.keyTakeaways[0] };
  }
  // Otherwise, first orderedList item from any section.
  for (const s of body.sections) {
    if (s.orderedList && s.orderedList.length > 0) {
      return { title: s.heading, body: s.orderedList[0] };
    }
  }
  // Otherwise, a callout.
  for (const s of body.sections) {
    if (s.callout?.body) {
      return { title: s.callout.title || s.heading, body: s.callout.body };
    }
  }
  return null;
}

const TOOL_DESCRIPTIONS: Record<string, string> = {
  "budget-planner": "Build a zero-based budget in five minutes, no spreadsheet required.",
  "compound-interest-calculator": "See how a small monthly contribution turns into something serious over time.",
  "credit-card-payoff-calculator": "Compare avalanche vs snowball and find your real payoff date.",
  "credit-score-estimator": "Estimate your FICO range from five inputs, no hard pull.",
  "debt-payoff-calculator": "Order your debts and see exactly when each one disappears.",
  "emergency-fund-calculator": "Right-size your emergency fund based on your real monthly floor.",
  "retirement-savings-calculator": "Project your nest egg with realistic returns and inflation.",
  "savings-goal-calculator": "Reverse-engineer the monthly amount you need to hit any goal.",
};

function pickTool(hero: ResolvedArticle): NewsletterDraft["tool"] {
  const t = hero.body.toolCta;
  if (t?.slug) {
    return {
      name: t.name,
      description: t.copy || TOOL_DESCRIPTIONS[t.slug] || "Try the calculator that pairs with this week's guide.",
      url: `/tools/${t.slug}`,
    };
  }
  // Fallback by pillar.
  const fallback: Record<string, string> = {
    budgeting: "budget-planner",
    investing: "compound-interest-calculator",
    "credit-cards": "credit-card-payoff-calculator",
    debt: "debt-payoff-calculator",
    "debt-taxes-insurance": "debt-payoff-calculator",
    retirement: "retirement-savings-calculator",
    saving: "savings-goal-calculator",
    banking: "savings-goal-calculator",
  };
  const slug = fallback[hero.pillar] || "budget-planner";
  const names: Record<string, string> = {
    "budget-planner": "Budget Planner",
    "compound-interest-calculator": "Compound Interest Calculator",
    "credit-card-payoff-calculator": "Credit Card Payoff Calculator",
    "debt-payoff-calculator": "Debt Payoff Calculator",
    "retirement-savings-calculator": "Retirement Savings Calculator",
    "savings-goal-calculator": "Savings Goal Calculator",
  };
  return {
    name: names[slug] || "Money tool",
    description: TOOL_DESCRIPTIONS[slug] || "A free calculator from MoneyMoodBoard.",
    url: `/tools/${slug}`,
  };
}

function buildSubject(hero: ResolvedArticle): string {
  const t = hero.title.replace(/\s*[, –-]\s*.+$/, "").trim();
  return `This week: ${t}`;
}

/**
 * Pick the freshest article as the hero and the next few as "more this week".
 * Returns null if there are no articles at all.
 */
export function pickWeeklyDraft(now: Date = new Date()): NewsletterDraft | null {
  const all = listArticlesNewestFirst(now);
  if (all.length === 0) return null;
  const [hero, ...rest] = all;

  const more: NewsletterMore[] = rest.slice(0, 3).map((a) => ({
    title: a.title,
    url: a.url,
    pillar: a.pillar,
  }));

  const tip = pickTip(hero.body) ?? {
    title: "This week's practical tip",
    body: hero.body.summary,
  };

  return {
    subject: buildSubject(hero),
    previewText: hero.body.summary.slice(0, 140),
    hero: {
      title: hero.title,
      summary: hero.body.summary,
      url: hero.url,
      pillar: hero.pillar,
      ctaLabel: "Read the guide",
      image: hero.body.featuredImage,
      imageAlt: hero.body.featuredImageAlt,
    },
    tip,
    tool: pickTool(hero),
    more,
  };
}
