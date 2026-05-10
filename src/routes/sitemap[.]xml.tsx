import { createFileRoute } from "@tanstack/react-router";
import { pillars } from "@/lib/pillars";
import { SITE_URL } from "@/lib/seo";

const today = new Date().toISOString().slice(0, 10);

function buildXml() {
  const urls: { loc: string; priority: string; changefreq: string }[] = [];
  const add = (
    path: string,
    priority = "0.6",
    changefreq = "weekly",
  ) => urls.push({ loc: `${SITE_URL}${path}`, priority, changefreq });

  add("/", "1.0", "daily");
  add("/tools", "0.9", "weekly");
  add("/about", "0.5", "monthly");
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
  ]) {
    add(`/tools/${slug}`, "0.8", "monthly");
  }

  // Pillars and cluster posts
  for (const p of pillars) {
    add(`/${p.slug}`, "0.9", "weekly");
    for (const c of p.clusters) {
      for (const post of c.posts) {
        add(`/${p.slug}/${post.slug}`, "0.7", "monthly");
      }
    }
  }

  const body = urls
    .map(
      (u) =>
        `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
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
