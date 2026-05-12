import type { PillarSlug } from "./pillars";
import type { AnswerSource } from "./answers";

/**
 * Class C — Rules / limits / by-year pages at /<pillar>/rules/<slug>.
 * Annual refresh keeps the freshness signal high; high-CPC tax + retirement
 * keywords live here.
 */
export interface RulesPage {
  pillar: PillarSlug;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** The taxable / contribution year this page covers. */
  year: number;
  /** When the source numbers were last reconciled with the primary source. */
  lastVerified: string;
  /** 50–80 word direct answer for AEO. */
  shortAnswer: string;
  /** The headline figures rendered as a table. */
  table: {
    caption: string;
    columns: string[];
    rows: string[][];
  };
  /** Notes, gotchas, common questions. */
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
  sources: AnswerSource[];
  internalLinks: { label: string; to: string }[];
  published: string;
  updated: string;
}

export const rulesPages: RulesPage[] = [
  {
    pillar: "retirement",
    slug: "ira-contribution-limits-2026",
    title: "IRA Contribution Limits for 2026",
    metaTitle: "2026 IRA Contribution Limits (Roth & Traditional) | MoneyMoodBoard",
    metaDescription:
      "The 2026 IRA contribution limits for Roth and Traditional accounts, including the over-50 catch-up, income phase-outs, and the deadline to contribute.",
    year: 2026,
    lastVerified: "2026-05-10",
    shortAnswer:
      "For tax year 2026, the IRA contribution limit is $7,000 if you're under 50 and $8,000 if you're 50 or older (the $1,000 catch-up). The limit applies to Roth and Traditional IRAs combined, not each — you can split the $7,000 between them but you can't contribute $7,000 to each. You have until April 15, 2027 to contribute for 2026.",
    table: {
      caption: "2026 IRA limits at a glance",
      columns: ["Item", "2026 limit"],
      rows: [
        ["Standard contribution limit (under 50)", "$7,000"],
        ["Catch-up contribution (50 or older)", "+$1,000 ($8,000 total)"],
        ["Roth IRA income phase-out (single)", "$150,000 – $165,000 MAGI"],
        ["Roth IRA income phase-out (married filing jointly)", "$236,000 – $246,000 MAGI"],
        ["Contribution deadline for 2026", "April 15, 2027"],
      ],
    },
    sections: [
      {
        heading: "How the combined limit works",
        paragraphs: [
          "The $7,000 cap is the most you can put across all of your IRAs in a single tax year. If you contribute $4,000 to a Roth IRA, you can only add $3,000 more to a Traditional IRA that same year. The cap does not apply to employer plans like a 401(k), which have their own separate limit.",
        ],
      },
      {
        heading: "Roth IRA income phase-outs",
        paragraphs: [
          "Once your modified adjusted gross income (MAGI) crosses the phase-out range, your direct Roth contribution shrinks pro-rata to $0. Above the upper bound, direct Roth contributions are not allowed — though a backdoor Roth conversion is usually still available.",
          "Traditional IRA contributions have no income cap to contribute, but the tax deduction phases out at lower income levels if you (or your spouse) are covered by a workplace retirement plan.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I contribute to a 2026 IRA after December 31?",
        a: "Yes. The IRS allows IRA contributions for tax year 2026 until the federal tax-filing deadline, which is April 15, 2027 (or the next business day if it falls on a weekend).",
      },
      {
        q: "Do these limits apply to a SEP-IRA?",
        a: "No — SEP-IRAs are employer-funded and follow a separate, much higher limit tied to compensation (25%, up to a statutory cap). The $7,000 / $8,000 cap is for personal Roth and Traditional IRAs only.",
      },
      {
        q: "What happens if I over-contribute?",
        a: "The IRS charges a 6% excise tax per year on the excess until you withdraw it. The fix is to remove the excess (and any earnings on it) before the tax-filing deadline.",
      },
    ],
    sources: [
      {
        name: "IRS Retirement Topics — IRA Contribution Limits",
        url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-ira-contribution-limits",
        publisher: "Internal Revenue Service",
        verifiedOn: "2026-05-10",
      },
    ],
    internalLinks: [
      { label: "Roth IRA vs Traditional IRA", to: "/retirement/vs/roth-vs-traditional-ira" },
      { label: "Free Retirement Savings Calculator", to: "/tools/retirement-savings-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
  {
    pillar: "retirement",
    slug: "401k-contribution-limits-2026",
    title: "401(k) Contribution Limits for 2026",
    metaTitle: "2026 401(k) Contribution Limits (Employee & Catch-Up)",
    metaDescription:
      "The 2026 401(k) contribution limit, the over-50 catch-up, the new SECURE 2.0 super catch-up for ages 60–63, and the total combined employer-plus-employee cap.",
    year: 2026,
    lastVerified: "2026-05-10",
    shortAnswer:
      "For 2026, the employee 401(k) elective-deferral limit is $24,000, plus a $7,500 catch-up at age 50+ (total $31,500). Workers aged 60–63 get a SECURE 2.0 'super catch-up' of $11,250 instead of $7,500, lifting their max to $35,250. The combined employee-plus-employer cap is $71,000 ($78,500 with the standard catch-up).",
    table: {
      caption: "2026 401(k) limits at a glance",
      columns: ["Item", "2026 limit"],
      rows: [
        ["Employee elective deferral (under 50)", "$24,000"],
        ["Catch-up contribution (50–59 and 64+)", "+$7,500 ($31,500 total)"],
        ["SECURE 2.0 super catch-up (ages 60–63)", "+$11,250 ($35,250 total)"],
        ["Combined employee + employer cap (under 50)", "$71,000"],
        ["Annual compensation limit", "$355,000"],
      ],
    },
    sections: [
      {
        heading: "How the combined cap works",
        paragraphs: [
          "The employee deferral limit ($24,000) is what comes out of your paycheck. The combined cap ($71,000) adds employer matching, profit-sharing, and after-tax employee contributions on top. High-savers in plans that allow the mega-backdoor Roth use the gap between these two numbers.",
          "If you work two jobs, the $24,000 elective limit is per-person across all employers, but the $71,000 combined cap applies per-plan — so it's possible to exceed $71,000 in total contributions across two unrelated employer plans.",
        ],
      },
      {
        heading: "Catch-up gotchas under SECURE 2.0",
        paragraphs: [
          "Starting in 2026, employees earning more than $145,000 (indexed) in the prior year must make catch-up contributions as Roth — pre-tax catch-up is not available at that income level. Lower earners can still choose pre-tax or Roth for the catch-up.",
          "The super catch-up only applies in the year you turn 60, 61, 62, or 63. At age 64 you revert to the standard $7,500 catch-up.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the $24,000 limit include employer match?",
        a: "No — the $24,000 cap is only your own elective deferrals. Employer matching and profit-sharing add on top, subject to the $71,000 combined cap.",
      },
      {
        q: "Can I contribute to a 401(k) and an IRA in the same year?",
        a: "Yes. The 401(k) limit and the IRA limit ($7,000 / $8,000 in 2026) are completely separate, so you can max both in the same tax year.",
      },
      {
        q: "What is the deadline for 2026 401(k) contributions?",
        a: "Employee deferrals must be made through payroll by December 31, 2026 — unlike IRAs, there is no extension into the next tax-filing window for elective deferrals.",
      },
    ],
    sources: [
      {
        name: "IRS Retirement Topics — 401(k) and Profit-Sharing Plan Contribution Limits",
        url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits",
        publisher: "Internal Revenue Service",
        verifiedOn: "2026-05-10",
      },
      {
        name: "SECURE 2.0 Act — Section 109 (Super catch-up)",
        url: "https://www.congress.gov/bill/117th-congress/house-bill/2954",
        publisher: "U.S. Congress",
        verifiedOn: "2026-05-10",
      },
    ],
    internalLinks: [
      { label: "Roth vs Traditional IRA", to: "/retirement/vs/roth-vs-traditional-ira" },
      { label: "IRA contribution limits for 2026", to: "/retirement/rules/ira-contribution-limits-2026" },
      { label: "Free Retirement Savings Calculator", to: "/tools/retirement-savings-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
  {
    pillar: "debt-taxes-insurance",
    slug: "federal-tax-brackets-2026",
    title: "Federal Income Tax Brackets for 2026",
    metaTitle: "2026 Federal Income Tax Brackets (All Filing Statuses)",
    metaDescription:
      "The seven 2026 federal income tax brackets for single, married filing jointly, head of household, and married filing separately — with the dollar thresholds where each rate kicks in.",
    year: 2026,
    lastVerified: "2026-05-10",
    shortAnswer:
      "The U.S. has seven federal income tax brackets for 2026: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. For single filers, the top 37% rate starts at $640,000 of taxable income; for married filing jointly it starts at $768,000. These are marginal rates — only income above each threshold is taxed at the higher rate, so your effective tax rate is always lower than your top bracket.",
    table: {
      caption: "2026 federal income tax brackets (taxable income)",
      columns: ["Rate", "Single", "Married filing jointly", "Head of household"],
      rows: [
        ["10%", "$0 – $12,200", "$0 – $24,400", "$0 – $17,400"],
        ["12%", "$12,200 – $49,600", "$24,400 – $99,200", "$17,400 – $66,400"],
        ["22%", "$49,600 – $105,800", "$99,200 – $211,600", "$66,400 – $105,800"],
        ["24%", "$105,800 – $201,600", "$211,600 – $403,200", "$105,800 – $201,600"],
        ["32%", "$201,600 – $256,000", "$403,200 – $512,000", "$201,600 – $256,000"],
        ["35%", "$256,000 – $640,000", "$512,000 – $768,000", "$256,000 – $640,000"],
        ["37%", "$640,000+", "$768,000+", "$640,000+"],
      ],
    },
    sections: [
      {
        heading: "Marginal vs effective tax rate",
        paragraphs: [
          "Your top bracket only applies to the dollars inside that bracket. A single filer with $100,000 of taxable income pays 10% on the first $12,200, 12% on the next slice, and 22% only on the income above $49,600 — never 22% on the whole $100,000.",
          "The blended (effective) rate for that filer is closer to 16% of taxable income. Use the effective rate, not the marginal one, when comparing to other tax systems.",
        ],
      },
      {
        heading: "What changed for 2026",
        paragraphs: [
          "Each bracket threshold rose roughly 3.5% to reflect inflation adjustments under Code §1(f)(3). The marginal rates themselves are unchanged from the TCJA schedule and remain in effect through tax year 2025 — Congress extended them into 2026 in the 2024 budget reconciliation.",
        ],
      },
    ],
    faqs: [
      {
        q: "What income do the brackets apply to?",
        a: "Taxable income — your gross income minus the standard deduction (or itemized deductions) and above-the-line adjustments. Most W-2 employees subtract the standard deduction from their AGI to get taxable income.",
      },
      {
        q: "Do capital gains use these brackets?",
        a: "No — long-term capital gains have a separate schedule (0%, 15%, 20%). Short-term capital gains (held under 1 year) are taxed as ordinary income at the brackets above.",
      },
      {
        q: "Does Social Security count toward these brackets?",
        a: "Up to 85% of Social Security benefits are taxable as ordinary income once provisional income exceeds the thresholds — and that portion gets taxed at your marginal rate per the table above.",
      },
    ],
    sources: [
      {
        name: "IRS Rev. Proc. 2025-32 — Inflation adjustments for 2026",
        url: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
        publisher: "Internal Revenue Service",
        verifiedOn: "2026-05-10",
      },
      {
        name: "Tax Foundation — 2026 Tax Brackets",
        url: "https://taxfoundation.org/data/all/federal/2026-tax-brackets/",
        publisher: "Tax Foundation",
        verifiedOn: "2026-05-10",
      },
    ],
    internalLinks: [
      { label: "Standard deduction for 2026", to: "/debt-taxes-insurance/rules/standard-deduction-2026" },
      { label: "Itemize or take the standard deduction?", to: "/debt-taxes-insurance/decide/itemize-or-take-standard-deduction" },
      { label: "Free Budget Planner", to: "/tools/budget-planner" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
  {
    pillar: "debt-taxes-insurance",
    slug: "standard-deduction-2026",
    title: "Standard Deduction for 2026",
    metaTitle: "2026 Standard Deduction (Single, MFJ, HoH, Age 65+)",
    metaDescription:
      "The 2026 standard deduction by filing status, plus the additional amount for taxpayers 65+ or blind, and the rules that flip the math toward itemizing instead.",
    year: 2026,
    lastVerified: "2026-05-10",
    shortAnswer:
      "The 2026 standard deduction is $15,750 for single filers, $31,500 for married filing jointly, and $23,625 for head of household. Taxpayers 65 or older or legally blind get an additional $1,650 ($2,050 if unmarried). About 90% of filers take the standard deduction because it exceeds the sum of their itemizable expenses.",
    table: {
      caption: "2026 standard deduction by filing status",
      columns: ["Filing status", "Standard deduction", "Additional (65+ or blind)"],
      rows: [
        ["Single", "$15,750", "+$2,050"],
        ["Married filing jointly", "$31,500", "+$1,650 per qualifying spouse"],
        ["Head of household", "$23,625", "+$2,050"],
        ["Married filing separately", "$15,750", "+$1,650"],
        ["Qualifying surviving spouse", "$31,500", "+$1,650"],
      ],
    },
    sections: [
      {
        heading: "When itemizing beats the standard deduction",
        paragraphs: [
          "Itemizing only wins when your deductible expenses — state and local taxes (capped at $10,000), mortgage interest, charitable contributions, and qualified medical expenses above 7.5% of AGI — add up to more than the standard deduction.",
          "For most households the SALT cap alone makes itemizing a losing proposition: $10,000 of taxes plus a typical mortgage-interest payment rarely clears the $31,500 MFJ standard deduction.",
        ],
      },
      {
        heading: "Bunching strategy for itemizers",
        paragraphs: [
          "Taxpayers near the itemization threshold often 'bunch' two years of charitable giving into a single tax year — pushing one year above the standard deduction and taking it in the alternating year. A donor-advised fund makes this easy without forcing the charity to receive the lump sum.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I take the standard deduction and itemize?",
        a: "No — it's one or the other per tax year. Pick whichever produces the larger deduction.",
      },
      {
        q: "Does the standard deduction reduce my AGI?",
        a: "No — the standard deduction is subtracted from AGI to compute taxable income. AGI itself is fixed by your income and above-the-line adjustments (IRA contributions, HSA, student-loan interest).",
      },
      {
        q: "Do dependents get a standard deduction?",
        a: "Yes, but it's limited. For 2026, a dependent's standard deduction is the greater of $1,400 or their earned income plus $450, capped at the regular standard deduction ($15,750).",
      },
    ],
    sources: [
      {
        name: "IRS Rev. Proc. 2025-32 — Inflation adjustments for 2026",
        url: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
        publisher: "Internal Revenue Service",
        verifiedOn: "2026-05-10",
      },
      {
        name: "IRS Publication 501 — Standard Deduction",
        url: "https://www.irs.gov/publications/p501",
        publisher: "Internal Revenue Service",
        verifiedOn: "2026-05-10",
      },
    ],
    internalLinks: [
      { label: "Federal tax brackets for 2026", to: "/debt-taxes-insurance/rules/federal-tax-brackets-2026" },
      { label: "Itemize or take the standard deduction?", to: "/debt-taxes-insurance/decide/itemize-or-take-standard-deduction" },
      { label: "Free Budget Planner", to: "/tools/budget-planner" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
  {
    pillar: "retirement",
    slug: "rmd-rules-2026",
    title: "Required Minimum Distribution (RMD) Rules for 2026",
    metaTitle: "2026 RMD Rules: Ages, Amounts, Deadlines | MoneyMoodBoard",
    metaDescription:
      "The 2026 Required Minimum Distribution rules — current RMD age (73), how to calculate the amount, the December 31 deadline, and the 25% penalty for missing one.",
    year: 2026,
    lastVerified: "2026-05-10",
    shortAnswer:
      "For 2026, Required Minimum Distributions begin in the year you turn 73 (rising to 75 in 2033 under SECURE 2.0). The amount equals your prior-year December 31 IRA or 401(k) balance divided by the IRS Uniform Lifetime Table factor for your age (26.5 at age 73). The first RMD can be delayed until April 1 of the year after you turn 73; every subsequent RMD must come out by December 31. Missing one triggers a 25% excise tax (10% if corrected within two years).",
    table: {
      caption: "2026 RMD age and Uniform Lifetime Table factors",
      columns: ["Age in 2026", "Lifetime Table factor", "RMD on $500k balance"],
      rows: [
        ["73 (RMDs begin)", "26.5", "$18,868"],
        ["75", "24.6", "$20,325"],
        ["80", "20.2", "$24,752"],
        ["85", "16.0", "$31,250"],
        ["90", "12.2", "$40,984"],
      ],
    },
    sections: [
      {
        heading: "Which accounts require an RMD",
        paragraphs: [
          "Traditional IRAs, SEP-IRAs, SIMPLE IRAs, and 401(k)/403(b) plans all require RMDs starting at 73. Roth IRAs do not require RMDs during the original owner's lifetime. Roth 401(k)s no longer require RMDs starting in 2024 under SECURE 2.0 — a meaningful change from prior years.",
          "If you have multiple Traditional IRAs you can compute an RMD for each but withdraw the total from any one (or combination). 401(k) RMDs must be taken from each plan separately — they cannot be combined.",
        ],
      },
      {
        heading: "The penalty for missing an RMD",
        paragraphs: [
          "SECURE 2.0 cut the missed-RMD penalty from 50% to 25%, and to 10% if the shortfall is corrected within two years. File Form 5329 with a written explanation to request a waiver — the IRS routinely grants it for first-time mistakes.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I have to take an RMD if I'm still working?",
        a: "If you're still working at the company sponsoring your 401(k) and own less than 5% of it, you can defer that plan's RMD until you retire. IRA RMDs can never be deferred for the working exception.",
      },
      {
        q: "Can I reinvest an RMD into a Roth IRA?",
        a: "Not directly — RMDs cannot be rolled over. But once the RMD is in your bank account, you can use those dollars to fund a separate Roth IRA contribution if you have eligible earned income and are within the income limits.",
      },
      {
        q: "What is a Qualified Charitable Distribution (QCD)?",
        a: "Starting at age 70½, you can transfer up to $108,000 (2026 limit) directly from a Traditional IRA to a qualified charity. The QCD counts toward your RMD and is excluded from taxable income — often the most tax-efficient way to give if you don't itemize.",
      },
    ],
    sources: [
      {
        name: "IRS — Retirement Topics: Required Minimum Distributions",
        url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-required-minimum-distributions-rmds",
        publisher: "Internal Revenue Service",
        verifiedOn: "2026-05-10",
      },
      {
        name: "IRS Publication 590-B — Distributions from IRAs",
        url: "https://www.irs.gov/publications/p590b",
        publisher: "Internal Revenue Service",
        verifiedOn: "2026-05-10",
      },
    ],
    internalLinks: [
      { label: "IRA contribution limits for 2026", to: "/retirement/rules/ira-contribution-limits-2026" },
      { label: "401(k) contribution limits for 2026", to: "/retirement/rules/401k-contribution-limits-2026" },
      { label: "Free Retirement Savings Calculator", to: "/tools/retirement-savings-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
  {
    pillar: "debt-taxes-insurance",
    slug: "hsa-limits-2026",
    title: "HSA Contribution Limits for 2026",
    metaTitle: "2026 HSA Contribution Limits (Self & Family)",
    metaDescription:
      "The 2026 HSA contribution limits for self-only and family HDHP coverage, the over-55 catch-up, the HDHP minimum deductible and out-of-pocket maximum.",
    year: 2026,
    lastVerified: "2026-05-10",
    shortAnswer:
      "For 2026, the HSA contribution limit is $4,400 for self-only HDHP coverage and $8,750 for family coverage. Account holders aged 55+ can add a $1,000 catch-up. To contribute, you must be enrolled in an HSA-eligible HDHP with a minimum deductible of $1,700 self-only or $3,400 family, and an out-of-pocket maximum no higher than $8,500 self-only or $17,000 family.",
    table: {
      caption: "2026 HSA limits at a glance",
      columns: ["Item", "Self-only", "Family"],
      rows: [
        ["Annual contribution limit", "$4,400", "$8,750"],
        ["Catch-up (age 55+)", "+$1,000", "+$1,000 per spouse with own HSA"],
        ["HDHP minimum deductible", "$1,700", "$3,400"],
        ["HDHP max out-of-pocket", "$8,500", "$17,000"],
        ["Contribution deadline", "April 15, 2027", "April 15, 2027"],
      ],
    },
    sections: [
      {
        heading: "Why the HSA is the most tax-advantaged account in the code",
        paragraphs: [
          "An HSA is the only account with a triple tax advantage: contributions are pre-tax (or above-the-line deductible), growth is tax-free, and withdrawals for qualified medical expenses are tax-free. No other account — including the Roth IRA — combines all three.",
          "After age 65, HSA withdrawals for non-medical expenses are taxed as ordinary income (no penalty), making the account function like a Traditional IRA. Used for medical expenses at any age, the withdrawal stays tax-free forever.",
        ],
      },
      {
        heading: "Spouse + family-coverage gotchas",
        paragraphs: [
          "Married couples with family HDHP coverage share the $8,750 family limit but can split it however they choose between two HSAs. Each spouse 55+ adds a $1,000 catch-up only to an HSA in their own name — a single joint account doesn't allow two catch-ups.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I contribute to an HSA if I'm on Medicare?",
        a: "No — once enrolled in Medicare (typically age 65), HSA contributions must stop, even if you're still working. You can keep using the existing HSA balance for qualified medical expenses, including Medicare premiums.",
      },
      {
        q: "What counts as a qualified medical expense?",
        a: "Most out-of-pocket medical, dental, vision, and prescription costs, plus Medicare premiums (after 65) and qualified long-term care insurance premiums. Cosmetic procedures and over-the-counter items without a prescription generally don't qualify (with exceptions added under the CARES Act).",
      },
      {
        q: "Can I invest my HSA balance?",
        a: "Yes — most HSA custodians let you invest balances above a small cash threshold (often $1,000) in mutual funds or ETFs. Long-term investors typically pay current medical expenses out of pocket and let the HSA grow as a stealth retirement account.",
      },
    ],
    sources: [
      {
        name: "IRS Rev. Proc. 2025-19 — 2026 HSA inflation adjustments",
        url: "https://www.irs.gov/pub/irs-drop/rp-25-19.pdf",
        publisher: "Internal Revenue Service",
        verifiedOn: "2026-05-10",
      },
      {
        name: "IRS Publication 969 — HSAs and other tax-favored health plans",
        url: "https://www.irs.gov/publications/p969",
        publisher: "Internal Revenue Service",
        verifiedOn: "2026-05-10",
      },
    ],
    internalLinks: [
      { label: "Federal income tax brackets for 2026", to: "/debt-taxes-insurance/rules/federal-tax-brackets-2026" },
      { label: "IRA contribution limits for 2026", to: "/retirement/rules/ira-contribution-limits-2026" },
      { label: "Free Retirement Savings Calculator", to: "/tools/retirement-savings-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
  {
    pillar: "saving",
    slug: "i-bond-rates-2026",
    title: "I Bond Rates for 2026",
    metaTitle: "2026 I Bond Rates (Composite, Fixed, Inflation)",
    metaDescription:
      "The current Series I savings bond rate, how the composite rate is built from a fixed and an inflation component, the $10,000 annual purchase cap, and the holding rules.",
    year: 2026,
    lastVerified: "2026-05-10",
    shortAnswer:
      "The current Series I savings bond composite rate (May 2026 issue) is roughly 3.10%, made up of a 1.20% fixed rate and a 1.90% annualized inflation component. Rates reset every six months (May 1 and November 1). Each individual can buy up to $10,000 of electronic I bonds per calendar year through TreasuryDirect, plus up to $5,000 in paper I bonds via a federal tax refund.",
    table: {
      caption: "2026 I bond rate snapshot (May 2026 issue)",
      columns: ["Component", "Rate"],
      rows: [
        ["Composite rate (annualized)", "~3.10%"],
        ["Fixed rate (locked for the bond's 30-year life)", "1.20%"],
        ["Inflation rate (annualized, resets every 6 months)", "1.90%"],
        ["Annual purchase limit (electronic, per person)", "$10,000"],
        ["Additional via tax refund (paper)", "$5,000"],
      ],
    },
    sections: [
      {
        heading: "How the composite rate is built",
        paragraphs: [
          "The composite rate combines a fixed rate (set when you buy and locked for the bond's full 30-year life) with a semi-annual inflation rate based on CPI-U. Treasury announces the new fixed and inflation components on May 1 and November 1.",
          "The fixed portion is what makes a current vintage attractive for long holds — bonds bought when the fixed rate is high keep that rate forever, regardless of where inflation moves later.",
        ],
      },
      {
        heading: "Holding rules and tax treatment",
        paragraphs: [
          "I bonds must be held at least 12 months. Redeeming between 1 and 5 years forfeits the most recent 3 months of interest. After 5 years, no penalty. Interest is exempt from state and local tax, and federal tax can be deferred until redemption (or used tax-free for qualified higher-education expenses, subject to income limits).",
        ],
      },
    ],
    faqs: [
      {
        q: "Are I bonds better than a high-yield savings account?",
        a: "It depends on the spread. When the I bond composite rate exceeds top HYSA rates by 50+ bps, I bonds usually win for money you can lock up at least a year. When HYSAs are higher, the savings account is simpler — and you keep liquidity.",
      },
      {
        q: "Can I buy more than $10,000 a year?",
        a: "Each Social Security number gets the $10,000 electronic limit, plus the $5,000 paper-via-refund route. A trust or a child can have its own TreasuryDirect account with separate limits — couples often use these to multiply household capacity.",
      },
      {
        q: "What happens if I sell before 5 years?",
        a: "You forfeit the last 3 months of interest. Even with the penalty, returns usually still beat a savings account if you held at least 18 months at a reasonable composite rate.",
      },
    ],
    sources: [
      {
        name: "TreasuryDirect — I Bond rate announcements",
        url: "https://www.treasurydirect.gov/savings-bonds/i-bonds/i-bonds-interest-rates/",
        publisher: "U.S. Department of the Treasury",
        verifiedOn: "2026-05-10",
      },
      {
        name: "TreasuryDirect — I Bond purchase limits",
        url: "https://www.treasurydirect.gov/savings-bonds/i-bonds/",
        publisher: "U.S. Department of the Treasury",
        verifiedOn: "2026-05-10",
      },
    ],
    internalLinks: [
      { label: "Best high-yield savings accounts for 2026", to: "/saving/best/high-yield-savings-2026" },
      { label: "CDs vs T-Bills — which to use", to: "/saving/vs/cds-vs-t-bills" },
      { label: "Free Savings Goal Calculator", to: "/tools/savings-goal-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
  {
    pillar: "investing",
    slug: "529-plan-rules-by-state",
    title: "529 Plan Rules by State (2026)",
    metaTitle: "529 Plan Rules by State 2026 — Deductions, Limits, Rollovers",
    metaDescription:
      "State-by-state 529 plan rules for 2026: which states give a deduction or credit for contributions, the lifetime contribution cap, and which honor the new Roth-IRA rollover under SECURE 2.0.",
    year: 2026,
    lastVerified: "2026-05-10",
    shortAnswer:
      "529 plans are state-sponsored education savings accounts. Federally, contributions grow tax-free for qualified expenses, the annual gift-tax exclusion is $19,000 per donor per beneficiary in 2026, and SECURE 2.0 allows up to $35,000 of unused 529 funds (held 15+ years) to roll over to the beneficiary's Roth IRA. State rules differ sharply — 34 states plus DC offer a deduction or credit for contributions, while nine states have no income tax (so no deduction). Lifetime contribution caps run from $235,000 to $575,000 depending on the state.",
    table: {
      caption: "State income-tax treatment of 529 contributions (2026)",
      columns: ["State", "Deduction or credit", "Annual cap (single)", "In-state plan only?"],
      rows: [
        ["California", "None", "—", "—"],
        ["Colorado", "Full deduction", "Unlimited (income-capped)", "Yes"],
        ["Florida", "No state income tax", "—", "—"],
        ["Georgia", "Deduction", "$4,000", "Yes"],
        ["Illinois", "Deduction", "$10,000", "Yes"],
        ["Indiana", "20% credit", "$1,500 credit (on $7,500)", "Yes"],
        ["Massachusetts", "Deduction", "$1,000", "Yes"],
        ["Michigan", "Deduction", "$5,000", "Yes"],
        ["New York", "Deduction", "$5,000", "Yes"],
        ["Pennsylvania", "Deduction", "$19,000 (gift-tax limit)", "No (any state's 529)"],
        ["Texas", "No state income tax", "—", "—"],
        ["Utah", "5% credit", "$117 credit (on $2,340)", "Yes"],
        ["Virginia", "Deduction", "$4,000 per account", "Yes"],
        ["Washington", "No state income tax", "—", "—"],
      ],
    },
    sections: [
      {
        heading: "Federal rules that apply everywhere",
        paragraphs: [
          "Earnings inside a 529 grow federal-tax-free, and withdrawals for qualified higher-education expenses (tuition, room and board, required fees, books, and up to $10,000/year of K–12 tuition) are also federal-tax-free.",
          "Non-qualified withdrawals trigger ordinary income tax plus a 10% penalty on the earnings portion only — your contributions always come out tax- and penalty-free.",
          "Under SECURE 2.0, beneficiaries can roll over up to $35,000 lifetime from a 529 (open at least 15 years) to a Roth IRA in their own name, subject to the annual IRA contribution limit and a five-year wait after any new contribution.",
        ],
      },
      {
        heading: "How to choose between your home state's 529 and an out-of-state plan",
        paragraphs: [
          "If your state offers a deduction or credit only for in-state plans (most do), the tax break usually outweighs lower fees elsewhere — at least up to the deductible amount. Above that threshold, an out-of-state plan with lower expense ratios (Utah, Nevada, New York direct) often becomes the better choice.",
          "Pennsylvania, Arizona, Kansas, Maine, Minnesota, Missouri, Montana, and Ohio give the deduction regardless of which state's plan you use — in those states, always pick the lowest-fee plan nationally.",
        ],
      },
      {
        heading: "Gift-tax superfunding",
        paragraphs: [
          "529 contributions count as gifts. The 2026 annual exclusion is $19,000 per donor per beneficiary, but a special rule lets you front-load five years of contributions in a single year ($95,000 single / $190,000 MFJ) without using lifetime gift-tax exemption — provided you file Form 709 and make no further gifts to that beneficiary for five years.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can grandparents open a 529 for a grandchild?",
        a: "Yes — and starting with the 2024–25 FAFSA, grandparent-owned 529 distributions no longer count as student income, removing the historical financial-aid penalty.",
      },
      {
        q: "What happens to leftover 529 funds if my child doesn't use them?",
        a: "You can change the beneficiary to another family member (sibling, niece, nephew, yourself), use up to $10,000 lifetime to pay down student loans, roll up to $35,000 into the beneficiary's Roth IRA over time, or withdraw non-qualified and pay tax plus the 10% penalty on earnings.",
      },
      {
        q: "Are 529 contribution limits federal or per-state?",
        a: "Per-state. Each state sets a lifetime maximum (the highest balance the account can hold) ranging from $235,000 to $575,000. Once the cap is reached, no further contributions are allowed — but earnings can keep compounding above it.",
      },
    ],
    sources: [
      {
        name: "IRS Publication 970 — Tax Benefits for Education",
        url: "https://www.irs.gov/publications/p970",
        publisher: "Internal Revenue Service",
        verifiedOn: "2026-05-10",
      },
      {
        name: "Saving for College — State-by-state 529 tax benefits",
        url: "https://www.savingforcollege.com/article/how-much-is-your-states-529-plan-tax-deduction-really-worth",
        publisher: "Saving For College, LLC",
        verifiedOn: "2026-05-10",
      },
      {
        name: "SECURE 2.0 Act — Section 126 (529-to-Roth rollover)",
        url: "https://www.congress.gov/bill/117th-congress/house-bill/2954",
        publisher: "U.S. Congress",
        verifiedOn: "2026-05-10",
      },
    ],
    internalLinks: [
      { label: "Roth IRA vs Traditional IRA", to: "/retirement/vs/roth-vs-traditional-ira" },
      { label: "Best brokerage accounts for beginners", to: "/investing/best/brokerage-for-beginners" },
      { label: "Free Compound Interest Calculator", to: "/tools/compound-interest-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
  {
    pillar: "credit-cards",
    slug: "credit-card-laws-2026",
    title: "U.S. Credit Card Laws and Consumer Protections (2026)",
    metaTitle: "Credit Card Laws 2026 — CARD Act, Reg Z, Late Fees | MoneyMoodBoard",
    metaDescription:
      "The federal credit card laws in force for 2026 — CARD Act protections, Regulation Z disclosures, the CFPB late-fee rule, and the state-by-state rules on merchant surcharges.",
    year: 2026,
    lastVerified: "2026-05-10",
    shortAnswer:
      "U.S. credit cards are governed federally by the CARD Act of 2009, Truth in Lending (Regulation Z), and the Fair Credit Billing Act. For 2026, key protections include 21-day minimum billing cycles, 45-day notice before rate increases, no rate hike on existing balances except for 60+ day delinquency, and a $32 cap on first-time late fees (with a separate CFPB $8 cap currently stayed in litigation). Merchant surcharges are legal federally but banned or capped in California, Colorado, Connecticut, Maine, Massachusetts, and Oklahoma.",
    table: {
      caption: "Key 2026 federal credit-card protections",
      columns: ["Rule", "Source", "What it requires"],
      rows: [
        ["21-day grace period", "CARD Act §163", "Issuers must mail statements at least 21 days before the payment due date."],
        ["45-day rate-change notice", "CARD Act §171; Reg Z §1026.9(c)", "Issuers must give 45 days' notice before raising APR or fees on a new account."],
        ["No retroactive rate hikes", "CARD Act §171", "Existing balance rates can only rise after 60+ days delinquent or after a promo period ends as disclosed."],
        ["Late fee cap (first-time)", "Reg Z §1026.52(b)(1)(ii)", "$32 in 2026 (annually indexed; $43 for repeat late within 6 billing cycles)."],
        ["Penalty APR rules", "CARD Act §172", "Penalty APR cannot apply to existing balances unless 60+ days late; must be reviewed every 6 months."],
        ["Right to dispute charges", "FCBA §161", "60-day window to dispute a billing error in writing; issuer must investigate within 90 days."],
        ["No fees > 25% of credit limit (Year 1)", "CARD Act §127(n)", "Total non-penalty fees in the first year cannot exceed 25% of the initial credit limit."],
      ],
    },
    sections: [
      {
        heading: "What changed for 2026",
        paragraphs: [
          "The CFPB's March 2024 rule lowering the safe-harbor late fee from $32 to $8 was stayed by the Northern District of Texas in May 2024 and remains in litigation. As of May 2026 the $32 cap (indexed) is the operative number, but a final ruling could revive the $8 cap retroactively.",
          "Several states updated surcharge laws. New York's 2.4% net-effective cap took effect in February 2024, and similar transparency rules now apply in Massachusetts and Connecticut. The federal position remains that surcharges are permitted, but disclosure standards differ by state.",
        ],
      },
      {
        heading: "How disputes work in practice",
        paragraphs: [
          "Under the Fair Credit Billing Act you have 60 days from the statement date to file a written dispute. The issuer must acknowledge within 30 days and resolve within 90. During the investigation you cannot be charged interest or fees on the disputed amount, and the issuer cannot report it as delinquent.",
          "Chargeback rights under Visa, Mastercard, Amex, and Discover network rules are broader — typically 120 days from the transaction or expected delivery date — and cover defective merchandise, services not rendered, and unauthorized transactions even outside the FCBA window.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can a credit card company close my account without warning?",
        a: "Yes — issuers can close any account at any time, and federal law does not require prior notice. They must, however, send notice within a reasonable time after closure and continue to honor the existing balance under the original APR until paid off.",
      },
      {
        q: "Are universal default clauses still legal?",
        a: "No. The CARD Act eliminated 'universal default' — issuers can no longer raise your APR on an existing card just because you missed a payment on an unrelated account.",
      },
      {
        q: "What's the difference between a surcharge and a convenience fee?",
        a: "A surcharge is added when you pay by credit card specifically. A convenience fee is charged for using a non-standard payment channel (e.g. paying by phone) regardless of payment type. Surcharges are regulated by the rules above; convenience fees are largely unregulated federally but must be disclosed.",
      },
    ],
    sources: [
      {
        name: "Credit CARD Act of 2009 — Public Law 111-24",
        url: "https://www.congress.gov/bill/111th-congress/house-bill/627",
        publisher: "U.S. Congress",
        verifiedOn: "2026-05-10",
      },
      {
        name: "CFPB — Credit card rules and regulations",
        url: "https://www.consumerfinance.gov/rules-policy/regulations/1026/",
        publisher: "Consumer Financial Protection Bureau",
        verifiedOn: "2026-05-10",
      },
      {
        name: "Federal Reserve — Regulation Z (Truth in Lending)",
        url: "https://www.federalreserve.gov/supervisionreg/regzcg.htm",
        publisher: "Board of Governors of the Federal Reserve System",
        verifiedOn: "2026-05-10",
      },
    ],
    internalLinks: [
      { label: "Cashback vs travel rewards cards", to: "/credit-cards/vs/cashback-vs-travel-rewards" },
      { label: "Best zero-APR balance transfer cards 2026", to: "/credit-cards/best/zero-apr-balance-transfer-2026" },
      { label: "Free Credit Card Payoff Calculator", to: "/tools/credit-card-payoff-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
  {
    pillar: "banking",
    slug: "fdic-ncua-coverage-2026",
    title: "FDIC and NCUA Deposit Insurance Coverage (2026)",
    metaTitle: "FDIC & NCUA Coverage 2026 — Limits, Joint Accounts, Trusts",
    metaDescription:
      "How FDIC bank insurance and NCUA credit-union insurance work in 2026: the $250,000 standard limit, how joint and trust accounts multiply coverage, and what's not covered.",
    year: 2026,
    lastVerified: "2026-05-10",
    shortAnswer:
      "FDIC (banks) and NCUA (federal credit unions) both insure deposits up to $250,000 per depositor, per insured institution, per ownership category. A married couple with one joint account and two single-name accounts at the same bank can be covered for up to $1,000,000 ($250k single each + $250k each on the joint). Revocable trust accounts add $250,000 per beneficiary up to five beneficiaries. Coverage is identical at FDIC banks and NCUA credit unions — neither covers stocks, bonds, mutual funds, life insurance, or crypto.",
    table: {
      caption: "FDIC / NCUA coverage by ownership category (2026)",
      columns: ["Ownership category", "Coverage limit", "Example"],
      rows: [
        ["Single (individual)", "$250,000 per owner", "One person, one bank — $250k insured."],
        ["Joint (two or more owners)", "$250,000 per co-owner", "Couple's joint account — $500k insured."],
        ["Revocable trust / POD", "$250,000 per beneficiary (max 5)", "Trust naming 4 beneficiaries — up to $1,000,000 insured."],
        ["Irrevocable trust", "$250,000 per beneficiary's interest", "Coverage depends on the trust structure."],
        ["IRA / certain retirement accounts", "$250,000 separately from non-IRA", "IRA at the same bank gets its own $250k bucket."],
        ["Employee benefit plan", "$250,000 per participant's interest", "Plan with 100 participants — up to $25M insured."],
        ["Government accounts", "$250,000 per official custodian", "Municipal deposits insured separately."],
      ],
    },
    sections: [
      {
        heading: "How to get more than $250,000 of coverage at a single bank",
        paragraphs: [
          "Coverage stacks across ownership categories — not across accounts in the same category. Two single-name savings accounts at the same bank still share one $250k limit. But a single account, a joint account with a spouse, and an IRA at the same bank are three separate categories worth $250k each.",
          "For deposits well above $1M, use a network like IntraFi (formerly CDARS / ICS) — it splits your money across dozens of FDIC banks while you deal with one statement. The full balance stays insured because each slice sits under $250k at each bank.",
        ],
      },
      {
        heading: "What FDIC and NCUA do not cover",
        paragraphs: [
          "Neither covers losses on investment products even when bought at the bank: stocks, bonds, mutual funds, ETFs, annuities, life insurance, Treasury securities held in a brokerage, and crypto. Brokerage accounts are protected separately by SIPC up to $500,000 ($250,000 cash) — but SIPC covers loss from broker failure, not market losses.",
          "Safe-deposit-box contents are not insured by FDIC. Coverage for those depends on your bank's own policy and any rider on your homeowners insurance.",
        ],
      },
      {
        heading: "FDIC vs NCUA — practical differences",
        paragraphs: [
          "Both are federal agencies, both use the $250,000 limit, and both have never failed to make insured depositors whole. The main difference is who they cover: FDIC covers banks and savings associations; NCUA's Share Insurance Fund covers federal credit unions and most state-chartered ones. A handful of state-chartered credit unions use private insurance instead — confirm with the institution before opening.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is FDIC coverage automatic?",
        a: "Yes — every deposit at an FDIC-insured bank is automatically insured up to the limit. You don't apply, opt-in, or pay anything for it.",
      },
      {
        q: "Are joint accounts insured for $500,000 or $250,000?",
        a: "$500,000 — the limit is $250,000 per co-owner, and a typical joint account has two owners. Add a third owner and it climbs to $750,000.",
      },
      {
        q: "Does FDIC insurance cover money in a fintech app like Cash App or Chime?",
        a: "Indirectly. Fintechs are not banks; they hold customer balances at FDIC-insured partner banks. Pass-through coverage applies only if recordkeeping is correct — the 2024 Synapse collapse exposed gaps in this model. Verify the partner bank and read the fintech's deposit-account agreement.",
      },
    ],
    sources: [
      {
        name: "FDIC — Deposit Insurance FAQs",
        url: "https://www.fdic.gov/resources/deposit-insurance/faq/",
        publisher: "Federal Deposit Insurance Corporation",
        verifiedOn: "2026-05-10",
      },
      {
        name: "FDIC EDIE — Electronic Deposit Insurance Estimator",
        url: "https://edie.fdic.gov/",
        publisher: "Federal Deposit Insurance Corporation",
        verifiedOn: "2026-05-10",
      },
      {
        name: "NCUA — Share Insurance Coverage",
        url: "https://www.ncua.gov/support-services/share-insurance-fund",
        publisher: "National Credit Union Administration",
        verifiedOn: "2026-05-10",
      },
    ],
    internalLinks: [
      { label: "Best high-yield savings accounts for 2026", to: "/saving/best/high-yield-savings-2026" },
      { label: "Online bank vs credit union", to: "/banking/vs/online-bank-vs-credit-union" },
      { label: "Free Emergency Fund Calculator", to: "/tools/emergency-fund-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
];

export function getRulesPage(pillar: string, slug: string): RulesPage | undefined {
  return rulesPages.find((r) => r.pillar === pillar && r.slug === slug);
}
