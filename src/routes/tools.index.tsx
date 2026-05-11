import { canonical, hreflangLinks } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Calculator, Wallet, Target, Gauge, TrendingDown, PiggyBank, CreditCard, LineChart } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { ToolCard } from "@/components/site/Cards";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Free Money Tools & Calculators | MoneyMoodBoard" },
      { name: "description", content: "Free, no-signup calculators for emergency funds, budgeting, savings goals and credit scores." },
      { property: "og:title", content: "Free Money Tools & Calculators | MoneyMoodBoard" },
      { property: "og:description", content: "Free, no-signup calculators for emergency funds, budgeting, savings goals and credit scores." },
    ],
    links: [canonical("/tools"), ...hreflangLinks("/tools")],
  }),
  component: ToolsHub,
});

const TOOLS = [
  { name: "Emergency Fund Calculator", description: "Find out exactly how much you should keep in your safety net.", icon: Calculator, slug: "emergency-fund-calculator" },
  { name: "Budget Planner", description: "Split your monthly income into a budget that actually works.", icon: Wallet, slug: "budget-planner" },
  { name: "Savings Goal Calculator", description: "See how long it'll take to hit any savings goal.", icon: Target, slug: "savings-goal-calculator" },
  { name: "Credit Score Estimator", description: "Estimate your FICO range from a few quick inputs.", icon: Gauge, slug: "credit-score-estimator" },
  { name: "Debt Payoff Calculator", description: "Compare avalanche vs snowball and see your real payoff date.", icon: TrendingDown, slug: "debt-payoff-calculator" },
  { name: "Retirement Savings Calculator", description: "Project your nest egg and find your monthly target.", icon: PiggyBank, slug: "retirement-savings-calculator" },
  { name: "Credit Card Payoff Calculator", description: "See your real payoff date and the interest you save.", icon: CreditCard, slug: "credit-card-payoff-calculator" },
  { name: "Compound Interest Calculator", description: "Project investment growth with monthly contributions.", icon: LineChart, slug: "compound-interest-calculator" },
];

function ToolsHub() {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools" }]} />
      <PageHero
        title="Free Money Tools"
        intro="Pop in your numbers and get a clear answer in under a minute. No email required, no upsell, no spreadsheet."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <ToolCard key={t.slug} name={t.name} description={t.description} icon={t.icon} href={`/tools/${t.slug}`} />
        ))}
      </div>
      <div className="mt-16 -mx-4 md:-mx-6">
        <NewsletterCTA />
      </div>
    </div>
  );
}
