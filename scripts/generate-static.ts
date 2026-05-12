// Generates a split sitemap (sitemap-index.xml + child sitemaps) and robots.txt
// at build time. Run via tsx so we can import .ts source modules directly.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { pillars } from "../src/lib/pillars";
import { articleBodies } from "../src/lib/articles";
import { comparisons } from "../src/lib/comparisons";
import { personas } from "../src/lib/personas";
import { bestRoundups } from "../src/lib/best-picks";
import { answerPages } from "../src/lib/answers";
import { rulesPages } from "../src/lib/rules";
import { decisionPages } from "../src/lib/decisions";
import { SITE_URL } from "../src/lib/seo";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");

const today = new Date().toISOString().slice(0, 10);

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface Entry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  image?: { loc: string; caption?: string };
}

function urlBlock(u: Entry): string {
  const img = u.image
    ? `\n    <image:image><image:loc>${escapeXml(u.image.loc)}</image:loc>${
        u.image.caption ? `<image:caption>${escapeXml(u.image.caption)}</image:caption>` : ""
      }</image:image>`
    : "";
  return `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>${img}\n  </url>`;
}

function wrap(entries: Entry[]): string {
  const body = entries.map(urlBlock).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
}

const mk = (
  path: string,
  priority = "0.6",
  changefreq = "weekly",
  lastmod = today,
  image?: Entry["image"],
): Entry => ({ loc: `${SITE_URL}${path}`, lastmod, changefreq, priority, image });

const pagesEntries: Entry[] = [
  mk("/", "1.0", "daily"),
  mk("/tools", "0.9", "weekly"),
  mk("/topics", "0.8", "weekly"),
  mk("/glossary", "0.7", "monthly"),
  mk("/about", "0.6", "monthly"),
  mk("/about/yinka-olayokun", "0.6", "monthly"),
  mk("/newsletter", "0.5", "monthly"),
  mk("/contact", "0.4", "monthly"),
  mk("/privacy", "0.3", "yearly"),
  mk("/terms", "0.3", "yearly"),
  mk("/disclaimer", "0.3", "yearly"),
  mk("/editorial-policy", "0.6", "monthly"),
  mk("/fact-checking-policy", "0.6", "monthly"),
  mk("/corrections", "0.5", "monthly"),
  mk("/methodology", "0.6", "monthly"),
];

const toolsEntries: Entry[] = [
  "emergency-fund-calculator",
  "budget-planner",
  "savings-goal-calculator",
  "credit-score-estimator",
  "debt-payoff-calculator",
  "retirement-savings-calculator",
  "credit-card-payoff-calculator",
  "compound-interest-calculator",
].map((slug) => mk(`/tools/${slug}`, "0.8", "monthly"));

const pillarsEntries: Entry[] = pillars.map((p) => mk(`/${p.slug}`, "0.9", "weekly"));

const articlesEntries: Entry[] = [];
for (const p of pillars) {
  for (const c of p.clusters) {
    for (const post of c.posts) {
      const key = `${p.slug}/${post.slug}`;
      const body = articleBodies[key];
      const lastmod = body?.updated ?? today;
      const image = body?.featuredImage
        ? { loc: body.featuredImage, caption: body.featuredImageAlt }
        : undefined;
      articlesEntries.push(mk(`/${key}`, "0.7", "monthly", lastmod, image));
    }
  }
}
for (const cmp of comparisons) {
  articlesEntries.push(mk(`/${cmp.pillar}/vs/${cmp.slug}`, "0.7", "monthly"));
}
for (const ps of personas) {
  articlesEntries.push(mk(`/${ps.pillar}/best-for/${ps.slug}`, "0.6", "monthly"));
}
for (const r of bestRoundups) {
  articlesEntries.push(mk(`/${r.pillar}/best/${r.slug}`, "0.8", "monthly", r.updated));
}
for (const a of answerPages) {
  articlesEntries.push(mk(`/${a.pillar}/answers/${a.slug}`, "0.75", "monthly", a.updated));
}
for (const r of rulesPages) {
  articlesEntries.push(mk(`/${r.pillar}/rules/${r.slug}`, "0.8", "monthly", r.updated));
}
for (const d of decisionPages) {
  articlesEntries.push(mk(`/${d.pillar}/decide/${d.slug}`, "0.7", "monthly", d.updated));
}

function buildIndex(children: string[]): string {
  const items = children
    .map(
      (c) =>
        `  <sitemap>\n    <loc>${escapeXml(`${SITE_URL}/${c}`)}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

function buildRobots(): string {
  return `# MoneyMoodBoard robots.txt
# Independent personal-finance editorial. Crawl freely.

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /drafts/
Disallow: /*?*utm_

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

Sitemap: ${SITE_URL}/sitemap-index.xml
Host: ${SITE_URL.replace(/^https?:\/\//, "")}
`;
}

const publicDir = resolve(projectRoot, "public");
mkdirSync(publicDir, { recursive: true });

writeFileSync(resolve(publicDir, "sitemap-pages.xml"), wrap(pagesEntries));
writeFileSync(resolve(publicDir, "sitemap-pillars.xml"), wrap(pillarsEntries));
writeFileSync(resolve(publicDir, "sitemap-articles.xml"), wrap(articlesEntries));
writeFileSync(resolve(publicDir, "sitemap-tools.xml"), wrap(toolsEntries));
writeFileSync(
  resolve(publicDir, "sitemap-index.xml"),
  buildIndex([
    "sitemap-pages.xml",
    "sitemap-pillars.xml",
    "sitemap-articles.xml",
    "sitemap-tools.xml",
  ]),
);

// Back-compat: keep the old single sitemap.xml as a redirect-style alias to the index
// so any existing GSC references still resolve.
writeFileSync(
  resolve(publicDir, "sitemap.xml"),
  buildIndex([
    "sitemap-pages.xml",
    "sitemap-pillars.xml",
    "sitemap-articles.xml",
    "sitemap-tools.xml",
  ]),
);

writeFileSync(resolve(publicDir, "robots.txt"), buildRobots());
console.log(
  `✓ Generated sitemap-index.xml + 4 child sitemaps (${
    pagesEntries.length + toolsEntries.length + pillarsEntries.length + articlesEntries.length
  } URLs) and robots.txt`,
);
