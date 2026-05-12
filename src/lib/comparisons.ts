import type { PillarSlug } from "./pillars";

/**
 * Head-to-head comparison pages live at /<pillar>/vs/<slug>.
 * They satisfy comparison search intent ("X vs Y") that gets buried inside
 * regular guide articles. Each record drives a full page: intro, criteria,
 * verdict, persona block, FAQ, schema.
 */
export interface ComparisonCriterion {
  /** Short label for the row (e.g. "Tax treatment"). */
  name: string;
  /** What option A looks like on this dimension. */
  a: string;
  /** What option B looks like on this dimension. */
  b: string;
  /** "a" | "b" | "tie", drives the at-a-glance scorecard. */
  winner: "a" | "b" | "tie";
}

export interface ComparisonOption {
  name: string;
  /** One-sentence definition for screen readers + glossary. */
  oneLiner: string;
  /** Wikidata / Wikipedia URLs, fed into ItemList schema. */
  sameAs?: string[];
}

export interface Comparison {
  pillar: PillarSlug;
  slug: string; // unique within pillar, e.g. "roth-vs-traditional-ira"
  title: string; // H1
  metaTitle: string; // <title>
  metaDescription: string;
  /** Quick answer, appears under H1. */
  summary: string;
  a: ComparisonOption;
  b: ComparisonOption;
  /** 4–6 rows for the scorecard. */
  criteria: ComparisonCriterion[];
  /** 2–5 short sections (H2) explaining context. */
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  /** Persona-based verdict block. */
  bestFor: { persona: string; pick: "a" | "b"; rationale: string }[];
  /** Hero verdict, one paragraph. */
  verdict: string;
  faqs: { q: string; a: string }[];
  /** Curated internal links, must include both source guides + ≥1 cross-pillar. */
  internalLinks: { label: string; to: string }[];
  /** ISO dates. */
  published: string;
  updated: string;
}

