import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Calendar, CalendarCheck, Check, X } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { JsonLd } from "@/components/site/JsonLd";
import { AuthorBox } from "@/components/site/AuthorBox";
import { RelatedIntent } from "@/components/site/RelatedIntent";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { getBestRoundup, type BestRoundup } from "@/lib/best-picks";
import { getPillarView, type PillarView, type PillarSlug } from "@/lib/pillars";
import { absUrl, canonical, ogImage, hreflangLinks } from "@/lib/seo";
import { pillarHeroes } from "@/lib/pillar-extras";

export const Route = createFileRoute("/$pillar/best/$slug")({
  loader: ({ params }) => {
    const roundup = getBestRoundup(params.pillar, params.slug);
    if (!roundup) throw notFound();
    const pillar = getPillarView(roundup.pillar as PillarSlug);
    return { roundup, pillar };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { roundup } = loaderData;
    const path = `/${roundup.pillar}/best/${roundup.slug}`;
    return {
      meta: [
        { title: roundup.metaTitle },
        { name: "description", content: roundup.metaDescription },
        { property: "og:title", content: roundup.title },
        { property: "og:description", content: roundup.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absUrl(path) },
        { property: "article:published_time", content: roundup.published },
        { property: "article:modified_time", content: roundup.updated },
        ...ogImage(pillarHeroes[roundup.pillar]),
      ],
      links: [canonical(path), ...hreflangLinks(path)],
    };
  },
  component: BestRoundupPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Roundup not found</h1>
      <Link to="/topics" className="mt-6 inline-block text-primary font-medium hover:underline">Browse all topics →</Link>
    </div>
  ),
});

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function BestRoundupPage() {
  const { roundup, pillar } = Route.useLoaderData() as { roundup: BestRoundup; pillar: PillarView };
  const path = `/${roundup.pillar}/best/${roundup.slug}`;
  const reviewer = "Yinka Olayokun";

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: pillar.name, to: `/${pillar.slug}` },
          { label: "Best picks" },
          { label: roundup.title },
        ]}
      />

      <header className="mt-6">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pillar.tagClass}`}>
          Best picks · {pillar.shortName}
        </span>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{roundup.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link to="/about/yinka-olayokun" className="font-medium text-foreground hover:text-primary hover:underline">By {reviewer}</Link>
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Published <time dateTime={roundup.published}>{fmtDate(roundup.published)}</time></span>
          <span className="inline-flex items-center gap-1.5"><CalendarCheck className="h-4 w-4" /> Reviewed <time dateTime={roundup.updated}>{fmtDate(roundup.updated)}</time></span>
        </div>
      </header>

      <section id="quick-answer" className="mt-8 rounded-2xl border border-border bg-card p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Quick Answer</p>
        <p className="mt-2 text-lg leading-relaxed text-foreground/90">{roundup.shortAnswer}</p>
      </section>

      <section className="mt-8" aria-labelledby="criteria">
        <h2 id="criteria" className="text-2xl font-bold">How we picked</h2>
        <ul className="mt-4 space-y-2">
          {roundup.criteria.map((c) => (
            <li key={c} className="flex gap-3 text-foreground/85"><Check className="h-5 w-5 shrink-0 text-primary" /><span>{c}</span></li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-6">
        {roundup.picks.map((p) => (
          <article key={p.rank} className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">#{p.rank}</span>
              <h3 className="text-xl font-bold">{p.name}</h3>
              <span className="text-sm text-muted-foreground">Best for: {p.bestFor}</span>
            </div>
            <p className="mt-2 text-foreground/85">{p.oneLiner}</p>
            <ul className="mt-4 grid gap-1.5 text-sm sm:grid-cols-2">
              {p.facts.map((f) => (<li key={f} className="text-foreground/80">• {f}</li>))}
            </ul>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-foreground">Pros</p>
                <ul className="mt-1.5 space-y-1 text-sm text-foreground/85">
                  {p.pros.map((x) => (<li key={x} className="flex gap-1.5"><Check className="h-4 w-4 shrink-0 text-primary" />{x}</li>))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Cons</p>
                <ul className="mt-1.5 space-y-1 text-sm text-foreground/85">
                  {p.cons.map((x) => (<li key={x} className="flex gap-1.5"><X className="h-4 w-4 shrink-0 text-muted-foreground" />{x}</li>))}
                </ul>
              </div>
            </div>
            {p.ctaUrl && p.ctaLabel ? (
              <a href={p.ctaUrl} target="_blank" rel="sponsored noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                {p.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </article>
        ))}
      </section>

      {roundup.body.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{s.heading}</h2>
          {s.paragraphs.map((p, i) => (<p key={i} className="mt-4 text-base leading-7 text-foreground/85">{p}</p>))}
        </section>
      ))}

      <RelatedIntent
        pillarSlug={pillar.slug}
        pillarShortName={pillar.shortName}
        pillarHubTo={`/${pillar.slug}`}
        currentTo={path}
        seedText={`${roundup.slug} ${roundup.title}`}
      />

      <nav aria-label="Keep reading" className="mt-12 rounded-2xl border border-border bg-card p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Keep reading</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {roundup.internalLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="group inline-flex items-center gap-1.5 text-foreground/90 hover:text-primary">
                <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                <span className="hover:underline">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <dl className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
          {roundup.faqs.map((f) => (
            <div key={f.q} className="p-5">
              <dt className="font-semibold">{f.q}</dt>
              <dd className="mt-2 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <AuthorBox />
      <div className="mt-12 -mx-4 md:-mx-6"><NewsletterCTA /></div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: roundup.title,
            description: roundup.metaDescription,
            itemListElement: roundup.picks.map((p, i) => ({
              "@type": "ListItem",
              position: p.rank ?? i + 1,
              item: { "@type": "FinancialProduct", name: p.name, description: p.oneLiner },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: roundup.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: pillar.name, item: absUrl(`/${pillar.slug}`) },
              { "@type": "ListItem", position: 3, name: roundup.title, item: absUrl(path) },
            ],
          },
        ]}
      />
    </div>
  );
}
