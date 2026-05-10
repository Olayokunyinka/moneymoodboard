import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { ArticleCard } from "@/components/site/Cards";
import { Button } from "@/components/ui/button";
import { getPillar } from "@/lib/pillars";

const PILLAR = getPillar("budgeting");
const TITLE = "Zero-Based Budgeting Explained: How It Works in 2026";
const SUMMARY =
  "Zero-based budgeting (ZBB) is a method where every dollar of income is assigned a job — spending, saving, debt, or giving — until your income minus your allocations equals zero. The result: you stop wondering where the money went.";
const PUBLISHED = "2026-04-01";
const UPDATED = "2026-05-08";
const READ_MIN = 9;

export const Route = createFileRoute("/budgeting/zero-based-budgeting")({
  head: () => ({
    meta: [
      { title: `${TITLE} | MoneyMoodBoard` },
      { name: "description", content: SUMMARY.slice(0, 158) },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: SUMMARY.slice(0, 158) },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: PUBLISHED },
      { property: "article:modified_time", content: UPDATED },
    ],
  }),
  component: ZeroBasedBudgeting,
});

function ZeroBasedBudgeting() {
  const related = PILLAR.clusters[0].posts.slice(1, 4);
  const faqs = [
    {
      q: "Is zero-based budgeting good for beginners?",
      a: "Yes — though it has a steeper learning curve than the 50/30/20 rule, ZBB delivers faster behavior change because every dollar has to be assigned on purpose.",
    },
    {
      q: "Do I need an app for zero-based budgeting?",
      a: "No, but apps like YNAB or Monarch automate most of the math. A simple spreadsheet works just as well if you're disciplined about updating it.",
    },
    {
      q: "What if my income changes month to month?",
      a: "Build your ZBB plan only on income you've actually received this month — never on income you expect to receive. This is the rule that makes ZBB work for freelancers.",
    },
    {
      q: "How long until ZBB feels easy?",
      a: "Most people report it taking three full months before the system feels automatic. Stick with it through month two, where the urge to quit is highest.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Budgeting", to: "/budgeting" },
          { label: "Zero-Based Budgeting" },
        ]}
      />

      <header className="mt-6">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${PILLAR.tagClass}`}>
          Definition · Budgeting
        </span>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">{TITLE}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> MoneyMoodBoard Editors</span>
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Updated {new Date(UPDATED).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {READ_MIN} min read</span>
        </div>
      </header>

      {/* Direct answer summary box */}
      <aside className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Quick Answer</p>
        <p className="mt-2 text-foreground/90 text-lg leading-relaxed">{SUMMARY}</p>
      </aside>

      <article className="mt-10 space-y-8 text-foreground/90">
        <section>
          <h2 className="text-2xl font-bold">What Is Zero-Based Budgeting?</h2>
          <p className="mt-3">
            Zero-based budgeting is a budgeting method in which you assign every
            dollar of income to a category — bills, groceries, savings, debt
            payoff, or giving — before the month begins. The "zero" refers to
            the math: income minus all allocations should equal zero. You're not
            spending zero; you're leaving zero unassigned.
          </p>
          <p className="mt-3">
            ZBB was popularized in personal finance by Dave Ramsey and refined
            by software like You Need A Budget (YNAB). It differs from
            percentage-based methods (like 50/30/20) by demanding intention at
            the dollar level rather than the bucket level.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">How Does Zero-Based Budgeting Work?</h2>
          <ol className="mt-3 list-decimal pl-5 space-y-2">
            <li>List all income you expect to receive this month.</li>
            <li>List every category of spending and saving you intend to do.</li>
            <li>Assign a dollar amount to each category until the total equals income.</li>
            <li>Track actual spending against the plan throughout the month.</li>
            <li>Reassign money between categories whenever life forces a change.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Zero-Based Budgeting vs the 50/30/20 Rule</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Feature</th>
                  <th className="px-4 py-3 font-semibold">Zero-Based</th>
                  <th className="px-4 py-3 font-semibold">50/30/20</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="px-4 py-3">Setup time</td><td className="px-4 py-3">High</td><td className="px-4 py-3">Low</td></tr>
                <tr><td className="px-4 py-3">Monthly upkeep</td><td className="px-4 py-3">Weekly</td><td className="px-4 py-3">Monthly</td></tr>
                <tr><td className="px-4 py-3">Behavior change</td><td className="px-4 py-3">Strong</td><td className="px-4 py-3">Moderate</td></tr>
                <tr><td className="px-4 py-3">Best for</td><td className="px-4 py-3">Hands-on planners</td><td className="px-4 py-3">Hands-off planners</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Pros and Cons of Zero-Based Budgeting</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">Pros</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Total visibility into where your money goes</li>
                <li>Forces you to fund priorities first</li>
                <li>Surfaces leaks fast</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold">Cons</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Takes 2–3 months to feel automatic</li>
                <li>Requires regular check-ins</li>
                <li>Can feel restrictive at first</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Who Should Use Zero-Based Budgeting?</h2>
          <p className="mt-3">
            Anyone who has ever ended a month wondering where their money went.
            ZBB is especially powerful for households with variable income,
            people paying down debt, and anyone trying to break out of
            paycheck-to-paycheck living.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">How to Get Started With ZBB (Step-by-Step)</h2>
          <ol className="mt-3 list-decimal pl-5 space-y-2">
            <li>Open a spreadsheet or budgeting app.</li>
            <li>Enter your expected income for the month.</li>
            <li>Build category lines for fixed bills, variable spending, savings goals, and debt.</li>
            <li>Assign dollars until income minus allocations = $0.</li>
            <li>Set a 10-minute weekly check-in on your calendar.</li>
            <li>At month-end, review and roll any leftovers into next month's plan.</li>
          </ol>
        </section>

        {/* Tool CTA */}
        <aside className="rounded-2xl bg-accent p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-accent-foreground">Need a starting point?</h3>
            <p className="text-sm text-accent-foreground/80">Use our free Budget Planner to map your first ZBB.</p>
          </div>
          <Button asChild>
            <Link to="/tools/budget-planner">Open Budget Planner <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </aside>
      </article>

      {/* Internal links */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">More Budgeting Guides</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {related.map((post) => (
            <ArticleCard key={post.slug} pillarSlug="budgeting" post={post} />
          ))}
        </div>
        <div className="mt-5">
          <Link to="/budgeting" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
            ← Complete Budgeting Guide
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
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

      <div className="mt-12 -mx-4 md:-mx-6">
        <NewsletterCTA />
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: TITLE,
            description: SUMMARY,
            datePublished: PUBLISHED,
            dateModified: UPDATED,
            author: { "@type": "Organization", name: "MoneyMoodBoard" },
            publisher: {
              "@type": "Organization",
              name: "MoneyMoodBoard",
              logo: { "@type": "ImageObject", url: "https://moneymoodboard.com/logo.png" },
            },
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
