import type { PillarSlug } from "./pillars";

/**
 * Class B, Numeric / Question-with-direct-answer pages at /<pillar>/answers/<slug>.
 * Designed to win AI Overviews and featured snippets: a 50–80 word boxed answer
 * up top, then methodology, examples, and a sources block.
 */
export interface AnswerSource {
  name: string;
  url: string;
  publisher: string;
  /** YYYY-MM-DD when the cited number was confirmed. */
  verifiedOn: string;
}

export interface AnswerPage {
  pillar: PillarSlug;
  slug: string;
  /** The exact long-tail question, e.g. "How much is $100,000 invested for 30 years?" */
  question: string;
  metaTitle: string;
  metaDescription: string;
  /** 50–80 word direct answer, copy/pasted into FAQ + speakable schema. */
  shortAnswer: string;
  /** Optional table for ranges, scenarios, brackets. */
  table?: {
    caption: string;
    columns: string[];
    rows: string[][];
  };
  /** Long-form explanation in 2–4 H2 sections. */
  sections: { heading: string; paragraphs: string[] }[];
  /** 3–5 follow-up FAQs. */
  faqs: { q: string; a: string }[];
  /** Authoritative primary sources cited inline. */
  sources: AnswerSource[];
  internalLinks: { label: string; to: string }[];
  published: string;
  updated: string;
}

