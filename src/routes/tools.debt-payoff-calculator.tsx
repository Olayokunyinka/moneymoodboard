import { canonical, hreflangLinks } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator, ShieldCheck, Plus, Trash2 } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { toolContent } from "@/lib/tool-content";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TITLE = "Debt Payoff Calculator";

export const Route = createFileRoute("/tools/debt-payoff-calculator")({
  head: () => ({
    meta: [
      { title: `${TITLE}, Avalanche vs Snowball | MoneyMoodBoard` },
      { name: "description", content: "Compare the avalanche and snowball methods to see which debt payoff strategy gets you out fastest. Free, no signup." },
      { property: "og:title", content: `${TITLE}, Avalanche vs Snowball | MoneyMoodBoard` },
      { property: "og:description", content: "Compare avalanche vs snowball debt payoff methods side-by-side and see your real payoff date." },
    ],
    links: [canonical("/tools/debt-payoff-calculator"), ...hreflangLinks("/tools/debt-payoff-calculator")],
  }),
  component: DebtPayoffCalculator,
});

type Debt = { id: string; name: string; balance: number; apr: number; minimum: number };
type Method = "avalanche" | "snowball";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(n)),
  );

function simulate(debts: Debt[], extra: number, method: Method) {
  // Clone
  const list = debts.map((d) => ({ ...d }));
  let months = 0;
  let totalInterest = 0;
  const MAX_MONTHS = 600;

  while (list.some((d) => d.balance > 0.01) && months < MAX_MONTHS) {
    months++;
    // accrue interest, pay minimums
    for (const d of list) {
      if (d.balance <= 0) continue;
      const interest = (d.balance * (d.apr / 100)) / 12;
      totalInterest += interest;
      d.balance += interest;
      const pay = Math.min(d.minimum, d.balance);
      d.balance -= pay;
    }
    // apply extra to focus debt
    let pool = extra + list.filter((d) => d.balance <= 0.01).reduce((s, d) => s + d.minimum, 0);
    const active = list.filter((d) => d.balance > 0.01);
    const sorted = [...active].sort((a, b) =>
      method === "avalanche" ? b.apr - a.apr : a.balance - b.balance,
    );
    for (const d of sorted) {
      if (pool <= 0) break;
      const pay = Math.min(pool, d.balance);
      d.balance -= pay;
      pool -= pay;
    }
  }
  return { months, totalInterest };
}

