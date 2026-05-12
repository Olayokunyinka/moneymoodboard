import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SubmittedState = null | { kind: "new" | "already"; email: string };

export function NewsletterCTA({
  variant = "band",
  headline = "Get Weekly Money Tips Straight to Your Inbox",
  subcopy = "Join thousands of readers getting practical finance advice every week. Free.",
}: {
  variant?: "band" | "compact";
  headline?: string;
  subcopy?: string;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<SubmittedState>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/public/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error || "Could not subscribe. Please try again.");
        return;
      }
      const savedEmail = email;
      if (data.alreadySubscribed) {
        toast.success("You're already on the list.");
        setSubmitted({ kind: "already", email: savedEmail });
      } else {
        toast.success("You're subscribed.");
        setSubmitted({ kind: "new", email: savedEmail });
      }
      setEmail("");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => setSubmitted(null);

  if (submitted) {
    const isAlready = submitted.kind === "already";
    const title = isAlready ? "You're already on the list." : "You're subscribed!";
    const body = isAlready
      ? `${submitted.email} is already saved, no action needed.`
      : `We've saved ${submitted.email}. Look out for your first email this Sunday.`;

    if (variant === "compact") {
      return (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary-soft p-4 max-w-md"
        >
          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-semibold text-foreground">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      );
    }

    return (
      <section className="bg-primary text-primary-foreground">
        <div
          role="status"
          aria-live="polite"
          className="mx-auto max-w-4xl px-4 md:px-6 py-14 text-center"
        >
          <CheckCircle2
            className="mx-auto h-12 w-12 text-primary-foreground"
            aria-hidden="true"
          />
          <h2 className="mt-4 text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-3 text-primary-foreground/85 max-w-2xl mx-auto">{body}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 text-sm font-medium text-primary-foreground/90 underline underline-offset-4 hover:text-primary-foreground"
          >
            Subscribe another email
          </button>
        </div>
      </section>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md">
        <Input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <Button type="submit" disabled={loading}>{loading ? "Subscribing…" : "Subscribe Free"}</Button>
      </form>
    );
  }

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-14 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{headline}</h2>
        <p className="mt-3 text-primary-foreground/85 max-w-2xl mx-auto">{subcopy}</p>
        <form
          onSubmit={submit}
          className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <Input
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            className="bg-primary-foreground text-foreground placeholder:text-muted-foreground"
          />
          <Button type="submit" variant="secondary" className="font-semibold" disabled={loading}>
            {loading ? "Subscribing…" : "Subscribe Free"}
          </Button>
        </form>
        <p className="mt-3 text-xs text-primary-foreground/70">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
