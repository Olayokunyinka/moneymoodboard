import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import yinkaPhoto from "@/assets/yinka-olayokun.jpg";

export function AuthorBox({
  author = "Yinka Olayokun",
  bio = "Founder of MoneyMoodBoard. Digital strategist and financial-literacy nerd writing plain-English money guides for people managing real life — variable income, debt, and big goals.",
  avatarSrc = yinkaPhoto,
}: {
  author?: string;
  bio?: string;
  avatarSrc?: string;
}) {
  return (
    <aside className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-7">
      <div className="flex items-start gap-4">
        <Link
          to="/about/yinka-olayokun"
          aria-label={`Read more about ${author}`}
          className="shrink-0"
        >
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={`${author}, Founder & Editor of MoneyMoodBoard`}
              width={56}
              height={56}
              loading="lazy"
              className="h-14 w-14 rounded-full object-cover transition-opacity hover:opacity-90"
            />
          ) : (
            <div
              aria-hidden
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary font-semibold"
            >
              {author
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </div>
          )}
        </Link>
        <div>
          <Link
            to="/about/yinka-olayokun"
            className="font-semibold text-foreground hover:text-primary hover:underline"
          >
            {author}
          </Link>
          <p className="text-xs uppercase tracking-wide text-primary mt-0.5">
            Founder & Editor
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{bio}</p>
          <Link
            to="/about/yinka-olayokun"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Read author profile <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
