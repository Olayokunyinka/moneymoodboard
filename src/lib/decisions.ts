import type { PillarSlug } from "./pillars";

/**
 * Class D, Decision-tree / scenario pages at /<pillar>/decide/<slug>.
 * Long-tail conversational queries ("Should I X or Y?"), exactly how LLMs
 * receive prompts. Each page commits to a recommendation but shows the
 * factors that would change it.
 */
export interface DecisionFactor {
  /** A user condition that nudges the answer one way or the other. */
  condition: string;
  leansToward: "a" | "b" | "either";
  reason: string;
}

export interface DecisionPage {
  pillar: PillarSlug;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** The two (or three) options being compared. */
  options: { id: "a" | "b" | "c"; label: string }[];
  /** 50–80 word default recommendation with the conditions that flip it. */
  recommendation: string;
  /** Factors that change the answer, rendered as a decision-tree table. */
  factors: DecisionFactor[];
  /** Optional worked example. */
  examples?: { heading: string; paragraphs: string[] }[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
  internalLinks: { label: string; to: string }[];
  published: string;
  updated: string;
}

export const decisionPages: DecisionPage[] = [
  {
    pillar: "investing",
    slug: "pay-off-mortgage-or-invest",
    title: "Should I Pay Off My Mortgage Early or Invest the Money?",
    metaTitle: "Pay Off Mortgage Early or Invest? (2026 Decision Guide) | MoneyMoodBoard",
    metaDescription:
      "The math, tax angle, and behavioral honesty on whether to pay down a mortgage early or invest the extra cash, with the conditions that flip the answer.",
    options: [
      { id: "a", label: "Pay off the mortgage early" },
      { id: "b", label: "Invest the extra money" },
    ],
    recommendation:
      "If your mortgage rate is below 5% and you have at least 15 years left on the loan, investing the extra money in a diversified stock index fund has historically beaten the guaranteed return of prepayment. Flip the answer if your rate is above 6%, you're within 10 years of retirement, or carrying the mortgage stresses you out, peace of mind has a real return.",
    factors: [
      { condition: "Mortgage rate below 5%", leansToward: "b", reason: "Long-run stock returns (≈7% real) clear this hurdle with room to spare." },
      { condition: "Mortgage rate above 6%", leansToward: "a", reason: "The guaranteed after-tax return from prepayment competes hard with equity returns." },
      { condition: "Within 10 years of retirement", leansToward: "a", reason: "Entering retirement debt-free shrinks the income you need to generate." },
      { condition: "401(k) match not yet maxed", leansToward: "b", reason: "An employer match is an instant 50–100% return, beats any mortgage rate." },
      { condition: "No emergency fund", leansToward: "either", reason: "Build 3–6 months of expenses first; only then choose between A and B." },
      { condition: "Loan was originated at 7%+ with PMI", leansToward: "a", reason: "Prepayment that eliminates PMI is a hidden double-digit return." },
    ],
    examples: [
      {
        heading: "Worked example: $250k mortgage at 3.5%, 25 years left, $500/mo extra",
        paragraphs: [
          "Option A, apply the $500/month to the mortgage: you finish the loan 8.5 years early and save about $52,000 in interest. Effective return: 3.5% guaranteed.",
          "Option B, invest the $500/month in an S&P 500 index fund at a 7% real return for the same 25 years: you end up with roughly $381,000 in today's dollars while still owing $0 on the mortgage at the original payoff date.",
          "Pure math favors B by about $329,000. The case for A is psychological, and that case is legitimate, just not financial.",
        ],
      },
    ],
    sections: [
      {
        heading: "Why the math usually favors investing",
        paragraphs: [
          "A 30-year mortgage at 3.5% is one of the cheapest sources of money any private citizen can access. Compared to the long-run real return of the S&P 500 (≈7%), the spread is roughly 3.5 percentage points per year, compounded over decades, that's a six-figure swing on a typical loan.",
          "The math gets weaker as the mortgage rate climbs. At 6%, the spread is closer to 1 point and the volatility of the market starts to outweigh the slim advantage.",
        ],
      },
      {
        heading: "Why the math isn't everything",
        paragraphs: [
          "Behavioral finance research (Shefrin, Statman, Kahneman) shows that the certainty of a paid-off house produces measurably lower financial anxiety than a portfolio of equal size. If holding the mortgage will push you to sell stocks in a downturn, the math advantage disappears.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the mortgage interest deduction change the answer?",
        a: "For most homeowners after the 2017 tax law it doesn't, about 90% of filers take the standard deduction and never benefit from mortgage interest. If you do itemize, knock 20–30% off the effective mortgage rate when you compare.",
      },
      {
        q: "What if I split the difference?",
        a: "Many people do half-and-half, extra to the mortgage and extra to investments. It rarely optimizes the math but it captures most of the psychological benefit of A and most of the return of B.",
      },
      {
        q: "Does this apply to a HELOC or second mortgage?",
        a: "No, HELOCs are usually variable-rate and currently sit well above 7%. Pay those down before considering either A or B above.",
      },
    ],
    internalLinks: [
      { label: "Free Compound Interest Calculator", to: "/tools/compound-interest-calculator" },
      { label: "Avalanche vs Snowball debt method", to: "/credit-cards/vs/snowball-vs-avalanche" },
      { label: "How much should you save for retirement?", to: "/retirement/how-much-do-you-need-to-retire" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
];

export function getDecisionPage(pillar: string, slug: string): DecisionPage | undefined {
  return decisionPages.find((d) => d.pillar === pillar && d.slug === slug);
}
