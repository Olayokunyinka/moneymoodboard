// Generates public/sitemap.xml and public/robots.txt at build time.
// Runs as a prebuild step so the files are picked up as static assets.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { register } from "node:module";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");

// Use tsx loader so we can import .ts files directly.
register("tsx/esm", pathToFileURL(projectRoot + "/"));

const { pillars } = await import(pathToFileURL(resolve(projectRoot, "src/lib/pillars.ts")).href);
const { articleBodies } = await import(pathToFileURL(resolve(projectRoot, "src/lib/articles.ts")).href);
const { SITE_URL } = await import(pathToFileURL(resolve(projectRoot, "src/lib/seo.ts")).href);

const today = new Date().toISOString().slice(0, 10);

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemap() {
  const urls = [];
  const add = (path, priority = "0.6", changefreq = "weekly", lastmod = today, image) =>
    urls.push({ loc: `${SITE_URL}${path}`, lastmod, changefreq, priority, image });

  add("/", "1.0", "daily");
  add("/tools", "0.9", "weekly");
  add("/about", "0.6", "monthly");
  add("/about/yinka-olayokun", "0.6", "monthly");
  add("/newsletter", "0.5", "monthly");
  add("/contact", "0.4", "monthly");
  add("/privacy", "0.3", "yearly");
  add("/terms", "0.3", "yearly");
  add("/disclaimer", "0.3", "yearly");

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
            u.image.caption ? `<image:caption>${escapeXml(u.image.caption)}</image:caption>` : ""
          }</image:image>`
        : "";
      return `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>${img}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
}

function buildRobots() {
  return `# MoneyMoodBoard robots.txt
# Independent personal-finance editorial. Crawl freely.

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /drafts/
Disallow: /*?*utm_
Crawl-delay: 1

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: YouBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL.replace(/^https?:\/\//, "")}
`;
}

const publicDir = resolve(projectRoot, "public");
mkdirSync(publicDir, { recursive: true });
writeFileSync(resolve(publicDir, "sitemap.xml"), buildSitemap());
writeFileSync(resolve(publicDir, "robots.txt"), buildRobots());
console.log("✓ Generated public/sitemap.xml and public/robots.txt");
