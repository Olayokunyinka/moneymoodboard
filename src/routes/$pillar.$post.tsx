import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Clock, Construction, ArrowRight, CalendarCheck, Lightbulb } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { ArticleCard } from "@/components/site/Cards";
import { AuthorBox } from "@/components/site/AuthorBox";
import { ShareButtons } from "@/components/site/ShareButtons";
import { KeyStatistics } from "@/components/site/KeyStatistics";
import { AdSlot } from "@/components/site/AdSlot";
import { TableOfContents, tocSlug } from "@/components/site/TableOfContents";
import { RelatedReads } from "@/components/site/RelatedReads";
import { GoDeeper } from "@/components/site/GoDeeper";
import { findPostView, type ClusterPost, type PillarView } from "@/lib/pillars";
import { getArticleBody, type ArticleBody } from "@/lib/articles";
import { pillarHeroes, pillarHeroAlts } from "@/lib/pillar-extras";
import { absUrl, canonical, ogImage, toAbsUrl, hreflangLinks, localHeroFor } from "@/lib/seo";
import { findEntitiesInText, entitySlug } from "@/lib/entities";
import { buildPaa } from "@/lib/paa";

export const Route = createFileRoute("/$pillar/$post")({
  loader: ({ params }) => {
    const found = findPostView(params.pillar, params.post);
    if (!found) throw notFound();
    const body = getArticleBody(found.pillar.slug, found.post.slug);
    return { ...found, body };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { pillar, post, body } = loaderData;
    const path = `/${pillar.slug}/${post.slug}`;
    const title = `${post.title} | MoneyMoodBoard`;
    const desc = (body?.summary ?? post.excerpt).slice(0, 158);
    const assets = localHeroFor(pillar.slug, post.slug);
    // Prefer the real hero photo (1600×896); the gradient card is only a fallback.
    const ogImg = assets.jpg1600 ?? assets.card;
    const ogDims = ogImg === assets.card
      ? { width: 1200, height: 630 }
      : { width: 1600, height: 896 };
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absUrl(path) },
        ...(body
          ? [
              { property: "article:published_time", content: body.published },
              { property: "article:modified_time", content: body.updated },
              { property: "article:author", content: "Yinka Olayokun" },
            ]
          : []),
        ...ogImage(ogImg, ogDims),
      ],
      links: [
        canonical(path),
        ...hreflangLinks(path),
        {
          rel: "preload",
          as: "image",
          href: assets.avif1600,
          type: "image/avif",
          fetchpriority: "high",
        } as unknown as { rel: string; href: string },
      ],
    };
  },
  component: ClusterPostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Article not found</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn't find that guide. Try the pillar hub instead.
      </p>
      <Link to="/" className="mt-6 inline-block text-primary font-medium hover:underline">
        ← Back to home
      </Link>
    </div>
  ),
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ClusterPostPage() {
  const { pillar, post, body } = Route.useLoaderData() as {
    pillar: PillarView;
    post: ClusterPost;
    body: ArticleBody | undefined;
  };
  const related = pillar.clusters
    .flatMap((c) => c.posts)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const path = `/${pillar.slug}/${post.slug}`;
  const heroAlt = body?.featuredImageAlt ?? pillarHeroAlts[pillar.slug];
  const assets = localHeroFor(pillar.slug, post.slug);
  const heroImg = assets.jpg1600;

  const autoFaqs = [
    {
      q: `Where can I learn more about ${pillar.name.toLowerCase()}?`,
      a: `Visit our complete ${pillar.name} pillar guide for every cluster post in this topic, plus the free tools that go with them.`,
    },
  ];
  const faqs = body?.faqs?.length ? body.faqs : autoFaqs;
  const paaItems = buildPaa(pillar, post, body);
  const published = body ? formatDate(body.published) : null;
  const updated = body ? formatDate(body.updated) : "May 2026";
  const reviewedIso = body?.reviewed ?? body?.updated;
  const reviewed = reviewedIso ? formatDate(reviewedIso) : null;
  const reviewedBy = body?.reviewedBy ?? "Yinka Olayokun";

  // Build entity mentions for knowledge-graph linkage.
  const bodyText = [
    body?.summary ?? post.excerpt,
    ...(body?.keyTakeaways ?? []),
    ...(body?.sections ?? []).flatMap((s) => [
      s.heading,
      ...(s.paragraphs ?? []),
      ...(s.bullets ?? []),
      ...(s.orderedList ?? []),
      s.callout?.body ?? "",
    ]),
    ...(body?.faqs ?? []).flatMap((f) => [f.q, f.a]),
  ].join(" ");
  const mentionedEntities = findEntitiesInText(bodyText);

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: pillar.name, to: `/${pillar.slug}` as string },
          { label: post.title },
        ]}
      />

      <header className="mt-6">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pillar.tagClass}`}
        >
          {post.type} · {pillar.shortName}
        </span>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
          {post.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link
            to="/about/yinka-olayokun"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary hover:underline"
          >
            By Yinka Olayokun
          </Link>
          {published ? (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> Published{" "}
              <time dateTime={body!.published}>{published}</time>
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <CalendarCheck className="h-4 w-4" /> Updated{" "}
            <time dateTime={body?.updated ?? "2026-05-10"}>{updated}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {post.readMin} min read
          </span>
          {reviewed && reviewedIso ? (
            <span className="inline-flex items-center gap-1.5">
              <CalendarCheck className="h-4 w-4" /> Reviewed{" "}
              <time dateTime={reviewedIso}>{reviewed}</time> by{" "}
              <Link
                to="/about/yinka-olayokun"
                className="font-medium text-foreground hover:text-primary hover:underline"
              >
                {reviewedBy}
              </Link>
            </span>
          ) : null}
        </div>
        <div className="mt-4">
          <ShareButtons title={post.title} path={path} />
        </div>
      </header>

      {/* Featured image */}
      <figure className="mt-6 overflow-hidden rounded-2xl border border-border">
        <picture>
          <source
            type="image/avif"
            srcSet={`${assets.avif800} 800w, ${assets.avif1600} 1600w`}
            sizes="(min-width: 768px) 768px, 100vw"
          />
          <source
            type="image/webp"
            srcSet={`${assets.webp800} 800w, ${assets.webp1600} 1600w`}
            sizes="(min-width: 768px) 768px, 100vw"
          />
          <img
            src={assets.jpg1600}
            srcSet={`${assets.jpg800} 800w, ${assets.jpg1600} 1600w`}
            sizes="(min-width: 768px) 768px, 100vw"
            alt={heroAlt}
            width={1600}
            height={896}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="aspect-[16/9] w-full object-cover"
          />
        </picture>
      </figure>

      {body ? (
        <>
          {/* Quick answer */}
          <section
            id="quick-answer"
            className="mt-8 rounded-2xl border border-border bg-card p-5 md:p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Quick Answer
            </p>
            <p className="mt-2 text-lg leading-relaxed text-foreground/90">
              {body.summary}
            </p>
          </section>

          {/* Key takeaways, optimised for AI Overview / LLM citation */}
          {body.keyTakeaways?.length ? (
            <section
              id="key-takeaways"
              aria-label="Key takeaways"
              className="mt-6 rounded-2xl border border-primary/30 bg-primary-soft/40 p-5 md:p-6"
            >
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
                <Lightbulb className="h-4 w-4" /> Key Takeaways
              </p>
              <ul className="mt-3 space-y-2">
                {body.keyTakeaways.map((t, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-foreground/90 leading-7"
                  >
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <TableOfContents sections={body.sections.map((s) => s.heading)} />

          <AdSlot location="after-quick-answer" />

          {body.keyStats?.length ? (
            <KeyStatistics topic={pillar.shortName.toLowerCase()} stats={body.keyStats} />
          ) : null}

          {/* Article body */}
          <article
            className="mt-10 space-y-10"
            itemScope
            itemType="https://schema.org/Article"
          >
            <meta itemProp="headline" content={post.title} />
            <meta itemProp="datePublished" content={body.published} />
            <meta itemProp="dateModified" content={body.updated} />
            {body.sections.map((s, idx) => (
              <section
                key={s.heading}
                id={tocSlug(s.heading)}
                className="scroll-mt-20"
                itemProp="articleSection"
              >
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {s.heading}
                </h2>
                {s.paragraphs?.map((p, i) => (
                  <p
                    key={i}
                    className="mt-4 text-base leading-7 text-foreground/85"
                  >
                    {p}
                  </p>
                ))}
                {s.bullets?.length ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/85">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="leading-7">
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {s.orderedList?.length ? (
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-foreground/85">
                    {s.orderedList.map((b, i) => (
                      <li key={i} className="leading-7">
                        {b}
                      </li>
                    ))}
                  </ol>
                ) : null}
                {s.subSections?.length
                  ? s.subSections.map((sub) => (
                      <div key={sub.heading} className="mt-6">
                        <h3
                          id={tocSlug(`${s.heading}-${sub.heading}`)}
                          className="text-xl font-semibold tracking-tight text-foreground scroll-mt-20"
                        >
                          {sub.heading}
                        </h3>
                        {sub.paragraphs?.map((p, i) => (
                          <p
                            key={i}
                            className="mt-3 text-base leading-7 text-foreground/85"
                          >
                            {p}
                          </p>
                        ))}
                        {sub.bullets?.length ? (
                          <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/85">
                            {sub.bullets.map((b, i) => (
                              <li key={i} className="leading-7">
                                {b}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))
                  : null}
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
                {idx === 1 ? <AdSlot location="in-article" /> : null}
              </section>
            ))}
          </article>

          {body.toolCta ? (
            <Link
              to={`/tools/${body.toolCta.slug}` as string}
              className="mt-12 flex flex-col gap-3 rounded-2xl bg-primary p-6 text-primary-foreground transition-colors hover:bg-primary/90 md:flex-row md:items-center md:justify-between md:gap-6"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
                  Free tool
                </p>
                <p className="mt-1 text-xl font-bold">{body.toolCta.name}</p>
                <p className="mt-2 text-primary-foreground/85">
                  {body.toolCta.copy}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-semibold md:self-auto">
                Use Free Tool <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ) : null}

          {/* Curated internal links, strengthens topic graph */}
          {body.internalLinks?.length ? (
            <nav
              aria-label="Keep reading"
              className="mt-12 rounded-2xl border border-border bg-card p-5 md:p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Keep reading
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {body.internalLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to as string}
                      className="group inline-flex items-center gap-1.5 text-foreground/90 hover:text-primary"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                      <span className="hover:underline">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </>
      ) : (
        <>
          {/* In-progress notice for unwritten articles */}
          <aside className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 md:p-6 dark:border-amber-900/40 dark:bg-amber-900/10">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
              <Construction className="h-4 w-4" /> Article in production
            </p>
            <p className="mt-2 text-foreground/85">
              Our editorial team is finalising this guide. In the meantime,
              browse the rest of the {pillar.name} pillar, every published
              guide is reviewed against primary sources for accuracy.
            </p>
            <div className="mt-4">
              <Link
                to={`/${pillar.slug}` as string}
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                ← Complete {pillar.name} Guide
              </Link>
            </div>
          </aside>

          <AdSlot location="after-quick-answer" />
        </>
      )}

      {/* More guides */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">More {pillar.name} Guides</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ArticleCard key={p.slug} pillarSlug={pillar.slug} post={p} />
          ))}
        </div>
      </section>

      <AdSlot location="before-faq" />

      {/* People also ask, entity & sibling-derived */}
      {paaItems.length ? (
        <section className="mt-12">
          <h2 className="text-2xl font-bold">People also ask</h2>
          <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
            {paaItems.map((f, i) => (
              <details
                key={f.q}
                className="group p-5 [&_summary::-webkit-details-marker]:hidden"
                open={i === 0}
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold text-foreground">
                  <span>{f.q}</span>
                  <span
                    aria-hidden
                    className="mt-1 inline-block h-2 w-2 shrink-0 rotate-45 border-r-2 border-b-2 border-primary transition-transform group-open:-rotate-135"
                  />
                </summary>
                <p className="mt-3 text-muted-foreground leading-7">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {/* Manual / curated FAQ */}
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

      <AuthorBox />

      <GoDeeper pillarSlug={pillar.slug} articleSlug={post.slug} articleTitle={post.title} />

      <AdSlot location="matched-content" />
      <RelatedReads
        posts={related}
        pillarSlug={pillar.slug}
        heading={`More to read in ${pillar.name}`}
      />

      <div className="mt-12 -mx-4 md:-mx-6">
        <NewsletterCTA />
      </div>

      {(() => {
        const howToSection = body?.sections.find(
          (s) => (s.orderedList?.length ?? 0) >= 3,
        );
        const howToSchema =
          body && howToSection
            ? {
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: howToSection.heading,
                description: body.summary,
                image: toAbsUrl(heroImg),
                totalTime: `PT${Math.max(5, post.readMin)}M`,
                step: howToSection.orderedList!.map((text, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: `Step ${i + 1}`,
                  text,
                })),
              }
            : null;

        const data: Record<string, unknown>[] = [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: body?.summary ?? post.excerpt,
            image: {
              "@type": "ImageObject",
              url: toAbsUrl(heroImg),
              width: 1600,
              height: 900,
              ...(body?.featuredImageAlt ? { caption: body.featuredImageAlt } : {}),
              creditText: "MoneyMoodBoard",
              creator: { "@id": absUrl("/#organization") },
              copyrightHolder: { "@id": absUrl("/#organization") },
              license: "https://creativecommons.org/licenses/by-nc/4.0/",
              acquireLicensePage: absUrl("/contact"),
            },
            datePublished: body?.published ?? "2026-05-01",
            dateModified: body?.updated ?? "2026-05-10",
            ...(reviewedIso
              ? {
                  dateReviewed: reviewedIso,
                  reviewedBy: {
                    "@type": "Person",
                    "@id": absUrl("/about/yinka-olayokun#person"),
                    name: reviewedBy,
                  },
                }
              : {}),
            isBasedOn: absUrl("/methodology"),
            inLanguage: "en-US",
            wordCount: body
              ? body.sections.reduce(
                  (n, s) =>
                    n + (s.paragraphs ?? []).reduce((m, p) => m + p.split(/\s+/).length, 0),
                  0,
                )
              : undefined,
            keywords: [pillar.name, post.title].join(", "),
            author: {
              "@type": "Person",
              "@id": absUrl("/about/yinka-olayokun#person"),
              name: "Yinka Olayokun",
              jobTitle: "Founder & Editor",
              url: absUrl("/about/yinka-olayokun"),
            },
            publisher: { "@id": absUrl("/#organization") },
            isPartOf: { "@id": absUrl("/#website") },
            mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(path) },
            articleSection: pillar.name,
            about: mentionedEntities.slice(0, 5).map((e) => ({
              "@type": "Thing",
              name: e.name,
              sameAs: e.sameAs,
            })),
            mentions: mentionedEntities.map((e) => ({
              "@type": "DefinedTerm",
              "@id": absUrl(`/glossary#${entitySlug(e)}`),
              name: e.name,
              sameAs: e.sameAs,
              inDefinedTermSet: { "@id": absUrl("/glossary#termset") },
            })),
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["#quick-answer", "#key-takeaways", "h1"],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              {
                "@type": "ListItem",
                position: 2,
                name: pillar.name,
                item: absUrl(`/${pillar.slug}`),
              },
              { "@type": "ListItem", position: 3, name: post.title, item: absUrl(path) },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [...paaItems, ...faqs]
              .filter(
                (f, i, arr) =>
                  arr.findIndex((g) => g.q.toLowerCase() === f.q.toLowerCase()) === i,
              )
              .map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
          },
        ];
        if (howToSchema) data.push(howToSchema);
        return <JsonLd data={data} />;
      })()}
    </div>
  );
}
