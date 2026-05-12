import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, type LucideIcon } from "lucide-react";
import type { Pillar, ClusterPost, PillarSlug } from "@/lib/pillars";
import { pillarHeroes, pillarHeroAlts } from "@/lib/pillar-extras";
import { getArticleBody } from "@/lib/articles";
import { PillarTag } from "./PillarTag";

export function PillarCard({ pillar, count }: { pillar: Pillar; count?: number }) {
  const Icon = pillar.icon;
  return (
    <Link
      to={`/${pillar.slug}` as string}
      className={`group flex flex-col h-full rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md ${pillar.borderClass}`}
    >
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${pillar.tagClass}`}>
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{pillar.name}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground flex-1">{pillar.oneLiner}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>{count ?? pillar.clusters.reduce((s, c) => s + c.posts.length, 0)} guides</span>
        <span className="inline-flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
          Explore <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function ArticleCard({
  pillarSlug,
  post,
  href,
}: {
  pillarSlug: PillarSlug;
  post: ClusterPost;
  href?: string;
}) {
  const to = href ?? `/${pillarSlug}/${post.slug}`;
  const body = getArticleBody(pillarSlug, post.slug);
  const imageSrc = body?.featuredImage ?? pillarHeroes[pillarSlug];
  const imageAlt = body?.featuredImageAlt ?? pillarHeroAlts[pillarSlug];
  return (
    <Link
      to={to as string}
      className="group flex flex-col h-full overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
    >
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          width={800}
          height={450}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <PillarTag slug={pillarSlug} asLink={false} />
          <span className="text-xs text-muted-foreground">{post.type}</span>
        </div>
        <h3 className="mt-3 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{post.readMin} min read</span>
        </div>
      </div>
    </Link>
  );
}

export function ToolCard({
  name,
  description,
  icon: Icon,
  href,
  variant = "default",
}: {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  variant?: "default" | "onPrimary";
}) {
  const onPrimary = variant === "onPrimary";
  return (
    <Link
      to={href as string}
      className={
        onPrimary
          ? "group flex flex-col h-full rounded-xl bg-primary-foreground/10 backdrop-blur p-5 border border-primary-foreground/15 hover:bg-primary-foreground/15 transition-colors text-primary-foreground"
          : "group flex flex-col h-full rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
      }
    >
      <div
        className={
          onPrimary
            ? "inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/15"
            : "inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary"
        }
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-3 text-base font-semibold">{name}</h3>
      <p className={`mt-1.5 text-sm flex-1 ${onPrimary ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
        {description}
      </p>
      <span className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${onPrimary ? "" : "text-primary"} group-hover:gap-2 transition-all`}>
        Use Free Tool <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export function ComparisonCard({ cmp }: { cmp: import("@/lib/comparisons").Comparison }) {
  return (
    <Link
      to={`/${cmp.pillar}/vs/${cmp.slug}`}
      className="group flex flex-col h-full rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold bg-violet-100 text-violet-900 dark:bg-violet-900/40 dark:text-violet-100">
          VS
        </span>
      </div>
      <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary">
        {cmp.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">{cmp.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
        Read Comparison <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export function PersonaCard({ persona }: { persona: import("@/lib/personas").Persona }) {
  return (
    <Link
      to={`/${persona.pillar}/best-for/${persona.slug}`}
      className="group flex flex-col h-full rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
          Tailored Advice
        </span>
      </div>
      <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary">
        {persona.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">{persona.profile}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
        View Playbook <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
