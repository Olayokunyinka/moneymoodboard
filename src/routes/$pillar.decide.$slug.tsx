import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Calendar, CalendarCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { JsonLd } from "@/components/site/JsonLd";
import { AuthorBox } from "@/components/site/AuthorBox";
import { RelatedIntent } from "@/components/site/RelatedIntent";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { getDecisionPage, type DecisionPage } from "@/lib/decisions";
import { getPillarView, type PillarView, type PillarSlug } from "@/lib/pillars";
import { absUrl, canonical, ogImage, hreflangLinks } from "@/lib/seo";
import { pillarHeroes } from "@/lib/pillar-extras";

export const Route = createFileRoute("/$pillar/decide/$slug")({
  loader: ({ params }) => {
    const decision = getDecisionPage(params.pillar, params.slug);
    if (!decision) throw notFound();
    const pillar = getPillarView(decision.pillar as PillarSlug);
    return { decision, pillar };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { decision } = loaderData;
    const path = `/${decision.pillar}/decide/${decision.slug}`;
    return {
      meta: [
        { title: decision.metaTitle },
        { name: "description", content: decision.metaDescription },
        { property: "og:title", content: decision.title },
        { property: "og:description", content: decision.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absUrl(path) },
        { property: "article:published_time", content: decision.published },
        { property: "article:modified_time", content: decision.updated },
        ...ogImage(pillarHeroes[decision.pillar]),
      ],
      links: [canonical(path), ...hreflangLinks(path)],
    };
  },
  component: DecisionPageView,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Decision guide not found</h1>
      <Link to="/topics" className="mt-6 inline-block text-primary font-medium hover:underline">Browse all topics →</Link>
    </div>
  ),
});

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function leansLabel(decision: DecisionPage, side: "a" | "b" | "either") {
  if (side === "either") return "Either";
  const opt = decision.options.find((o) => o.id === side);
  return opt ? opt.label : side;
}

function DecisionPageView() {
  const { decision, pillar } = Route.useLoaderData() as { decision: DecisionPage; pillar: PillarView };
  const path = `/${decision.pillar}/decide/${decision.slug}`;
  const reviewer = "Yinka Olayokun";

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: pillar.name, to: `/${pillar.slug}` },
          { label: "Decide" },
          { label: decision.title },
        ]}
      />

      <header className="mt-6">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pillar.tagClass}`}>
          Decision guide · {pillar.shortName}
        </span>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{decision.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link to="/about/yinka-olayokun" className="font-medium text-foreground hover:text-primary hover:underline">By {reviewer}</Link>
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Published <time dateTime={decision.published}>{fmtDate(decision.published)}</time></span>
          <span className="inline-flex items-center gap-1.5"><CalendarCheck className="h-4 w-4" /> Reviewed <time dateTime={decision.updated}>{fmtDate(decision.updated)}</time></span>
        </div>
      </header>

      <section id="quick-answer" className="mt-8 rounded-2xl border-l-4 border-primary bg-primary-soft/60 p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Recommendation</p>
        <p className="mt-2 text-lg leading-relaxed text-foreground/90">{decision.recommendation}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">What would flip the answer</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">If this is true…</th>
                <th className="px-4 py-3 text-left font-semibold">…lean toward</th>
                <th className="px-4 py-3 text-left font-semibold">Why</th>
              </tr>
            </thead>
            <tbody>
              {decision.factors.map((f, i) => (
                <tr key={i} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-medium">{f.condition}</td>
                  <td className="px-4 py-3 text-foreground/85">{leansLabel(decision, f.leansToward)}</td>
                  <td className="px-4 py-3 text-foreground/85">{f.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {decision.examples?.map((s) => (
        <section key={s.heading} className="mt-10 rounded-2xl border border-border bg-card p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">{s.heading}</h2>
          {s.paragraphs.map((p, i) => (<p key={i} className="mt-3 text-base leading-7 text-foreground/85">{p}</p>))}
        </section>
      ))}

      {decision.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{s.heading}</h2>
          {s.paragraphs?.map((p, i) => (<p key={i} className="mt-4 text-base leading-7 text-foreground/85">{p}</p>))}
          {s.bullets && (
            <ul className="mt-4 space-y-2 list-disc pl-6 text-foreground/85 marker:text-primary">
              {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          )}
        </section>
      ))}

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <dl className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
          {decision.faqs.map((f) => (
            <div key={f.q} className="p-5">
              <dt className="font-semibold">{f.q}</dt>
              <dd className="mt-2 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <RelatedIntent
        pillarSlug={pillar.slug}
        pillarShortName={pillar.shortName}
        pillarHubTo={`/${pillar.slug}`}
        currentTo={path}
        seedText={`${decision.slug} ${decision.title}`}
      />

      <nav aria-label="Keep reading" className="mt-12 rounded-2xl border border-border bg-card p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Keep reading</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {decision.internalLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="group inline-flex items-center gap-1.5 text-foreground/90 hover:text-primary">
                <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                <span className="hover:underline">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <AuthorBox />
      <div className="mt-12 -mx-4 md:-mx-6"><NewsletterCTA /></div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: decision.title,
            description: decision.metaDescription,
            datePublished: decision.published,
            dateModified: decision.updated,
            inLanguage: "en-US",
            articleSection: pillar.name,
            author: { "@type": "Person", "@id": absUrl("/about/yinka-olayokun#person"), name: reviewer, url: absUrl("/about/yinka-olayokun") },
            publisher: { "@id": absUrl("/#organization") },
            mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(path) },
            speakable: { "@type": "SpeakableSpecification", cssSelector: ["#quick-answer", "h1"] },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: decision.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: pillar.name, item: absUrl(`/${pillar.slug}`) },
              { "@type": "ListItem", position: 3, name: decision.title, item: absUrl(path) },
            ],
          },
        ]}
      />
    </div>
  );
}
