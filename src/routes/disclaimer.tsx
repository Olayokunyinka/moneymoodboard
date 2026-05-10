import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Editorial Disclaimer | MoneyMoodBoard" },
      { name: "description", content: "MoneyMoodBoard is for informational purposes only and is not financial, legal or tax advice." },
    ],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Disclaimer" }]} />
      <PageHero title="Editorial Disclaimer" intro="A short note on what MoneyMoodBoard is — and isn't." />
      <div className="mt-8 space-y-4 text-foreground/85">
        <p>
          The information on MoneyMoodBoard is provided for general educational
          purposes only. It is not financial advice, legal advice, or tax
          advice, and it does not take your personal circumstances into
          account.
        </p>
        <p>
          For decisions about your specific situation, consult a qualified
          financial planner, accountant, or attorney licensed in your
          jurisdiction.
        </p>
        <p>
          We strive for accuracy and update guides regularly, but financial
          products and laws change frequently. Always verify current rates,
          terms and rules with the relevant institution before acting.
        </p>
      </div>
    </div>
  );
}
