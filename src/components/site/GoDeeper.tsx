import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { matchIntentForArticle, INTENT_LABELS, INTENT_CHIP_CLASS } from "@/lib/intent-pages";
import type { PillarSlug } from "@/lib/pillars";

export function GoDeeper({
  pillarSlug,
  articleSlug,
  articleTitle,
}: {
  pillarSlug: PillarSlug;
  articleSlug: string;
  articleTitle: string;
}) {
  const matches = matchIntentForArticle(pillarSlug, articleSlug, articleTitle, 3);
  if (!matches.length) return null;
  return (
    <section aria-label="Go deeper" className="mt-12 rounded-2xl border border-primary/20 bg-primary-soft/30 p-5 md:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Go deeper</p>
      <ul className="mt-3 space-y-2">
        {matches.map((e) => (
          <li key={e.to}>
            <Link to={e.to} className="group inline-flex items-start gap-2 text-foreground/90 hover:text-primary">
              <span className={`mt-0.5 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${INTENT_CHIP_CLASS[e.cls]}`}>
                {INTENT_LABELS[e.cls]}
              </span>
              <span className="hover:underline">{e.label}</span>
              <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
