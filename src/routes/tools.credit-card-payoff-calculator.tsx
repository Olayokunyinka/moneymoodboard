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

const TITLE = "Credit Card Payoff Calculator";

export const Route = createFileRoute("/tools/credit-card-payoff-calculator")({
  head: () => ({
    meta: [
      { title: `${TITLE}, Free Tool | MoneyMoodBoard` },
      { name: "description", content: "See exactly how long it'll take to pay off your credit card and how much interest you'll save by paying more than the minimum. Free, no signup." },
      { property: "og:title", content: `${TITLE}, Free Tool | MoneyMoodBoard` },
      { property: "og:description", content: "Find your real credit-card payoff date and the interest you'll save." },
    ],
    links: [canonical("/tools/credit-card-payoff-calculator"), ...hreflangLinks("/tools/credit-card-payoff-calculator")],
  }),
  component: CreditCardPayoffCalculator,
});

type Mode = "fixed" | "months";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(n)),
  );

function payoffByPayment(balance: number, apr: number, payment: number) {
  const r = apr / 100 / 12;
  if (payment <= balance * r) return { months: Infinity, interest: Infinity, total: Infinity };
  let bal = balance;
  let months = 0;
  let interest = 0;
  while (bal > 0.01 && months < 1200) {
    const i = bal * r;
    interest += i;
    bal = bal + i - payment;
    if (bal < 0) bal = 0;
    months++;
  }
  return { months, interest, total: balance + interest };
}

function paymentByMonths(balance: number, apr: number, months: number) {
  const r = apr / 100 / 12;
  if (months <= 0) return 0;
  if (r === 0) return balance / months;
  return (balance * r) / (1 - Math.pow(1 + r, -months));
}

