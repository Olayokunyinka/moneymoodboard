import { bestRoundups } from "./best-picks";
import { answerPages } from "./answers";
import { rulesPages } from "./rules";
import { decisionPages } from "./decisions";
import type { PillarSlug } from "./pillars";

export type IntentClass = "best" | "answers" | "rules" | "decide";

export interface IntentEntry {
  cls: IntentClass;
  pillar: PillarSlug;
  slug: string;
  to: string;
  label: string;
  /** Lower-case bag-of-words used for keyword matching. */
  bag: string;
}

const tokens = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter((w) => w.length > 2);

function entry(
  cls: IntentClass,
  pillar: PillarSlug,
  slug: string,
  segment: string,
  label: string,
  extras: string,
): IntentEntry {
  return {
    cls,
    pillar,
    slug,
    to: `/${pillar}/${segment}/${slug}`,
    label,
    bag: ` ${tokens(`${slug} ${label} ${extras}`).join(" ")} `,
  };
}

export const ALL_INTENT_ENTRIES: IntentEntry[] = [
  ...bestRoundups.map((r) => entry("best", r.pillar, r.slug, "best", r.title, r.metaDescription)),
  ...answerPages.map((a) => entry("answers", a.pillar, a.slug, "answers", a.question, a.metaDescription)),
  ...rulesPages.map((r) => entry("rules", r.pillar, r.slug, "rules", r.title, r.metaDescription)),
  ...decisionPages.map((d) => entry("decide", d.pillar, d.slug, "decide", d.title, d.metaDescription)),
];

export function intentForPillar(pillar: PillarSlug) {
  const all = ALL_INTENT_ENTRIES.filter((e) => e.pillar === pillar);
  return {
    best: all.filter((e) => e.cls === "best"),
    answers: all.filter((e) => e.cls === "answers"),
    rules: all.filter((e) => e.cls === "rules"),
    decide: all.filter((e) => e.cls === "decide"),
    all,
  };
}

/** Score sharper-child candidates for an existing article using keyword overlap. */
export function matchIntentForArticle(
  pillar: PillarSlug,
  articleSlug: string,
  articleTitle: string,
  limit = 3,
): IntentEntry[] {
  const seeds = new Set(tokens(`${articleSlug} ${articleTitle}`));
  if (!seeds.size) return [];
  const candidates = ALL_INTENT_ENTRIES.filter((e) => e.pillar === pillar);
  const scored = candidates
    .map((e) => {
      let score = 0;
      for (const t of seeds) if (e.bag.includes(` ${t} `)) score += 1;
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.e);
  return scored;
}

export const INTENT_LABELS: Record<IntentClass, string> = {
  best: "Best picks",
  answers: "Quick answer",
  rules: "2026 rules",
  decide: "Should I…?",
};

export const INTENT_CHIP_CLASS: Record<IntentClass, string> = {
  best: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100",
  answers: "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-100",
  rules: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100",
  decide: "bg-violet-100 text-violet-900 dark:bg-violet-900/40 dark:text-violet-100",
};
