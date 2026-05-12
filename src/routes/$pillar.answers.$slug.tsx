import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Calendar, CalendarCheck, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { JsonLd } from "@/components/site/JsonLd";
import { AuthorBox } from "@/components/site/AuthorBox";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { getAnswerPage, type AnswerPage } from "@/lib/answers";
import { getPillarView, type PillarView, type PillarSlug } from "@/lib/pillars";
import { absUrl, canonical, ogImage, hreflangLinks } from "@/lib/seo";
import { pillarHeroes } from "@/lib/pillar-extras";

export const Route = createFileRoute("/$pillar/answers/$slug")({
  loader: ({ params }) => {
    const answer = getAnswerPage(params.pillar, params.slug);
    if (!answer) throw notFound();
    const pillar = getPillarView(answer.pillar as PillarSlug);
    return { answer, pillar };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { answer } = loaderData;
    const path = `/${answer.pillar}/answers/${answer.slug}`;
    return {
      meta: [
        { title: answer.metaTitle },
        { name: "description", content: answer.metaDescription },
        { property: "og:title", content: answer.question },
        { property: "og:description", content: answer.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absUrl(path) },
        { property: "article:published_time", content: answer.published },
        { property: "article:modified_time", content: answer.updated },
        ...ogImage(pillarHeroes[answer.pillar]),
      ],
      links: [canonical(path), ...hreflangLinks(path)],
    };
  },
  component: AnswerPageView,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Answer not found</h1>
      <Link to="/topics" className="mt-6 inline-block text-primary font-medium hover:underline">Browse all topics →</Link>
    </div>
  ),
});

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function AnswerPageView() {
  const { answer, pillar } = Route.useLoaderData() as { answer: AnswerPage; pillar: PillarView };
  const path = `/${answer.pillar}/answers/${answer.slug}`;
  const reviewer = "Yinka Olayokun";

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: pillar.name, to: `/${pillar.slug}` },
          { label: "Answers" },
          { label: answer.question },
        ]}
      />

      <header className="mt-6">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pillar.tagClass}`}>
          Answer · {pillar.shortName}
        </span>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{answer.question}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link to="/about/yinka-olayokun" className="font-medium text-foreground hover:text-primary hover:underline">By {reviewer}</Link>
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Published <time dateTime={answer.published}>{fmtDate(answer.published)}</time></span>
          <span className="inline-flex items-center gap-1.5"><CalendarCheck className="h-4 w-4" /> Reviewed <time dateTime={answer.updated}>{fmtDate(answer.updated)}</time></span>
        </div>
      </header>

      <section id="quick-answer" className="mt-8 rounded-2xl border-l-4 border-primary bg-primary-soft/60 p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Direct Answer</p>
        <p className="mt-2 text-lg leading-relaxed text-foreground/90">{answer.shortAnswer}</p>
      </section>

      {answer.table ? (
        <section className="mt-8">
          <h2 className="text-2xl font-bold">{answer.table.caption}</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  {answer.table.columns.map((c) => (<th key={c} className="px-4 py-3 text-left font-semibold">{c}</th>))}
                </tr>
              </thead>
              <tbody>
                {answer.table.rows.map((r, i) => (
                  <tr key={i} className="border-t border-border">
                    {r.map((cell, j) => (<td key={j} className="px-4 py-3 text-foreground/85">{cell}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {answer.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{s.heading}</h2>
          {s.paragraphs.map((p, i) => (<p key={i} className="mt-4 text-base leading-7 text-foreground/85">{p}</p>))}
        </section>
      ))}

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <dl className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
          {answer.faqs.map((f) => (
            <div key={f.q} className="p-5">
              <dt className="font-semibold">{f.q}</dt>
              <dd className="mt-2 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Sources</h2>
        <ul className="mt-4 space-y-2">
          {answer.sources.map((s) => (
            <li key={s.url} className="text-sm text-foreground/85">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                {s.name} <ExternalLink className="h-3 w-3" />
              </a>
              <span className="text-muted-foreground"> — {s.publisher}. Verified {fmtDate(s.verifiedOn)}.</span>
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="Keep reading" className="mt-12 rounded-2xl border border-border bg-card p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Keep reading</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {answer.internalLinks.map((l) => (
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
            "@type": "QAPage",
            mainEntity: {
              "@type": "Question",
              name: answer.question,
              text: answer.question,
              answerCount: 1,
              acceptedAnswer: { "@type": "Answer", text: answer.shortAnswer, url: absUrl(path) },
            },
            speakable: { "@type": "SpeakableSpecification", cssSelector: ["#quick-answer", "h1"] },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: answer.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: pillar.name, item: absUrl(`/${pillar.slug}`) },
              { "@type": "ListItem", position: 3, name: answer.question, item: absUrl(path) },
            ],
          },
        ]}
      />
    </div>
  );
}
