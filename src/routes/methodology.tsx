import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { AuthorBox } from "@/components/site/AuthorBox";
import { absUrl, canonical , hreflangLinks } from "@/lib/seo";

const TITLE = "Methodology — How MoneyMoodBoard Calculates & Scores";
const DESC =
  "The formulas, assumptions and scorecards behind every MoneyMoodBoard calculator and comparison. Reproducible, source-linked, and reviewed quarterly.";
const PATH = "/methodology";

export const Route = createFileRoute("/methodology")({
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
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Methodology" }]} />
      <PageHero
        eyebrow={<span className="text-xs font-medium uppercase tracking-wide text-primary">Editorial standards</span>}
        title="Methodology"
        intro="This is how we calculate the numbers and score the comparisons you see across MoneyMoodBoard. Every assumption is documented so any reader can reproduce — or challenge — the result."
      />

      <article className="mt-8 space-y-8 text-foreground/85 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-foreground">Calculator formulas</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong>Compound interest:</strong> A = P(1 + r/n)<sup>nt</sup>; periodic contribution variant uses FV<sub>annuity</sub> = PMT × ((1+r/n)<sup>nt</sup>−1) / (r/n).</li>
            <li><strong>Debt payoff (snowball / avalanche):</strong> month-by-month amortisation with the user-selected ordering rule until balance ≤ 0.</li>
            <li><strong>Emergency fund:</strong> target = (essential monthly expenses) × months-of-runway; runway defaults follow CFPB guidance.</li>
            <li><strong>Retirement savings:</strong> Monte-Carlo-free deterministic projection at user-supplied real-return assumption; default real return 5%.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">Assumptions</h2>
          <p className="mt-3">
            We always disclose: contribution frequency, compounding frequency, inflation treatment (nominal vs real), tax treatment, and any rounding step. When an assumption is materially debatable, we offer the alternative side-by-side.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">Comparison scorecards</h2>
          <p className="mt-3">
            Head-to-head pages (e.g. <Link to="/retirement/vs/roth-vs-traditional-ira" className="text-primary hover:underline">Roth vs Traditional IRA</Link>) use a 4–6 row criteria grid. Each row resolves to <em>A wins</em>, <em>B wins</em>, or <em>tie</em>, and the overall verdict is the weighted sum — weighting documented per article.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">Data freshness</h2>
          <p className="mt-3">
            Limit/rate values are reviewed each quarter and within seven days of IRS, SEC, FDIC, NCUA, CFPB, or Federal Reserve announcements that change the answer. See the{" "}
            <Link to="/fact-checking-policy" className="text-primary hover:underline">fact-checking policy</Link> for the full schedule and the{" "}
            <Link to="/corrections" className="text-primary hover:underline">corrections policy</Link> for what happens when something is wrong.
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
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: "Methodology", item: absUrl(PATH) },
            ],
          },
        ]}
      />
    </div>
  );
}
