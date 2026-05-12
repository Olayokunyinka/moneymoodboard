import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { relatedIntentPages, INTENT_LABELS, INTENT_CHIP_CLASS } from "@/lib/intent-pages";
import type { PillarSlug } from "@/lib/pillars";

/**
 * Sibling intent links shown on best/answers/rules/decide pages.
 * Pulls the most topical other intent pages within the same pillar so
 * each intent page sits inside a tight topical cluster, not orphaned.
 */
export function RelatedIntent({
  pillarSlug,
  pillarShortName,
  pillarHubTo,
  currentTo,
  seedText,
  heading = "Related quick-reads",
  limit = 4,
}: {
  pillarSlug: PillarSlug;
  pillarShortName: string;
  pillarHubTo: string;
  currentTo: string;
  seedText: string;
  heading?: string;
  limit?: number;
}) {
  const items = relatedIntentPages(pillarSlug, currentTo, seedText, limit);
  if (!items.length) return null;
  return (
    <section
      aria-label={heading}
      className="mt-12 rounded-2xl border border-primary/20 bg-primary-soft/30 p-5 md:p-6"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">{heading}</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((e) => (
          <li key={e.to}>
            <Link
              to={e.to}
              className="group inline-flex items-start gap-2 text-foreground/90 hover:text-primary"
            >
              <span
                className={`mt-0.5 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${INTENT_CHIP_CLASS[e.cls]}`}
              >
                {INTENT_LABELS[e.cls]}
              </span>
              <span className="hover:underline">{e.label}</span>
              <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={pillarHubTo}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        More from {pillarShortName} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  );
}
