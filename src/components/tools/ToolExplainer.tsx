import { Link } from "@tanstack/react-router";
import { ExternalLink, ListChecks, AlertTriangle, BookOpen, Wrench } from "lucide-react";
import type { ToolContent } from "@/lib/tool-content";

interface Props {
  content: ToolContent;
}

export function ToolExplainer({ content }: Props) {
  return (
    <div className="mt-12 space-y-12">
      <section id="how-it-works">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" /> How it works
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          {content.howItWorks.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section id="formula">
        <h2 className="text-2xl font-bold">The formula</h2>
        <div className="mt-4 rounded-2xl border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {content.formula.label}
          </p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted px-4 py-3 font-mono text-sm">
            {content.formula.plain}
          </pre>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {content.formula.variables.map((v) => (
              <div key={v.sym} className="rounded-lg border border-border/60 bg-background p-3">
                <dt className="font-mono text-sm font-semibold">{v.sym}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{v.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="when-to-use">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-primary" /> When to use this
        </h2>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          {content.whenToUse.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" /> Limitations
        </h2>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          {content.limitations.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="sources">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" /> Sources
        </h2>
        <ul className="mt-4 space-y-2">
          {content.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                {s.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Methodology and editorial standards:{" "}
          <Link to="/methodology" className="underline hover:text-foreground">
            our methodology
          </Link>{" "}
          ·{" "}
          <Link to="/fact-checking-policy" className="underline hover:text-foreground">
            fact-checking policy
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
