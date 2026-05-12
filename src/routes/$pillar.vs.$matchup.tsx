import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Calendar, CalendarCheck, Check, Minus } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { JsonLd } from "@/components/site/JsonLd";
import { AuthorBox } from "@/components/site/AuthorBox";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { getComparison, type Comparison } from "@/lib/comparisons";
import { getPillarView, type PillarView } from "@/lib/pillars";
import { absUrl, canonical, ogImage , hreflangLinks } from "@/lib/seo";
import { pillarHeroes } from "@/lib/pillar-extras";

export const Route = createFileRoute("/$pillar/vs/$matchup")({
  loader: ({ params }) => {
    const cmp = getComparison(params.pillar, params.matchup);
    if (!cmp) throw notFound();
    const pillar = getPillarView(cmp.pillar);
    return { cmp, pillar };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { cmp } = loaderData;
    const path = `/${cmp.pillar}/vs/${cmp.slug}`;
    return {
      meta: [
        { title: cmp.metaTitle },
        { name: "description", content: cmp.metaDescription },
        { property: "og:title", content: cmp.title },
        { property: "og:description", content: cmp.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absUrl(path) },
        { property: "article:published_time", content: cmp.published },
        { property: "article:modified_time", content: cmp.updated },
        ...ogImage(pillarHeroes[cmp.pillar]),
      ],
      links: [canonical(path), ...hreflangLinks(path)],
    };
  },
  component: ComparisonPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Comparison not found</h1>
      <Link to="/topics" className="mt-6 inline-block text-primary font-medium hover:underline">
        Browse all topics →
      </Link>
    </div>
  ),
});

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function ComparisonPage() {
  const { cmp, pillar } = Route.useLoaderData() as { cmp: Comparison; pillar: PillarView };
  const path = `/${cmp.pillar}/vs/${cmp.slug}`;
  const reviewer = "Yinka Olayokun";

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: pillar.name, to: `/${pillar.slug}` },
          { label: "Compare" },
          { label: cmp.title },
        ]}
      />

      <header className="mt-6">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pillar.tagClass}`}>
          Comparison · {pillar.shortName}
        </span>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{cmp.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link to="/about/yinka-olayokun" className="font-medium text-foreground hover:text-primary hover:underline">
            By {reviewer}
          </Link>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> Published <time dateTime={cmp.published}>{fmtDate(cmp.published)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarCheck className="h-4 w-4" /> Reviewed <time dateTime={cmp.updated}>{fmtDate(cmp.updated)}</time>
          </span>
        </div>
      </header>

      <section id="quick-answer" className="mt-8 rounded-2xl border border-border bg-card p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Quick Answer</p>
        <p className="mt-2 text-lg leading-relaxed text-foreground/90">{cmp.summary}</p>
      </section>

      {/* At-a-glance scorecard */}
      <section className="mt-8" aria-labelledby="scorecard">
        <h2 id="scorecard" className="text-2xl font-bold">At a glance</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Criterion</th>
                <th className="px-4 py-3 text-left font-semibold">{cmp.a.name}</th>
                <th className="px-4 py-3 text-left font-semibold">{cmp.b.name}</th>
                <th className="px-4 py-3 text-left font-semibold">Winner</th>
              </tr>
            </thead>
            <tbody>
              {cmp.criteria.map((c) => (
                <tr key={c.name} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-foreground/85">{c.a}</td>
                  <td className="px-4 py-3 text-foreground/85">{c.b}</td>
                  <td className="px-4 py-3">
                    {c.winner === "tie" ? (
                      <span className="inline-flex items-center gap-1 text-muted-foreground"><Minus className="h-3.5 w-3.5" /> Tie</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-semibold text-primary">
                        <Check className="h-3.5 w-3.5" /> {c.winner === "a" ? cmp.a.name : cmp.b.name}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sections */}
      {cmp.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{s.heading}</h2>
          {s.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-base leading-7 text-foreground/85">{p}</p>
          ))}
          {s.bullets && s.bullets.length > 0 && (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-foreground/85">
              {s.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {/* Verdict */}
      <aside className="mt-10 rounded-2xl border-l-4 border-primary bg-primary-soft/60 p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Verdict</p>
        <p className="mt-1.5 text-foreground/90 leading-7">{cmp.verdict}</p>
      </aside>

      {/* Best for personas */}
      <section className="mt-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Best for…</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {cmp.bestFor.map((b) => (
            <li key={b.persona} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{b.persona}</p>
              <p className="mt-1 text-lg font-semibold">Pick {b.pick === "a" ? cmp.a.name : cmp.b.name}</p>
              <p className="mt-2 text-sm text-foreground/85 leading-6">{b.rationale}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Internal links */}
      <nav aria-label="Keep reading" className="mt-12 rounded-2xl border border-border bg-card p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Keep reading</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {cmp.internalLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="group inline-flex items-center gap-1.5 text-foreground/90 hover:text-primary">
                <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                <span className="hover:underline">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <dl className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
          {cmp.faqs.map((f) => (
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
            headline: cmp.title,
            description: cmp.summary,
            datePublished: cmp.published,
            dateModified: cmp.updated,
            inLanguage: "en-US",
            articleSection: pillar.name,
            author: {
              "@type": "Person",
              "@id": absUrl("/about/yinka-olayokun#person"),
              name: reviewer,
              url: absUrl("/about/yinka-olayokun"),
            },
            publisher: { "@id": absUrl("/#organization") },
            mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(path) },
            about: [cmp.a, cmp.b].map((o) => ({
              "@type": "Thing",
              name: o.name,
              description: o.oneLiner,
              ...(o.sameAs ? { sameAs: o.sameAs } : {}),
            })),
            speakable: { "@type": "SpeakableSpecification", cssSelector: ["#quick-answer", "h1"] },
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [cmp.a, cmp.b].map((o, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "Thing", name: o.name, description: o.oneLiner, ...(o.sameAs ? { sameAs: o.sameAs } : {}) },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: pillar.name, item: absUrl(`/${pillar.slug}`) },
              { "@type": "ListItem", position: 3, name: cmp.title, item: absUrl(path) },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: cmp.faqs.map((f) => ({
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
