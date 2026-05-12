import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  intentForPillar,
  INTENT_LABELS,
  INTENT_CHIP_CLASS,
  type IntentEntry,
  type IntentClass,
} from "@/lib/intent-pages";
import type { PillarSlug } from "@/lib/pillars";

const SECTION_TITLES: Record<IntentClass, string> = {
  best: "Best picks",
  answers: "Quick answers",
  rules: "2026 rules & limits",
  decide: "Should I…?",
};

function Block({ cls, items }: { cls: IntentClass; items: IntentEntry[] }) {
  if (!items.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${INTENT_CHIP_CLASS[cls]}`}>
          {INTENT_LABELS[cls]}
        </span>
        <h3 className="text-sm font-semibold text-foreground">{SECTION_TITLES[cls]}</h3>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((e) => (
          <li key={e.to}>
            <Link
              to={e.to}
              className="group inline-flex items-start gap-1.5 text-sm text-foreground/85 hover:text-primary"
            >
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
              <span className="hover:underline">{e.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SharperAnswers({ pillarSlug, pillarShortName }: { pillarSlug: PillarSlug; pillarShortName: string }) {
  const grouped = intentForPillar(pillarSlug);
  if (!grouped.all.length) return null;
  return (
    <section id="sharper-answers" className="mt-16 scroll-mt-24">
      <h2 className="text-2xl font-bold text-foreground">Sharper {pillarShortName} Answers</h2>
      <p className="mt-2 max-w-3xl text-muted-foreground">
        Direct answers, current rules, ranked picks, and decision shortcuts — built for the questions readers actually ask.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Block cls="best" items={grouped.best} />
        <Block cls="answers" items={grouped.answers} />
        <Block cls="rules" items={grouped.rules} />
        <Block cls="decide" items={grouped.decide} />
      </div>
    </section>
  );
}
