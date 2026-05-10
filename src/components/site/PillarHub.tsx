import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import type { Pillar } from "@/lib/pillars";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageHero } from "./PageHero";
import { ArticleCard, PillarCard } from "./Cards";
import { JsonLd } from "./JsonLd";
import { NewsletterCTA } from "./NewsletterCTA";
import { pillars } from "@/lib/pillars";
import { Button } from "@/components/ui/button";

export function PillarHub({ pillar }: { pillar: Pillar }) {
  const totalGuides = pillar.clusters.reduce((s, c) => s + c.posts.length, 0);
  const others = pillars.filter((p) => p.slug !== pillar.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: pillar.name }]} />

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
            <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4" />{totalGuides} guides</span>
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />Updated May 2026</span>
            <a href="#all-guides" className="text-primary font-medium hover:underline">Jump to all guides ↓</a>
          </div>
        }
      />

      {/* Direct answer */}
      <section className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8">
        <h2 className="text-2xl font-bold text-foreground">What Is {pillar.shortName}?</h2>
        <p className="mt-4 text-foreground/85 text-lg leading-relaxed">{pillar.whatIs}</p>
      </section>

      {/* Table of contents */}
      <section className="mt-14" id="all-guides">
        <h2 className="text-2xl font-bold text-foreground">Everything Covered in This Guide</h2>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {pillar.clusters.map((c) => (
            <li key={c.name}>
              <a href={`#${slugify(c.name)}`} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:border-primary/40 transition-colors">
                <span className="font-medium">{c.name}</span>
                <span className="text-sm text-muted-foreground">{c.posts.length} guides</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Cluster sections */}
      {pillar.clusters.map((cluster) => (
        <section key={cluster.name} id={slugify(cluster.name)} className="mt-16 scroll-mt-20">
          <h2 className="text-2xl font-bold text-foreground">{cluster.name}</h2>
          <p className="mt-2 text-muted-foreground max-w-3xl">{cluster.intro}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cluster.posts.map((post) => (
              <ArticleCard key={post.slug} pillarSlug={pillar.slug} post={post} />
            ))}
          </div>
        </section>
      ))}

      {/* Tool CTA */}
      {pillar.relatedTools.length > 0 && (
        <section className="mt-16 rounded-2xl bg-accent p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h2 className="text-xl font-semibold text-accent-foreground">Try a free {pillar.shortName.toLowerCase()} tool</h2>
            <p className="mt-1 text-accent-foreground/80">Skip the spreadsheet — get an answer in under a minute.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {pillar.relatedTools.map((t) => (
              <Button key={t.slug} asChild variant="default">
                <Link to={`/tools/${t.slug}` as string}>
                  {t.name} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {pillar.faqs.map((f) => (
            <div key={f.q} className="p-5 md:p-6">
              <dt className="font-semibold text-foreground">{f.q}</dt>
              <dd className="mt-2 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Related pillars */}
      <section className="mt-16">
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
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pillar.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </div>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