export const answerPages: AnswerPage[] = [
  {
    pillar: "investing",
    slug: "how-much-is-100k-invested-30-years",
    question: "How much is $100,000 invested for 30 years?",
    metaTitle: "How Much Is $100,000 Invested for 30 Years? (2026 Math) | MoneyMoodBoard",
    metaDescription:
      "What $100,000 grows to over 30 years at realistic stock-market returns, with the exact compounding math, three return scenarios, and the inflation-adjusted answer.",
    shortAnswer:
      "$100,000 invested for 30 years grows to roughly $432,000 at a conservative 5% real return, $761,000 at the S&P 500's long-run 7% real average, and $1.32 million at a 9% nominal return (about $574,000 in today's dollars after 2.5% inflation). The single biggest lever is staying invested for the full 30 years.",
    table: {
      caption: "$100,000 lump sum, no further contributions",
      columns: ["Annual return", "Value after 30 years", "Multiple of starting amount"],
      rows: [
        ["5% (conservative / bond-heavy)", "$432,194", "4.3×"],
        ["7% (S&P 500 real return, long-run)", "$761,225", "7.6×"],
        ["9% (S&P 500 nominal, long-run)", "$1,326,768", "13.3×"],
        ["10% (top-decile decade)", "$1,744,940", "17.4×"],
      ],
    },
    sections: [
      {
        heading: "The math",
        paragraphs: [
          "The formula is the compound-interest equation: FV = PV × (1 + r)^n, where PV is your $100,000 starting balance, r is your annual return, and n is the number of years (30). Plug in 7% and you get $100,000 × (1.07)^30 = $761,225.",
          "These numbers assume no additional contributions, no withdrawals, and all dividends reinvested. They also assume an annual compounding cadence, daily or monthly compounding shifts the answer by less than 1% over 30 years.",
        ],
      },
      {
        heading: "Real vs nominal returns",
        paragraphs: [
          "Nominal returns are the headline numbers you see on a brokerage statement. Real returns subtract inflation, so they tell you how much more you can actually buy 30 years from now. The S&P 500 has delivered roughly 9.8% nominal and 7% real over the long run (Federal Reserve / NYU Stern).",
          "If you want a buying-power answer, use 7%. If you want the brokerage-statement answer in 2056, use 9–10% but expect a dollar in 2056 to be worth roughly 48 cents in 2026 terms (assuming 2.5% inflation).",
        ],
      },
    ],
    faqs: [
      {
        q: "What if I add $500 a month for 30 years?",
        a: "At 7% real return, the $100,000 lump sum plus $500/month for 30 years grows to roughly $1,374,000 in today's dollars. The monthly contributions add about $613,000 of the total.",
      },
      {
        q: "Is 7% a realistic return?",
        a: "Yes, but only as a 30-year average. The S&P 500's real return since 1928 is roughly 7%. Individual 10-year stretches can deliver anywhere from -3% to +15% annualized. The 30-year horizon is what brings the variance down.",
      },
      {
        q: "Should I keep $100k all in stocks for 30 years?",
        a: "If the horizon is genuinely 30 years and you won't sell during a crash, a 100% stock allocation has historically beaten every other mix. Shorter horizons or weaker stomachs are the reason most investors blend in bonds.",
      },
    ],
    sources: [
      {
        name: "S&P 500 historical returns (1928–present)",
        url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html",
        publisher: "NYU Stern (Aswath Damodaran)",
        verifiedOn: "2026-04-30",
      },
      {
        name: "CPI inflation calculator",
        url: "https://www.bls.gov/data/inflation_calculator.htm",
        publisher: "U.S. Bureau of Labor Statistics",
        verifiedOn: "2026-04-30",
      },
    ],
    internalLinks: [
      { label: "Compound Interest Calculator (free, no signup)", to: "/tools/compound-interest-calculator" },
      { label: "What is dollar-cost averaging?", to: "/investing/what-is-dollar-cost-averaging" },
      { label: "Index funds vs target-date funds", to: "/investing/vs/index-funds-vs-target-date" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
  {
    pillar: "retirement",
    slug: "how-much-to-retire-at-55",
    question: "How much do you need to retire at 55?",
    metaTitle: "How Much Do You Need to Retire at 55? (2026 Math) | MoneyMoodBoard",
    metaDescription:
      "The portfolio size, ACA bridge math, and Rule of 55 / 72(t) access strategies for retiring at 55, with three spending scenarios and the early-withdrawal rules that flip them.",
    shortAnswer:
      "To retire at 55, most U.S. households need a portfolio of roughly 28–33× their planned annual spending, meaningfully more than the classic 25× rule because the money has to last 35–40 years and bridge to age 59½ (penalty-free 401(k)/IRA access) and 65 (Medicare). For a $60,000-a-year lifestyle, that's roughly $1.7M to $2.0M, plus a separate plan for ACA health insurance and either a Rule-of-55 401(k) or a 72(t) SEPP to avoid the 10% early-withdrawal penalty.",
    table: {
      caption: "Portfolio needed to retire at 55, by spending level",
      columns: ["Annual spending", "30× target (conservative)", "Implied withdrawal year 1"],
      rows: [
        ["$40,000", "$1,200,000", "$40,000 (3.3%)"],
        ["$60,000", "$1,800,000", "$60,000 (3.3%)"],
        ["$80,000", "$2,400,000", "$80,000 (3.3%)"],
        ["$100,000", "$3,000,000", "$100,000 (3.3%)"],
        ["$120,000", "$3,600,000", "$120,000 (3.3%)"],
      ],
    },
    sections: [
      {
        heading: "Why retiring at 55 needs more than 25× spending",
        paragraphs: [
          "The classic 4% rule (25× spending) was modeled on a 30-year retirement starting at age 65. A 55-year-old retiring today needs the portfolio to last 35–40 years, and the longer horizon raises sequence-of-returns risk. Most modern Monte Carlo simulations show 3.0–3.3% as the sustainable initial withdrawal rate at 35+ years, which is why the table above uses 30× rather than 25×.",
          "On top of that, you have a 4½-year gap between 55 and 59½ when most retirement accounts are off-limits without penalty, and a 10-year gap to 65 (Medicare) when you'll likely buy ACA marketplace health coverage. Both gaps cost real money.",
        ],
      },
      {
        heading: "How to access money before 59½ without the 10% penalty",
        paragraphs: [
          "Three paths exist. The Rule of 55 lets you take penalty-free distributions from the 401(k) of the employer you separated from in or after the year you turned 55 (does not apply to old 401(k)s rolled into IRAs). A 72(t) SEPP (Substantially Equal Periodic Payments) lets you take a calculated stream from any IRA penalty-free, but the schedule must run at least 5 years or until 59½, whichever is longer, without changes. A taxable brokerage account avoids the question entirely: capital gains and qualified dividends are taxed but never penalized regardless of age.",
          "Most early retirees combine: Rule of 55 from the most recent 401(k), a taxable brokerage for flexibility, and a Roth IRA for tax-free withdrawals of contributions (always penalty-free) and earnings (after 59½ and 5 years).",
        ],
      },
      {
        heading: "The ACA health-insurance bridge",
        paragraphs: [
          "Pre-Medicare health insurance is the single most underestimated cost in early retirement. ACA premiums for a 55-year-old non-smoker average $700–$900/month at full price, but premium tax credits can cut that to $0–$300/month if you keep modified adjusted gross income below 400% of the federal poverty line (~$60k single, ~$82k couple in 2026). Retirees often deliberately realize taxable income up to that threshold and live off Roth or basis withdrawals above it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I retire at 55 with $1 million?",
        a: "Yes if you can live on roughly $33,000–$36,000/year (a 3.3–3.6% withdrawal) and you have a viable health-insurance plan until Medicare. That's tight in most U.S. metros but workable in lower-cost areas, especially with paid-off housing.",
      },
      {
        q: "How does Social Security factor in?",
        a: "Social Security can begin at 62, with the full amount at your full retirement age (66–67) and the maximum at 70. Most retire-at-55 plans assume Social Security starts at 67–70 and treat it as upside that reduces required portfolio withdrawals later, not as core income.",
      },
      {
        q: "What's the biggest mistake people make retiring at 55?",
        a: "Underestimating health insurance and overestimating returns. Plans built on 7%+ returns and Medicare-priced healthcare often fail; plans built on 4–5% real returns and full ACA premiums almost always survive.",
      },
    ],
    sources: [
      {
        name: "IRS Retirement Topics, Exceptions to Tax on Early Distributions (Rule of 55, 72(t))",
        url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-tax-on-early-distributions",
        publisher: "Internal Revenue Service",
        verifiedOn: "2026-05-10",
      },
      {
        name: "Healthcare.gov, Premium Tax Credit",
        url: "https://www.healthcare.gov/glossary/premium-tax-credit/",
        publisher: "U.S. Centers for Medicare & Medicaid Services",
        verifiedOn: "2026-05-10",
      },
      {
        name: "Trinity Study update / Bengen 4% rule research",
        url: "https://www.aaii.com/journal/article/sustainable-withdrawals-the-4-rule",
        publisher: "AAII Journal",
        verifiedOn: "2026-05-10",
      },
    ],
    internalLinks: [
      { label: "How much do you need to retire?", to: "/retirement/how-much-do-you-need-to-retire" },
      { label: "Roth IRA vs Traditional IRA", to: "/retirement/vs/roth-vs-traditional-ira" },
      { label: "Free Retirement Savings Calculator", to: "/tools/retirement-savings-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
];

export function getAnswerPage(pillar: string, slug: string): AnswerPage | undefined {
  return answerPages.find((a) => a.pillar === pillar && a.slug === slug);
}
