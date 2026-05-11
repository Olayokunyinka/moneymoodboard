import { Mail } from "lucide-react";
import { NewsletterCTA } from "./NewsletterCTA";

/**
 * Inline pillar-specific newsletter band. Lives mid-page on pillar hubs.
 * Smaller, lower-key than the full-bleed `<NewsletterCTA />` band.
 */
export function PillarNewsletterBand({ pillarShortName }: { pillarShortName: string }) {
  return (
    <section className="mt-16 rounded-2xl bg-primary-soft p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
            <Mail className="h-3.5 w-3.5" /> {pillarShortName} newsletter
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">
            Get weekly {pillarShortName.toLowerCase()} tips in your inbox
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">
            One short, actionable {pillarShortName.toLowerCase()} email every Sunday. No spam, no fluff — unsubscribe anytime.
          </p>
        </div>
        <NewsletterCTA variant="compact" />
      </div>
    </section>
  );
}
