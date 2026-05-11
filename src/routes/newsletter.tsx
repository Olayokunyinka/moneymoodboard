import { canonical, hreflangLinks } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "Free Weekly Newsletter | MoneyMoodBoard" },
      { name: "description", content: "Practical money tips, new guides and tool launches — delivered weekly. Free." },
      { property: "og:title", content: "Free Weekly Newsletter | MoneyMoodBoard" },
      { property: "og:description", content: "Practical money tips, new guides and tool launches — delivered weekly. Free." },
    ],
    links: [canonical("/newsletter"), ...hreflangLinks("/newsletter")],
  }),
  component: NewsletterPage,
});

function NewsletterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Newsletter" }]} />
      <PageHero
        title="The MoneyMoodBoard Newsletter"
        intro="One short, useful email a week. The best new guide, one practical tip, and any tools we've launched. No spam, no upsell, ever."
      />
      <div className="mt-8 max-w-md">
        <NewsletterCTA variant="compact" />
      </div>
      <ul className="mt-10 space-y-3">
        {[
          "A new finance guide every week, summarised in 2 sentences",
          "One practical tip you can act on in 10 minutes",
          "Early access to every new calculator we launch",
          "No spam. No affiliate-stuffed roundups. Unsubscribe anytime.",
        ].map((line) => (
          <li key={line} className="flex items-start gap-3 text-foreground/85">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