function CreditCardPayoffCalculator() {
  const tc = toolContent["credit-card-payoff-calculator"];
  const faqs = tc.faqs;
  const [balance, setBalance] = useState<number>(5500);
  const [apr, setApr] = useState<number>(22);
  const [mode, setMode] = useState<Mode>("fixed");
  const [payment, setPayment] = useState<number>(250);
  const [months, setMonths] = useState<number>(24);
  const [minPercent] = useState<number>(2); // 2% minimum

  const result = useMemo(() => {
    if (balance <= 0) return null;
    const minPayment = Math.max(25, balance * (minPercent / 100));
    const minPlan = payoffByPayment(balance, apr, minPayment);
    const chosen =
      mode === "fixed"
        ? payoffByPayment(balance, apr, payment)
        : (() => {
            const p = paymentByMonths(balance, apr, months);
            return { ...payoffByPayment(balance, apr, p), payment: p };
          })();
    const requiredPayment = mode === "fixed" ? payment : (chosen as any).payment;
    const interestSaved = Math.max(0, minPlan.interest - chosen.interest);
    const monthsSaved = Math.max(0, (isFinite(minPlan.months) ? minPlan.months : 600) - chosen.months);
    return { minPlan, chosen, minPayment, requiredPayment, interestSaved, monthsSaved };
  }, [balance, apr, mode, payment, months, minPercent]);

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: TITLE }]} />

      <header className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-semibold">
          <Calculator className="h-3.5 w-3.5" /> Free tool · No signup
        </span>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">{TITLE}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          See your real payoff date, and how much interest you save by sending more than the minimum.
        </p>
      </header>

      {/* Tool */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="balance">Card balance</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="balance" type="number" min={0} step={50} value={balance} onChange={(e) => setBalance(Number(e.target.value) || 0)} className="pl-7" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <Label>Card APR</Label>
                <span className="text-sm font-semibold">{apr}%</span>
              </div>
              <Slider min={0} max={36} step={0.25} value={[apr]} onValueChange={(v) => setApr(v[0]!)} className="mt-3" />
              <p className="mt-1 text-xs text-muted-foreground">The average US credit card APR is around 21–24%.</p>
            </div>

            <div>
              <Label>Plan type</Label>
              <RadioGroup value={mode} onValueChange={(v) => setMode(v as Mode)} className="mt-2 grid gap-2">
                {[
                  { v: "fixed", label: "I'll pay a fixed amount each month" },
                  { v: "months", label: "I want to be debt-free in X months" },
                ].map((o) => (
                  <label key={o.v} htmlFor={`m-${o.v}`} className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem id={`m-${o.v}`} value={o.v} />
                    <span className="text-sm">{o.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {mode === "fixed" ? (
              <div>
                <Label htmlFor="payment">Monthly payment</Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input id="payment" type="number" min={0} step={25} value={payment} onChange={(e) => setPayment(Number(e.target.value) || 0)} className="pl-7" />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline justify-between">
                  <Label>Months to debt-free</Label>
                  <span className="text-sm font-semibold">{months} mo</span>
                </div>
                <Slider min={3} max={84} step={1} value={[months]} onValueChange={(v) => setMonths(v[0]!)} className="mt-3" />
              </div>
            )}
          </div>

          {/* Result */}
          <div className="rounded-xl bg-primary-soft p-6 flex flex-col">
            {result && (
              <>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  {mode === "fixed" ? "Time to debt-free" : "Required payment"}
                </p>
                <p className="mt-2 text-4xl md:text-5xl font-bold text-foreground">
                  {mode === "fixed"
                    ? isFinite(result.chosen.months)
                      ? `${result.chosen.months} mo`
                      : "Never"
                    : fmt(result.requiredPayment)}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {mode === "fixed"
                    ? isFinite(result.chosen.months)
                      ? `≈ ${Math.floor(result.chosen.months / 12)} yr ${result.chosen.months % 12} mo`
                      : "Payment is below interest accrual"
                    : `to clear in ${months} months`}
                </p>

                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Total interest paid</dt>
                    <dd className="font-semibold">{isFinite(result.chosen.interest) ? fmt(result.chosen.interest) : ", "}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Total paid</dt>
                    <dd className="font-semibold">{isFinite(result.chosen.total) ? fmt(result.chosen.total) : ", "}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">If you only paid the minimum</dt>
                    <dd className="font-semibold">
                      {isFinite(result.minPlan.months) ? `${result.minPlan.months} mo · ${fmt(result.minPlan.interest)}` : "30+ yr"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 rounded-lg bg-background/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Interest saved vs minimums</p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {isFinite(result.interestSaved) ? fmt(result.interestSaved) : ", "}
                  </p>
                </div>
              </>
            )}

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
          <li><span className="font-semibold">Enter your current balance and APR.</span> Both are on the front page of your most recent statement.</li>
          <li><span className="font-semibold">Pick a plan style.</span> Either commit to a fixed monthly amount, or work backward from the date you want to be free.</li>
          <li><span className="font-semibold">Compare against the minimum.</span> The "interest saved" line is the real story, and the reason to pay above the minimum every month.</li>
          <li><span className="font-semibold">Stop charging the card.</span> Even the perfect payoff plan fails if new spending keeps adding to the balance.</li>
        </ol>
      </section>

      {/* Explainer */}
      <article className="mt-12 max-w-3xl space-y-6 text-foreground/85">
        <h2 className="text-2xl font-bold">Why Credit Card Math Hurts So Much</h2>
        <p>
          Credit cards are the most expensive consumer debt most households
          carry. The average US APR sits in the low-20s, compounding daily.
          That means a balance you don't pay down doesn't just sit there .
          it grows faster than almost any investment, and it grows against
          you. The good news is that the math is symmetric: the same
          compounding that punishes you when you pay only the minimum
          rewards you fast when you pay more.
        </p>
        <h3 className="text-xl font-semibold">The minimum-payment trap</h3>
        <p>
          Card issuers usually set the minimum at the larger of $25 or
          1–3% of the balance. On a $5,000 balance at 22% APR with a 2%
          minimum, the first month's minimum is $100, but $92 of it goes
          to interest. You pay down $8 of principal. As the balance shrinks,
          so does the minimum, dragging the payoff out for decades and
          piling on more than the original balance in interest.
        </p>
        <h3 className="text-xl font-semibold">The fixed-payment cure</h3>
        <p>
          The single most powerful move is to lock in a fixed monthly
          payment that doesn't shrink as the balance does. Pick the largest
          amount you can sustain, even $50 above the current minimum .
          and pay that exact amount every month until the card is at zero.
          Watch the months and interest collapse on the calculator above.
        </p>
        <h3 className="text-xl font-semibold">When to consider a 0% balance transfer</h3>
        <p>
          A balance transfer card can give you 12–21 months of 0% APR for
          a 3–5% transfer fee. If your credit is in good shape, the math
          almost always wins versus 20%+ APR. The one rule: write down,
          before you transfer, the exact monthly payment that clears the
          balance before the promo ends. Otherwise the deferred-interest
          policy on some cards can wipe out the savings retroactively.
        </p>
        <h3 className="text-xl font-semibold">When a personal loan makes sense</h3>
        <p>
          Personal loans for credit-card consolidation typically run 8–15%
          for good credit, far below the 20%+ on cards. They're a good
          fit when you have multiple high-rate cards and want one fixed
          payment with a clear end date. They only work if you treat the
          paid-off cards as if they don't exist.
        </p>
        <h3 className="text-xl font-semibold">The behavioral piece</h3>
        <p>
          Stop using the card while you're paying it off. Move the daily
          spending to a debit card or cash. Set the credit card payment to
          autopay so a missed due date never restarts the clock. The math
          is straightforward; the discipline is the work.
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
            { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator" },
            { name: "Credit Score Estimator", slug: "credit-score-estimator" },
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
            <Link to="/credit-cards">Read the complete Credit Cards guide</Link>
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
            url: "https://moneymoodboard.com/tools/credit-card-payoff-calculator",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            isAccessibleForFree: true,
            featureList: ["Payoff timeline","Interest cost forecast","Custom payment scenarios"],
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
