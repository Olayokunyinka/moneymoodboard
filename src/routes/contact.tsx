import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | MoneyMoodBoard" },
      { name: "description", content: "Get in touch with the MoneyMoodBoard editorial team." },
      { property: "og:title", content: "Contact | MoneyMoodBoard" },
      { property: "og:description", content: "Get in touch with the MoneyMoodBoard editorial team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <PageHero
        title="Contact us"
        intro="Editorial questions, corrections, tips, and partnership enquiries — we read everything that lands in the inbox."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-2xl">
        {[
          { label: "Editorial & corrections", email: "hello@moneymoodboard.com" },
          { label: "Advertising", email: "advertising@moneymoodboard.com" },
        ].map((c) => (
          <a
            key={c.email}
            href={`mailto:${c.email}`}
            className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <p className="mt-3 font-semibold">{c.label}</p>
            <p className="mt-1 text-primary text-sm">{c.email}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
