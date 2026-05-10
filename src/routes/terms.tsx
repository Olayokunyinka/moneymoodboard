import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | MoneyMoodBoard" },
      { name: "description", content: "The terms governing your use of MoneyMoodBoard." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Terms" }]} />
      <PageHero title="Terms of Use" intro="Last updated: May 2026" />
      <div className="mt-8 space-y-4 text-foreground/85">
        <p>By accessing MoneyMoodBoard, you agree to these terms.</p>
        <h2 className="text-xl font-semibold mt-6">Use of content</h2>
        <p>You may share our articles with attribution and a link back. You may not republish full articles without written permission.</p>
        <h2 className="text-xl font-semibold mt-6">No warranty</h2>
        <p>Content is provided "as is" without warranty of any kind. We are not liable for decisions you make based on our content.</p>
      </div>
    </div>
  );
}
