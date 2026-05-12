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
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
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
      { label: "Avalanche vs Snowball debt method", to: "/debt-taxes-insurance/vs/snowball-vs-avalanche" },
      { label: "How much should you save for retirement?", to: "/retirement/how-much-do-you-need-to-retire" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
  {
    pillar: "debt-taxes-insurance",
    slug: "itemize-or-take-standard-deduction",
    title: "Should I Itemize Deductions or Take the Standard Deduction?",
    metaTitle: "Itemize or Take the Standard Deduction? (2026 Decision Guide) | MoneyMoodBoard",
    metaDescription:
      "When itemizing actually beats the 2026 standard deduction ($15,000 single / $30,000 joint), and the conditions that flip the answer, in plain English.",
    options: [
      { id: "a", label: "Take the standard deduction" },
      { id: "b", label: "Itemize deductions on Schedule A" },
    ],
    recommendation:
      "For about 90% of U.S. filers in 2026, taking the standard deduction wins. Itemize only if your combined deductible expenses (state and local taxes capped at $10,000, mortgage interest, charitable gifts, large unreimbursed medical bills above 7.5% of AGI) clear the standard deduction by at least a few hundred dollars, after factoring the time cost of preparing Schedule A. The big four conditions that flip the answer to itemize: a recent home purchase with a substantial mortgage in a high-tax state, a large charitable year, an expensive medical year, or a casualty loss in a federally declared disaster area.",
    factors: [
      { condition: "2026 standard deduction is $15,000 (single) or $30,000 (married filing jointly)", leansToward: "a", reason: "The bar to beat is high; most renters and low-mortgage homeowners can't clear it." },
      { condition: "You own a home in a high-tax state with mortgage interest of $10,000+", leansToward: "b", reason: "SALT ($10k cap) + mortgage interest alone can exceed the single-filer standard deduction." },
      { condition: "You made a large charitable contribution this year (cash or appreciated stock)", leansToward: "b", reason: "Bunching multiple years of giving into one tax year often pushes total deductions above the standard." },
      { condition: "You had unreimbursed medical expenses above 7.5% of AGI", leansToward: "b", reason: "Only the excess above 7.5% counts, but in a high-bill year it can be significant." },
      { condition: "You're a renter with no mortgage interest and modest charitable giving", leansToward: "a", reason: "Almost impossible to clear the standard deduction without a mortgage or major medical year." },
      { condition: "You file 'married filing separately' and your spouse itemizes", leansToward: "b", reason: "If one spouse itemizes, the other must too, the standard deduction is unavailable." },
    ],
    examples: [
      {
        heading: "Worked example: married couple, $200k income, mortgage in California",
        paragraphs: [
          "SALT (state income + property tax) capped at $10,000. Mortgage interest paid: $14,500. Charitable contributions: $4,200. Total itemized deductions: $28,700.",
          "2026 standard deduction (joint): $30,000. The standard deduction wins by $1,300, even with a substantial mortgage and SALT bill, because the SALT cap and the high standard deduction together push most households below the itemizing threshold.",
          "The same couple, after a $10,000 charitable bunching gift in December: itemized total $38,700 vs standard $30,000. Itemizing now wins by $8,700, in a 24% bracket that's worth roughly $2,088 in tax saved.",
        ],
      },
    ],
    sections: [
      {
        heading: "How the standard deduction got so big",
        paragraphs: [
          "The Tax Cuts and Jobs Act of 2017 nearly doubled the standard deduction and capped state and local tax deductions at $10,000. The combined effect: the share of U.S. filers who itemized fell from roughly 30% to about 10%. For 2026 the standard deduction is approximately $15,000 (single) and $30,000 (married filing jointly), with inflation adjustments scheduled annually.",
          "That high baseline is why most filers, even homeowners in higher-tax states, end up better off with the standard deduction. Itemizing has not disappeared, but it requires a clear reason.",
        ],
      },
      {
        heading: "What you can actually itemize",
        bullets: [
          "State and local taxes (SALT), income or sales tax, plus property tax, capped at $10,000 combined.",
          "Mortgage interest on up to $750,000 of acquisition debt for loans originated after Dec 15, 2017.",
          "Charitable contributions to qualified 501(c)(3) organisations, with documentation.",
          "Unreimbursed medical and dental expenses exceeding 7.5% of AGI.",
          "Casualty and theft losses in federally declared disaster areas.",
          "Investment interest expense, gambling losses up to gambling winnings, and a small set of niche items.",
        ],
      },
      {
        heading: "Bunching: the strategy that revives itemizing",
        paragraphs: [
          "If your itemizable expenses are close to but below the standard deduction every year, 'bunching' two years of charitable giving (or elective medical procedures) into a single tax year can push that year above the threshold while the next year reverts to the standard deduction. A donor-advised fund (DAF) is the standard vehicle: contribute two or three years of giving in one year, take the deduction now, distribute to charities over the next several years.",
        ],
      },
    ],
    faqs: [
      { q: "Can I switch each year?", a: "Yes. Each tax year is independent, you can itemize one year and take the standard deduction the next, whichever is higher." },
      { q: "Does the SALT cap include property tax?", a: "Yes, the $10,000 cap applies to state income (or sales) tax plus property tax combined. In high-tax states the cap is the binding constraint, more SALT exists but isn't deductible." },
      { q: "What about state taxes, do I itemize separately?", a: "Many states use federal AGI as the starting point but allow their own itemized deductions. Some states (e.g. New York) allow you to itemize at the state level even if you take the standard federal deduction. Check your state's rules." },
      { q: "Does my mortgage interest still count if I refinanced?", a: "Yes, but the $750,000 acquisition-debt cap follows the original purchase. A cash-out refinance for non-acquisition purposes (e.g. a swimming pool) doesn't qualify for deduction." },
      { q: "What documentation do I need to itemize?", a: "Keep mortgage Form 1098, property-tax bills, W-2 (state income tax withheld), charitable receipts (written acknowledgement for any single donation $250+), and medical receipts for any year you cross the 7.5% AGI threshold." },
    ],
    internalLinks: [
      { label: "Standard vs Itemized Deduction", to: "/debt-taxes-insurance/standard-vs-itemized-deduction" },
      { label: "Tax Brackets, Explained Simply", to: "/debt-taxes-insurance/tax-brackets-explained-simply" },
      { label: "Most-Missed Deductions", to: "/debt-taxes-insurance/most-missed-deductions" },
      { label: "Debt, Taxes & Insurance pillar", to: "/debt-taxes-insurance" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
];

export function getDecisionPage(pillar: string, slug: string): DecisionPage | undefined {
  return decisionPages.find((d) => d.pillar === pillar && d.slug === slug);
}
