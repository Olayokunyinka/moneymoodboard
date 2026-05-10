import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Clock, Construction } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { JsonLd } from "@/components/site/JsonLd";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { ArticleCard } from "@/components/site/Cards";
import { AuthorBox } from "@/components/site/AuthorBox";
import { ShareButtons } from "@/components/site/ShareButtons";
import { AdSlot } from "@/components/site/AdSlot";
import { pillars, type ClusterPost, type Pillar } from "@/lib/pillars";
import { absUrl, canonical, ogImage } from "@/lib/seo";

function findPost(pillarSlug: string, postSlug: string) {
  const pillar = pillars.find((p) => p.slug === pillarSlug);
  if (!pillar) return null;
  for (const cluster of pillar.clusters) {
    const post = cluster.posts.find((p) => p.slug === postSlug);
    if (post) return { pillar, post };
  }
  return null;
}

export const Route = createFileRoute("/$pillar/$post")({
  loader: ({ params }) => {
    const found = findPost(params.pillar, params.post);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { pillar, post } = loaderData;
    const path = `/${pillar.slug}/${post.slug}`;
    const title = `${post.title} | MoneyMoodBoard`;
    const desc = post.excerpt;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absUrl(path) },
        ...ogImage("/og-default.jpg"),
      ],
      links: [canonical(path)],
    };
  },
  component: ClusterPostStub,
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

function ClusterPostStub() {
  const { pillar, post } = Route.useLoaderData() as {
    pillar: Pillar;
    post: ClusterPost;
  };
  const related = pillar.clusters
    .flatMap((c) => c.posts)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const path = `/${pillar.slug}/${post.slug}`;

  const faqs = [
    {
      q: `What is ${post.title.toLowerCase()}?`,
      a: `This guide covers ${post.title.toLowerCase()} in plain English — what it is, how it works, and how to apply it to your money in 2026. The full article is being finalised by our editorial team.`,
    },
    {
      q: `Where can I learn more about ${pillar.name.toLowerCase()}?`,
      a: `Head to our complete ${pillar.name} pillar guide for every cluster post in this topic, plus the free tools that go with them.`,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-20">
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
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> Updated May 2026
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {post.readMin} min read
            </span>
          </div>
          <ShareButtons title={post.title} path={path} />
        </div>
      </header>

      {/* In-progress notice */}
      <aside className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 md:p-6 dark:border-amber-900/40 dark:bg-amber-900/10">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
          <Construction className="h-4 w-4" /> Article in production
        </p>
        <p className="mt-2 text-foreground/85">
          Our editorial team is finalising this guide. In the meantime, browse
          the rest of the {pillar.name} pillar — every published guide is
          jargon-free and reviewed for accuracy.
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

      {/* More guides */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">More {pillar.name} Guides</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {related.map((p) => (
            <ArticleCard key={p.slug} pillarSlug={pillar.slug} post={p} />
          ))}
        </div>
      </section>

      <AdSlot location="before-faq" />

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

      <AuthorBox />

      <div className="mt-12 -mx-4 md:-mx-6">
        <NewsletterCTA />
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: "2026-05-01",
            dateModified: "2026-05-08",
            author: { "@type": "Organization", name: "MoneyMoodBoard" },
            publisher: {
              "@type": "Organization",
              name: "MoneyMoodBoard",
              logo: {
                "@type": "ImageObject",
                url: absUrl("/og-default.jpg"),
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": absUrl(path),
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