export const comparisons: Comparison[] = [
  // ---------- retirement: Roth vs Traditional IRA ----------
  {
    pillar: "retirement",
    slug: "roth-vs-traditional-ira",
    title: "Roth IRA vs Traditional IRA: Which One Wins in 2026?",
    metaTitle: "Roth IRA vs Traditional IRA (2026): Full Comparison | MoneyMoodBoard",
    metaDescription:
      "Roth vs Traditional IRA compared on tax treatment, income limits, withdrawals, RMDs and estate planning, with the right pick for each life stage.",
    summary:
      "A Roth IRA is funded with after-tax dollars and grows tax-free forever; a Traditional IRA gets you an upfront tax deduction but the IRS taxes everything you pull out in retirement. The right answer almost always comes down to one question: will your tax bracket be higher or lower in retirement than it is today?",
    a: {
      name: "Roth IRA",
      oneLiner: "After-tax contributions, tax-free growth and withdrawals from age 59½.",
      sameAs: ["https://en.wikipedia.org/wiki/Roth_IRA", "https://www.wikidata.org/wiki/Q1632858"],
    },
    b: {
      name: "Traditional IRA",
      oneLiner: "Pre-tax contributions today, ordinary-income tax on every dollar at withdrawal.",
      sameAs: ["https://en.wikipedia.org/wiki/Traditional_IRA", "https://www.wikidata.org/wiki/Q7833750"],
    },
    criteria: [
      { name: "When you pay tax", a: "Now, at today's bracket.", b: "Later, at retirement bracket.", winner: "tie" },
      { name: "2026 contribution limit", a: "$7,000 ($8,000 if 50+).", b: "$7,000 ($8,000 if 50+).", winner: "tie" },
      { name: "Income limits", a: "Phase-out starts ~$150k single / $236k MFJ (2026 est.).", b: "No income cap to contribute, but deduction phases out if you have a workplace plan.", winner: "b" },
      { name: "Required minimum distributions", a: "None during your lifetime.", b: "RMDs begin at age 73.", winner: "a" },
      { name: "Early-withdrawal flexibility", a: "Contributions (not earnings) come out anytime, no tax, no penalty.", b: "10% penalty plus tax on most withdrawals before 59½.", winner: "a" },
      { name: "Estate planning", a: "Heirs inherit tax-free; 10-year drawdown but no tax owed.", b: "Heirs owe ordinary-income tax on every dollar.", winner: "a" },
    ],
    sections: [
      {
        heading: "Why the tax-now vs tax-later math is rarely close",
        paragraphs: [
          "If your marginal tax bracket in retirement will be the same as it is today and you invest the deduction from a Traditional IRA, the two accounts end up mathematically identical. However, in practice, almost no one reinvests the deduction. This behavioral gap is exactly why most younger savers in the 12% or 22% bracket end up significantly better off in a Roth.",
          "High earners staring down the Roth income limit have a workaround: contribute non-deductible dollars to a Traditional IRA and convert to Roth in the same year. This is known as the backdoor Roth strategy, provided they don't have other pre-tax IRA balances triggering the pro-rata rule.",
        ],
        bullets: [
          "Roth: Invest $5,000 after-tax now, it grows to $40,000, you keep exactly $40,000.",
          "Traditional: Invest $5,000 pre-tax now, it grows to $40,000, you pay taxes on the entire $40,000 upon withdrawal."
        ]
      },
      {
        heading: "The flexibility gap people underrate",
        paragraphs: [
          "Roth contributions (not earnings) can be withdrawn any time without penalty. That makes a Roth IRA the closest thing to a 'do everything' account in the U.S. system: retirement vehicle, backup emergency reserve, first-home down payment ($10k earnings carve-out), and college fund all at once.",
          "Traditional IRAs are far more rigid: any withdrawal before 59½ usually costs 10% in penalty plus ordinary-income tax. Used correctly that rigidity is a feature, not a bug, but it's a real cost to optionality.",
        ],
        bullets: [
          "Roth contributions can be withdrawn penalty-free and tax-free at any age.",
          "Traditional IRA early withdrawals incur a 10% penalty plus income tax.",
          "Both accounts have specific exemptions for first-time homebuyers and higher education expenses."
        ]
      },
      {
        heading: "When the Traditional IRA still wins",
        paragraphs: [
          "There are specific scenarios where the Traditional IRA is the mathematically superior choice.",
        ],
        bullets: [
          "High earners in peak earning years who expect a much lower retirement bracket.",
          "Savers close to a tax cliff (e.g., losing a child-tax credit or ACA subsidy) where a deduction unlocks real cash.",
          "Early retirees planning to use the Roth Conversion Ladder to move money from Traditional to Roth during low-income gap years."
        ]
      },
      {
        heading: "Required Minimum Distributions (RMDs)",
        paragraphs: [
          "The IRS doesn't let pre-tax money grow untouched forever. Traditional IRAs are subject to RMDs starting at age 73 (moving to 75 by 2033), which forces you to withdraw a percentage of your balance every year and pay taxes on it, regardless of whether you need the money.",
          "Roth IRAs have no RMDs during the owner's lifetime. You can leave the money to compound tax-free indefinitely, making it a vastly superior estate planning tool for heirs who inherit the account."
        ]
      }
    ],
    bestFor: [
      { persona: "20s–30s in the 12–22% bracket", pick: "a", rationale: "Decades of tax-free compounding plus contribution-withdrawal flexibility outweighs the lost deduction." },
      { persona: "Peak earner in 32–37% bracket", pick: "b", rationale: "Take the deduction today; plan a Roth conversion ladder once you stop working." },
      { persona: "Early-retirement / FIRE planner", pick: "b", rationale: "Traditional balances are the raw material for cheap Roth conversions in low-income years." },
      { persona: "Estate-planning saver", pick: "a", rationale: "Heirs inherit Roths tax-free, a quiet but enormous advantage." },
    ],
    verdict:
      "If you can't predict your retirement bracket with confidence, default to Roth in your 20s and 30s, default to Traditional in your peak earning years, and revisit every time your tax bracket changes. For most readers in 2026, the Roth wins.",
    faqs: [
      { q: "Can I contribute to both in the same year?", a: "Yes, but the combined contribution can't exceed $7,000 ($8,000 if 50+) across all IRAs. Most people split based on the math above." },
      { q: "Is a Roth conversion worth it?", a: "Often yes in a low-income year, sabbatical, gap year, early retirement before Social Security. Pay tax at today's lower bracket and lock in tax-free growth forever." },
      { q: "What about a Roth 401(k)?", a: "Same Roth treatment, much higher 2026 limit ($23,500 base). If your employer offers Roth 401(k) and you'd pick Roth, use it first." },
    ],
    internalLinks: [
      { label: "Roth IRA explained", to: "/retirement/roth-ira-explained" },
      { label: "Traditional IRA explained", to: "/retirement/traditional-ira-explained" },
      { label: "401(k) vs IRA", to: "/retirement/vs/401k-vs-ira" },
      { label: "Tax brackets 2026", to: "/debt-taxes-insurance" },
      { label: "Compound Interest Calculator", to: "/tools/compound-interest-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  // ---------- retirement: 401k vs IRA ----------
  {
    pillar: "retirement",
    slug: "401k-vs-ira",
    title: "401(k) vs IRA: Where Should Your Next Retirement Dollar Go?",
    metaTitle: "401(k) vs IRA (2026): Which One Should You Fund First? | MoneyMoodBoard",
    metaDescription:
      "401(k) vs IRA on contribution limits, employer match, fees, investment menu and withdrawal rules, and the funding order that beats both in isolation.",
    summary:
      "A 401(k) is offered through your employer with much higher contribution limits and (usually) a free employer match; an IRA is opened on your own with a far better investment menu and lower fees. Most workers should use both, match first, then IRA, then back to the 401(k).",
    a: {
      name: "401(k)",
      oneLiner: "Employer-sponsored retirement plan funded by payroll deferrals with optional company match.",
      sameAs: ["https://en.wikipedia.org/wiki/401(k)", "https://www.wikidata.org/wiki/Q1066805"],
    },
    b: {
      name: "IRA",
      oneLiner: "Individual retirement account opened directly with a brokerage by the saver.",
      sameAs: ["https://en.wikipedia.org/wiki/Individual_retirement_account", "https://www.wikidata.org/wiki/Q1469062"],
    },
    criteria: [
      { name: "2026 contribution limit", a: "$23,500 employee ($31,000 if 50+).", b: "$7,000 ($8,000 if 50+).", winner: "a" },
      { name: "Employer match", a: "Common, typically 3–6% of salary, free money.", b: "None.", winner: "a" },
      { name: "Investment menu", a: "Restricted to plan-sponsor lineup; fees vary widely.", b: "Almost every public stock, ETF and mutual fund.", winner: "b" },
      { name: "Fees", a: "Plan-admin + fund expense, can exceed 1%/yr in bad plans.", b: "$0 at major brokerages; ETFs from 0.03%.", winner: "b" },
      { name: "Roth option", a: "Roth 401(k) increasingly common, with the same high limit.", b: "Roth IRA available, subject to income limits.", winner: "tie" },
      { name: "Early-access flexibility", a: "Plan loans + Rule of 55 carve-out.", b: "Roth contributions withdrawable anytime; SEPP for Traditional.", winner: "tie" },
    ],
    sections: [
      {
        heading: "The funding order that beats either in isolation",
        paragraphs: [
          "The math almost always works out the same way: contribute to the 401(k) just enough to capture the full employer match, then move to an IRA where fees are lower and the investment menu is wider, then come back to the 401(k) to fill the rest of the limit.",
          "Skipping the match is the single most expensive mistake in personal finance. A 50% match on a 6% salary deferral is an instant 50% return on that money, no investment will ever beat it.",
        ],
        bullets: [
          "Step 1: 401(k) up to the employer match (free money).",
          "Step 2: Max out an IRA (better fees, more investment choices).",
          "Step 3: Return to the 401(k) to max out the $23,500 limit if you have more to save.",
          "Step 4: Consider a mega-backdoor Roth if your plan allows after-tax contributions."
        ]
      },
      {
        heading: "Fees: The Silent Killer of Returns",
        paragraphs: [
          "401(k) plans often carry administrative fees on top of the expense ratios of the mutual funds inside them. A plan with a 1.5% total fee will eat nearly a third of your potential wealth over a 30-year career.",
          "IRAs at major brokerages (like Fidelity, Vanguard, or Schwab) charge $0 in administrative fees, and you can buy index funds with expense ratios as low as 0.03% or even 0%."
        ],
        bullets: [
          "Check your 401(k) provider's fee disclosure document (often buried in the plan details).",
          "If total fees exceed 1%, never contribute a dollar beyond the employer match until your IRA is fully maxed out."
        ]
      },
      {
        heading: "When the IRA-first rule breaks",
        paragraphs: [
          "Two situations flip the order. First, a high earner already over the Roth income limit and unable to deduct a Traditional IRA gets less benefit from the IRA, go heavier on the 401(k) for the deduction. Second, if your 401(k) has exceptionally low fees and excellent institutional-class funds, the convenience of payroll deduction might make it the better choice even without a match.",
          "Either way, capture the match first. Nothing else is close.",
        ],
      },
      {
        heading: "Early Access and Loans",
        paragraphs: [
          "401(k)s offer a unique advantage: you can often take a loan against your balance (up to $50,000 or 50% of your vested balance). While generally discouraged, this provides a safety valve that IRAs lack.",
          "Furthermore, if you leave your employer in the year you turn 55 or later, the 'Rule of 55' allows you to withdraw from that 401(k) without the standard 10% early withdrawal penalty. IRAs require you to wait until 59½."
        ]
      }
    ],
    bestFor: [
      { persona: "Anyone with an employer match", pick: "a", rationale: "Capture the match before touching anything else, period." },
      { persona: "Self-employed / no employer plan", pick: "b", rationale: "Solo 401(k) or SEP-IRA is the better play; if neither, stack a Roth IRA + taxable." },
      { persona: "High earner above Roth limits", pick: "a", rationale: "401(k) deduction lowers AGI which may restore other benefits; backdoor Roth handles the IRA side." },
      { persona: "Bad 401(k) plan (>1% fees)", pick: "b", rationale: "Match first, then IRA, only top up the 401(k) if you have nothing else." },
    ],
    verdict:
      "It's not 401(k) vs IRA, it's 401(k) match, then IRA, then more 401(k). Treating them as either/or leaves the most valuable dollar (the match) on the table.",
    faqs: [
      { q: "What if I leave my job?", a: "Rolling the 401(k) to an IRA is usually the right call, same tax treatment, dramatically better investment menu, lower fees. Skip the rollover only if you're under 55 and need Rule of 55 access." },
      { q: "Can I contribute to both in one year?", a: "Yes, the limits are separate. A 50-year-old can put $31,000 in a 401(k) and $8,000 in an IRA in 2026, $39,000 total." },
      { q: "Should I use a Roth or Traditional 401(k)?", a: "Same logic as Roth vs Traditional IRA, bracket-now vs bracket-later. The contribution limit is identical for either flavor of 401(k)." },
    ],
    internalLinks: [
      { label: "401(k) basics", to: "/retirement/401k-basics" },
      { label: "Roth IRA vs Traditional IRA", to: "/retirement/vs/roth-vs-traditional-ira" },
      { label: "Retirement Savings Calculator", to: "/tools/retirement-savings-calculator" },
      { label: "Best for self-employed", to: "/retirement/best-for/self-employed" },
      { label: "Index funds vs target-date funds", to: "/investing/vs/index-funds-vs-target-date" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  // ---------- investing: ETF vs Mutual Fund ----------
  {
    pillar: "investing",
    slug: "etf-vs-mutual-fund",
    title: "ETF vs Mutual Fund: Same Strategy, Different Wrapper",
    metaTitle: "ETF vs Mutual Fund (2026): Which Wrapper Wins? | MoneyMoodBoard",
    metaDescription:
      "ETF vs mutual fund compared on fees, tax efficiency, minimums, trading mechanics and where each one still makes sense in 2026.",
    summary:
      "An ETF and a mutual fund can hold the exact same basket of stocks, the differences are in how you buy them, how the IRS taxes them, and how much they cost to own. For a taxable brokerage account, the ETF almost always wins. Inside a 401(k) or IRA, it's usually a tie.",
    a: {
      name: "ETF",
      oneLiner: "Exchange-traded fund, a basket of securities that trades like a stock during market hours.",
      sameAs: ["https://en.wikipedia.org/wiki/Exchange-traded_fund", "https://www.wikidata.org/wiki/Q639634"],
    },
    b: {
      name: "Mutual Fund",
      oneLiner: "A pooled investment priced once a day at the market close (NAV).",
      sameAs: ["https://en.wikipedia.org/wiki/Mutual_fund", "https://www.wikidata.org/wiki/Q187502"],
    },
    criteria: [
      { name: "Expense ratio (typical)", a: "Index ETFs 0.03–0.10%.", b: "Index mutual funds 0.04–0.20%; active 0.5–1.5%.", winner: "a" },
      { name: "Tax efficiency in taxable account", a: "In-kind creation/redemption avoids most capital-gains distributions.", b: "Forced distributions to all holders, even new ones.", winner: "a" },
      { name: "Minimum investment", a: "One share (often <$100); fractional at most brokers.", b: "$1k–$3k minimums; some $0 with auto-invest.", winner: "a" },
      { name: "Automatic recurring investment", a: "Limited, requires fractional support.", b: "Built-in everywhere; the original 'set and forget'.", winner: "b" },
      { name: "Intraday trading", a: "Yes, any time the market is open.", b: "Once a day at 4pm NAV.", winner: "a" },
      { name: "Inside 401(k)", a: "Often not on the menu.", b: "Dominant choice in plan lineups.", winner: "b" },
    ],
    sections: [
      {
        heading: "Why ETFs are quietly more tax-efficient",
        paragraphs: [
          "Mutual funds have to sell holdings to meet redemptions, which generates taxable capital gains the fund distributes to every shareholder, including ones who joined yesterday. ETFs use a creation/redemption mechanism that lets institutional traders swap shares for the underlying basket without selling, so the fund itself almost never realises gains.",
          "For long-term holders in a taxable brokerage account, that mechanical difference can be worth a few tenths of a percent per year, every year, forever. Inside an IRA or 401(k) the difference vanishes because nothing in the account is taxed until withdrawal.",
        ],
        bullets: [
          "ETFs shield you from other investors' behavior (you don't pay taxes when someone else sells).",
          "Mutual fund investors often get hit with unexpected capital gains tax bills at year-end, even if the fund lost value."
        ]
      },
      {
        heading: "Intraday Trading vs. End-of-Day Pricing",
        paragraphs: [
          "ETFs trade on an exchange like individual stocks. You can buy or sell them at 10:00 AM, 1:15 PM, or 3:59 PM, and you get the exact price at that moment.",
          "Mutual funds only trade once a day. If you place a buy or sell order at 11:00 AM, it won't execute until the market closes at 4:00 PM, and you get the closing Net Asset Value (NAV)."
        ],
        bullets: [
          "ETF: Immediate execution, know your price instantly.",
          "Mutual Fund: Delayed execution, price determined after the fact."
        ]
      },
      {
        heading: "Where mutual funds still earn their keep",
        paragraphs: [
          "Two scenarios. First, automated dollar-cost averaging at most brokers still works more cleanly with a mutual fund, pick an amount, pick a date, done. Second, several great index funds (especially in 401(k) menus) only exist in mutual-fund form, and avoiding them just to use an ETF is a bad reason.",
        ],
      },
      {
        heading: "Minimum Investment Hurdles",
        paragraphs: [
          "Mutual funds typically require a minimum initial investment, often ranging from $1,000 to $3,000 (like Vanguard's Admiral Shares). This can be a barrier for new investors.",
          "ETFs only require you to buy one share (or a fraction of a share, depending on your broker), making them much more accessible for starting small."
        ]
      }
    ],
    bestFor: [
      { persona: "Taxable brokerage account", pick: "a", rationale: "Tax efficiency over decades is meaningful and free." },
      { persona: "Inside a 401(k)/IRA", pick: "b", rationale: "Use whatever your plan offers, tax wrapper makes the choice neutral." },
      { persona: "Beginner with $50–$500/mo recurring", pick: "b", rationale: "Auto-invest into a target-date or index mutual fund is the cleanest setup." },
      { persona: "Active rebalancer", pick: "a", rationale: "Intraday liquidity plus tax efficiency on the rebalance." },
    ],
    verdict:
      "Default to ETFs in a taxable account, mutual funds in a workplace retirement plan, and don't lose sleep over the choice, the strategy (broad-index, low-cost, hold forever) matters 100× more than the wrapper.",
    faqs: [
      { q: "Are ETFs riskier than mutual funds?", a: "No. An S&P 500 ETF and an S&P 500 mutual fund own essentially the same stocks; the daily price moves identically. Riskier holdings (leveraged, single-country, themes) exist in both wrappers." },
      { q: "Do I pay commission to trade ETFs?", a: "Major U.S. brokers eliminated ETF commissions in 2019. You pay the bid/ask spread, which is pennies on a major index ETF." },
      { q: "What about index funds, are those different?", a: "An index fund is a strategy, not a wrapper. The same index strategy comes in both ETF and mutual-fund form (e.g., Vanguard's VOO is the ETF, VFIAX is the mutual fund)." },
    ],
    internalLinks: [
      { label: "Index funds vs target-date", to: "/investing/vs/index-funds-vs-target-date" },
      { label: "What is an ETF?", to: "/investing/what-is-an-etf" },
      { label: "Investing pillar", to: "/investing" },
      { label: "Compound Interest Calculator", to: "/tools/compound-interest-calculator" },
      { label: "401(k) vs IRA", to: "/retirement/vs/401k-vs-ira" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  // ---------- investing: Index funds vs Target-date funds ----------
  {
    pillar: "investing",
    slug: "index-funds-vs-target-date",
    title: "Index Funds vs Target-Date Funds: Simple, or Even Simpler?",
    metaTitle: "Index Funds vs Target-Date Funds (2026) | MoneyMoodBoard",
    metaDescription:
      "Index funds vs target-date funds compared on fees, rebalancing, glidepath and the right pick for hands-off vs hands-on investors.",
    summary:
      "An index fund tracks a single market, usually the whole U.S. or world stock market, and never changes. A target-date fund holds a mix of index funds and automatically shifts from stocks to bonds as your retirement year approaches. Target-date is one decision; index is two or three.",
    a: {
      name: "Index Fund",
      oneLiner: "A fund that mechanically tracks a market index like the S&P 500 or total world market.",
      sameAs: ["https://en.wikipedia.org/wiki/Index_fund", "https://www.wikidata.org/wiki/Q1335572"],
    },
    b: {
      name: "Target-Date Fund",
      oneLiner: "An all-in-one fund that holds a mix of stock and bond index funds, glidepath-rebalanced to a chosen retirement year.",
      sameAs: ["https://en.wikipedia.org/wiki/Target_date_fund", "https://www.wikidata.org/wiki/Q7682762"],
    },
    criteria: [
      { name: "Number of decisions", a: "2–3 funds; you pick the stock/bond split.", b: "One fund; the fund picks the split.", winner: "b" },
      { name: "Expense ratio", a: "0.03–0.08% at Vanguard/Fidelity/Schwab.", b: "0.08–0.15% (slightly higher fund-of-funds wrapper).", winner: "a" },
      { name: "Rebalancing", a: "You set a calendar reminder.", b: "Automatic, daily, free.", winner: "b" },
      { name: "Glidepath (de-risking)", a: "You shift to bonds manually as you age.", b: "Built-in; runs for decades after retirement.", winner: "b" },
      { name: "Customization", a: "Total control of allocation, factor tilts, international weight.", b: "Take it or leave it.", winner: "a" },
      { name: "Tax efficiency in taxable account", a: "Better, pure stock index funds throw off less in gains/dividends.", b: "Worse, automatic rebalancing creates taxable events.", winner: "a" },
    ],
    sections: [
      {
        heading: "Why most new investors should start with a target-date fund",
        paragraphs: [
          "The number-one cause of long-term underperformance isn't fund choice, it's behavior: missing rebalances, panic-selling in downturns, drifting into stock-heavy allocations near retirement. Target-date funds solve all three by making the right behavior automatic.",
          "The slightly higher fee (a few basis points) is the cheapest insurance in finance for an investor who would otherwise tinker.",
        ],
        bullets: [
          "Automatic rebalancing: Maintains the right mix of stocks and bonds.",
          "Glide path: Automatically gets more conservative as you approach retirement.",
          "Behavioral guardrail: Prevents you from trying to time the market."
        ]
      },
      {
        heading: "The 'Fund of Funds' Mechanics",
        paragraphs: [
          "A target-date fund isn't actually a distinct class of investment; it's a wrapper. Inside a Vanguard Target Retirement 2055 fund, you literally just hold four broad index funds: Total US Stock, Total International Stock, Total US Bond, and Total International Bond.",
          "You are paying the target-date fund manager a small fee to automatically manage the allocation of those underlying index funds for you."
        ]
      },
      {
        heading: "Why experienced investors graduate to index funds",
        paragraphs: [
          "Two reasons. First, taxable accounts: target-date funds rebalance inside the fund, which creates capital-gains distributions you can't avoid. Pure index funds let you control when gains are realised. Second, factor tilts: investors who want value, small-cap, or higher international weights can't get them inside a one-size-fits-all target-date fund.",
        ],
        bullets: [
          "Lower expense ratios: Building your own portfolio of index funds is slightly cheaper.",
          "Tax efficiency: Better control over capital gains in non-retirement accounts.",
          "Customization: Ability to tweak allocations beyond a generic glide path."
        ]
      },
      {
        heading: "The Mathematical Difference Over 30 Years",
        paragraphs: [
          "A DIY three-fund index portfolio might charge 0.04% in expense ratios. A low-cost target-date fund might charge 0.08%. On a $100,000 balance, that's a difference of $40 per year.",
          "While $40 compounds over decades, the cost is trivial compared to the cost of a DIY investor forgetting to rebalance or panic-selling during a crash. Only graduate to a DIY index fund portfolio if you are certain your behavior is disciplined."
        ]
      }
    ],
    bestFor: [
      { persona: "New investor, 401(k)", pick: "b", rationale: "Pick the fund matching your retirement year, set the contribution percentage, ignore the news." },
      { persona: "Taxable brokerage saver", pick: "a", rationale: "Avoid forced capital-gains distributions; control rebalancing year-end." },
      { persona: "Three-fund-portfolio fan (Bogleheads)", pick: "a", rationale: "U.S. total market + international + bonds gives identical exposure at lower fees." },
      { persona: "Tinkerer with no system", pick: "b", rationale: "Automation beats intention, let the fund do the job you keep skipping." },
    ],
    verdict:
      "If you're going to leave it alone for 30 years and would otherwise drift or panic, the target-date fund is the better choice even at a slightly higher fee. If you're disciplined and especially if you're in a taxable account, the three-fund index portfolio wins on fees and control.",
    faqs: [
      { q: "Can I hold both?", a: "Yes, many investors use a target-date fund inside their 401(k) and a three-fund index portfolio in their IRA / taxable brokerage." },
      { q: "What does the 'glidepath' actually do?", a: "It gradually moves the fund from ~90% stocks in your 20s to ~30–50% stocks at retirement. Different fund families use different paths, Vanguard ends near 30% stocks, Fidelity nearer 50%." },
      { q: "Is the target year a hard deadline?", a: "No. The fund keeps glidepath-rebalancing for 5–25 years after the target date. Picking a date 5 years past your real retirement gives a slightly higher stock weight if you want it." },
    ],
    internalLinks: [
      { label: "ETF vs mutual fund", to: "/investing/vs/etf-vs-mutual-fund" },
      { label: "Index fund investing", to: "/investing/index-fund-investing" },
      { label: "Retirement Savings Calculator", to: "/tools/retirement-savings-calculator" },
      { label: "Best for late-starters (40+)", to: "/investing/best-for/late-starters" },
      { label: "401(k) vs IRA", to: "/retirement/vs/401k-vs-ira" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  // ---------- debt: Snowball vs Avalanche ----------
  {
    pillar: "debt-taxes-insurance",
    slug: "snowball-vs-avalanche",
    title: "Debt Snowball vs Avalanche: Which Payoff Method Actually Finishes?",
    metaTitle: "Debt Snowball vs Avalanche (2026): Pick the Right Method | MoneyMoodBoard",
    metaDescription:
      "Snowball vs avalanche compared on math, motivation, total interest paid, and who actually finishes their debt with each method.",
    summary:
      "The avalanche pays the highest-interest debt first and saves the most money in interest. The snowball pays the smallest balance first and gives faster psychological wins. Studies and reality both point to the same conclusion: the method you'll actually stick with beats the optimal one you abandon.",
    a: {
      name: "Debt Snowball",
      oneLiner: "Pay debts smallest-balance-first to maximize motivation through early wins.",
      sameAs: ["https://en.wikipedia.org/wiki/Debt_snowball_method", "https://www.wikidata.org/wiki/Q5249043"],
    },
    b: {
      name: "Debt Avalanche",
      oneLiner: "Pay debts highest-interest-first to minimize total interest paid.",
      sameAs: ["https://en.wikipedia.org/wiki/Debt-snowball_method#Avalanche_method"],
    },
    criteria: [
      { name: "Math optimality", a: "Suboptimal, costs more interest.", b: "Optimal, minimum total interest.", winner: "b" },
      { name: "Motivation / completion rate", a: "Higher, fast first wins reinforce the habit.", b: "Lower, first win can take many months.", winner: "a" },
      { name: "Total interest paid", a: "Slightly higher (often <$1k difference on average household debt).", b: "Lowest possible.", winner: "b" },
      { name: "Setup complexity", a: "Sort debts by balance ascending. Done.", b: "Sort by APR descending. Done.", winner: "tie" },
      { name: "Best with mixed-rate, mixed-size debts", a: "Wins when there's at least one tiny balance to knock out.", b: "Wins when one debt is dramatically higher-rate.", winner: "tie" },
    ],
    sections: [
      {
        heading: "The Mathematical Case for Avalanche",
        paragraphs: [
          "The debt avalanche method (paying the highest interest rate first) is mathematically superior. Every dollar put toward a 24% credit card saves you more money than a dollar put toward a 6% student loan.",
          "If you have $20,000 in debt across three cards, the avalanche method will always finish months faster and save hundreds or thousands of dollars in interest compared to any other method."
        ],
        bullets: [
          "Minimizes total interest paid over the life of the debt.",
          "Shortens the absolute time to become debt-free (assuming perfect adherence)."
        ]
      },
      {
        heading: "The Behavioral Case for Snowball",
        paragraphs: [
          "The debt snowball method (paying the smallest balance first, regardless of interest rate) ignores math in favor of psychology. By knocking out a small $500 medical bill in month one, you get an immediate dopamine hit and a freed-up minimum payment.",
          "Harvard Business Review and Northwestern Kellogg studies both found that consumers who use the snowball method are significantly more likely to actually get out of debt. Early 'wins' create the momentum needed to stick to a multi-year budget."
        ],
        bullets: [
          "Maximizes psychological momentum and motivation.",
          "Frees up cash flow faster as individual minimum payments disappear.",
          "Proven to have higher completion rates in behavioral studies."
        ]
      },
      {
        heading: "When the math difference becomes too big to ignore",
        paragraphs: [
          "The snowball method works best when interest rates are similar. If your smallest balance is a 0% medical bill and your largest balance is a 29% payday loan, using the snowball method will cost you a ruinous amount of interest.",
          "Rule of thumb: If the interest rate gap between your smallest balance and highest-rate balance is larger than 10%, you should strongly consider a hybrid approach (avalanche the predatory rates, snowball the rest)."
        ]
      },
      {
        heading: "The 'Cash Flow' Snowball Advantage",
        paragraphs: [
          "There is one mathematical scenario where snowball wins: emergency cash flow. If you lose your job, having fewer distinct loans means a lower total mandatory minimum payment to survive the month.",
          "By killing off three small loans quickly, you reduce the sheer number of entities demanding a check from you on the 1st of the month."
        ]
      }
    ],
    bestFor: [
      { persona: "Someone who's failed payoff plans before", pick: "a", rationale: "The momentum from the first paid-off card is the whole point." },
      { persona: "High-interest credit-card balance + nothing else", pick: "b", rationale: "With one main target, snowball vs avalanche collapses to the same plan." },
      { persona: "Couple with mixed debt and mixed motivation", pick: "a", rationale: "Visible wins keep the partner who lost interest re-engaged." },
      { persona: "Pure optimizer, will not quit", pick: "b", rationale: "If you absolutely will stick with it, save the money." },
    ],
    verdict:
      "Pick snowball unless you have either (a) one dominant high-rate debt that makes the methods nearly identical, or (b) zero history of giving up on a payoff plan. Finishing the plan is worth far more than the few hundred dollars of extra interest.",
    faqs: [
      { q: "What if my debts are all the same interest rate?", a: "The methods collapse, pay smallest first because it's faster mental closure." },
      { q: "Should I keep the credit cards open after payoff?", a: "Yes, to preserve credit utilization and average age of account, unless they carry an annual fee with no benefit." },
      { q: "What about a consolidation loan?", a: "Useful if it lowers your weighted-average APR and you won't run the cards back up. Otherwise it's a delaying tactic." },
    ],
    internalLinks: [
      { label: "Debt snowball deep-dive", to: "/debt-taxes-insurance/debt-snowball-method" },
      { label: "Debt avalanche deep-dive", to: "/debt-taxes-insurance/debt-avalanche-method" },
      { label: "Debt Payoff Calculator", to: "/tools/debt-payoff-calculator" },
      { label: "Credit Card Payoff Calculator", to: "/tools/credit-card-payoff-calculator" },
      { label: "Best for recent grads", to: "/debt-taxes-insurance/best-for/recent-grads" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  // ---------- credit-cards: Cashback vs Travel Rewards ----------
  {
    pillar: "credit-cards",
    slug: "cashback-vs-travel-rewards",
    title: "Cashback vs Travel Rewards: Which Card Actually Pays More?",
    metaTitle: "Cashback vs Travel Rewards Cards (2026) | MoneyMoodBoard",
    metaDescription:
      "Cashback vs travel-rewards cards compared on flexibility, point value, annual fees, and the spending patterns that make each one worth it.",
    summary:
      "Cashback is simple, flexible, and gets the same value every time, usually 1.5–2% back. Travel rewards can be worth 2–5¢ per point if you're willing to learn airline transfer partners, but they expire, devalue, and are useless for non-travelers. The right answer depends on whether you actually fly.",
    a: {
      name: "Cashback Card",
      oneLiner: "A credit card that returns a fixed percent of purchases as statement credit or deposit.",
      sameAs: ["https://en.wikipedia.org/wiki/Cashback_reward_program", "https://www.wikidata.org/wiki/Q1469062"],
    },
    b: {
      name: "Travel Rewards Card",
      oneLiner: "A credit card earning points or miles redeemable for flights, hotels and transfer partners.",
      sameAs: ["https://en.wikipedia.org/wiki/Frequent-flyer_program", "https://www.wikidata.org/wiki/Q1141477"],
    },
    criteria: [
      { name: "Best-case redemption value", a: "Fixed at ~2¢ on most flat-rate cards.", b: "2–5¢/point on premium transfer redemptions.", winner: "b" },
      { name: "Worst-case redemption value", a: "Still 2¢, every dollar of spend.", b: "≤1¢ if you cash out points.", winner: "a" },
      { name: "Annual fee floor", a: "$0 cards earn 1.5–2%.", b: "Top transfer cards run $95–$695.", winner: "a" },
      { name: "Learning curve", a: "None.", b: "Steep, partners, devaluations, award-search tools.", winner: "a" },
      { name: "Welcome-bonus value", a: "$200–$300 typical.", b: "$750–$1,500 in travel value common.", winner: "b" },
      { name: "Useless if you don't travel", a: "No.", b: "Mostly yes.", winner: "a" },
    ],
    sections: [
      {
        heading: "The Certainty of Cash",
        paragraphs: [
          "Cashback is the ultimate frictionless currency. A 2% flat-rate card yields exactly $0.02 on every dollar spent. There are no blackout dates, no transfer partners, and no point devaluations.",
          "Because cash can be invested or used to pay down debt, its true value is often higher than a hypothetical luxury flight you didn't actually need to take."
        ],
        bullets: [
          "Zero mental overhead: No need to track award charts or transfer partners.",
          "Universal acceptance: Cash pays the mortgage, buys groceries, and funds the Roth IRA.",
          "Fixed value: 1 cent is always 1 cent."
        ]
      },
      {
        heading: "The Outsized Upside of Travel Rewards",
        paragraphs: [
          "A business-class flight to Tokyo might cost $6,000 or 120,000 points. In that scenario, each point is worth 5 cents. Earning 3x points on dining suddenly translates to a 15% return on your restaurant spending.",
          "Travel rewards systems are built for 'gamers' willing to learn transfer partner mechanics. If you use a portal to buy a domestic economy flight, you'll often get 1.25 cents per point—barely better than cash. The extreme value is exclusively in international premium cabins and luxury hotels."
        ],
        bullets: [
          "Potential for 3-5+ cents per point on premium redemptions.",
          "Access to experiences (first class, luxury suites) you wouldn't pay cash for.",
          "Sign-up bonuses are often significantly larger than cashback equivalents."
        ]
      },
      {
        heading: "The Annual Fee Break-Even Point",
        paragraphs: [
          "High-end travel cards charge $250 to $695 in annual fees. They offset this with travel credits, lounge access, and insurance. However, if you don't organically use those credits, the card is a net loss.",
          "Cashback setups can be optimized to 2-5% across all categories using cards with exactly $0 in annual fees."
        ]
      },
      {
        heading: "When to switch teams",
        paragraphs: [
          "If your household organically spends more than $5,000 a year on flights and hotels, or if you fly internationally at least once a year, you are leaving thousands of dollars in value on the table by sticking to 2% cashback.",
          "Conversely, if you take one road trip a year and stay at an Airbnb, travel points will languish in your account while losing value to inflation. Take the cash."
        ]
      }
    ],
    bestFor: [
      { persona: "Never travels / hates planning", pick: "a", rationale: "Flat 2% beats every alternative in real life." },
      { persona: "Takes 2+ international trips per year", pick: "b", rationale: "Transfer-partner redemptions return well above any cashback card." },
      { persona: "Building credit, light spender", pick: "a", rationale: "Fee-free cashback only; avoid annual-fee cards until utilization is healthy." },
      { persona: "Family of 4, 2x family travel per year", pick: "b", rationale: "Welcome bonuses + transfer partners pay for one trip outright." },
    ],
    verdict:
      "If you can't honestly answer 'I will redeem points for award flights in the next 12 months', the cashback card wins. Otherwise, run cashback as the daily driver and add one premium travel card for the welcome bonus and category multipliers.",
    faqs: [
      { q: "Are points and miles worth chasing if I have any debt?", a: "No. Carrying a balance at 24% wipes out 2% rewards 12× over. Pay off the balance first." },
      { q: "Do points expire?", a: "Most cards reset on account closure; airline miles often expire after 18–36 months of inactivity. Cashback never expires while the account is open." },
      { q: "What about the welcome bonus?", a: "Welcome bonuses are usually the single highest-ROI move in points and miles. Hit one per year if your credit can take the inquiry." },
    ],
    internalLinks: [
      { label: "How credit cards work", to: "/credit-cards/how-credit-cards-work" },
      { label: "Best for students", to: "/credit-cards/best-for/students" },
      { label: "Credit Card Payoff Calculator", to: "/tools/credit-card-payoff-calculator" },
      { label: "Credit Score Estimator", to: "/tools/credit-score-estimator" },
      { label: "Budget Planner", to: "/tools/budget-planner" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  // ---------- saving: HYSA vs Money Market ----------
  {
    pillar: "saving",
    slug: "hysa-vs-money-market",
    title: "HYSA vs Money Market Account: Which Cash Bucket Pays More?",
    metaTitle: "HYSA vs Money Market Account (2026) | MoneyMoodBoard",
    metaDescription:
      "High-yield savings vs money market accounts on rates, access, FDIC insurance, check-writing and the right home for your emergency fund.",
    summary:
      "A high-yield savings account (HYSA) and a money market deposit account (MMDA) are both FDIC-insured cash accounts. HYSAs typically pay slightly higher rates and have no check-writing; MMDAs let you write a small number of checks per month. For an emergency fund, the HYSA almost always wins.",
    a: {
      name: "High-Yield Savings Account",
      oneLiner: "An FDIC-insured savings account paying a competitive APY, usually at an online bank.",
      sameAs: ["https://en.wikipedia.org/wiki/Savings_account", "https://www.wikidata.org/wiki/Q1170310"],
    },
    b: {
      name: "Money Market Account",
      oneLiner: "An FDIC-insured deposit account paying a tiered APY with limited check-writing and debit access.",
      sameAs: ["https://en.wikipedia.org/wiki/Money_market_account", "https://www.wikidata.org/wiki/Q1948842"],
    },
    criteria: [
      { name: "Typical APY (2026)", a: "4.0–5.0% at top online banks.", b: "3.5–4.5% at most banks.", winner: "a" },
      { name: "FDIC insurance", a: "Yes, up to $250k per depositor per bank.", b: "Yes, up to $250k per depositor per bank.", winner: "tie" },
      { name: "Check-writing", a: "Usually no.", b: "Usually limited (3–6/month).", winner: "b" },
      { name: "Debit card", a: "Sometimes.", b: "Often.", winner: "b" },
      { name: "Minimum balance", a: "Usually $0.", b: "Often $1k–$10k for top rate.", winner: "a" },
      { name: "Best home for an emergency fund", a: "Yes, higher rate, no minimum.", b: "Workable if you need the check feature.", winner: "a" },
    ],
    sections: [
      {
        heading: "The Yield Race is Usually a Tie",
        paragraphs: [
          "A High-Yield Savings Account (HYSA) and a Money Market Account (MMA) at the same online bank will typically pay within 0.10% of each other. Both track the Federal Reserve's benchmark rate.",
          "Chasing a 0.05% difference on a $20,000 emergency fund yields exactly $10 a year. The rate itself shouldn't be the deciding factor."
        ],
        bullets: [
          "Both accounts are FDIC/NCUA insured up to $250,000.",
          "Both offer variable APYs that fluctuate with the broader economy.",
          "Both are designed for safe, highly liquid cash storage."
        ]
      },
      {
        heading: "The Checkbook and Debit Card Difference",
        paragraphs: [
          "The single defining feature of a Money Market Account is that it often comes with a debit card and the ability to write paper checks directly from the account.",
          "A traditional HYSA requires you to transfer funds to a linked checking account before you can spend the money, a process that can take 1-3 business days if the checking account is at a different institution."
        ],
        bullets: [
          "MMA: Direct access via checks/debit (perfect for paying large, infrequent bills like property tax).",
          "HYSA: Requires a transfer to checking first (adds a layer of friction)."
        ]
      },
      {
        heading: "Friction as a Feature",
        paragraphs: [
          "If this account holds your emergency fund, the lack of a debit card on an HYSA is actually a behavioral advantage. It prevents you from impulsively swiping your emergency reserves at a restaurant.",
          "MMAs are better suited as 'holding tanks' for money you know you will spend soon (e.g., a down payment on a house, quarterly estimated taxes)."
        ]
      },
      {
        heading: "Minimum Balance Requirements",
        paragraphs: [
          "Online HYSAs have largely eliminated minimum balances. You can open an account at Ally or Marcus with $1 and earn the top tier rate.",
          "MMAs occasionally still tier their interest rates, requiring $5,000 or $10,000 to unlock the advertised APY, and penalizing you with monthly fees if the balance dips."
        ]
      }
    ],
    bestFor: [
      { persona: "Building an emergency fund", pick: "a", rationale: "Higher APY, no minimums, just-enough friction to prevent leakage." },
      { persona: "Holding a down-payment deposit", pick: "b", rationale: "Check-writing makes the eventual large outflow simpler." },
      { persona: "Retiree managing monthly cashflow", pick: "b", rationale: "Debit + check access for occasional large pulls without moving to checking." },
      { persona: "Anyone with <$10k saved", pick: "a", rationale: "MMDA minimums often disqualify smaller balances from the top rate." },
    ],
    verdict:
      "Default to the HYSA. Choose the money market only if you genuinely need the checkbook or debit card, and then make sure the rate gap is small enough to be worth it.",
    faqs: [
      { q: "Are these the same as a money market fund?", a: "No. A money market deposit account is FDIC-insured. A money market mutual fund is an investment product, not insured, held at a brokerage. The names are confusingly similar, always check 'FDIC' before parking emergency money." },
      { q: "How often do rates change?", a: "Both rates float with the federal funds rate and can change daily, banks raise them slowly and cut them quickly. Recheck every 6 months." },
      { q: "Should I split between accounts?", a: "If you're above $250k at one bank, yes, to stay FDIC-insured. Below that, splitting accounts adds friction without yield benefit." },
    ],
    internalLinks: [
      { label: "What is a high-yield savings account?", to: "/saving/what-is-a-high-yield-savings-account" },
      { label: "How big should your emergency fund be?", to: "/saving/how-big-should-your-emergency-fund-be" },
      { label: "CDs vs T-Bills", to: "/saving/vs/cds-vs-t-bills" },
      { label: "Emergency Fund Calculator", to: "/tools/emergency-fund-calculator" },
      { label: "Best for new parents", to: "/saving/best-for/new-parents" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  // ---------- saving: CDs vs T-Bills ----------
  {
    pillar: "saving",
    slug: "cds-vs-t-bills",
    title: "CDs vs Treasury Bills: The Cash Yield Showdown",
    metaTitle: "CDs vs T-Bills (2026): Where to Lock In Cash Yield | MoneyMoodBoard",
    metaDescription:
      "Bank CDs vs Treasury bills compared on yield, taxes, liquidity, default risk, and the right vehicle for short-term savings.",
    summary:
      "A CD locks in a fixed rate at a bank for a set term and is FDIC-insured. A T-bill is short-term U.S. government debt that's exempt from state and local tax. After tax, T-bills usually win for residents of high-tax states; CDs can edge ahead for retirees in no-income-tax states.",
    a: {
      name: "Certificate of Deposit (CD)",
      oneLiner: "A time deposit at a bank with a fixed rate and a fixed maturity, FDIC-insured.",
      sameAs: ["https://en.wikipedia.org/wiki/Certificate_of_deposit", "https://www.wikidata.org/wiki/Q1041796"],
    },
    b: {
      name: "Treasury Bill",
      oneLiner: "A short-term U.S. government debt security maturing in 4, 8, 13, 17, 26 or 52 weeks.",
      sameAs: ["https://en.wikipedia.org/wiki/United_States_Treasury_security#Treasury_bill", "https://www.wikidata.org/wiki/Q1573006"],
    },
    criteria: [
      { name: "Quoted yield (2026 typical)", a: "4.5–5.25% on 12-month CDs.", b: "4.7–5.3% on 6-month T-bills.", winner: "tie" },
      { name: "State / local tax", a: "Fully taxable.", b: "Exempt from state and local income tax.", winner: "b" },
      { name: "Default risk", a: "FDIC-insured to $250k.", b: "Backed by U.S. Treasury, the benchmark for risk-free.", winner: "b" },
      { name: "Early withdrawal", a: "Penalty of 3–12 months interest.", b: "Sell on the secondary market at the current price.", winner: "b" },
      { name: "Minimums", a: "$500–$1,000 typical.", b: "$100 minimum on TreasuryDirect; $1,000 in brokerage.", winner: "tie" },
      { name: "Reinvestment hassle", a: "Bank rolls automatically (often at a worse rate).", b: "Manual roll, or buy a ladder.", winner: "a" },
    ],
    sections: [
      {
        heading: "The State and Local Tax Advantage",
        paragraphs: [
          "Interest earned from a Certificate of Deposit (CD) is taxed at the federal, state, and local levels. Interest earned from a Treasury Bill (T-Bill) is exempt from state and local income taxes.",
          "If you live in a high-tax state like California or New York, a 5.0% T-Bill will put significantly more after-tax cash in your pocket than a 5.1% CD."
        ],
        bullets: [
          "CD: Taxed at Federal + State + Local levels.",
          "T-Bill: Taxed at Federal level only."
        ]
      },
      {
        heading: "Liquidity and Early Exit Penalties",
        paragraphs: [
          "If you break a 12-month CD in month 9, the bank will charge an early withdrawal penalty, typically 3-6 months of interest. You are locked in.",
          "T-Bills can be sold on the secondary market before maturity without a direct penalty. However, if interest rates have risen since you bought the T-Bill, you will sell it at a slight discount to its face value. (Note: Buying T-Bills directly from TreasuryDirect makes secondary selling cumbersome; use a brokerage for liquidity)."
        ],
        bullets: [
          "CDs guarantee your principal but penalize early exit.",
          "T-Bills offer secondary market liquidity but expose you to minor interest-rate risk if sold early."
        ]
      },
      {
        heading: "Convenience and User Experience",
        paragraphs: [
          "Opening a CD at your existing bank takes three clicks. The interface is intuitive, and the interest simply deposits into the account.",
          "Buying a T-Bill means either navigating the notoriously antiquated TreasuryDirect.gov website, or using a brokerage platform and understanding how to buy at a 'discount' and receive the 'par value' at maturity."
        ]
      },
      {
        heading: "The Yield Curve Environment",
        paragraphs: [
          "Banks use CDs to secure deposits for their loan portfolios, meaning they occasionally run 'promotions' that beat the equivalent Treasury rate. However, T-Bills generally reflect the purest risk-free rate in the market.",
          "Always calculate the 'Tax-Equivalent Yield' before choosing a CD over a T-Bill in a state with income tax."
        ]
      }
    ],
    bestFor: [
      { persona: "High-tax-state saver (CA, NY, NJ)", pick: "b", rationale: "State-tax exemption pushes after-tax yield ahead of comparable CDs." },
      { persona: "No-income-tax state saver", pick: "a", rationale: "Pick the higher headline rate; FDIC insurance is functionally identical to Treasury credit." },
      { persona: "Retiree wanting set-and-forget", pick: "a", rationale: "Auto-renewing CD ladder is one decision; T-bill rolls require attention." },
      { persona: "Anyone parking down-payment cash 6–18 months out", pick: "b", rationale: "Liquidity + Treasury safety + state-tax exemption." },
    ],
    verdict:
      "T-bills win for high-tax-state savers and for anyone wanting genuine liquidity. CDs win for set-and-forget savers in no-income-tax states. Both are dramatically better than letting cash sit at 0.01% in a big-bank savings account.",
    faqs: [
      { q: "What about brokered CDs?", a: "Same FDIC insurance as bank CDs, but trade like a security on a brokerage, you can sell early at market price instead of taking the early-withdrawal penalty. Often the right middle ground." },
      { q: "How do I build a T-bill ladder?", a: "Buy equal amounts at 4-week, 8-week, 13-week and 26-week maturities. As each matures, buy another 26-week. You get a steady cash flow and average rate exposure." },
      { q: "Are T-bills risky if rates rise?", a: "Short-term T-bills (≤6 months) move minimally in price. The longer the maturity, the more rate risk, same as any bond." },
    ],
    internalLinks: [
      { label: "HYSA vs Money Market", to: "/saving/vs/hysa-vs-money-market" },
      { label: "How big should your emergency fund be?", to: "/saving/how-big-should-your-emergency-fund-be" },
      { label: "Saving pillar", to: "/saving" },
      { label: "Best for new parents", to: "/saving/best-for/new-parents" },
      { label: "Compound Interest Calculator", to: "/tools/compound-interest-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  // ---------- budgeting: Zero-based vs 50/30/20 ----------
  {
    pillar: "budgeting",
    slug: "zero-based-vs-50-30-20",
    title: "Zero-Based Budgeting vs 50/30/20: Which One Sticks?",
    metaTitle: "Zero-Based vs 50/30/20 (2026): Pick the Right Budget | MoneyMoodBoard",
    metaDescription:
      "Zero-based budgeting vs the 50/30/20 rule on setup time, control, flexibility, and which one is easier to actually maintain month after month.",
    summary:
      "Zero-based budgeting gives every dollar a job until income minus allocations equals zero. 50/30/20 just splits take-home into 50% needs, 30% wants, 20% savings. Zero-based is more powerful and more work; 50/30/20 is faster but less surgical. Most people start with 50/30/20 and graduate.",
    a: {
      name: "Zero-Based Budgeting",
      oneLiner: "A method where every dollar is assigned a job until income minus allocations equals zero.",
      sameAs: ["https://en.wikipedia.org/wiki/Zero-based_budgeting", "https://www.wikidata.org/wiki/Q2598971"],
    },
    b: {
      name: "50/30/20 Rule",
      oneLiner: "A framework that splits take-home pay 50% needs, 30% wants, 20% savings and debt.",
      sameAs: ["https://en.wikipedia.org/wiki/Elizabeth_Warren#All_Your_Worth", "https://www.wikidata.org/wiki/Q98723972"],
    },
    criteria: [
      { name: "Setup time / month", a: "30–60 minutes.", b: "5–10 minutes.", winner: "b" },
      { name: "Granularity", a: "Every category, every month.", b: "Three buckets, period.", winner: "a" },
      { name: "Visibility of leaks", a: "High, every category shows up.", b: "Low, leaks hide inside 'wants'.", winner: "a" },
      { name: "Works for variable income", a: "Yes, rebuild monthly.", b: "Roughly, average income.", winner: "a" },
      { name: "Burnout risk", a: "Real if life gets busy.", b: "Low.", winner: "b" },
      { name: "Beginner friendliness", a: "Steep.", b: "Trivial.", winner: "b" },
    ],
    sections: [
      {
        heading: "The Strict Discipline of Zero-Based",
        paragraphs: [
          "Zero-based budgeting (made famous by YNAB) requires you to assign exactly every dollar of income to a specific category until your 'to be budgeted' amount is $0. If you earn $4,000, you give $4,000 specific jobs.",
          "This method is highly tactical and forces you to confront trade-offs. If you overspend on dining out, you must actively move money out of your vacation fund to cover it."
        ],
        bullets: [
          "High visibility: You know exactly where every dollar is going.",
          "Proactive: You assign jobs to money before you spend it.",
          "High maintenance: Requires frequent check-ins and categorizing transactions."
        ]
      },
      {
        heading: "The High-Level Guardrails of 50/30/20",
        paragraphs: [
          "The 50/30/20 rule (popularized by Elizabeth Warren) splits your after-tax income into three massive buckets: 50% for Needs, 30% for Wants, and 20% for Savings/Debt Payoff.",
          "It doesn't care if your 'Wants' bucket was spent entirely on concert tickets or evenly divided between restaurants and video games. As long as you hit the 20% savings target and keep needs under 50%, you succeed."
        ],
        bullets: [
          "Low maintenance: Just check three macro percentages.",
          "Flexible: Doesn't force guilt over specific purchases.",
          "Lacks granularity: Can fail if you don't actually know what constitutes a 'Need'."
        ]
      },
      {
        heading: "When 50/30/20 breaks down",
        paragraphs: [
          "In high-cost-of-living areas, keeping housing, transportation, and groceries under 50% of after-tax income is virtually impossible for an entry-level worker. A strict adherence might make you feel like you are failing.",
          "Conversely, for very high earners, spending 30% of income on 'Wants' is wildly irresponsible and leads to lifestyle inflation. 50/30/20 is best viewed as a starting template for median incomes, not a rigid law."
        ]
      },
      {
        heading: "Graduating from Zero-Based",
        paragraphs: [
          "Many successful savers start with Zero-Based budgeting to stop the bleeding and learn their true habits. After a few years, their savings become automated and their spending naturally regulates.",
          "At that point, moving to an automated 'pay yourself first' system (a loose variant of 50/30/20) frees up hours of mental bandwidth."
        ]
      }
    ],
    bestFor: [
      { persona: "First-time budgeter", pick: "b", rationale: "Friction kills habits; 50/30/20 is the lowest-friction system that still works." },
      { persona: "Variable income / freelancer", pick: "a", rationale: "Build the budget from your actual income each month, averages lie." },
      { persona: "Couple with shared finances", pick: "a", rationale: "Category-level visibility prevents the 'where did our money go?' arguments." },
      { persona: "Already in good shape, wants light maintenance", pick: "b", rationale: "Quarterly checkpoint is enough when leaks are small." },
    ],
    verdict:
      "Start with 50/30/20 to build the habit, graduate to zero-based when you want surgical control. Switching back when life simplifies is fine, the budget is a tool, not a religion.",
    faqs: [
      { q: "Can I do both in the same year?", a: "Yes, zero-based the months that need it, 50/30/20 the rest. Pick one as the annual check-in." },
      { q: "What about pay-yourself-first?", a: "Pay-yourself-first is the savings automation that pairs with either framework, it's not a competitor." },
      { q: "Which app supports which?", a: "YNAB is built for zero-based. Monarch and Copilot work for either. Mint-style apps lean 50/30/20 because they auto-categorize." },
    ],
    internalLinks: [
      { label: "Zero-based budgeting explained", to: "/budgeting/zero-based-budgeting" },
      { label: "The 50/30/20 rule", to: "/budgeting/the-50-30-20-rule-a-beginners-guide" },
      { label: "Best for freelancers", to: "/budgeting/best-for/freelancers" },
      { label: "Budget Planner Tool", to: "/tools/budget-planner" },
      { label: "Snowball vs Avalanche", to: "/debt-taxes-insurance/vs/snowball-vs-avalanche" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  // ---------- banking: Online bank vs Credit Union ----------
  {
    pillar: "banking",
    slug: "online-bank-vs-credit-union",
    title: "Online Bank vs Credit Union: Which One Should You Switch To?",
    metaTitle: "Online Bank vs Credit Union (2026) | MoneyMoodBoard",
    metaDescription:
      "Online banks vs credit unions compared on rates, branches, ATM access, customer service, and the right home for your everyday checking.",
    summary:
      "Online banks usually pay higher savings rates and rebate ATM fees but have no branches. Credit unions are not-for-profit, offer competitive rates and personal service, but membership is sometimes restricted. Many households end up with one of each.",
    a: {
      name: "Online Bank",
      oneLiner: "A bank with no physical branches, operated entirely via app and web (e.g., Ally, Marcus, SoFi).",
      sameAs: ["https://en.wikipedia.org/wiki/Direct_bank", "https://www.wikidata.org/wiki/Q1138930"],
    },
    b: {
      name: "Credit Union",
      oneLiner: "A member-owned, not-for-profit financial cooperative insured by the NCUA.",
      sameAs: ["https://en.wikipedia.org/wiki/Credit_union", "https://www.wikidata.org/wiki/Q1370010"],
    },
    criteria: [
      { name: "Savings APY", a: "Among the highest available.", b: "Competitive, sometimes top-of-market.", winner: "a" },
      { name: "Loan rates (auto, personal)", a: "Average to good.", b: "Usually best in market.", winner: "b" },
      { name: "Branch access", a: "None.", b: "Local + shared-branch network (CO-OP).", winner: "b" },
      { name: "ATM access", a: "Usually rebates all fees nationwide.", b: "Large surcharge-free networks (CO-OP, Allpoint).", winner: "tie" },
      { name: "Customer service", a: "Chat-first, decent.", b: "In-person, often excellent.", winner: "b" },
      { name: "Deposit insurance", a: "FDIC up to $250k.", b: "NCUA up to $250k.", winner: "tie" },
    ],
    sections: [
      {
        heading: "The Yield and Fee Gap",
        paragraphs: [
          "Online banks (like Ally, SoFi, or Capital One) don't have to pay for marble lobbies, tellers, or localized marketing. They pass those savings on via drastically higher yields on savings accounts and a near-total absence of overdraft or maintenance fees.",
          "While Credit Unions are non-profits, their savings rates rarely match the aggressive APYs offered by national online banks."
        ],
        bullets: [
          "Online Bank: 4-5% APY on savings, zero maintenance fees.",
          "Credit Union: 0.1-1% APY on savings, very low fees."
        ]
      },
      {
        heading: "The Lending and Relationship Advantage",
        paragraphs: [
          "Credit Unions excel when you need to borrow money. Because they are member-owned, their auto loan and mortgage rates are often significantly lower than commercial banks.",
          "Furthermore, if you have a complex financial situation or a bruised credit score, a Credit Union loan officer can look at your holistic profile and make a human decision. An online bank's algorithm will simply auto-reject you."
        ],
        bullets: [
          "Credit Union: Superior rates on auto loans, personal loans, and mortgages.",
          "Online Bank: Highly automated, rigid lending criteria."
        ]
      },
      {
        heading: "Physical Cash and Cashier's Checks",
        paragraphs: [
          "If you are a bartender, server, or run a cash-heavy small business, an online bank is a nightmare. Depositing physical cash into an online bank often involves buying money orders or using sketch third-party retail networks.",
          "Credit unions offer physical branches, easy cash deposits, notary services, and immediate cashier's checks for buying a car or closing on a house."
        ]
      },
      {
        heading: "The Ultimate Setup: Use Both",
        paragraphs: [
          "There is no rule saying you must be monogamous with your banking. The optimal setup for many is an Online Bank for the bulk of their emergency fund and daily checking (maximizing yield and app experience), coupled with a local Credit Union account.",
          "The Credit Union account acts as a portal for cash deposits, notary needs, and future auto loans."
        ]
      }
    ],
    bestFor: [
      { persona: "Yield-maximizing saver", pick: "a", rationale: "Online banks own the high-yield savings game." },
      { persona: "Auto-loan shopper", pick: "b", rationale: "Credit unions consistently undercut bank auto-loan rates." },
      { persona: "Needs occasional in-person service", pick: "b", rationale: "Branch access is irreplaceable for some transactions (notarization, wires)." },
      { persona: "Cashback-checking + HYSA stack", pick: "a", rationale: "Many online banks combo a no-fee checking with a 4–5% HYSA." },
    ],
    verdict:
      "It's not online bank vs credit union, it's pick one of each. Use the online bank for savings and everyday checking, the credit union for loans and the rare branch errand.",
    faqs: [
      { q: "What about big national banks (Chase, Wells, BofA)?", a: "Convenient if you need branches everywhere, but their savings rates are typically 50–100× lower than online banks. The convenience tax is real." },
      { q: "Is NCUA insurance as safe as FDIC?", a: "Functionally yes, same $250k limit, both U.S. government backing. Credit unions in NCUA-insured status have a strong record." },
      { q: "Can I direct-deposit to multiple accounts?", a: "Most employers allow splits. Send 80–90% to the online bank, route the loan payments to the credit union to capture relationship rate discounts." },
    ],
    internalLinks: [
      { label: "How to choose a checking account", to: "/banking/how-to-choose-a-checking-account" },
      { label: "Banking pillar", to: "/banking" },
      { label: "HYSA vs Money Market", to: "/saving/vs/hysa-vs-money-market" },
      { label: "Best for expats", to: "/banking/best-for/expats" },
      { label: "Budget Planner", to: "/tools/budget-planner" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
];

export const getComparison = (
  pillarSlug: string,
  matchup: string,
): Comparison | undefined =>
  comparisons.find((c) => c.pillar === pillarSlug && c.slug === matchup);

export const getComparisonsForPillar = (pillarSlug: PillarSlug): Comparison[] =>
  comparisons.filter((c) => c.pillar === pillarSlug);
