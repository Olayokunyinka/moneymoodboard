import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const TITLE = "Compound Interest Calculator";

export const Route = createFileRoute("/tools/compound-interest-calculator")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Free Investment Tool | MoneyMoodBoard` },
      { name: "description", content: "See exactly how much your investments will grow with compound interest. Add monthly contributions and see year-by-year growth. Free, no signup." },
      { property: "og:title", content: `${TITLE} — Free Investment Tool | MoneyMoodBoard` },
      { property: "og:description", content: "Project your investment growth with compound interest, contributions, and inflation." },
    ],
  }),
  component: CompoundInterestCalculator,
});

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(n)),
  );

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(5000);
  const [monthly, setMonthly] = useState<number>(300);
  const [years, setYears] = useState<number>(30);
  const [rate, setRate] = useState<number>(7);
  const [inflation, setInflation] = useState<number>(2.5);

  const result = useMemo(() => {
    const months = years * 12;
    const r = rate / 100 / 12;
    const fvP = principal * Math.pow(1 + r, months);
    const fvC = r === 0 ? monthly * months : monthly * ((Math.pow(1 + r, months) - 1) / r);
    const total = fvP + fvC;
    const contributed = principal + monthly * months;
    const interest = total - contributed;
    const realTotal = total / Math.pow(1 + inflation / 100, years);

    // Year-by-year breakdown
    const rows: { year: number; balance: number; contributed: number }[] = [];
    let bal = principal;
    let contrib = principal;
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        bal = bal * (1 + r) + monthly;
        contrib += monthly;
      }
      rows.push({ year: y, balance: bal, contributed: contrib });
    }

    return { total, contributed, interest, realTotal, rows };
  }, [principal, monthly, years, rate, inflation]);

  const sampleRows = useMemo(() => {
    const r = result.rows;
    if (r.length <= 8) return r;
    const step = Math.max(1, Math.floor(r.length / 7));
    const picks = new Set<number>();
    for (let i = 0; i < r.length; i += step) picks.add(i);
    picks.add(r.length - 1);
    return Array.from(picks).sort((a, b) => a - b).map((i) => r[i]!);
  }, [result.rows]);

  const faqs = [
    { q: "What is compound interest, in plain English?", a: "Earning interest on your interest. Each period, the previous earnings join the principal and start earning their own interest. Over decades, this turns modest savings into life-changing sums — and it's why starting young is so much more powerful than saving more later." },
    { q: "What return rate should I use?", a: "For long-term US stock investing, 7% real (after inflation) is a reasonable planning assumption. Bonds: 1–2% real. A balanced 60/40 portfolio: 4–5% real. Cash savings: usually negative real returns. Don't model 10%+ — that's the nominal long-term S&P average and ignores inflation." },
    { q: "Why does the inflation-adjusted number matter?", a: "Because $1M in 30 years won't buy what $1M buys today. A 2.5% inflation rate cuts purchasing power roughly in half over 30 years. Always plan in 'real' (inflation-adjusted) dollars to know what your future money is actually worth." },
    { q: "Monthly vs annual contributions — does it matter?", a: "Monthly contributions earn slightly more than the same total contributed once per year, because each dollar starts compounding sooner. The difference is small over short horizons but adds up over decades. Just contribute on the schedule you'll actually keep." },
    { q: "What if I increase my contribution every year?", a: "Inflation-matching your contributions (raising them ~3% per year) keeps your real savings rate constant as your salary grows. This calculator uses a fixed monthly amount; in practice, every raise is a chance to raise your contribution." },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: TITLE }]} />

      <header className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold">
          <Calculator className="h-3.5 w-3.5" /> Free tool · No signup
        </span>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{TITLE}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          See how your money grows when interest earns interest — and what your future balance is really worth.
        </p>
      </header>

      {/* Tool */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="principal">Starting amount</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="principal" type="number" min={0} step={500} value={principal} onChange={(e) => setPrincipal(Number(e.target.value) || 0)} className="pl-7" />
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
                <Label>Years to grow</Label>
                <span className="text-sm font-semibold">{years} yr</span>
              </div>
              <Slider min={1} max={50} step={1} value={[years]} onValueChange={(v) => setYears(v[0]!)} className="mt-3" />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label>Annual return rate</Label>
                <span className="text-sm font-semibold">{rate}%</span>
              </div>
              <Slider min={0} max={12} step={0.25} value={[rate]} onValueChange={(v) => setRate(v[0]!)} className="mt-3" />
              <p className="mt-1 text-xs text-muted-foreground">7% is a reasonable long-term real-return assumption for stocks.</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label>Inflation rate</Label>
                <span className="text-sm font-semibold">{inflation}%</span>
              </div>
              <Slider min={0} max={6} step={0.1} value={[inflation]} onValueChange={(v) => setInflation(v[0]!)} className="mt-3" />
            </div>
          </div>

          {/* Result */}
          <div className="rounded-xl bg-primary-soft p-6 flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Future value</p>
            <p className="mt-2 text-4xl md:text-5xl font-bold text-foreground">{fmt(result.total)}</p>
            <p className="mt-1 text-muted-foreground">After {years} years</p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">You contributed</dt>
                <dd className="font-semibold">{fmt(result.contributed)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Interest earned</dt>
                <dd className="font-semibold text-primary">{fmt(result.interest)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <dt className="text-muted-foreground">In today's dollars</dt>
                <dd className="font-semibold">{fmt(result.realTotal)}</dd>
              </div>
            </dl>

            <div className="mt-auto pt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <p>Calculations stay in your browser — nothing is sent or saved.</p>
            </div>
          </div>
        </div>

        {/* Year-by-year */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr><th className="font-medium py-2">Year</th><th className="font-medium">Contributed</th><th className="font-medium text-right">Balance</th></tr>
            </thead>
            <tbody>
              {sampleRows.map((row) => (
                <tr key={row.year} className="border-t border-border">
                  <td className="py-2">{row.year}</td>
                  <td>{fmt(row.contributed)}</td>
                  <td className="text-right font-semibold">{fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How to use */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold">How to Use This Calculator</h2>
        <ol className="mt-4 list-decimal pl-5 space-y-2 text-foreground/85">
          <li><span className="font-semibold">Enter your starting balance.</span> Use the current value of the account you're projecting — IRA, brokerage, savings.</li>
          <li><span className="font-semibold">Set a realistic monthly contribution.</span> One you can sustain through bad months, not your best-case number.</li>
          <li><span className="font-semibold">Pick a return rate that matches the asset.</span> 6–7% for diversified stocks, 1–2% for bonds, ~5% for high-yield savings today.</li>
          <li><span className="font-semibold">Read both the future value and the today's-dollars number.</span> The second one is the truth about purchasing power.</li>
        </ol>
      </section>

      {/* Explainer */}
      <article className="mt-12 max-w-3xl space-y-6 text-foreground/85">
        <h2 className="text-2xl font-bold">Compound Interest: The Most Important Concept in Finance</h2>
        <p>
          Compound interest is the engine that turns ordinary saving into
          serious wealth. The mechanics are simple: every period, your
          previous earnings get added to the principal and start earning
          their own interest. Over a decade or two, that snowball gets
          large enough to outpace your contributions entirely — your money
          starts doing more work than you do.
        </p>
        <h3 className="text-xl font-semibold">Why time matters more than the amount</h3>
        <p>
          A 25-year-old who invests $300/month for 10 years and then stops
          will out-earn a 35-year-old who invests $300/month for 30 years —
          if both earn 7%. The first contributed $36,000 and ends with
          ~$540,000 by age 65. The second contributed $108,000 and ends
          with ~$367,000. The early starter wins despite contributing a
          third as much. This is why "start now" beats "start big."
        </p>
        <h3 className="text-xl font-semibold">Nominal vs real returns</h3>
        <p>
          A 7% nominal return with 3% inflation is a 4% real return. Always
          plan in real terms — otherwise you'll project a $1M balance and
          discover it buys what $500K buys today. The toggle in this
          calculator does that math for you.
        </p>
        <h3 className="text-xl font-semibold">What rate is realistic?</h3>
        <p>
          Long-run US stock returns have averaged ~10% nominal and ~7% real.
          Bonds have averaged ~5% nominal and ~2% real. Cash and savings
          accounts usually lose to inflation. A balanced 70/30 portfolio
          can reasonably plan on 6% real. Don't use 10% in real-dollar
          plans — you'll undersave and underestimate the work needed.
        </p>
        <h3 className="text-xl font-semibold">The two levers you control</h3>
        <p>
          You can't control market returns. You can control two things:
          how much you save, and how long you let it grow. Increasing your
          monthly contribution by $100 has a bigger effect than chasing
          higher returns, because higher returns come with higher risk
          and bigger drawdowns. Boring, automated, decades-long
          contributions to a low-cost index fund is how almost everyone
          who ends up wealthy actually gets there.
        </p>
        <h3 className="text-xl font-semibold">A note on fees</h3>
        <p>
          A 1% annual fee sounds tiny, but over 30 years it can eat 25%
          of your final balance. This is why low-cost index funds (0.03–0.10%
          expense ratios) crush actively managed funds for most investors.
          Subtract any expected fees from your assumed return when modeling.
        </p>
      </article>

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
            { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
            { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
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
            <Link to="/investing">Read the complete Investing guide</Link>
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
        ]}
      />
    </div>
  );
}
