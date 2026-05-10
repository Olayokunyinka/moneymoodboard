import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thanks! We'll be in touch soon.");
    setEmail("");
  };

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
        <Button type="submit">Subscribe Free</Button>
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
          <Button type="submit" variant="secondary" className="font-semibold">
            Subscribe Free
          </Button>
        </form>
        <p className="mt-3 text-xs text-primary-foreground/70">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