function DebtPayoffCalculator() {
  const tc = toolContent["debt-payoff-calculator"];
  const faqs = tc.faqs;
  const [debts, setDebts] = useState<Debt[]>([
    { id: "1", name: "Credit Card", balance: 5500, apr: 22, minimum: 150 },
    { id: "2", name: "Car Loan", balance: 8200, apr: 6.5, minimum: 220 },
    { id: "3", name: "Student Loan", balance: 14500, apr: 5.5, minimum: 180 },
  ]);
  const [extra, setExtra] = useState<number>(250);
  const [method, setMethod] = useState<Method>("avalanche");

  const updateDebt = (id: string, patch: Partial<Debt>) =>
    setDebts((d) => d.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const addDebt = () =>
    setDebts((d) => [...d, { id: crypto.randomUUID(), name: "New debt", balance: 0, apr: 0, minimum: 0 }]);
  const removeDebt = (id: string) => setDebts((d) => d.filter((x) => x.id !== id));

  const result = useMemo(() => {
    const valid = debts.filter((d) => d.balance > 0 && d.minimum >= 0 && d.apr >= 0);
    if (!valid.length) return null;
    const a = simulate(valid, extra, "avalanche");
    const s = simulate(valid, extra, "snowball");
    const chosen = method === "avalanche" ? a : s;
    const totalBalance = valid.reduce((sum, d) => sum + d.balance, 0);
    return { a, s, chosen, totalBalance };
  }, [debts, extra, method]);

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: TITLE }]} />

      <header className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold">
          <Calculator className="h-3.5 w-3.5" /> Free tool · No signup
        </span>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{TITLE}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Compare the avalanche and snowball methods on your real debts and see exactly when you'll be free.
        </p>
      </header>

      {/* Tool */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your debts</h2>
            <Button variant="outline" size="sm" onClick={addDebt}>
              <Plus className="h-4 w-4 mr-1" /> Add debt
            </Button>
          </div>

          <div className="grid gap-3">
            {debts.map((d) => (
              <div key={d.id} className="grid grid-cols-12 gap-2 items-end rounded-lg border border-border p-3">
                <div className="col-span-12 sm:col-span-4">
                  <Label htmlFor={`name-${d.id}`} className="text-xs">Name</Label>
                  <Input id={`name-${d.id}`} value={d.name} onChange={(e) => updateDebt(d.id, { name: e.target.value })} />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <Label htmlFor={`bal-${d.id}`} className="text-xs">Balance</Label>
                  <Input id={`bal-${d.id}`} type="number" min={0} value={d.balance} onChange={(e) => updateDebt(d.id, { balance: Number(e.target.value) || 0 })} />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <Label htmlFor={`apr-${d.id}`} className="text-xs">APR %</Label>
                  <Input id={`apr-${d.id}`} type="number" min={0} step={0.1} value={d.apr} onChange={(e) => updateDebt(d.id, { apr: Number(e.target.value) || 0 })} />
                </div>
                <div className="col-span-3 sm:col-span-3">
                  <Label htmlFor={`min-${d.id}`} className="text-xs">Min payment</Label>
                  <Input id={`min-${d.id}`} type="number" min={0} value={d.minimum} onChange={(e) => updateDebt(d.id, { minimum: Number(e.target.value) || 0 })} />
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button variant="ghost" size="icon" aria-label="Remove debt" onClick={() => removeDebt(d.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="extra">Extra monthly payment (above minimums)</Label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="extra" type="number" min={0} step={25} value={extra} onChange={(e) => setExtra(Number(e.target.value) || 0)} className="pl-7" />
            </div>
          </div>
          <div>
            <Label>Strategy</Label>
            <RadioGroup value={method} onValueChange={(v) => setMethod(v as Method)} className="mt-2 grid gap-2">
              {[
                { v: "avalanche", label: "Avalanche, highest APR first (saves most money)" },
                { v: "snowball", label: "Snowball, smallest balance first (fastest wins)" },
              ].map((o) => (
                <label key={o.v} htmlFor={`m-${o.v}`} className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem id={`m-${o.v}`} value={o.v} />
                  <span className="text-sm">{o.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>

        {result && (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-primary-soft p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Your plan ({method})</p>
              <p className="mt-2 text-4xl font-bold">{result.chosen.months} mo</p>
              <p className="mt-1 text-muted-foreground">
                ≈ {Math.floor(result.chosen.months / 12)} yr {result.chosen.months % 12} mo to debt-free
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Total balance</dt><dd className="font-semibold">{fmt(result.totalBalance)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Total interest</dt><dd className="font-semibold">{fmt(result.chosen.totalInterest)}</dd></div>
              </dl>
            </div>
            <div className="rounded-xl border border-border p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Side by side</p>
              <table className="mt-3 w-full text-sm">
                <thead><tr className="text-left text-muted-foreground"><th className="font-normal">Method</th><th className="font-normal">Months</th><th className="font-normal text-right">Interest</th></tr></thead>
                <tbody>
                  <tr className="border-t border-border"><td className="py-2">Avalanche</td><td>{result.a.months}</td><td className="text-right">{fmt(result.a.totalInterest)}</td></tr>
                  <tr className="border-t border-border"><td className="py-2">Snowball</td><td>{result.s.months}</td><td className="text-right">{fmt(result.s.totalInterest)}</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs text-muted-foreground">
                Avalanche saves <span className="font-semibold text-foreground">{fmt(Math.max(0, result.s.totalInterest - result.a.totalInterest))}</span> vs snowball on these inputs.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary mt-0.5" />
          <p>Calculations stay in your browser, nothing is sent or saved.</p>
        </div>
      </section>

      {/* How to use */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold">How to Use This Calculator</h2>
        <ol className="mt-4 list-decimal pl-5 space-y-2 text-foreground/85">
          <li><span className="font-semibold">List every debt you owe.</span> Include credit cards, personal loans, car loans, and student loans. Skip your mortgage if you don't want to pay it off early.</li>
          <li><span className="font-semibold">Enter the balance, APR, and minimum payment.</span> Find these on your most recent statement or in your account online.</li>
          <li><span className="font-semibold">Add any extra you can throw at debt each month.</span> Even $50 above the minimums dramatically shortens the timeline.</li>
          <li><span className="font-semibold">Toggle between avalanche and snowball.</span> Compare the months and interest paid, then pick the strategy you'll actually finish.</li>
        </ol>
      </section>

      {/* Explainer */}
      <article className="mt-12 max-w-3xl space-y-6 text-foreground/85">
        <h2 className="text-2xl font-bold">Avalanche vs Snowball: Which Should You Choose?</h2>
        <p>
          Almost every debt payoff plan reduces to one decision: in what order
          do you attack your debts? Both major methods say the same thing
          about minimum payments, always pay them on every account, every
          month. The difference is where the extra money goes.
        </p>
        <h3 className="text-xl font-semibold">The avalanche method</h3>
        <p>
          The avalanche method directs every spare dollar at the debt with
          the highest annual percentage rate, regardless of balance. Once that
          debt is gone, the same total monthly payment cascades to the next
          highest APR. Mathematically this is optimal: it minimizes the total
          interest you'll pay and usually shortens the overall timeline by a
          few months. It is the right answer for someone who is purely
          rational, has the discipline to keep going, and is motivated by
          numbers on a spreadsheet.
        </p>
        <h3 className="text-xl font-semibold">The snowball method</h3>
        <p>
          The snowball method ignores APR and targets the smallest balance
          first. The trade-off is real, you'll pay slightly more interest .
          but the psychological win of fully eliminating an entire account in
          a month or two is powerful. A 2012 Northwestern Kellogg study
          found that people using the snowball method were more likely to
          stay with their plan and become debt-free than those using
          avalanche, even though avalanche was mathematically better.
        </p>
        <h3 className="text-xl font-semibold">A hybrid: pay the worst rate, but knock out a tiny one first</h3>
        <p>
          If you have one credit card with a small balance and a few large
          loans at moderate APRs, consider clearing the small one first for
          momentum, then switching to avalanche. You sacrifice a little
          interest for a big behavioral lift. There is no purity prize for
          choosing one strategy and never deviating.
        </p>
        <h3 className="text-xl font-semibold">What about consolidation or balance transfers?</h3>
        <p>
          A 0% balance transfer card can be a powerful accelerator on
          credit-card debt, but only if you have a written plan to pay the
          full balance before the promo period ends. Otherwise the deferred
          interest can erase the savings overnight. Personal-loan
          consolidation makes sense when the new APR is meaningfully lower
          than the weighted average of what you're consolidating and you
          don't run the original cards back up.
        </p>
        <h3 className="text-xl font-semibold">The non-financial side of debt payoff</h3>
        <p>
          The strategy you'll actually complete beats the optimal strategy
          you abandon in month four. Pick the one that makes you want to
          check the calculator every payday, that's the one that pays you
          back the most.
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
            { name: "Credit Card Payoff Calculator", slug: "credit-card-payoff-calculator" },
            { name: "Budget Planner", slug: "budget-planner" },
            { name: "Emergency Fund Calculator", slug: "emergency-fund-calculator" },
          ].map((t) => (
            <Link key={t.slug} to={`/tools/${t.slug}` as string} className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
              <p className="font-semibold">{t.name}</p>
              <p className="mt-1 text-sm text-primary">Open tool →</p>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link to="/debt-taxes-insurance">Read the complete Debt guide</Link>
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
            url: "https://moneymoodboard.com/tools/debt-payoff-calculator",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            isAccessibleForFree: true,
            featureList: ["Avalanche vs snowball comparison","Payoff date forecast","Interest saved calculator"],
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
