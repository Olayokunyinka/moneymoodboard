import { createFileRoute } from "@tanstack/react-router";
import { pillars } from "@/lib/pillars";
import { articleBodies } from "@/lib/articles";
import { SITE_URL } from "@/lib/seo";

const today = new Date().toISOString().slice(0, 10);

interface Entry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  image?: { loc: string; caption?: string };
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildXml(): string {
  const urls: Entry[] = [];
  const add = (
    path: string,
    priority = "0.6",
    changefreq = "weekly",
    lastmod = today,
    image?: Entry["image"],
  ) =>
    urls.push({
      loc: `${SITE_URL}${path}`,
      lastmod,
      changefreq,
      priority,
      image,
    });

  // Core pages
  add("/", "1.0", "daily");
  add("/tools", "0.9", "weekly");
  add("/about", "0.6", "monthly");
  add("/about/yinka-olayokun", "0.6", "monthly");
  add("/newsletter", "0.5", "monthly");
  add("/contact", "0.4", "monthly");
  add("/privacy", "0.3", "yearly");
  add("/terms", "0.3", "yearly");
  add("/disclaimer", "0.3", "yearly");

  // Tools
  for (const slug of [
    "emergency-fund-calculator",
    "budget-planner",
    "savings-goal-calculator",
    "credit-score-estimator",
    "debt-payoff-calculator",
    "retirement-savings-calculator",
    "credit-card-payoff-calculator",
    "compound-interest-calculator",
  ]) {
    add(`/tools/${slug}`, "0.8", "monthly");
  }

  // Pillars and cluster posts
  for (const p of pillars) {
    add(`/${p.slug}`, "0.9", "weekly");
    for (const c of p.clusters) {
      for (const post of c.posts) {
        const key = `${p.slug}/${post.slug}`;
        const body = articleBodies[key];
        const lastmod = body?.updated ?? today;
        const image = body?.featuredImage
          ? { loc: body.featuredImage, caption: body.featuredImageAlt }
          : undefined;
        add(`/${key}`, "0.7", "monthly", lastmod, image);
      }
    }
  }

  const body = urls
    .map((u) => {
      const img = u.image
        ? `\n    <image:image><image:loc>${escapeXml(u.image.loc)}</image:loc>${
            u.image.caption
              ? `<image:caption>${escapeXml(u.image.caption)}</image:caption>`
              : ""
          }</image:image>`
        : "";
      return `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>${img}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildXml(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
