import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { AuthorBox } from "@/components/site/AuthorBox";
import { absUrl, canonical , hreflangLinks } from "@/lib/seo";

const TITLE = "Fact-Checking Policy — Sourcing & Verification at MoneyMoodBoard";
const DESC =
  "Our verification standards: primary sources only, four-eyes review, dated re-checks, and how we handle changing rules and rates in U.S. personal finance.";
const PATH = "/fact-checking-policy";

export const Route = createFileRoute("/fact-checking-policy")({
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
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Fact-checking policy" }]} />
      <PageHero
        eyebrow={<span className="text-xs font-medium uppercase tracking-wide text-primary">Editorial standards</span>}
        title="Fact-Checking Policy"
        intro="Personal-finance rules change. Contribution limits, tax brackets, deposit-insurance figures, mortgage rules. This is how we keep MoneyMoodBoard accurate."
      />

      <article className="mt-8 space-y-8 text-foreground/85 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-foreground">Primary sources only</h2>
          <p className="mt-3">
            For any number, rule, or limit, the source must be the regulator, statute, agency,
            or issuer that publishes it — IRS, SEC, FDIC, NCUA, CFPB, Federal Reserve, Treasury,
            BLS, or the issuing financial institution. Secondary aggregators are never the citation of record.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">Four-eyes review</h2>
          <p className="mt-3">
            Every numeric claim is checked by a writer and a second editor against the linked
            source. Discrepancies trigger a re-check and, where needed, a correction (see our{" "}
            <Link to="/corrections" className="text-primary hover:underline">corrections policy</Link>).
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">Dated re-checks</h2>
          <p className="mt-3">
            Each article carries a "Reviewed by / Reviewed on" stamp. We re-check rate, limit and rule pages quarterly, and within seven days of any major IRS, SEC or Federal Reserve announcement that materially changes the answer.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">How calculators are validated</h2>
          <p className="mt-3">
            Calculator outputs are unit-tested against worked examples drawn from primary sources. The exact formulas are published in our{" "}
            <Link to="/methodology" className="text-primary hover:underline">methodology</Link>.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">Flag a fact</h2>
          <p className="mt-3">
            If something looks wrong, email <a className="text-primary hover:underline" href="mailto:hello@moneymoodboard.com">hello@moneymoodboard.com</a> with the URL and the source you believe contradicts it. We respond within five business days.
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
              { "@type": "ListItem", position: 2, name: "Fact-checking policy", item: absUrl(PATH) },
            ],
          },
        ]}
      />
    </div>
  );
}
