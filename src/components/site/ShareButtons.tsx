import { Link2, Facebook, Twitter, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ShareButtons({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined"
      ? window.location.origin + path
      : `https://moneymoodboard.com${path}`;

  const tw = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  const cls =
    "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors";

  return (
    <div className="flex items-center gap-2" aria-label="Share this article">
      <span className="text-xs uppercase tracking-wide text-muted-foreground mr-1">
        Share
      </span>
      <a className={cls} href={tw} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        <Twitter className="h-4 w-4" />
      </a>
      <a className={cls} href={fb} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
        <Facebook className="h-4 w-4" />
      </a>
      <button type="button" onClick={onCopy} className={cls} aria-label="Copy link">
        {copied ? <Check className="h-4 w-4 text-primary" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
