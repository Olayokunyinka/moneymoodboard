import { canonical, hreflangLinks } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { toolContent } from "@/lib/tool-content";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

const TITLE = "Emergency Fund Calculator";

export const Route = createFileRoute("/tools/emergency-fund-calculator")({
  head: () => ({
    meta: [
      { title: `${TITLE}, Free Tool | MoneyMoodBoard` },
      { name: "description", content: "Calculate exactly how much you should keep in your emergency fund based on your expenses and job stability. Free, no signup." },
      { property: "og:title", content: `${TITLE}, Free Tool | MoneyMoodBoard` },
      { property: "og:description", content: "Calculate exactly how much you should keep in your emergency fund based on your expenses and job stability." },
    ],
    links: [canonical("/tools/emergency-fund-calculator"), ...hreflangLinks("/tools/emergency-fund-calculator")],
  }),
  component: EmergencyFundCalculator,
});

type Stability = "stable" | "variable" | "self_employed";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(n)),
  );

function EmergencyFundCalculator() {
  const tc = toolContent["emergency-fund-calculator"];
  const faqs = tc.faqs;
  const [expenses, setExpenses] = useState<number>(3500);
  const [savings, setSavings] = useState<number>(2000);
  const [monthsCoverage, setMonthsCoverage] = useState<number>(6);
  const [stability, setStability] = useState<Stability>("stable");
  const [contribution, setContribution] = useState<number>(300);

  const suggested = stability === "stable" ? 3 : stability === "variable" ? 6 : 12;

  const result = useMemo(() => {
    const target = expenses * monthsCoverage;
    const gap = Math.max(0, target - savings);
    const monthsToGoal = contribution > 0 && gap > 0 ? Math.ceil(gap / contribution) : 0;
    const progress = target > 0 ? Math.min(100, (savings / target) * 100) : 0;
    return { target, gap, monthsToGoal, progress };
  }, [expenses, savings, monthsCoverage, contribution]);

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: TITLE }]} />

      <header className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold">
          <Calculator className="h-3.5 w-3.5" /> Free tool · No signup
        </span>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{TITLE}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Find out exactly how much you should keep in your safety net, and how long it'll take to get there.
        </p>
      </header>

      {/* Tool */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="expenses">Monthly essential expenses</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="expenses"
                  type="number"
                  min={0}
                  step={50}
                  value={expenses}
                  onChange={(e) => setExpenses(Number(e.target.value) || 0)}
                  className="pl-7"
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Rent, utilities, groceries, insurance, minimum debt.</p>
            </div>

            <div>
              <Label htmlFor="savings">Current savings toward this fund</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="savings"
                  type="number"
                  min={0}
                  step={50}
                  value={savings}
                  onChange={(e) => setSavings(Number(e.target.value) || 0)}
                  className="pl-7"
                />
              </div>
            </div>

            <div>
              <Label>Employment situation</Label>
              <RadioGroup
                value={stability}
                onValueChange={(v) => {
                  const s = v as Stability;
                  setStability(s);
                  setMonthsCoverage(s === "stable" ? 3 : s === "variable" ? 6 : 12);
                }}
                className="mt-2 grid gap-2"
              >
                {[
                  { v: "stable", label: "Stable W-2 income (suggested: 3 months)" },
                  { v: "variable", label: "Variable / commission (suggested: 6 months)" },
                  { v: "self_employed", label: "Self-employed (suggested: 12 months)" },
                ].map((o) => (
                  <label
                    key={o.v}
                    htmlFor={`s-${o.v}`}
                    className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50"
                  >
                    <RadioGroupItem id={`s-${o.v}`} value={o.v} />
                    <span className="text-sm">{o.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label htmlFor="months">Months of coverage</Label>
                <span className="text-sm font-semibold">{monthsCoverage} months</span>
              </div>
              <Slider
                id="months"
                min={1}
                max={12}
                step={1}
                value={[monthsCoverage]}
                onValueChange={(v) => setMonthsCoverage(v[0]!)}
                className="mt-3"
              />
              <p className="mt-1 text-xs text-muted-foreground">Suggested for you: {suggested} months</p>
            </div>

            <div>
              <Label htmlFor="contribution">Monthly contribution toward goal</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="contribution"
                  type="number"
                  min={0}
                  step={25}
                  value={contribution}
                  onChange={(e) => setContribution(Number(e.target.value) || 0)}
                  className="pl-7"
                />
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-xl bg-primary-soft p-6 flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Your target</p>
            <p className="mt-2 text-4xl md:text-5xl font-bold text-foreground">{fmt(result.target)}</p>
            <p className="mt-1 text-muted-foreground">{monthsCoverage} months of essential expenses</p>

            <div className="mt-6">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-semibold">{Math.round(result.progress)}%</span>
              </div>
              <Progress value={result.progress} className="mt-2" />
              <p className="mt-2 text-sm text-muted-foreground">
                {fmt(savings)} saved of {fmt(result.target)}
              </p>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Still needed</dt>
                <dd className="font-semibold">{fmt(result.gap)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Time to reach goal</dt>
                <dd className="font-semibold">
                  {result.gap === 0
                    ? "You're there 🎉"
                    : contribution > 0
                    ? `${result.monthsToGoal} ${result.monthsToGoal === 1 ? "month" : "months"}`
                    : "Set a contribution"}
                </dd>
              </div>
            </dl>

            <div className="mt-auto pt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <p>Calculations stay in your browser, nothing is sent or saved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold">How to Use This Calculator</h2>
        <ol className="mt-4 list-decimal pl-5 space-y-2 text-foreground/85">
          <li><span className="font-semibold">Estimate essential monthly expenses.</span> Add up only the spending you couldn't cut quickly: housing, utilities, groceries, insurance, minimum debt payments, transportation.</li>
          <li><span className="font-semibold">Enter what you've already saved.</span> Only count cash earmarked for emergencies, not investments or money you've assigned to other goals.</li>
          <li><span className="font-semibold">Pick your employment situation.</span> The calculator will suggest a coverage target. Adjust the slider if your situation is different.</li>
          <li><span className="font-semibold">Set a monthly contribution.</span> See how long it'll take to fully fund your safety net.</li>
        </ol>
      </section>

      {/* Explainer */}
      <article className="mt-12 max-w-3xl space-y-6 text-foreground/85">
        <h2 className="text-2xl font-bold">What Is an Emergency Fund and How Much Do You Need?</h2>
        <p>
          An emergency fund is a pool of cash you set aside specifically to
          cover unexpected, urgent expenses, a job loss, a medical bill, a
          broken appliance, a car repair. It is the single most important
          piece of personal finance infrastructure, and it is the prerequisite
          to almost everything else: aggressive debt payoff, investing,
          buying a home, switching careers.
        </p>
        <p>
          The classic guideline is 3 to 6 months of essential expenses, but
          the right number depends on three factors: how stable your income
          is, how easily you could replace it if it disappeared, and how many
          people depend on it. A single W-2 employee in a high-demand field
          can comfortably sit at three months. A self-employed parent with
          variable income should aim for twelve.
        </p>
        <h3 className="text-xl font-semibold">Where it should live</h3>
        <p>
          Your emergency fund belongs in a high-yield savings account at an
          FDIC-insured online bank. You want three things and only three
          things from it: safety (no market risk), liquidity (you can access
          it within a day), and a competitive interest rate (currently around
          4–5% APY at top online banks). Skip CDs, brokerage accounts, and
          any vehicle that locks up your money or exposes it to volatility.
        </p>
        <h3 className="text-xl font-semibold">When to use it (and when not to)</h3>
        <p>
          An emergency fund is for genuine emergencies: events that are
          unexpected, urgent, and necessary. A holiday is not an emergency .
          that's a sinking fund. A new phone because yours is two years old
          is not an emergency. Replacing a phone you actually need to do your
          job, today, is. The discipline matters: every time you spend the
          fund on a non-emergency, you have to rebuild it before it can do
          its real job.
        </p>
        <h3 className="text-xl font-semibold">Building it from zero</h3>
        <p>
          If you're starting from $0, don't try to cover six months of
          expenses on day one, that target will feel impossible and you'll
          quit. Aim for $1,000 first. Then one month. Then three. Each
          milestone unlocks dramatically more financial peace of mind than
          the dollar amount suggests. Set up an automatic transfer the day
          you get paid, even if it's only $25, automation beats willpower.
        </p>
        <p>
          Once your fund is full, leave it alone. Resist the urge to invest
          it for a slightly higher return. The whole point is that it's there
          on the worst day of your year, exactly when you need it.
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
            { name: "Budget Planner", slug: "budget-planner" },
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
            <Link to="/saving">Read the complete Saving guide</Link>
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
            url: "https://moneymoodboard.com/tools/emergency-fund-calculator",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            isAccessibleForFree: true,
            featureList: ["Personalised target by job stability","Funding timeline projection","Monthly contribution plan"],
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
