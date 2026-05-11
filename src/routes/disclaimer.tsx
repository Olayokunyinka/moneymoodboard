import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { TableOfContents } from "@/components/site/TableOfContents";
import { absUrl, canonical } from "@/lib/seo";

const LAST_UPDATED = "May 11, 2026";
const PATH = "/disclaimer";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Editorial Disclaimer | MoneyMoodBoard" },
      { name: "description", content: "MoneyMoodBoard publishes general financial education only. This page sets out our editorial standards, sources, advertising and affiliate disclosures, and the limits of what our content can do for you." },
      { property: "og:title", content: "Editorial Disclaimer | MoneyMoodBoard" },
      { property: "og:description", content: "Editorial standards, sources, and advertising/affiliate disclosures." },
    ],
    links: [canonical(PATH)],
  }),
  component: DisclaimerPage,
});

const SECTIONS = [
  "Educational content only — not advice",
  "Sources and methodology",
  "Advertising and affiliate disclosure",
  "Sponsored content",
  "Accuracy and corrections",
  "Forward-looking statements",
  "Regulatory note for non-US readers",
  "Reporting an error",
];

function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Disclaimer" }]} />
      <PageHero
        title="Editorial Disclaimer"
        intro={`MoneyMoodBoard exists to make personal finance easier to understand. This page explains the limits of what our content can — and cannot — do for you, plus how we research, fund and correct our work. Last updated: ${LAST_UPDATED}.`}
      />

      <TableOfContents sections={SECTIONS} />

      <div className="mt-10 space-y-10 text-foreground/85 leading-relaxed">
        <section id="educational-content-only-not-advice" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Educational content only — not advice</h2>
          <p className="mt-3">All articles, calculators and other content on MoneyMoodBoard are provided for general educational purposes only. They are <strong>not</strong> financial, investment, tax, accounting, legal or insurance advice, and they do not take your personal circumstances, objectives, risk tolerance or jurisdiction into account.</p>
          <p className="mt-3">MoneyMoodBoard is not a registered investment adviser, broker-dealer, certified financial planner, tax preparer, accountant, attorney or insurance broker, and we do not act as a fiduciary to you. Before acting on anything you read here, consult a qualified, appropriately licensed professional in your jurisdiction.</p>
        </section>

        <section id="sources-and-methodology" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Sources and methodology</h2>
          <p className="mt-3">We research every guide against primary sources first — for example regulators (SEC, CFPB, FCA, ESMA), official statistics (Federal Reserve, Bureau of Labor Statistics, Office for National Statistics), the IRS and HMRC, and peer-reviewed academic research. Where we cite a statistic, we link to the underlying source so you can verify it.</p>
          <p className="mt-3">Calculator outputs are deterministic projections based on the inputs you provide and assumptions stated on each tool page. They are illustrative, not predictive — actual results depend on real-world variables we cannot model.</p>
        </section>

        <section id="advertising-and-affiliate-disclosure" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Advertising and affiliate disclosure</h2>
          <p className="mt-3">MoneyMoodBoard is funded by display advertising and, in some cases, affiliate commissions earned when readers click links to financial products and complete a qualifying action. This disclosure is made in compliance with the U.S. Federal Trade Commission's Endorsement Guides (16 CFR Part 255), the UK CAP Code and ASA guidance, and the EU Unfair Commercial Practices Directive.</p>
          <p className="mt-3">Affiliate compensation never determines whether a product is covered, how it is rated or where it appears in a comparison. If a product is poor, we say so. If a better unaffiliated alternative exists, we name it.</p>
        </section>

        <section id="sponsored-content" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Sponsored content</h2>
          <p className="mt-3">Where a piece of content has been paid for by a third party, it will be clearly labelled "Sponsored" or "In partnership with" at the top of the article. Sponsors do not have editorial control or pre-publication review of our coverage of their products elsewhere on the site.</p>
        </section>

        <section id="accuracy-and-corrections" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Accuracy and corrections</h2>
          <p className="mt-3">We review every pillar guide at least once per quarter for changes in law, regulation, contribution limits, interest rates and product availability. Despite our care, financial information dates quickly and we sometimes get things wrong.</p>
          <p className="mt-3">If we publish a material error, we (a) correct the article, (b) add a dated correction note at the top, and (c) update the "last reviewed" timestamp. We do not silently rewrite the historical record.</p>
        </section>

        <section id="forward-looking-statements" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Forward-looking statements</h2>
          <p className="mt-3">Some of our content discusses future returns, contribution limits, interest-rate paths or tax thresholds. These are estimates based on currently available information and reasonable assumptions. They are not guarantees, and actual outcomes may differ materially.</p>
        </section>

        <section id="regulatory-note-for-non-us-readers" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Regulatory note for non-US readers</h2>
          <p className="mt-3">MoneyMoodBoard is published from outside the United Kingdom and the European Economic Area. We are not authorised or regulated by the UK Financial Conduct Authority (FCA), and our content does not constitute a financial promotion under section 21 of the Financial Services and Markets Act 2000. Nothing on this site constitutes investment advice within the meaning of MiFID II or any equivalent EU/EEA law. UK and EEA residents seeking regulated advice should consult an FCA-authorised adviser or a locally authorised equivalent.</p>
        </section>

        <section id="reporting-an-error" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Reporting an error</h2>
          <p className="mt-3">Spotted something wrong, out of date, or misleading? Email <a href="mailto:hello@moneymoodboard.com" className="text-primary hover:underline">hello@moneymoodboard.com</a> with the URL and a short description. We aim to acknowledge corrections within two business days.</p>
        </section>
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Editorial Disclaimer",
            url: absUrl(PATH),
            description: "Editorial standards, sources and advertising disclosures for MoneyMoodBoard.",
            inLanguage: "en-US",
            dateModified: "2026-05-11",
          },
        ]}
      />
    </div>
  );
}
