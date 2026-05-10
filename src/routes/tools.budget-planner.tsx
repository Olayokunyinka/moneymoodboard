import { createFileRoute, Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";

const NAME = "Budget Planner";
const DESC = "Drop in your income and we'll split it across needs, wants, savings and debt — based on the budgeting method you pick.";

export const Route = createFileRoute("/tools/budget-planner")({
  head: () => ({
    meta: [
      { title: `${NAME} — Free Tool | MoneyMoodBoard` },
      { name: "description", content: DESC },
      { property: "og:title", content: `${NAME} — Free Tool | MoneyMoodBoard` },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => <ComingSoonTool name={NAME} description={DESC} />,
});

export function ComingSoonTool({ name, description }: { name: string; description: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: name }]} />
      <header className="mt-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{name}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      </header>

      <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
          <Construction className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">Tool launching soon</h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          We're building this calculator now. Subscribe and we'll email you the moment it's live.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Button asChild>
            <Link to="/newsletter">Notify me</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/tools/emergency-fund-calculator">Try our Emergency Fund Calculator</Link>
          </Button>
        </div>
      </div>

      <div className="mt-12 -mx-4 md:-mx-6">
        <NewsletterCTA />
      </div>
    </div>
  );
}
