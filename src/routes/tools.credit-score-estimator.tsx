import { createFileRoute, Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";

const NAME = "Credit Score Estimator";
const DESC = "Estimate your FICO range from a few quick inputs — utilization, payment history, account age and credit mix.";

export const Route = createFileRoute("/tools/credit-score-estimator")({
  head: () => ({
    meta: [
      { title: `${NAME} — Free Tool | MoneyMoodBoard` },
      { name: "description", content: DESC },
      { property: "og:title", content: `${NAME} — Free Tool | MoneyMoodBoard` },
      { property: "og:description", content: DESC },
    ],
  }),
  component: CreditScoreStub,
});

function CreditScoreStub() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: NAME }]} />
      <header className="mt-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{NAME}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{DESC}</p>
      </header>
      <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
          <Construction className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">Tool launching soon</h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">Subscribe and we'll email you the moment it's live.</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Button asChild><Link to="/newsletter">Notify me</Link></Button>
          <Button asChild variant="outline"><Link to="/credit-cards">Read the Credit Cards guide</Link></Button>
        </div>
      </div>
      <div className="mt-12 -mx-4 md:-mx-6"><NewsletterCTA /></div>
    </div>
  );
}
