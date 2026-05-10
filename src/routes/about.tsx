import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { JsonLd } from "@/components/site/JsonLd";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MoneyMoodBoard | Honest, Jargon-Free Personal Finance" },
      { name: "description", content: "Who we are, how we research and write our guides, and how we make money." },
      { property: "og:title", content: "About MoneyMoodBoard" },
      { property: "og:description", content: "Honest, jargon-free personal finance — built for real life." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <PageHero
        title="About MoneyMoodBoard"
        intro="MoneyMoodBoard is the honest, jargon-free finance guide for people who want to take control of their money without feeling overwhelmed."
      />

      <section className="mt-10 space-y-6 text-foreground/85">
        <h2 className="text-2xl font-bold">Who we are</h2>
        <p>
          MoneyMoodBoard was built by a small team of writers, editors and
          spreadsheet enthusiasts who got tired of personal finance content
          that either talked down to readers or assumed they already had a
          finance degree. We write the guides we wish we'd had at 22, at 32,
          at 42 — clear, practical, and grounded in arithmetic, not vibes.
        </p>

        <h2 className="text-2xl font-bold">Our editorial standards</h2>
        <p>
          Every guide is researched against primary sources (regulators,
          peer-reviewed research, official documentation), drafted by a
          subject-matter writer, fact-checked by a separate editor, and
          reviewed at least once a quarter for changes in law, rates or
          product availability. When we get something wrong, we correct it
          publicly and add a note.
        </p>

        <h2 className="text-2xl font-bold">How we make money</h2>
        <p>
          MoneyMoodBoard runs on display advertising and, occasionally,
          affiliate partnerships with financial products we'd recommend
          regardless. Sponsored placements are clearly labelled. We never
          accept money to alter a review, change a ranking, or remove a
          critical comment. If a product is bad, we say so.
        </p>

        <h2 className="text-2xl font-bold">Contact</h2>
        <p>
          Editorial questions, corrections and tips:{" "}
          <a href="mailto:hello@moneymoodboard.com" className="text-primary font-medium hover:underline">
            hello@moneymoodboard.com
          </a>
          .
        </p>
      </section>

      <div className="mt-12 -mx-4 md:-mx-6">
        <NewsletterCTA />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About MoneyMoodBoard",
          publisher: { "@type": "Organization", name: "MoneyMoodBoard", url: "https://moneymoodboard.com" },
        }}
      />
    </div>
  );
}
