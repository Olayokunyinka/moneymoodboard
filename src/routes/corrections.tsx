import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { AuthorBox } from "@/components/site/AuthorBox";
import { absUrl, canonical , hreflangLinks } from "@/lib/seo";

const TITLE = "Corrections Policy, Reporting Errors on MoneyMoodBoard";
const DESC =
  "How MoneyMoodBoard handles material errors: what we update, what we disclose, and how to flag a correction. Plus our actionable-feedback policy.";
const PATH = "/corrections";

export const Route = createFileRoute("/corrections")({
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
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Corrections" }]} />
      <PageHero
        eyebrow={<span className="text-xs font-medium uppercase tracking-wide text-primary">Editorial standards</span>}
        title="Corrections Policy"
        intro="When we get something wrong, we say so. This page documents what counts as a correction, how we publish it, and how to send one in."
      />

      <article className="mt-8 space-y-8 text-foreground/85 leading-7">
        <section>
          <h2 className="text-2xl font-bold text-foreground">What counts as a correction</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>An incorrect figure (limit, rate, deadline, formula result).</li>
            <li>A misattributed statement or source.</li>
            <li>A rule that has changed since publication and materially affects the answer.</li>
            <li>A factual error in a calculator's logic or output.</li>
          </ul>
          <p className="mt-3">
            Typos, broken links, and stylistic updates do not require a public correction note.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">How we publish corrections</h2>
          <p className="mt-3">
            The article is updated with the corrected information, the "Updated" date is refreshed, and, for material changes, a short editor's note describes what was fixed and why. We do not silently overwrite previously published numbers.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">How to flag an error</h2>
          <p className="mt-3">
            Email{" "}
            <a className="text-primary hover:underline" href="mailto:corrections@moneymoodboard.com">
              corrections@moneymoodboard.com
            </a>{" "}
            with the article URL, the passage you believe is wrong, and the primary source you'd cite instead. We acknowledge within two business days and publish or decline within five.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">Actionable feedback</h2>
          <p className="mt-3">
            For non-error feedback (clarity, structure, a missing topic) use{" "}
            <a className="text-primary hover:underline" href="mailto:hello@moneymoodboard.com">
              hello@moneymoodboard.com
            </a>
            . Reader feedback shapes our editorial roadmap.
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
              { "@type": "ListItem", position: 2, name: "Corrections", item: absUrl(PATH) },
            ],
          },
        ]}
      />
    </div>
  );
}
