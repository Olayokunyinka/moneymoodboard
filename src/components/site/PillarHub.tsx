import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, CalendarCheck, BookOpen, Lightbulb } from "lucide-react";
import type { Pillar } from "@/lib/pillars";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageHero } from "./PageHero";
import { ArticleCard, PillarCard } from "./Cards";
import { JsonLd } from "./JsonLd";
import { NewsletterCTA } from "./NewsletterCTA";
import { PillarNewsletterBand } from "./PillarNewsletterBand";
import { TableOfContents, tocSlug } from "./TableOfContents";
import { KeyStatistics } from "./KeyStatistics";
import { AdSlot } from "./AdSlot";
import { AuthorBox } from "./AuthorBox";
import { pillars } from "@/lib/pillars";
import { pillarHeroes, pillarHeroAlts, pillarContent } from "@/lib/pillar-extras";
import { absUrl } from "@/lib/seo";
import { Button } from "@/components/ui/button";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PillarHub({ pillar }: { pillar: Pillar }) {
  const totalGuides = pillar.clusters.reduce((s, c) => s + c.posts.length, 0);
  const others = pillars.filter((p) => p.slug !== pillar.slug).slice(0, 3);
  const hero = pillarHeroes[pillar.slug];
  const heroAlt = pillarHeroAlts[pillar.slug];
  const content = pillarContent[pillar.slug];
  const allFaqs = [...pillar.faqs, ...content.extraFaqs];
  const published = content.published ? formatDate(content.published) : null;
  const updated = content.updated ? formatDate(content.updated) : "May 2026";
  const datePublishedIso = content.published ?? "2026-04-01";
  const dateModifiedIso = content.updated ?? "2026-05-10";

  const tocSections = [
    `What Is ${pillar.shortName}?`,
    `Why ${pillar.shortName} Matters in 2026`,
    `Key ${pillar.shortName} Statistics`,
    ...(content.deepDive?.map((d) => d.heading) ?? []),
    ...pillar.clusters.map((c) => c.name),
    "How to Get Started",
    ...(pillar.relatedTools.length > 0 ? [`Free ${pillar.shortName} Tools`] : []),
    `${pillar.shortName} Glossary`,
    "Frequently Asked Questions",
    "More Money Topics",
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: pillar.name }]} />

      {/* Hero image */}
      <figure className="mt-4 overflow-hidden rounded-2xl border border-border">
        <img
          src={hero}
          alt={heroAlt}
          width={1600}
          height={896}
          fetchPriority="high"
          className="aspect-[16/9] w-full object-cover"
        />
      </figure>

      <PageHero
        eyebrow={
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${pillar.tagClass}`}>
            Pillar Guide · {pillar.shortName}
          </span>
        }
        title={`${pillar.name}: The Complete Guide to Managing Your Money`}
        intro={pillar.intro}
        meta={
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              to="/about/yinka-olayokun"
              className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary hover:underline"
            >
              By Yinka Olayokun
            </Link>
            <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4" />{totalGuides} guides</span>
            {published ? (
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />Published <time dateTime={datePublishedIso}>{published}</time></span>
            ) : null}
            <span className="inline-flex items-center gap-1.5"><CalendarCheck className="h-4 w-4" />Updated <time dateTime={dateModifiedIso}>{updated}</time></span>
            <a href="#all-guides" className="text-primary font-medium hover:underline">Jump to all guides ↓</a>
          </div>
        }
      />

      {/* In-this-guide TOC */}
      <TableOfContents sections={tocSections} />

      {/* Direct answer */}
      <section
        id={`what-is-${pillar.shortName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8 scroll-mt-24"
      >
        <h2 className="text-2xl font-bold text-foreground">What Is {pillar.shortName}?</h2>
        <p className="mt-4 text-foreground/85 text-lg leading-relaxed">{pillar.whatIs}</p>
      </section>

      {/* Key takeaways — optimised for AI Overview / LLM citation */}
      {content.keyTakeaways?.length ? (
        <section
          id="key-takeaways"
          aria-label="Key takeaways"
          className="mt-8 rounded-2xl border border-primary/30 bg-primary-soft/40 p-5 md:p-6"
        >
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <Lightbulb className="h-4 w-4" /> Key Takeaways
          </p>
          <ul className="mt-3 space-y-2">
            {content.keyTakeaways.map((t, i) => (
              <li key={i} className="flex gap-3 text-foreground/90 leading-7">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Why it matters */}
      <section
        id={`why-${pillar.shortName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-matters-in-2026`}
        className="mt-14 scroll-mt-24"
      >
        <h2 className="text-2xl font-bold text-foreground">
          Why {pillar.shortName} Matters in 2026
        </h2>
        <div className="mt-4 space-y-4 text-foreground/85 text-lg leading-relaxed">
          {content.whyItMatters.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <AdSlot location="in-article" />

      {/* Key statistics */}
      <section
        id={`key-${pillar.shortName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-statistics`}
        className="mt-14 scroll-mt-24"
      >
        <KeyStatistics topic={pillar.shortName} stats={content.keyStats} />
      </section>

      {/* Deep-dive long-form sections */}
      {content.deepDive?.length ? (
        <div className="mt-4">
          {content.deepDive.map((s) => (
            <section
              key={s.heading}
              id={tocSlug(s.heading)}
              className="mt-14 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-foreground">{s.heading}</h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="mt-4 text-foreground/85 text-lg leading-relaxed">
                  {p}
                </p>
              ))}
              {s.bullets?.length ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/85 text-lg leading-relaxed">
                  {s.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {s.orderedList?.length ? (
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-foreground/85 text-lg leading-relaxed">
                  {s.orderedList.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ol>
              ) : null}
              {s.callout ? (
                <aside className="mt-6 rounded-2xl border-l-4 border-primary bg-primary-soft/60 p-5">
                  {s.callout.title ? (
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                      {s.callout.title}
                    </p>
                  ) : null}
                  <p className="mt-1.5 text-foreground/90 leading-7">
                    {s.callout.body}
                  </p>
                </aside>
              ) : null}
            </section>
          ))}
        </div>
      ) : null}

      {/* All guides anchor */}
      <div id="all-guides" className="scroll-mt-24" />

      {/* Cluster sections */}
      {pillar.clusters.map((cluster) => (
        <section key={cluster.name} id={slugify(cluster.name)} className="mt-16 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">{cluster.name}</h2>
          <p className="mt-2 text-muted-foreground max-w-3xl">{cluster.intro}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cluster.posts.map((post) => (
              <ArticleCard key={post.slug} pillarSlug={pillar.slug} post={post} />
            ))}
          </div>
        </section>
      ))}

      {/* How to get started */}
      <section id="how-to-get-started" className="mt-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">How to Get Started</h2>
        <p className="mt-2 text-muted-foreground max-w-3xl">
          A 5-step path most readers can complete in a single weekend.
        </p>
        <ol className="mt-6 space-y-4">
          {content.howToStart.map((step, i) => (
            <li key={step.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold tabular-nums">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Free pillar tool */}
      {pillar.relatedTools.length > 0 && (
        <section id={`free-${pillar.shortName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-tools`} className="mt-16 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">
            Free {pillar.shortName} Tool{pillar.relatedTools.length > 1 ? "s" : ""}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Skip the spreadsheet — get an answer in under a minute.
          </p>
          <div className="mt-5 rounded-2xl bg-accent p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <p className="text-accent-foreground/90 font-medium">
              Built for {pillar.shortName.toLowerCase()} questions readers ask us most.
            </p>
            <div className="flex flex-wrap gap-3">
              {pillar.relatedTools.map((t) => (
                <Button key={t.slug} asChild variant="default">
                  <Link to={`/tools/${t.slug}` as string}>
                    {t.name} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Glossary */}
      <section
        id={`${pillar.shortName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-glossary`}
        className="mt-16 scroll-mt-24"
      >
        <h2 className="text-2xl font-bold text-foreground">{pillar.shortName} Glossary</h2>
        <p className="mt-2 text-muted-foreground max-w-3xl">
          The terms you'll meet across this pillar — defined in plain English.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {content.glossary.map((g) => (
            <div key={g.term} className="rounded-xl border border-border bg-card p-5">
              <dt className="font-semibold text-foreground">{g.term}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{g.def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <PillarNewsletterBand pillarShortName={pillar.shortName} />

      <AdSlot location="before-faq" />

      {/* FAQs */}
      <section id="frequently-asked-questions" className="mt-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {allFaqs.map((f) => (
            <div key={f.q} className="p-5 md:p-6">
              <dt className="font-semibold text-foreground">{f.q}</dt>
              <dd className="mt-2 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <AuthorBox />

      {/* Related pillars */}
      <section id="more-money-topics" className="mt-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground">More Money Topics</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <PillarCard key={p.slug} pillar={p} />
          ))}
        </div>
      </section>

      <div className="mt-16 -mx-4 md:-mx-6">
        <NewsletterCTA />
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": absUrl(`/${pillar.slug}#collection`),
            name: `${pillar.name}: The Complete Guide to Managing Your Money`,
            description: pillar.whatIs,
            url: absUrl(`/${pillar.slug}`),
            inLanguage: "en-US",
            datePublished: datePublishedIso,
            dateModified: dateModifiedIso,
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: absUrl(hero),
              caption: heroAlt,
              creditText: "MoneyMoodBoard",
              creator: { "@id": absUrl("/#organization") },
              license: "https://creativecommons.org/licenses/by-nc/4.0/",
            },
            isPartOf: { "@id": absUrl("/#website") },
            about: {
              "@type": "Thing",
              name: pillar.name,
            },
            author: {
              "@type": "Person",
              "@id": absUrl("/about/yinka-olayokun#person"),
              name: "Yinka Olayokun",
              url: absUrl("/about/yinka-olayokun"),
            },
            publisher: { "@id": absUrl("/#organization") },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["#key-takeaways", "h1"],
            },
            mainEntity: {
              "@type": "ItemList",
              name: `${pillar.name} Guides`,
              numberOfItems: pillar.clusters.reduce((s, c) => s + c.posts.length, 0),
              itemListElement: pillar.clusters
                .flatMap((c) => c.posts)
                .map((post, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  url: absUrl(`/${pillar.slug}/${post.slug}`),
                  name: post.title,
                })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: pillar.name, item: absUrl(`/${pillar.slug}`) },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            name: `${pillar.shortName} Glossary`,
            hasDefinedTerm: content.glossary.map((g) => ({
              "@type": "DefinedTerm",
              name: g.term,
              description: g.def,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allFaqs.map((f) => ({
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

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
