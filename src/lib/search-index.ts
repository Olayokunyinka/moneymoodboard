import { pillars } from "./pillars";
import { articleBodies } from "./articles";

export type SearchEntry = {
  title: string;
  url: string;
  group: "Tools" | "Guides" | "Pages" | "Articles";
  keywords?: string;
  description?: string;
};

const STATIC_PAGES: SearchEntry[] = [
  { title: "Home", url: "/", group: "Pages" },
  { title: "Free Money Tools", url: "/tools", group: "Pages", keywords: "calculator" },
  { title: "About MoneyMoodBoard", url: "/about", group: "Pages" },
  { title: "About Yinka Olayokun", url: "/about/yinka-olayokun", group: "Pages", keywords: "author editor" },
  { title: "Free Newsletter", url: "/newsletter", group: "Pages" },
  { title: "Contact", url: "/contact", group: "Pages" },
  { title: "Privacy Policy", url: "/privacy", group: "Pages" },
  { title: "Terms of Use", url: "/terms", group: "Pages" },
  { title: "Editorial Disclaimer", url: "/disclaimer", group: "Pages" },
];

const TOOLS: SearchEntry[] = [
  { title: "Emergency Fund Calculator", url: "/tools/emergency-fund-calculator", group: "Tools" },
  { title: "Budget Planner", url: "/tools/budget-planner", group: "Tools" },
  { title: "Savings Goal Calculator", url: "/tools/savings-goal-calculator", group: "Tools" },
  { title: "Credit Score Estimator", url: "/tools/credit-score-estimator", group: "Tools" },
  { title: "Debt Payoff Calculator", url: "/tools/debt-payoff-calculator", group: "Tools", keywords: "avalanche snowball" },
  { title: "Retirement Savings Calculator", url: "/tools/retirement-savings-calculator", group: "Tools" },
  { title: "Credit Card Payoff Calculator", url: "/tools/credit-card-payoff-calculator", group: "Tools" },
  { title: "Compound Interest Calculator", url: "/tools/compound-interest-calculator", group: "Tools", keywords: "investment growth" },
];

function buildPillarEntries(): SearchEntry[] {
  const out: SearchEntry[] = [];
  for (const p of pillars) {
    out.push({ title: `${p.name} Hub`, url: `/${p.slug}`, group: "Guides", keywords: p.oneLiner });
    for (const c of p.clusters) {
      for (const post of c.posts) {
        const key = `${p.slug}/${post.slug}`;
        const body = articleBodies[key];
        // Defensive: skip articles whose body slug doesn't match (prevents stale entries).
        if (!body) continue;
        const summaryWords = body.summary.split(/\s+/).slice(0, 12).join(" ");
        out.push({
          title: post.title,
          url: `/${key}`,
          group: "Articles",
          keywords: `${p.name} ${c.name} ${summaryWords}`,
          description: body.summary,
        });
      }
    }
  }
  return out;
}

export const SEARCH_INDEX: SearchEntry[] = [
  ...TOOLS,
  ...buildPillarEntries(),
  ...STATIC_PAGES,
];
