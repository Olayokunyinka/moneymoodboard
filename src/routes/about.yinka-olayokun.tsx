import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Award, BookOpen, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { JsonLd } from "@/components/site/JsonLd";
import { ArticleCard } from "@/components/site/Cards";
import yinkaPhoto from "@/assets/yinka-olayokun.jpg";
import { absUrl, canonical, ogImage , hreflangLinks } from "@/lib/seo";
import { articleBodies } from "@/lib/articles";
import { findPost, type PillarSlug } from "@/lib/pillars";

type LatestEntry = {
  pillarSlug: PillarSlug;
  post: NonNullable<ReturnType<typeof findPost>>["post"];
  published: string;
};

const latestByYinka: LatestEntry[] = Object.keys(articleBodies)
  .map((key): LatestEntry | null => {
    const [pillarSlug, postSlug] = key.split("/");
    const found = findPost(pillarSlug, postSlug);
    if (!found) return null;
    return {
      pillarSlug: pillarSlug as PillarSlug,
      post: found.post,
      published: articleBodies[key].published,
    };
  })
  .filter((x): x is LatestEntry => x !== null)
  .sort((a, b) => (a.published < b.published ? 1 : -1))
  .slice(0, 9);

const TITLE = "Yinka Olayokun, Founder & Editor at MoneyMoodBoard";
const DESC =
  "Meet Yinka Olayokun, digital strategist, financial-literacy advocate, and founder of MoneyMoodBoard. Editorial bio, expertise, and how to reach her.";

export const Route = createFileRoute("/about/yinka-olayokun")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: absUrl("/about/yinka-olayokun") },
      ...ogImage(yinkaPhoto),
    ],
    links: [canonical("/about/yinka-olayokun"), ...hreflangLinks("/about/yinka-olayokun")],
  }),
  component: AuthorPage,
});

function AuthorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "About", to: "/about" },
          { label: "Yinka Olayokun" },
        ]}
      />

      <PageHero
        eyebrow={
          <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            Author Profile · Founder & Editor
          </span>
        }
        title="Yinka Olayokun"
        intro="Founder of MoneyMoodBoard. Digital strategist, financial-literacy advocate, and the editor behind every guide on this site, written for people managing real life: variable income, debt, credit repair, and big goals."
      />

      <section className="mt-8 flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:p-8">
        <img
          src={yinkaPhoto}
          alt="Yinka Olayokun, Founder and Editor of MoneyMoodBoard"
          width={160}
          height={160}
          loading="eager"
          className="h-32 w-32 shrink-0 rounded-full object-cover md:h-40 md:w-40"
        />
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">Yinka Olayokun</p>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            Founder & Editor · MoneyMoodBoard
          </p>
          <p className="text-sm text-muted-foreground">
            Writing plain-English personal finance since 2021. Editorial focus
            on credit building, debt recovery, freelancer finance, and money &
            mental health.
          </p>
          <a
            href="mailto:hello@moneymoodboard.com"
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Mail className="h-4 w-4" /><span>hello@moneymoodboard.com</span>
          </a>
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <BookOpen className="h-5 w-5 text-primary" aria-hidden />
          <p className="mt-3 text-2xl font-bold tabular-nums">85+</p>
          <p className="text-sm text-muted-foreground">Published guides</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <Users className="h-5 w-5 text-primary" aria-hidden />
          <p className="mt-3 text-2xl font-bold tabular-nums">7</p>
          <p className="text-sm text-muted-foreground">Money pillars covered</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <Award className="h-5 w-5 text-primary" aria-hidden />
          <p className="mt-3 text-2xl font-bold tabular-nums">5 yrs</p>
          <p className="text-sm text-muted-foreground">Financial-literacy writing</p>
        </div>
      </section>

      <section className="mt-12 space-y-6 text-foreground/85">
        <h2 className="text-2xl font-bold text-foreground">About Yinka</h2>
        <p>
          Yinka Olayokun is the founder and editor of MoneyMoodBoard, a
          personal-finance publication for people who feel locked out of
          traditional money advice. After years working as a digital strategist
          with small businesses and creators, she noticed the same pattern over
          and over: smart, capable people making expensive money mistakes
          because nobody had ever explained the basics in plain English.
        </p>
        <p>
          MoneyMoodBoard is her answer. Every guide on the site is researched
          against primary sources, the Federal Reserve, the IRS, the Bureau of
          Labor Statistics, the CFPB, FDIC, and peer-reviewed academic work .
          then rewritten in language a tired 25-year-old can read after a long
          shift and actually use.
        </p>

        <h2 className="text-2xl font-bold text-foreground">Areas of expertise</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Credit building and credit repair (especially thin-file and post-collections)</li>
          <li>Budgeting on variable income for freelancers and tipped workers</li>
          <li>Debt payoff strategy, avalanche, snowball, balance transfers, consolidation</li>
          <li>First-time investing in index funds, Roth IRAs and 401(k) matches</li>
          <li>Banking optimisation, moving away from high-fee national banks</li>
          <li>Money & mental health, financial trauma, judgment-free guidance</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground">Editorial standards</h2>
        <p>
          Every published article on MoneyMoodBoard cites primary sources where
          numbers are used. Any guide touching tax, retirement, or credit-score
          rules is reviewed at least once per quarter against the latest
          regulation. When something is wrong, we correct it publicly and add a
          dated note. Yinka personally edits every cluster article before
          publish.
        </p>

        <h2 className="text-2xl font-bold text-foreground">Contact & collaborations</h2>
        <p>
          Yinka takes selective collaborations with journalists, financial
          institutions, fintech founders, and educators. For editorial
          questions, corrections, partnership enquiries, or expert quotes,
          email{" "}
          <a
            href="mailto:hello@moneymoodboard.com"
            className="text-primary font-medium hover:underline"
          >
            hello@moneymoodboard.com
          </a>
          .
        </p>

        <p className="text-sm text-muted-foreground">
          Read more about MoneyMoodBoard's mission and editorial process on
          our{" "}
          <Link to="/about" className="text-primary font-medium hover:underline">
            About page
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-foreground">Latest articles by Yinka</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every guide on MoneyMoodBoard is written and edited by Yinka.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestByYinka.map((entry) => (
            <ArticleCard
              key={`${entry.pillarSlug}/${entry.post.slug}`}
              pillarSlug={entry.pillarSlug}
              post={entry.post}
            />
          ))}
        </div>
      </section>

      <div className="mt-14 -mx-4 md:-mx-6">
        <NewsletterCTA />
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": absUrl("/about/yinka-olayokun#profile"),
            url: absUrl("/about/yinka-olayokun"),
            inLanguage: "en-US",
            isPartOf: { "@type": "WebSite", "@id": absUrl("/#website") },
            mainEntity: {
              "@type": "Person",
              "@id": absUrl("/about/yinka-olayokun#person"),
              name: "Yinka Olayokun",
              givenName: "Yinka",
              familyName: "Olayokun",
              jobTitle: "Founder & Editor",
              image: {
                "@type": "ImageObject",
                url: absUrl(yinkaPhoto),
                width: 800,
                height: 800,
              },
              email: "mailto:hello@moneymoodboard.com",
              url: absUrl("/about/yinka-olayokun"),
              worksFor: { "@id": absUrl("/#organization") },
              knowsAbout: [
                "Personal finance",
                "Credit building",
                "Credit repair",
                "Debt repayment",
                "Budgeting",
                "Index-fund investing",
                "Roth IRA",
                "401(k)",
                "Retirement planning",
                "High-yield savings accounts",
                "FDIC insurance",
                "Money & mental health",
              ],
              knowsLanguage: "English",
              description:
                "Founder and editor of MoneyMoodBoard. Writes plain-English personal-finance guides on credit, debt, budgeting, investing, banking and retirement.",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: "About", item: absUrl("/about") },
              {
                "@type": "ListItem",
                position: 3,
                name: "Yinka Olayokun",
                item: absUrl("/about/yinka-olayokun"),
              },
            ],
          },
        ]}
      />
    </div>
  );
}
