import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Map as MapIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { pillars } from "@/lib/pillars";
import { entities } from "@/lib/entities";
import { intentForPillar, INTENT_LABELS, INTENT_CHIP_CLASS, type IntentClass } from "@/lib/intent-pages";
import { absUrl, canonical , hreflangLinks } from "@/lib/seo";

const TITLE = "Topical Map — Every Money Topic on MoneyMoodBoard";
const DESC =
  "The complete topical map of MoneyMoodBoard: 7 pillars, every cluster, every guide. A hub-and-spoke index of personal-finance topics, designed for quick navigation and complete topical coverage.";

export const Route = createFileRoute("/topics")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: absUrl("/topics") },
      { property: "og:type", content: "website" },
    ],
    links: [canonical("/topics"), ...hreflangLinks("/topics")],
  }),
  component: TopicsPage,
});

function TopicsPage() {
  const totalGuides = pillars.reduce(
    (s, p) => s + p.clusters.reduce((c, x) => c + x.posts.length, 0),
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Topics" }]} />

      <PageHero
        eyebrow={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            <MapIcon className="h-3.5 w-3.5" /> Topical map
          </span>
        }
        title="Every money topic, in one place"
        intro={`A complete hub-and-spoke index of MoneyMoodBoard. ${pillars.length} pillars, ${totalGuides} guides, one ${entities.length}-entry glossary — built so any reader (or crawler) can map our topical coverage in a single screen.`}
      />

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {pillars.map((pillar) => (
          <article
            key={pillar.slug}
            className="rounded-2xl border border-border bg-card p-6 md:p-7"
          >
            <header className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  <Link
                    to={`/${pillar.slug}` as string}
                    className="hover:text-primary"
                  >
                    {pillar.name}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{pillar.oneLiner}</p>
              </div>
              <Link
                to={`/${pillar.slug}` as string}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Pillar <ArrowRight className="h-3 w-3" />
              </Link>
            </header>

            <div className="mt-5 space-y-5">
              {pillar.clusters.map((cluster) => (
                <div key={cluster.name}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/80">
                    {cluster.name}
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {cluster.posts.map((post) => (
                      <li key={post.slug}>
                        <Link
                          to={`/${pillar.slug}/${post.slug}` as string}
                          className="inline-flex items-baseline gap-1.5 text-sm text-foreground/85 hover:text-primary hover:underline"
                        >
                          <span className="text-primary">›</span>
                          <span>{post.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {pillar.relatedTools.length > 0 ? (
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Free tools
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {pillar.relatedTools.map((t) => (
                    <li key={t.slug}>
                      <Link
                        to={`/tools/${t.slug}` as string}
                        className="inline-flex items-center rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/15"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {(() => {
              const sharper = intentForPillar(pillar.slug);
              if (!sharper.all.length) return null;
              const groups: { cls: IntentClass; items: typeof sharper.all }[] = [
                { cls: "best", items: sharper.best },
                { cls: "answers", items: sharper.answers },
                { cls: "rules", items: sharper.rules },
                { cls: "decide", items: sharper.decide },
              ];
              return (
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Sharper coverage
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {groups.flatMap((g) =>
                      g.items.map((e) => (
                        <li key={e.to}>
                          <Link
                            to={e.to}
                            className="inline-flex items-baseline gap-2 text-sm text-foreground/85 hover:text-primary hover:underline"
                          >
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${INTENT_CHIP_CLASS[g.cls]}`}>
                              {INTENT_LABELS[g.cls]}
                            </span>
                            <span>{e.label}</span>
                          </Link>
                        </li>
                      )),
                    )}
                  </ul>
                </div>
              );
            })()}
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8">
        <h2 className="text-xl font-bold text-foreground">Reference</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <li>
            <Link to="/glossary" className="font-semibold text-primary hover:underline">
              Personal Finance Glossary →
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {entities.length} terms, defined in plain English, linked to Wikipedia and Wikidata.
            </p>
          </li>
          <li>
            <Link to="/tools" className="font-semibold text-primary hover:underline">
              All Free Tools →
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Calculators that compute the answer in under a minute, no signup.
            </p>
          </li>
          <li>
            <Link
              to="/about/yinka-olayokun"
              className="font-semibold text-primary hover:underline"
            >
              About the editor →
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Editorial standards and areas of expertise behind every guide.
            </p>
          </li>
          <li>
            <Link to="/newsletter" className="font-semibold text-primary hover:underline">
              Free newsletter →
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              One short email a week — no upsell, no spam.
            </p>
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-bold text-foreground">Editorial standards</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <li>
            <Link to="/editorial-policy" className="font-semibold text-primary hover:underline">
              Editorial policy →
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              How we plan, write, fact-check and review every guide.
            </p>
          </li>
          <li>
            <Link to="/fact-checking-policy" className="font-semibold text-primary hover:underline">
              Fact-checking policy →
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Primary-source rule and four-eyes verification.
            </p>
          </li>
          <li>
            <Link to="/corrections" className="font-semibold text-primary hover:underline">
              Corrections policy →
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              How errors are flagged, fixed and disclosed.
            </p>
          </li>
          <li>
            <Link to="/methodology" className="font-semibold text-primary hover:underline">
              Methodology →
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              The formulas, scorecards and assumptions behind every calculator.
            </p>
          </li>
        </ul>
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": absUrl("/topics#page"),
            name: TITLE,
            description: DESC,
            url: absUrl("/topics"),
            inLanguage: "en-US",
            isPartOf: { "@type": "WebSite", name: "MoneyMoodBoard", url: absUrl("/") },
            mainEntity: {
              "@type": "ItemList",
              name: "MoneyMoodBoard Topical Map",
              numberOfItems: pillars.length,
              itemListElement: pillars.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: absUrl(`/${p.slug}`),
                name: p.name,
              })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: pillars.map((p) => p.name),
            url: pillars.map((p) => absUrl(`/${p.slug}`)),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: "Topics", item: absUrl("/topics") },
            ],
          },
        ]}
      />
    </div>
  );
}
