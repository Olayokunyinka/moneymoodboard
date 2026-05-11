import { canonical, hreflangLinks } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Gauge, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ToolExplainer } from "@/components/tools/ToolExplainer";
import { toolContent } from "@/lib/tool-content";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TITLE = "Credit Score Estimator";

export const Route = createFileRoute("/tools/credit-score-estimator")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Free FICO Estimate | MoneyMoodBoard` },
      { name: "description", content: "Estimate your FICO credit score from a few quick inputs — payment history, utilization, account age, and credit mix. Free, no signup, no credit pull." },
      { property: "og:title", content: `${TITLE} — Free Tool | MoneyMoodBoard` },
      { property: "og:description", content: "Estimate your credit score from five quick inputs — no signup, no credit pull." },
    ],
    links: [canonical("/tools/credit-score-estimator"), ...hreflangLinks("/tools/credit-score-estimator")],
  }),
  component: CreditScoreEstimator,
});

type Onesc = 0 | 1 | 2 | 3 | 4;
const onesScore = (v: Onesc) => v / 4;

function CreditScoreEstimator() {
  const tc = toolContent["credit-score-estimator"];
  const faqs = tc.faqs;
  // Five FICO factors with their official weights
  const [payment, setPayment] = useState<Onesc>(4); // 35%
  const [utilization, setUtilization] = useState<number>(20); // 30% — lower is better
  const [historyYears, setHistoryYears] = useState<number>(7); // 15%
  const [creditMix, setCreditMix] = useState<Onesc>(2); // 10%
  const [newCredit, setNewCredit] = useState<Onesc>(3); // 10% — fewer recent inquiries is better

  const result = useMemo(() => {
    // Each component normalized to 0..1, then weighted
    const pay = onesScore(payment);
    // Utilization: 0% best, >100% worst. Sweet spot under 10%.
    const util = utilization <= 10 ? 1 : utilization >= 100 ? 0 : 1 - (utilization - 10) / 90;
    // History: caps at ~15 years
    const hist = Math.min(1, historyYears / 15);
    const mix = onesScore(creditMix);
    const newC = onesScore(newCredit);

    const composite =
      pay * 0.35 + util * 0.3 + hist * 0.15 + mix * 0.1 + newC * 0.1;
    // Map 0..1 composite to 300..850 FICO range
    const score = Math.round(300 + composite * 550);
    const band =
      score >= 800
        ? { label: "Exceptional", color: "text-emerald-600" }
        : score >= 740
        ? { label: "Very Good", color: "text-emerald-600" }
        : score >= 670
        ? { label: "Good", color: "text-primary" }
        : score >= 580
        ? { label: "Fair", color: "text-amber-600" }
        : { label: "Poor", color: "text-destructive" };
    return { score, band };
  }, [payment, utilization, historyYears, creditMix, newCredit]);

  const labelOptions = [
    { v: 0, label: "Multiple late payments" },
    { v: 1, label: "1–2 late payments in last 2 years" },
    { v: 2, label: "1 late payment ever" },
    { v: 3, label: "On time, mostly" },
    { v: 4, label: "Never missed a payment" },
  ];
  const mixOptions = [
    { v: 0, label: "Just one card" },
    { v: 1, label: "A couple of cards" },
    { v: 2, label: "Cards + one loan" },
    { v: 3, label: "Cards, loan, mortgage" },
    { v: 4, label: "Full mix incl. installment & revolving" },
  ];
  const newOptions = [
    { v: 0, label: "5+ new accounts in last 12 months" },
    { v: 1, label: "3–4 new accounts" },
    { v: 2, label: "2 new accounts" },
    { v: 3, label: "1 new account" },
    { v: 4, label: "No new accounts in 12 months" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: TITLE }]} />

      <header className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold">
          <Gauge className="h-3.5 w-3.5" /> Free tool · No signup · No credit pull
        </span>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{TITLE}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          A directional FICO estimate from five quick inputs — built on the official FICO factor weights.
        </p>
      </header>

      {/* Tool */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <Label>Payment history <span className="text-muted-foreground font-normal">(35%)</span></Label>
              <RadioGroup value={String(payment)} onValueChange={(v) => setPayment(Number(v) as Onesc)} className="mt-2 grid gap-2">
                {labelOptions.map((o) => (
                  <label key={o.v} htmlFor={`p-${o.v}`} className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem id={`p-${o.v}`} value={String(o.v)} />
                    <span className="text-sm">{o.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label htmlFor="util">Credit utilization <span className="text-muted-foreground font-normal">(30%)</span></Label>
                <span className="text-sm font-semibold">{utilization}%</span>
              </div>
              <Slider id="util" min={0} max={100} step={1} value={[utilization]} onValueChange={(v) => setUtilization(v[0]!)} className="mt-3" />
              <p className="mt-1 text-xs text-muted-foreground">Total balances ÷ total credit limits. Under 10% is ideal.</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label htmlFor="hist">Length of credit history <span className="text-muted-foreground font-normal">(15%)</span></Label>
                <span className="text-sm font-semibold">{historyYears} {historyYears === 1 ? "year" : "years"}</span>
              </div>
              <Slider id="hist" min={0} max={25} step={1} value={[historyYears]} onValueChange={(v) => setHistoryYears(v[0]!)} className="mt-3" />
              <p className="mt-1 text-xs text-muted-foreground">Average age of all your accounts.</p>
            </div>

            <div>
              <Label>Credit mix <span className="text-muted-foreground font-normal">(10%)</span></Label>
              <RadioGroup value={String(creditMix)} onValueChange={(v) => setCreditMix(Number(v) as Onesc)} className="mt-2 grid gap-2">
                {mixOptions.map((o) => (
                  <label key={o.v} htmlFor={`m-${o.v}`} className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem id={`m-${o.v}`} value={String(o.v)} />
                    <span className="text-sm">{o.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label>New credit <span className="text-muted-foreground font-normal">(10%)</span></Label>
              <RadioGroup value={String(newCredit)} onValueChange={(v) => setNewCredit(Number(v) as Onesc)} className="mt-2 grid gap-2">
                {newOptions.map((o) => (
                  <label key={o.v} htmlFor={`n-${o.v}`} className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem id={`n-${o.v}`} value={String(o.v)} />
                    <span className="text-sm">{o.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-xl bg-primary-soft p-6 flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Estimated FICO score</p>
            <p className="mt-2 text-6xl font-bold text-foreground tabular-nums">{result.score}</p>
            <p className={`mt-1 text-lg font-semibold ${result.band.color}`}>{result.band.label}</p>

            <div className="mt-6">
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-background">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-destructive via-amber-500 to-emerald-500" style={{ width: "100%" }} />
                <div className="absolute top-0 h-full w-1 bg-foreground" style={{ left: `${((result.score - 300) / 550) * 100}%` }} />
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>300</span><span>580</span><span>670</span><span>740</span><span>800</span><span>850</span>
              </div>
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
          <li><span className="font-semibold">Be honest about payment history.</span> Even one late payment in the last two years matters more than most people realise.</li>
          <li><span className="font-semibold">Calculate utilization carefully.</span> Add up the balances on every credit card, then divide by the sum of every credit limit.</li>
          <li><span className="font-semibold">Use the average age of your accounts.</span> Closing your oldest card drops this number — a common mistake.</li>
          <li><span className="font-semibold">Count new accounts in the last 12 months.</span> Each hard pull and each new account temporarily dings your score.</li>
        </ol>
      </section>

      {/* Explainer */}
      <article className="mt-12 max-w-3xl space-y-6 text-foreground/85">
        <h2 className="text-2xl font-bold">How Your Credit Score Is Actually Calculated</h2>
        <p>
          Your FICO credit score is a three-digit number between 300 and 850
          that lenders use to predict how likely you are to repay borrowed
          money. It is built from five components, each with a fixed weight,
          published openly by FICO. Most of the personal-finance internet
          misses one of those weights — usually because they're guessing,
          not reading the source.
        </p>
        <h3 className="text-xl font-semibold">Payment history (35%)</h3>
        <p>
          More than a third of your score comes from one question: do you
          pay on time? A single 30-day late payment can knock 60–110 points
          off a high score and stays on your report for seven years. Set
          every minimum payment on autopay the day the account opens. You
          can pay extra manually, but never miss the minimum.
        </p>
        <h3 className="text-xl font-semibold">Credit utilization (30%)</h3>
        <p>
          Utilization is the percentage of your available revolving credit
          you're currently using. If you have $10,000 in card limits and a
          $3,000 balance, your utilization is 30%. Below 30% is fine, below
          10% is ideal, and 0% is very slightly worse than 1–9% (the
          algorithm wants to see you using credit, just responsibly). This
          is the one factor you can change in 30 days — pay down balances
          before the statement closes, not before the due date.
        </p>
        <h3 className="text-xl font-semibold">Length of credit history (15%)</h3>
        <p>
          The average age of your accounts matters, and it can only go up
          with patience. The most common self-inflicted mistake is closing
          your oldest credit card because you don't use it — that drops your
          average age and shrinks your total available credit (raising
          utilization). Keep old no-fee cards open and put a small recurring
          subscription on them.
        </p>
        <h3 className="text-xl font-semibold">Credit mix (10%) and new credit (10%)</h3>
        <p>
          Lenders like to see that you can responsibly handle different
          types of credit — revolving (cards) and installment (auto loans,
          mortgages, student loans). You don't need to take out a loan for
          the sake of mix, but if you have one it helps. New credit is the
          flip side: opening multiple accounts in a short window tells the
          algorithm you're stretching, and each hard inquiry dings your
          score by a few points for about a year.
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
            { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
          ].map((t) => (
            <Link key={t.slug} to={`/tools/${t.slug}` as string} className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
              <p className="font-semibold">{t.name}</p>
              <p className="mt-1 text-sm text-primary">Open tool →</p>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link to="/credit-cards">Read the complete Credit & Cards guide</Link>
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
            url: "https://moneymoodboard.com/tools/credit-score-estimator",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            isAccessibleForFree: true,
            featureList: ["FICO range estimate","Utilization impact analysis","Payment history weighting"],
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
