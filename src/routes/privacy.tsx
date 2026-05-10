import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | MoneyMoodBoard" },
      { name: "description", content: "How MoneyMoodBoard collects, uses and protects your information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Privacy" }]} />
      <PageHero title="Privacy Policy" intro="Last updated: May 2026" />
      <div className="mt-8 space-y-4 text-foreground/85">
        <p>
          MoneyMoodBoard ("we", "us") respects your privacy. This page
          summarises what data we collect, why, and how to opt out.
        </p>
        <h2 className="text-xl font-semibold mt-6">Information we collect</h2>
        <p>Email addresses you submit to our newsletter, and standard server logs and analytics data (pages viewed, country, browser).</p>
        <h2 className="text-xl font-semibold mt-6">Advertising</h2>
        <p>
          We display ads through third-party networks that may use cookies to
          serve personalised ads. You can opt out of personalised advertising
          via your browser settings or industry tools like the NAI opt-out.
        </p>
        <h2 className="text-xl font-semibold mt-6">Your rights</h2>
        <p>You can request deletion of any personal data we hold by emailing privacy@moneymoodboard.com.</p>
      </div>
    </div>
  );
}
