import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { AuthorBox } from "@/components/site/AuthorBox";
import { absUrl, canonical , hreflangLinks } from "@/lib/seo";

const TITLE = "Editorial Policy — How MoneyMoodBoard Writes & Reviews Guides";
const DESC =
  "How MoneyMoodBoard plans, writes, fact-checks, edits and updates personal-finance guides. Our independence standards, sources, and conflict-of-interest rules.";
const PATH = "/editorial-policy";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: absUrl(PATH) },
      { property: "og:type", content: "website" },
    ],
    links: [canonical(PATH), ...hreflangLinks(PATH)],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-20">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Editorial policy" }]} />
      <PageHero
        eyebrow={<span className="text-xs font-medium uppercase tracking-wide text-primary">Editorial standards</span>}
        title="Editorial Policy"
        intro="Every guide on MoneyMoodBoard is planned, researched, written, fact-checked, edited and reviewed by people — not generative templates. This page documents the policy our editorial team is held to."
      />

      <article className="prose-style mt-8 space-y-8 text-foreground/85 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-foreground">1. Independence</h2>
          <p className="mt-3">
            MoneyMoodBoard is reader-funded and ad-funded. We do not accept paid placements, sponsored editorial, or product reviews bought by issuers. Affiliate relationships, where they exist, never determine which products we cover or how we score them.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">2. Sourcing</h2>
          <p className="mt-3">
            Every numeric claim cites a primary source: regulator, government dataset, peer-reviewed study, or issuer-published document. We link these inline and again in the "Key statistics" callouts.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">3. Writing &amp; review workflow</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>Topic brief written against our topical map.</li>
            <li>First draft authored by a named contributor.</li>
            <li>Fact-check pass against primary sources (see our <Link to="/fact-checking-policy" className="text-primary hover:underline">fact-checking policy</Link>).</li>
            <li>Editorial review by Yinka Olayokun, Founder &amp; Editor.</li>
            <li>Quarterly re-review — every guide ships with a "Reviewed by / Reviewed on" stamp.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">4. Corrections</h2>
          <p className="mt-3">
            Material errors are corrected transparently. See our{" "}
            <Link to="/corrections" className="text-primary hover:underline">corrections policy</Link>{" "}
            for how to flag an issue and what we publish when we update.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">5. Methodology</h2>
          <p className="mt-3">
            Numbers in our calculators and scorecards follow a published{" "}
            <Link to="/methodology" className="text-primary hover:underline">methodology</Link>{" "}
            so readers can reproduce every result.
          </p>
        </section>
      </article>

      <AuthorBox />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": absUrl(`${PATH}#page`),
            name: TITLE,
            description: DESC,
            url: absUrl(PATH),
            inLanguage: "en-US",
            isPartOf: { "@id": absUrl("/#website") },
            about: { "@id": absUrl("/#organization") },
            mainContentOfPage: { "@type": "WebPageElement", name: "Editorial Policy" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: "Editorial policy", item: absUrl(PATH) },
            ],
          },
        ]}
      />
    </div>
  );
}
