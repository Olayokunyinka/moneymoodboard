/**
 * AdSlot, placeholder container for AdSense ad units.
 * Renders nothing visible in production unless VITE_SHOW_AD_SLOTS is on.
 * Keeps consistent spacing in the article so insertion order is stable.
 */
export function AdSlot({
  location,
  className = "",
}: {
  location:
    | "in-article"
    | "after-quick-answer"
    | "before-faq"
    | "after-author"
    | "anchor"
    | "matched-content";
  className?: string;
}) {
  const debug = import.meta.env.VITE_SHOW_AD_SLOTS === "true";
  return (
    <div
      data-ad-slot={location}
      aria-hidden
      className={
        debug
          ? `my-6 rounded-md border border-dashed border-border bg-muted/40 p-3 text-center text-xs text-muted-foreground ${className}`
          : `my-2 ${className}`
      }
    >
      {debug ? `[ad: ${location}]` : null}
    </div>
  );
}
