import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { entities, entitySlug } from "@/lib/entities";
import { pillars } from "@/lib/pillars";
import { absUrl, canonical , hreflangLinks } from "@/lib/seo";

const TITLE = "Personal Finance Glossary, Plain-English Definitions | MoneyMoodBoard";
const DESC =
  "An A–Z glossary of personal-finance terms, APR, FICO, Roth IRA, HYSA, FDIC and more, defined in plain English with links to the guides that cover each topic in depth.";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: absUrl("/glossary") },
      { property: "og:type", content: "website" },
    ],
    links: [canonical("/glossary"), ...hreflangLinks("/glossary")],
  }),
  component: GlossaryPage,
});

function GlossaryPage() {
  // Sort A→Z
  const sorted = [...entities].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );

  // Group by first letter for jump nav
  const groups = sorted.reduce<Record<string, typeof sorted>>((acc, e) => {
    const letter = e.name[0]!.toUpperCase();
    (acc[letter] ??= []).push(e);
    return acc;
  }, {});
  const letters = Object.keys(groups).sort();

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Glossary" }]} />

      <PageHero
        title="Personal Finance Glossary"
        intro="Every term we use across MoneyMoodBoard, defined in plain English. Each entry links to authoritative reference sources and to the in-depth guide that uses the term."
      />

      {/* Letter jump nav */}
      <nav aria-label="Jump to letter" className="mt-8 flex flex-wrap gap-2">
        {letters.map((l) => (
          <a
            key={l}
            href={`#letter-${l}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-sm font-semibold text-foreground/80 hover:border-primary hover:text-primary"
          >
            {l}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-12">
        {letters.map((l) => (
          <section key={l} id={`letter-${l}`} className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-foreground">{l}</h2>
            <dl className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
              {groups[l]!.map((e) => {
                const pillar = pillars.find((p) => p.slug === e.pillar);
                return (
                  <div key={e.name} id={entitySlug(e)} className="scroll-mt-24 p-5 md:p-6">
                    <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-lg font-semibold text-foreground">{e.name}</span>
                      {e.aliases?.length ? (
                        <span className="text-sm text-muted-foreground">
                          also: {e.aliases.join(", ")}
                        </span>
                      ) : null}
                    </dt>
                    <dd className="mt-2 text-foreground/85 leading-relaxed">{e.definition}</dd>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      {pillar ? (
                        <Link
                          to={`/${pillar.slug}` as string}
                          className="inline-flex items-center rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary hover:bg-primary/15"
                        >
                          {pillar.name}
                        </Link>
                      ) : null}
                      {e.sameAs.map((href) => {
                        const label = href.includes("wikidata.org")
                          ? "Wikidata"
                          : href.includes("wikipedia.org")
                            ? "Wikipedia"
                            : "Reference";
                        return (
                          <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
                          >
                            {label} <ExternalLink className="h-3 w-3" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </dl>
          </section>
        ))}
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            "@id": absUrl("/glossary#termset"),
            name: "MoneyMoodBoard Personal Finance Glossary",
            url: absUrl("/glossary"),
            inLanguage: "en-US",
            hasDefinedTerm: sorted.map((e) => ({
              "@type": "DefinedTerm",
              "@id": absUrl(`/glossary#${entitySlug(e)}`),
              name: e.name,
              alternateName: e.aliases,
              description: e.definition,
              sameAs: e.sameAs,
              inDefinedTermSet: { "@id": absUrl("/glossary#termset") },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: "Glossary", item: absUrl("/glossary") },
            ],
          },
        ]}
      />
    </div>
  );
}
