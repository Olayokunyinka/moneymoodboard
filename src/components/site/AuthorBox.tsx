import { ShieldCheck } from "lucide-react";

export function AuthorBox({
  author = "MoneyMoodBoard Editors",
  bio = "The MoneyMoodBoard editorial team writes plain-English personal finance guides for US readers. Every piece is researched against primary sources and reviewed for accuracy.",
  reviewer = "a certified financial professional",
}: {
  author?: string;
  bio?: string;
  reviewer?: string;
}) {
  return (
    <aside className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-7">
      <div className="flex items-start gap-4">
        <div
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary font-semibold"
        >
          {author
            .split(" ")
            .slice(0, 2)
            .map((w) => w[0])
            .join("")}
        </div>
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          <p className="mt-1 text-sm text-muted-foreground">{bio}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
            <ShieldCheck className="h-4 w-4" /> Reviewed by {reviewer}.
          </p>
        </div>
      </div>
    </aside>
  );
}
