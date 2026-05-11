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

const TITLE = "Retirement Savings Calculator";

export const Route = createFileRoute("/tools/retirement-savings-calculator")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Free Tool | MoneyMoodBoard` },
      { name: "description", content: "Project your retirement nest egg, see if you're on track, and find out how much you need to save monthly to retire comfortably. Free, no signup." },
      { property: "og:title", content: `${TITLE} — Free Tool | MoneyMoodBoard` },
      { property: "og:description", content: "Project your retirement nest egg and find your monthly savings target." },
    ],
    links: [canonical("/tools/retirement-savings-calculator"), ...hreflangLinks("/tools/retirement-savings-calculator")],
  }),
  component: RetirementSavingsCalculator,
});

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(n)),
  );

function RetirementSavingsCalculator() {
  const tc = toolContent["retirement-savings-calculator"];
  const faqs = tc.faqs;
  const [currentAge, setCurrentAge] = useState<number>(32);
  const [retireAge, setRetireAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(25000);
  const [monthly, setMonthly] = useState<number>(500);
  const [returnRate, setReturnRate] = useState<number>(7);
  const [income, setIncome] = useState<number>(75000);
  const [replacementPct, setReplacementPct] = useState<number>(80);
  const [withdrawRate, setWithdrawRate] = useState<number>(4);

  const result = useMemo(() => {
    const years = Math.max(0, retireAge - currentAge);
    const months = years * 12;
    const r = returnRate / 100 / 12;
    // FV of current savings + FV of annuity
    const fvCurrent = currentSavings * Math.pow(1 + r, months);
    const fvContrib = r === 0 ? monthly * months : monthly * ((Math.pow(1 + r, months) - 1) / r);
    const projected = fvCurrent + fvContrib;

    const targetIncome = income * (replacementPct / 100);
    const targetNestEgg = withdrawRate > 0 ? targetIncome / (withdrawRate / 100) : 0;
    const gap = targetNestEgg - projected;

    // Required monthly to hit target
    let requiredMonthly = monthly;
    if (gap > 0 && months > 0) {
      const remainingFv = targetNestEgg - fvCurrent;
      requiredMonthly = r === 0 ? remainingFv / months : (remainingFv * r) / (Math.pow(1 + r, months) - 1);
    }

    return { years, projected, targetIncome, targetNestEgg, gap, requiredMonthly };
  }, [currentAge, retireAge, currentSavings, monthly, returnRate, income, replacementPct, withdrawRate]);

  const onTrack = result.gap <= 0;

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: TITLE }]} />

      <header className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold">
          <Calculator className="h-3.5 w-3.5" /> Free tool · No signup
        </span>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{TITLE}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          See if you're on track for retirement and find the exact monthly contribution that gets you there.
        </p>
      </header>

      {/* Tool */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="age">Current age</Label>
                <Input id="age" type="number" min={18} max={90} value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value) || 0)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="retire">Retire at</Label>
                <Input id="retire" type="number" min={currentAge + 1} max={90} value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value) || 0)} className="mt-1.5" />
              </div>
            </div>

            <div>
              <Label htmlFor="cur">Current retirement savings</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="cur" type="number" min={0} step={500} value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)} className="pl-7" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">401(k), IRA, Roth, brokerage earmarked for retirement.</p>
            </div>

            <div>
              <Label htmlFor="monthly">Monthly contribution</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="monthly" type="number" min={0} step={25} value={monthly} onChange={(e) => setMonthly(Number(e.target.value) || 0)} className="pl-7" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Include any employer match.</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label>Expected real return</Label>
                <span className="text-sm font-semibold">{returnRate}%</span>
              </div>
              <Slider min={2} max={10} step={0.5} value={[returnRate]} onValueChange={(v) => setReturnRate(v[0]!)} className="mt-3" />
              <p className="mt-1 text-xs text-muted-foreground">7% is a reasonable long-term assumption after inflation.</p>
            </div>

            <div>
              <Label htmlFor="income">Current annual income</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="income" type="number" min={0} step={1000} value={income} onChange={(e) => setIncome(Number(e.target.value) || 0)} className="pl-7" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-baseline justify-between">
                  <Label>Income replacement</Label>
                  <span className="text-sm font-semibold">{replacementPct}%</span>
                </div>
                <Slider min={50} max={100} step={5} value={[replacementPct]} onValueChange={(v) => setReplacementPct(v[0]!)} className="mt-3" />
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <Label>Withdrawal rate</Label>
                  <span className="text-sm font-semibold">{withdrawRate}%</span>
                </div>
                <Slider min={2.5} max={6} step={0.1} value={[withdrawRate]} onValueChange={(v) => setWithdrawRate(v[0]!)} className="mt-3" />
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-xl bg-primary-soft p-6 flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Projected at age {retireAge}</p>
            <p className="mt-2 text-4xl md:text-5xl font-bold text-foreground">{fmt(result.projected)}</p>
            <p className="mt-1 text-muted-foreground">Over {result.years} years of saving</p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Target nest egg</dt>
                <dd className="font-semibold">{fmt(result.targetNestEgg)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Target income / yr</dt>
                <dd className="font-semibold">{fmt(result.targetIncome)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{onTrack ? "Surplus" : "Shortfall"}</dt>
                <dd className={`font-semibold ${onTrack ? "text-primary" : "text-destructive"}`}>
                  {fmt(Math.abs(result.gap))}
                </dd>
              </div>
            </dl>

            <div className="mt-6 rounded-lg bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {onTrack ? "You're on track" : "Required monthly to hit target"}
              </p>
              <p className="mt-1 text-2xl font-bold">
                {onTrack ? "🎯 Keep going" : fmt(result.requiredMonthly)}
              </p>
            </div>

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
          <li><span className="font-semibold">Enter your ages.</span> Be honest about your retirement age — pulling it forward by even three years dramatically raises the required savings rate.</li>
          <li><span className="font-semibold">Add up current retirement savings.</span> Combine 401(k), IRA, Roth, and any brokerage money you've earmarked for retirement.</li>
          <li><span className="font-semibold">Enter monthly contributions.</span> Include the employer match — that's part of your savings rate.</li>
          <li><span className="font-semibold">Tune your assumptions.</span> 7% real return, 80% income replacement, and a 4% withdrawal rate are widely used defaults; adjust if you have a different plan.</li>
        </ol>
      </section>

      {/* Explainer */}
      <article className="mt-12 max-w-3xl space-y-6 text-foreground/85">
        <h2 className="text-2xl font-bold">How Much Do You Actually Need to Retire?</h2>
        <p>
          The honest answer is: it depends on the lifestyle you want, where
          you live, and how long you live. But the planning math is simpler
          than it looks. Decide what annual income you'll want in retirement,
          divide by a sustainable withdrawal rate, and you have your nest-egg
          target. Everything else is just figuring out how to get there.
        </p>
        <h3 className="text-xl font-semibold">The income replacement rule</h3>
        <p>
          A common rule of thumb is that retirees need 70–85% of their
          pre-retirement income to maintain their lifestyle. The drop comes
          from no longer paying payroll taxes, no longer commuting, and no
          longer saving for retirement itself. Higher earners often land
          closer to 70%; lower earners and those with mortgages still
          outstanding may need closer to 90%.
        </p>
        <h3 className="text-xl font-semibold">The 4% rule</h3>
        <p>
          The 4% rule, born from the 1994 Trinity Study, says that
          withdrawing 4% of your portfolio in year one and adjusting that
          dollar amount for inflation each subsequent year has historically
          had a very high probability of lasting 30 years. So if you want
          $60,000/year in retirement income, you need a $1.5M nest egg
          ($60,000 ÷ 0.04). Critics argue early retirees with 40+ year
          horizons should use 3.3–3.5% to be safe.
        </p>
        <h3 className="text-xl font-semibold">Why time matters more than the amount</h3>
        <p>
          Compound returns reward early savers in a way that feels almost
          unfair. A 25-year-old saving $300/month at 7% real returns reaches
          $1M by 65. A 35-year-old has to save nearly $700/month — more than
          double — to hit the same target. If you have time, use it. If you
          don't, increase your savings rate aggressively and use catch-up
          contributions starting at 50.
        </p>
        <h3 className="text-xl font-semibold">Account order matters</h3>
        <p>
          Always capture the full employer 401(k) match first — it's an
          instant 50–100% return that no investment can beat. Then knock
          out high-interest debt. Then a Roth IRA if you qualify, for
          tax-free growth. Then back to the 401(k) up to the annual
          contribution limit. An HSA, if you're on a high-deductible health
          plan, is the best account in the tax code: deductible going in,
          tax-free growth, tax-free out for medical expenses.
        </p>
        <h3 className="text-xl font-semibold">Don't model 10% returns</h3>
        <p>
          Yes, the S&P 500 has averaged ~10% nominal historically. But
          inflation eats ~3% of that, sequence-of-returns risk eats more,
          and you'll likely shift toward bonds as you age. Plan on 6–7%
          real and you'll either retire on schedule or pleasantly early.
          Plan on 10% and you'll undersave by half.
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
            { name: "Compound Interest Calculator", slug: "compound-interest-calculator" },
            { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
            { name: "Budget Planner", slug: "budget-planner" },
          ].map((t) => (
            <Link key={t.slug} to={`/tools/${t.slug}` as string} className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
              <p className="font-semibold">{t.name}</p>
              <p className="mt-1 text-sm text-primary">Open tool →</p>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link to="/retirement">Read the complete Retirement guide</Link>
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
            url: "https://moneymoodboard.com/tools/retirement-savings-calculator",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            isAccessibleForFree: true,
            featureList: ["Nest egg projection","Monthly contribution target","Retirement age planning"],
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
