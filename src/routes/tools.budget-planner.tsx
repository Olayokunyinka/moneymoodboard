import { canonical, hreflangLinks } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Wallet, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { toolContent } from "@/lib/tool-content";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const TITLE = "Budget Planner";

export const Route = createFileRoute("/tools/budget-planner")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Free 50/30/20 Tool | MoneyMoodBoard` },
      { name: "description", content: "Plan your monthly budget with the 50/30/20 rule — or your own custom split. Drop in your income and see exactly where every dollar should go. Free, no signup." },
      { property: "og:title", content: `${TITLE} — Free Tool | MoneyMoodBoard` },
      { property: "og:description", content: "Drop in your income and split it the smart way with the 50/30/20 rule." },
    ],
    links: [canonical("/tools/budget-planner"), ...hreflangLinks("/tools/budget-planner")],
  }),
  component: BudgetPlanner,
});

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(n)),
  );

function BudgetPlanner() {
  const tc = toolContent["budget-planner"];
  const faqs = tc.faqs;
  const [income, setIncome] = useState<number>(5000);
  const [needs, setNeeds] = useState<number>(50);
  const [wants, setWants] = useState<number>(30);
  const savings = Math.max(0, 100 - needs - wants);

  const result = useMemo(() => {
    return {
      needs: (income * needs) / 100,
      wants: (income * wants) / 100,
      savings: (income * savings) / 100,
    };
  }, [income, needs, wants, savings]);

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: TITLE }]} />

      <header className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold">
          <Wallet className="h-3.5 w-3.5" /> Free tool · No signup
        </span>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{TITLE}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Drop in your monthly income and see exactly how much should go to needs, wants, and savings.
        </p>
      </header>

      {/* Tool */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="income">Monthly take-home income</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="income"
                  type="number"
                  min={0}
                  step={100}
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value) || 0)}
                  className="pl-7"
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">After taxes and benefits.</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label htmlFor="needs">Needs %</Label>
                <span className="text-sm font-semibold">{needs}%</span>
              </div>
              <Slider
                id="needs"
                min={0}
                max={100}
                step={1}
                value={[needs]}
                onValueChange={(v) => {
                  const n = v[0]!;
                  setNeeds(n);
                  if (n + wants > 100) setWants(Math.max(0, 100 - n));
                }}
                className="mt-3"
              />
              <p className="mt-1 text-xs text-muted-foreground">Rent, utilities, groceries, insurance, minimum debt.</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label htmlFor="wants">Wants %</Label>
                <span className="text-sm font-semibold">{wants}%</span>
              </div>
              <Slider
                id="wants"
                min={0}
                max={100 - needs}
                step={1}
                value={[wants]}
                onValueChange={(v) => setWants(v[0]!)}
                className="mt-3"
              />
              <p className="mt-1 text-xs text-muted-foreground">Dining, subscriptions, hobbies, travel.</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label>Savings & debt payoff %</Label>
                <span className="text-sm font-semibold">{savings}%</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Whatever's left after needs and wants.</p>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-xl bg-primary-soft p-6 flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Your monthly plan</p>
            <p className="mt-2 text-4xl md:text-5xl font-bold text-foreground">{fmt(income)}</p>
            <p className="mt-1 text-muted-foreground">Take-home income to allocate</p>

            <dl className="mt-6 space-y-4">
              {[
                { label: "Needs", pct: needs, value: result.needs, color: "bg-pillar-budgeting-fg" },
                { label: "Wants", pct: wants, value: result.wants, color: "bg-pillar-credit-fg" },
                { label: "Savings & debt", pct: savings, value: result.savings, color: "bg-primary" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-baseline justify-between text-sm">
                    <dt className="font-medium">{row.label} <span className="text-muted-foreground">· {row.pct}%</span></dt>
                    <dd className="font-bold">{fmt(row.value)}</dd>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-background">
                    <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-auto pt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <p>Calculations stay in your browser — nothing is sent or saved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold">How to Use This Calculator</h2>
        <ol className="mt-4 list-decimal pl-5 space-y-2 text-foreground/85">
          <li><span className="font-semibold">Enter your take-home income.</span> The amount that lands in your bank account each month after taxes and benefits.</li>
          <li><span className="font-semibold">Start with the 50/30/20 default.</span> It's the most evidence-backed split for the average household.</li>
          <li><span className="font-semibold">Adjust the sliders.</span> If your housing costs eat more than half your income, push needs higher and squeeze wants — but keep savings at 20% if you can.</li>
          <li><span className="font-semibold">Use the dollar amounts as monthly targets.</span> Set up automatic transfers on payday so the savings number happens before you can spend it.</li>
        </ol>
      </section>

      {/* Explainer */}
      <article className="mt-12 max-w-3xl space-y-6 text-foreground/85">
        <h2 className="text-2xl font-bold">The 50/30/20 Rule, Explained</h2>
        <p>
          The 50/30/20 rule is the most popular budgeting framework in personal
          finance for one good reason: it works without a spreadsheet. You don't
          need to track every coffee. You just need to make sure three big buckets
          stay roughly the right size. After-tax income gets split 50% to needs,
          30% to wants, and 20% to savings and extra debt payoff. That's the whole
          system.
        </p>
        <h3 className="text-xl font-semibold">What counts as a need?</h3>
        <p>
          A need is anything you'd still pay if your income were cut in half
          tomorrow: rent or mortgage, utilities, basic groceries, transportation
          to and from work, insurance premiums, and the minimum payment on every
          debt you owe. If a category isn't strictly required to keep your life
          functioning, it lives in wants. The discipline of drawing that line
          honestly is half the value of budgeting.
        </p>
        <h3 className="text-xl font-semibold">What counts as a want?</h3>
        <p>
          Wants are everything that makes life more enjoyable but isn't essential:
          restaurants, streaming subscriptions, hobbies, vacations, the upgraded
          phone, premium gym memberships. Wants aren't bad — a budget that
          eliminates them is one you'll quit by month two. The 30% bucket is
          permission to spend on what you love, guilt-free, because you've
          already covered needs and savings.
        </p>
        <h3 className="text-xl font-semibold">Why 20% to savings?</h3>
        <p>
          Twenty percent is the amount that, sustained over a working career,
          turns an average income into financial independence. Lower than that
          and you'll struggle to retire on time. Higher than that, if you can
          manage it, just brings the finish line closer. The order matters too:
          starter emergency fund first ($1,000), then any debt above 7% APR,
          then a full 3–6 month emergency fund, then retirement contributions
          to capture any employer match, then long-term investing.
        </p>
        <h3 className="text-xl font-semibold">When to adjust the split</h3>
        <p>
          High cost-of-living cities make 50% on needs almost impossible without
          roommates or a long commute. In that case, push needs to 60–65% and
          squeeze wants to 15–20% — but try to protect savings at 20% if you
          can. The opposite is also true: if your needs are well under 50%, raise
          savings instead of inflating wants. Lifestyle creep is the silent
          killer of every high earner's wealth.
        </p>
      </article>
      <ToolExplainer content={tc} />

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <dl className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f) => (
            <div key={f.q} className="p-5">
              <dt className="font-semibold">{f.q}</dt>
              <dd className="mt-2 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Related tools */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Related Tools</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { name: "Emergency Fund Calculator", slug: "emergency-fund-calculator" },
            { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
            { name: "Credit Score Estimator", slug: "credit-score-estimator" },
          ].map((t) => (
            <Link
              key={t.slug}
              to={`/tools/${t.slug}` as string}
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
            >
              <p className="font-semibold">{t.name}</p>
              <p className="mt-1 text-sm text-primary">Open tool →</p>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link to="/budgeting">Read the complete Budgeting guide</Link>
          </Button>
        </div>
      </section>

      <div className="mt-12 -mx-4 md:-mx-6">
        <NewsletterCTA />
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: TITLE,
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            url: "https://moneymoodboard.com/tools/budget-planner",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            isAccessibleForFree: true,
            featureList: ["50/30/20 split","Custom percentage allocations","Live monthly dollar breakdown"],
            inLanguage: "en-US",
            publisher: { "@id": "https://moneymoodboard.com/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          ...(tc.howToSteps
            ? [{
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: `How to use the ${TITLE}`,
                step: tc.howToSteps.map((st, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: st.name,
                  text: st.text,
                })),
              }]
            : []),
        ]}
      />
    </div>
  );
}
