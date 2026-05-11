import { canonical, hreflangLinks } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Target, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { toolContent } from "@/lib/tool-content";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

const TITLE = "Savings Goal Calculator";

export const Route = createFileRoute("/tools/savings-goal-calculator")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Free Tool | MoneyMoodBoard` },
      { name: "description", content: "Find out exactly how long it'll take to reach your savings goal — or how much you need to save each month to get there. Includes interest. Free, no signup." },
      { property: "og:title", content: `${TITLE} — Free Tool | MoneyMoodBoard` },
      { property: "og:description", content: "See exactly how long your goal will take, with or without interest." },
    ],
    links: [canonical("/tools/savings-goal-calculator"), ...hreflangLinks("/tools/savings-goal-calculator")],
  }),
  component: SavingsGoalCalculator,
});

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(n)),
  );

function SavingsGoalCalculator() {
  const tc = toolContent["savings-goal-calculator"];
  const faqs = tc.faqs;
  const [goal, setGoal] = useState<number>(10000);
  const [starting, setStarting] = useState<number>(1000);
  const [monthly, setMonthly] = useState<number>(400);
  const [apy, setApy] = useState<number>(4.5);

  const result = useMemo(() => {
    const r = apy / 100 / 12;
    const remaining = Math.max(0, goal - starting);
    let months = 0;
    if (remaining === 0) {
      months = 0;
    } else if (monthly <= 0) {
      months = Infinity;
    } else if (r === 0) {
      months = Math.ceil(remaining / monthly);
    } else {
      // Future value formula solved for n: starting*(1+r)^n + monthly*((1+r)^n -1)/r = goal
      const num = Math.log((goal * r + monthly) / (starting * r + monthly));
      const den = Math.log(1 + r);
      months = Math.ceil(num / den);
      if (!isFinite(months) || months < 0) months = Infinity;
    }
    const totalContribs = monthly * (isFinite(months) ? months : 0) + starting;
    const interestEarned = isFinite(months) ? Math.max(0, goal - totalContribs) : 0;
    const progress = goal > 0 ? Math.min(100, (starting / goal) * 100) : 0;
    return { months, totalContribs, interestEarned, progress };
  }, [goal, starting, monthly, apy]);

  const years = isFinite(result.months) ? Math.floor(result.months / 12) : 0;
  const remMonths = isFinite(result.months) ? result.months % 12 : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: TITLE }]} />

      <header className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold">
          <Target className="h-3.5 w-3.5" /> Free tool · No signup
        </span>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{TITLE}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          See exactly how long your goal will take — and how much interest does the heavy lifting.
        </p>
      </header>

      {/* Tool */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="goal">Savings goal</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="goal" type="number" min={0} step={500} value={goal} onChange={(e) => setGoal(Number(e.target.value) || 0)} className="pl-7" />
              </div>
            </div>

            <div>
              <Label htmlFor="starting">Already saved</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="starting" type="number" min={0} step={100} value={starting} onChange={(e) => setStarting(Number(e.target.value) || 0)} className="pl-7" />
              </div>
            </div>

            <div>
              <Label htmlFor="monthly">Monthly contribution</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="monthly" type="number" min={0} step={25} value={monthly} onChange={(e) => setMonthly(Number(e.target.value) || 0)} className="pl-7" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label htmlFor="apy">Interest rate (APY)</Label>
                <span className="text-sm font-semibold">{apy.toFixed(1)}%</span>
              </div>
              <Slider id="apy" min={0} max={10} step={0.1} value={[apy]} onValueChange={(v) => setApy(v[0]!)} className="mt-3" />
              <p className="mt-1 text-xs text-muted-foreground">Top high-yield savings accounts offer about 4–5% APY today.</p>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-xl bg-primary-soft p-6 flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Time to your goal</p>
            <p className="mt-2 text-4xl md:text-5xl font-bold text-foreground">
              {!isFinite(result.months)
                ? "—"
                : result.months === 0
                ? "Already there"
                : years > 0
                ? `${years}y ${remMonths}m`
                : `${result.months} mo`}
            </p>
            <p className="mt-1 text-muted-foreground">to reach {fmt(goal)}</p>

            <div className="mt-6">
              <div className="flex justify-between text-sm">
                <span>Starting progress</span>
                <span className="font-semibold">{Math.round(result.progress)}%</span>
              </div>
              <Progress value={result.progress} className="mt-2" />
              <p className="mt-2 text-sm text-muted-foreground">{fmt(starting)} of {fmt(goal)}</p>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">You'll contribute</dt>
                <dd className="font-semibold">{isFinite(result.months) ? fmt(result.totalContribs) : "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Interest earned</dt>
                <dd className="font-semibold">{isFinite(result.months) ? fmt(result.interestEarned) : "—"}</dd>
              </div>
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
          <li><span className="font-semibold">Set your goal amount.</span> Be specific: a down payment, a wedding, a sabbatical, an emergency fund target.</li>
          <li><span className="font-semibold">Enter what you've already saved</span> toward this specific goal — not your total cash.</li>
          <li><span className="font-semibold">Pick a sustainable monthly contribution.</span> The number you'll actually hit every month, not the optimistic number.</li>
          <li><span className="font-semibold">Set a realistic interest rate.</span> 4–5% APY for a high-yield savings account; 0% if you're just stuffing cash.</li>
        </ol>
      </section>

      {/* Explainer */}
      <article className="mt-12 max-w-3xl space-y-6 text-foreground/85">
        <h2 className="text-2xl font-bold">How to Set (and Actually Reach) a Savings Goal</h2>
        <p>
          A savings goal is the bridge between a vague wish and a real plan.
          "I want to buy a house someday" is a wish. "I need $40,000 for a
          down payment in 36 months, which is $1,050 a month at 4.5% APY" is
          a plan. The difference is whether you ever get there.
        </p>
        <h3 className="text-xl font-semibold">Make the goal specific</h3>
        <p>
          Vague goals quietly die. Specific goals get hit. Pick a dollar
          amount, a deadline, and a name. Write them down. Every dollar you
          save toward that goal should live in a separately labelled account
          (most online banks let you create unlimited buckets) so you can
          watch the balance climb.
        </p>
        <h3 className="text-xl font-semibold">Pick the right account</h3>
        <p>
          For goals you'll spend within 5 years, a high-yield savings account
          is almost always the right vehicle. The interest rate matters less
          than the safety: you cannot afford a 30% drawdown the year before
          you buy a house. For goals 5+ years away, a low-cost index fund in
          a brokerage account historically outperforms cash, but only if you
          can sit through volatility without panicking.
        </p>
        <h3 className="text-xl font-semibold">Automate the contribution</h3>
        <p>
          Set up a recurring transfer for the day after you get paid. Money
          you never see in your checking account is money you can't
          accidentally spend. Automation beats willpower over a 3-year
          timeline every time. If your income is variable, automate the
          minimum and manually top up in good months.
        </p>
        <h3 className="text-xl font-semibold">Let interest do its share</h3>
        <p>
          On a 36-month goal earning 4.5% APY, interest will cover about 6–7%
          of the total. That's not life-changing, but it's free money — there
          is no reason to leave a multi-thousand-dollar balance in a 0.01%
          account when a 4.5% account is one click away. Just make sure the
          bank is FDIC-insured.
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
            { name: "Budget Planner", slug: "budget-planner" },
            { name: "Credit Score Estimator", slug: "credit-score-estimator" },
          ].map((t) => (
            <Link key={t.slug} to={`/tools/${t.slug}` as string} className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
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
            url: "https://moneymoodboard.com/tools/savings-goal-calculator",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            isAccessibleForFree: true,
            featureList: ["Goal-based monthly target","APY compounding projection","Timeline visualisation"],
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
