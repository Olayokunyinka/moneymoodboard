import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, Wallet, Target, Gauge, BookOpen, TrendingUp, Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pillars } from "@/lib/pillars";
import { PillarCard, ArticleCard, ToolCard } from "@/components/site/Cards";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { JsonLd } from "@/components/site/JsonLd";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MoneyMoodBoard — Personal Finance Guides, Tools & Tips" },
      {
        name: "description",
        content:
          "Free personal finance guides on budgeting, credit cards, investing, saving and retirement. Built for beginners and beyond.",
      },
      { property: "og:title", content: "MoneyMoodBoard — Personal Finance Guides, Tools & Tips" },
      {
        property: "og:description",
        content:
          "Plain-English guides on budgeting, credit cards, saving, investing, retirement, banking, and debt — plus free calculators that work without a signup.",
      },
    ],
  }),
  component: HomePage,
});

const TOOLS = [
  { name: "Emergency Fund Calculator", description: "Find your safety-net target in 60 seconds.", icon: Calculator, slug: "emergency-fund-calculator" },
  { name: "Budget Planner", description: "Drop in your income and split it the smart way.", icon: Wallet, slug: "budget-planner" },
  { name: "Savings Goal Calculator", description: "See exactly how long your goal will take.", icon: Target, slug: "savings-goal-calculator" },
  { name: "Credit Score Estimator", description: "Estimate your score from a few quick inputs.", icon: Gauge, slug: "credit-score-estimator" },
];

function HomePage() {
  // Featured + latest pulled from pillar data
  const featured = [
    { pillar: pillars[0], post: pillars[0].clusters[0].posts[0] },
    { pillar: pillars[2], post: pillars[2].clusters[2].posts[0] },
    { pillar: pillars[4], post: pillars[4].clusters[0].posts[0] },
  ];
  const latest = pillars
    .flatMap((p) => p.clusters[0].posts.slice(0, 1).map((post) => ({ p, post })))
    .slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-soft/60 via-background to-background" />
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Updated weekly · Built for real life
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto">
            Your Complete Guide to Personal Finance — Built for Real Life
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Plain-English guides across seven money pillars — budgeting,
            credit, saving, investing, retirement, banking, and debt — paired
            with free calculators that give you a real answer in under a minute.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/budgeting">Start with Budgeting <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/tools">Browse All Topics</Link>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-1.5"><span className="font-semibold text-foreground">10,000+</span> readers</li>
            <li className="inline-flex items-center gap-1.5"><span className="font-semibold text-foreground">300+</span> guides</li>
            <li className="inline-flex items-center gap-1.5"><span className="font-semibold text-foreground">Updated</span> weekly</li>
          </ul>
        </div>
      </section>

      {/* Pillar grid */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Everything You Need to Know About Money</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">Seven topic pillars covering every major decision you'll make with your money — each with deep-dive guides, glossaries and a matching free tool.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pillars.map((p) => (
            <PillarCard key={p.slug} pillar={p} />
          ))}
        </div>
      </section>

      {/* Most Popular — visually distinct, manually curated */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-8">
        <div className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary-soft/70 via-background to-background p-6 md:p-10">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                <Flame className="h-3.5 w-3.5" /> Most Popular This Week
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Reader Favorites</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">Hand-picked by our editors — the guides readers shared, saved and came back to most this week.</p>
            </div>
            <Link to="/budgeting" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featured.map(({ pillar, post }, i) => (
              <div key={post.slug} className="relative">
                <span className="absolute -top-3 -left-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-md">
                  {i + 1}
                </span>
                <ArticleCard pillarSlug={pillar.slug} post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools strip */}
      <section className="bg-primary text-primary-foreground mt-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Free Money Tools</h2>
              <p className="mt-2 text-primary-foreground/80 max-w-2xl">Pop in your numbers and get clear answers — no signup required.</p>
            </div>
            <Link to="/tools" className="text-sm font-semibold inline-flex items-center gap-1 hover:underline">
              All tools <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((t) => (
              <ToolCard key={t.slug} name={t.name} description={t.description} icon={t.icon} href={`/tools/${t.slug}`} variant="onPrimary" />
            ))}
          </div>
        </div>
      </section>

      {/* Latest blog */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Latest Finance Guides</h2>
          <Link to="/budgeting" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map(({ p, post }) => (
            <ArticleCard
              key={`${p.slug}-${post.slug}`}
              pillarSlug={p.slug}
              post={post}
            />
          ))}
        </div>
      </section>

      {/* Trust band */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-12">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-10 grid md:grid-cols-3 gap-8">
          {[
            { icon: BookOpen, title: "Researched, not regurgitated", body: "Every guide cites primary sources — regulators, BLS, FRED, the IRS — not other blogs." },
            { icon: TrendingUp, title: "Reviewed quarterly", body: "We revisit each pillar at least every 90 days so contribution limits, rates and rules stay current." },
            { icon: Calculator, title: "Tools that actually compute", body: "Real calculators with the math shown — no email gates, no upsells, no lead-gen tricks." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <NewsletterCTA />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "MoneyMoodBoard",
            url: "https://moneymoodboard.com",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://moneymoodboard.com/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MoneyMoodBoard",
            url: "https://moneymoodboard.com",
            logo: "https://moneymoodboard.com/og-default.jpg",
            sameAs: [
              "https://twitter.com/moneymoodboard",
              "https://www.linkedin.com/company/moneymoodboard",
            ],
          },
        ]}
      />
    </div>
  );
}
