import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Calendar, CalendarCheck, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { JsonLd } from "@/components/site/JsonLd";
import { AuthorBox } from "@/components/site/AuthorBox";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { getPersona, type Persona } from "@/lib/personas";
import { getPillarView, type PillarView } from "@/lib/pillars";
import { absUrl, canonical, ogImage , hreflangLinks } from "@/lib/seo";
import { pillarHeroes } from "@/lib/pillar-extras";

export const Route = createFileRoute("/$pillar/best-for/$persona")({
  loader: ({ params }) => {
    const persona = getPersona(params.pillar, params.persona);
    if (!persona) throw notFound();
    const pillar = getPillarView(persona.pillar);
    return { persona, pillar };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { persona } = loaderData;
    const path = `/${persona.pillar}/best-for/${persona.slug}`;
    return {
      meta: [
        { title: persona.metaTitle },
        { name: "description", content: persona.metaDescription },
        { property: "og:title", content: persona.title },
        { property: "og:description", content: persona.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absUrl(path) },
        { property: "article:published_time", content: persona.published },
        { property: "article:modified_time", content: persona.updated },
        ...ogImage(pillarHeroes[persona.pillar]),
      ],
      links: [canonical(path), ...hreflangLinks(path)],
    };
  },
  component: PersonaPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link to="/topics" className="mt-6 inline-block text-primary font-medium hover:underline">
        Browse all topics →
      </Link>
    </div>
  ),
});

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function PersonaPage() {
  const { persona, pillar } = Route.useLoaderData() as { persona: Persona; pillar: PillarView };
  const path = `/${persona.pillar}/best-for/${persona.slug}`;
  const reviewer = "Yinka Olayokun";

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: pillar.name, to: `/${pillar.slug}` },
          { label: "Best for" },
          { label: persona.personaName },
        ]}
      />

      <header className="mt-6">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pillar.tagClass}`}>
          Persona guide · {pillar.shortName}
        </span>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{persona.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link to="/about/yinka-olayokun" className="font-medium text-foreground hover:text-primary hover:underline">
            By {reviewer}
          </Link>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> Published <time dateTime={persona.published}>{fmtDate(persona.published)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarCheck className="h-4 w-4" /> Reviewed <time dateTime={persona.updated}>{fmtDate(persona.updated)}</time>
          </span>
        </div>
      </header>

      <section id="quick-answer" className="mt-8 rounded-2xl border border-border bg-card p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Quick Answer</p>
        <p className="mt-2 text-lg leading-relaxed text-foreground/90">{persona.summary}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Who this is for</h2>
        <p className="mt-4 text-base leading-7 text-foreground/85">{persona.profile}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">The three-step plan</h2>
        <ol className="mt-6 space-y-6">
          {persona.approaches.map((a, i) => (
            <li key={a.name} className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step {i + 1}</p>
              <h3 className="mt-1 text-xl font-semibold">{a.name}</h3>
              <p className="mt-2 text-foreground/85 leading-7">{a.rationale}</p>
              {a.to ? (
                <Link to={a.to} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  Read the full guide <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight inline-flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" /> Common pitfalls
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/85">
          {persona.pitfalls.map((p, i) => <li key={i} className="leading-7">{p}</li>)}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Recommended tools</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {persona.recommendedTools.map((t) => (
            <Link key={t.slug} to={`/tools/${t.slug}`} className="rounded-2xl border border-border bg-card p-4 hover:border-primary/50 transition-colors">
              <p className="font-semibold">{t.name}</p>
              <p className="mt-1 text-sm text-muted-foreground inline-flex items-center gap-1">
                Open tool <ArrowRight className="h-3.5 w-3.5" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      <nav aria-label="Keep reading" className="mt-12 rounded-2xl border border-border bg-card p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Keep reading</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {persona.internalLinks.map((l) => (
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
          {persona.faqs.map((f) => (
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
            headline: persona.title,
            description: persona.summary,
            datePublished: persona.published,
            dateModified: persona.updated,
            inLanguage: "en-US",
            articleSection: pillar.name,
            audience: { "@type": "PeopleAudience", audienceType: persona.personaName },
            author: {
              "@type": "Person",
              "@id": absUrl("/about/yinka-olayokun#person"),
              name: reviewer,
              url: absUrl("/about/yinka-olayokun"),
            },
            publisher: { "@id": absUrl("/#organization") },
            mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(path) },
            speakable: { "@type": "SpeakableSpecification", cssSelector: ["#quick-answer", "h1"] },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: pillar.name, item: absUrl(`/${pillar.slug}`) },
              { "@type": "ListItem", position: 3, name: `Best for ${persona.personaName}`, item: absUrl(path) },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: persona.faqs.map((f) => ({
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
