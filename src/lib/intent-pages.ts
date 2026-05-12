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

/** Class priority used when padding results, ensures variety in fallbacks. */
const CLASS_PRIORITY: IntentClass[] = ["answers", "best", "rules", "decide"];

/** Score sharper-child candidates for an existing article using keyword overlap. */
export function matchIntentForArticle(
  pillar: PillarSlug,
  articleSlug: string,
  articleTitle: string,
  limit = 3,
): IntentEntry[] {
  const candidates = ALL_INTENT_ENTRIES.filter((e) => e.pillar === pillar);
  const seeds = new Set(tokens(`${articleSlug} ${articleTitle}`));
  const scored = seeds.size
    ? candidates
        .map((e) => {
          let score = 0;
          for (const t of seeds) if (e.bag.includes(` ${t} `)) score += 1;
          return { e, score };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.e)
    : [];
  return padWithFallback(scored, candidates, limit);
}

/** Sibling intent picks for an intent page itself (excludes the current url, prefers other classes). */
export function relatedIntentPages(
  pillar: PillarSlug,
  currentTo: string,
  seedText: string,
  limit = 4,
): IntentEntry[] {
  const candidates = ALL_INTENT_ENTRIES.filter(
    (e) => e.pillar === pillar && e.to !== currentTo,
  );
  const seeds = new Set(tokens(seedText));
  const scored = seeds.size
    ? candidates
        .map((e) => {
          let score = 0;
          for (const t of seeds) if (e.bag.includes(` ${t} `)) score += 1;
          return { e, score };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.e)
    : [];
  // Prefer variety across classes when possible.
  const out: IntentEntry[] = [];
  const seenCls = new Set<IntentClass>();
  for (const e of scored) {
    if (out.length >= limit) break;
    if (seenCls.has(e.cls)) continue;
    out.push(e);
    seenCls.add(e.cls);
  }
  for (const e of scored) {
    if (out.length >= limit) break;
    if (!out.includes(e)) out.push(e);
  }
  return padWithFallback(out, candidates, limit);
}

function padWithFallback(
  current: IntentEntry[],
  pool: IntentEntry[],
  limit: number,
): IntentEntry[] {
  if (current.length >= limit) return current.slice(0, limit);
  const out = [...current];
  const seen = new Set(out.map((e) => e.to));
  const ordered = [...pool].sort(
    (a, b) => CLASS_PRIORITY.indexOf(a.cls) - CLASS_PRIORITY.indexOf(b.cls),
  );
  for (const e of ordered) {
    if (out.length >= limit) break;
    if (!seen.has(e.to)) {
      out.push(e);
      seen.add(e.to);
    }
  }
  return out;
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
