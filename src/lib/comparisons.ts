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
  /** "a" | "b" | "tie" — drives the at-a-glance scorecard. */
  winner: "a" | "b" | "tie";
}

export interface ComparisonOption {
  name: string;
  /** One-sentence definition for screen readers + glossary. */
  oneLiner: string;
  /** Wikidata / Wikipedia URLs — fed into ItemList schema. */
  sameAs?: string[];
}

export interface Comparison {
  pillar: PillarSlug;
  slug: string; // unique within pillar, e.g. "roth-vs-traditional-ira"
  title: string; // H1
  metaTitle: string; // <title>
  metaDescription: string;
  /** Quick answer — appears under H1. */
  summary: string;
  a: ComparisonOption;
  b: ComparisonOption;
  /** 4–6 rows for the scorecard. */
  criteria: ComparisonCriterion[];
  /** 2–4 short sections (H2) explaining context. */
  sections: { heading: string; paragraphs: string[] }[];
  /** Persona-based verdict block. */
  bestFor: { persona: string; pick: "a" | "b"; rationale: string }[];
  /** Hero verdict — one paragraph. */
  verdict: string;
  faqs: { q: string; a: string }[];
  /** Curated internal links — must include both source guides + ≥1 cross-pillar. */
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
      "Roth vs Traditional IRA compared on tax treatment, income limits, withdrawals, RMDs and estate planning — with the right pick for each life stage.",
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
          "If your marginal tax bracket in retirement will be the same as it is today and you invest the deduction from a Traditional IRA, the two accounts end up mathematically identical. In practice almost no one reinvests the deduction, which is exactly why most younger savers in the 12% or 22% bracket end up better off in a Roth.",
          "High earners staring down the Roth income limit have a workaround: contribute non-deductible dollars to a Traditional IRA and convert to Roth in the same year — the backdoor Roth — provided they don't have other pre-tax IRA balances triggering the pro-rata rule.",
        ],
      },
      {
        heading: "The flexibility gap people underrate",
        paragraphs: [
          "Roth contributions (not earnings) can be withdrawn any time without penalty. That makes a Roth IRA the closest thing to a 'do everything' account in the U.S. system — retirement vehicle, backup emergency reserve, first-home down payment ($10k earnings carve-out), and college fund all at once.",
          "Traditional IRAs are far more rigid: any withdrawal before 59½ usually costs 10% in penalty plus ordinary-income tax. Used correctly that rigidity is a feature, not a bug, but it's a real cost to optionality.",
        ],
      },
      {
        heading: "When the Traditional IRA still wins",
        paragraphs: [
          "Three groups should usually pick Traditional: (1) high earners in their peak years who expect a much lower retirement bracket, (2) anyone close to a tax cliff (e.g., losing a child-tax credit or ACA subsidy) where a deduction unlocks real cash, and (3) early retirees planning to use the Roth Conversion Ladder to move money from Traditional to Roth at a lower future bracket.",
        ],
      },
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
      { q: "Is a Roth conversion worth it?", a: "Often yes in a low-income year — sabbatical, gap year, early retirement before Social Security. Pay tax at today's lower bracket and lock in tax-free growth forever." },
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
      "401(k) vs IRA on contribution limits, employer match, fees, investment menu and withdrawal rules — and the funding order that beats both in isolation.",
    summary:
      "A 401(k) is offered through your employer with much higher contribution limits and (usually) a free employer match; an IRA is opened on your own with a far better investment menu and lower fees. Most workers should use both — match first, then IRA, then back to the 401(k).",
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
      { name: "Employer match", a: "Common — typically 3–6% of salary, free money.", b: "None.", winner: "a" },
      { name: "Investment menu", a: "Restricted to plan-sponsor lineup; fees vary widely.", b: "Almost every public stock, ETF and mutual fund.", winner: "b" },
      { name: "Fees", a: "Plan-admin + fund expense — can exceed 1%/yr in bad plans.", b: "$0 at major brokerages; ETFs from 0.03%.", winner: "b" },
      { name: "Roth option", a: "Roth 401(k) increasingly common, with the same high limit.", b: "Roth IRA available, subject to income limits.", winner: "tie" },
      { name: "Early-access flexibility", a: "Plan loans + Rule of 55 carve-out.", b: "Roth contributions withdrawable anytime; SEPP for Traditional.", winner: "tie" },
    ],
    sections: [
      {
        heading: "The funding order that beats either in isolation",
        paragraphs: [
          "The math almost always works out the same way: contribute to the 401(k) just enough to capture the full employer match, then move to an IRA where fees are lower and the investment menu is wider, then come back to the 401(k) to fill the rest of the limit.",
          "Skipping the match is the single most expensive mistake in personal finance. A 50% match on a 6% salary deferral is an instant 50% return on that money — no investment will ever beat it.",
        ],
      },
      {
        heading: "When the IRA-first rule breaks",
        paragraphs: [
          "Two situations flip the order. First, a high earner already over the Roth income limit and unable to deduct a Traditional IRA gets less benefit from the IRA — go heavier on the 401(k) for the deduction. Second, a plan with truly bad fees (1.5%+ all-in) makes the IRA the better second dollar even after the match.",
          "Either way, capture the match first. Nothing else is close.",
        ],
      },
    ],
    bestFor: [
      { persona: "Anyone with an employer match", pick: "a", rationale: "Capture the match before touching anything else — period." },
      { persona: "Self-employed / no employer plan", pick: "b", rationale: "Solo 401(k) or SEP-IRA is the better play; if neither, stack a Roth IRA + taxable." },
      { persona: "High earner above Roth limits", pick: "a", rationale: "401(k) deduction lowers AGI which may restore other benefits; backdoor Roth handles the IRA side." },
      { persona: "Bad 401(k) plan (>1% fees)", pick: "b", rationale: "Match first, then IRA, only top up the 401(k) if you have nothing else." },
    ],
    verdict:
      "It's not 401(k) vs IRA — it's 401(k) match, then IRA, then more 401(k). Treating them as either/or leaves the most valuable dollar (the match) on the table.",
    faqs: [
      { q: "What if I leave my job?", a: "Rolling the 401(k) to an IRA is usually the right call — same tax treatment, dramatically better investment menu, lower fees. Skip the rollover only if you're under 55 and need Rule of 55 access." },
      { q: "Can I contribute to both in one year?", a: "Yes, the limits are separate. A 50-year-old can put $31,000 in a 401(k) and $8,000 in an IRA in 2026 — $39,000 total." },
      { q: "Should I use a Roth or Traditional 401(k)?", a: "Same logic as Roth vs Traditional IRA — bracket-now vs bracket-later. The contribution limit is identical for either flavor of 401(k)." },
    ],
    internalLinks: [
      { label: "401(k) basics", to: "/retirement/401k-basics" },
      { label: "Roth IRA vs Traditional IRA", to: "/retirement/vs/roth-vs-traditional-ira" },
      { label: "Retirement Savings Calculator", to: "/tools/retirement-savings-calculator" },
      { label: "Best for self-employed", to: "/retirement/best-for-self-employed" },
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
      "An ETF and a mutual fund can hold the exact same basket of stocks — the differences are in how you buy them, how the IRS taxes them, and how much they cost to own. For a taxable brokerage account, the ETF almost always wins. Inside a 401(k) or IRA, it's usually a tie.",
    a: {
      name: "ETF",
      oneLiner: "Exchange-traded fund — a basket of securities that trades like a stock during market hours.",
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
      { name: "Automatic recurring investment", a: "Limited — requires fractional support.", b: "Built-in everywhere; the original 'set and forget'.", winner: "b" },
      { name: "Intraday trading", a: "Yes, any time the market is open.", b: "Once a day at 4pm NAV.", winner: "a" },
      { name: "Inside 401(k)", a: "Often not on the menu.", b: "Dominant choice in plan lineups.", winner: "b" },
    ],
    sections: [
      {
        heading: "Why ETFs are quietly more tax-efficient",
        paragraphs: [
          "Mutual funds have to sell holdings to meet redemptions, which generates taxable capital gains the fund distributes to every shareholder — including ones who joined yesterday. ETFs use a creation/redemption mechanism that lets institutional traders swap shares for the underlying basket without selling, so the fund itself almost never realises gains.",
          "For long-term holders in a taxable brokerage account, that mechanical difference can be worth a few tenths of a percent per year, every year, forever. Inside an IRA or 401(k) the difference vanishes because nothing in the account is taxed until withdrawal.",
        ],
      },
      {
        heading: "Where mutual funds still earn their keep",
        paragraphs: [
          "Two scenarios. First, automated dollar-cost averaging at most brokers still works more cleanly with a mutual fund — pick an amount, pick a date, done. Second, several great index funds (especially in 401(k) menus) only exist in mutual-fund form, and avoiding them just to use an ETF is a bad reason.",
        ],
      },
    ],
    bestFor: [
      { persona: "Taxable brokerage account", pick: "a", rationale: "Tax efficiency over decades is meaningful and free." },
      { persona: "Inside a 401(k)/IRA", pick: "b", rationale: "Use whatever your plan offers — tax wrapper makes the choice neutral." },
      { persona: "Beginner with $50–$500/mo recurring", pick: "b", rationale: "Auto-invest into a target-date or index mutual fund is the cleanest setup." },
      { persona: "Active rebalancer", pick: "a", rationale: "Intraday liquidity plus tax efficiency on the rebalance." },
    ],
    verdict:
      "Default to ETFs in a taxable account, mutual funds in a workplace retirement plan, and don't lose sleep over the choice — the strategy (broad-index, low-cost, hold forever) matters 100× more than the wrapper.",
    faqs: [
      { q: "Are ETFs riskier than mutual funds?", a: "No. An S&P 500 ETF and an S&P 500 mutual fund own essentially the same stocks; the daily price moves identically. Riskier holdings (leveraged, single-country, themes) exist in both wrappers." },
      { q: "Do I pay commission to trade ETFs?", a: "Major U.S. brokers eliminated ETF commissions in 2019. You pay the bid/ask spread, which is pennies on a major index ETF." },
      { q: "What about index funds — are those different?", a: "An index fund is a strategy, not a wrapper. The same index strategy comes in both ETF and mutual-fund form (e.g., Vanguard's VOO is the ETF, VFIAX is the mutual fund)." },
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
      "An index fund tracks a single market — usually the whole U.S. or world stock market — and never changes. A target-date fund holds a mix of index funds and automatically shifts from stocks to bonds as your retirement year approaches. Target-date is one decision; index is two or three.",
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
      { name: "Tax efficiency in taxable account", a: "Better — pure stock index funds throw off less in gains/dividends.", b: "Worse — automatic rebalancing creates taxable events.", winner: "a" },
    ],
    sections: [
      {
        heading: "Why most new investors should start with a target-date fund",
        paragraphs: [
          "The number-one cause of long-term underperformance isn't fund choice — it's behavior: missing rebalances, panic-selling in downturns, drifting into stock-heavy allocations near retirement. Target-date funds solve all three by making the right behavior automatic.",
          "The slightly higher fee (a few basis points) is the cheapest insurance in finance for an investor who would otherwise tinker.",
        ],
      },
      {
        heading: "Why experienced investors graduate to index funds",
        paragraphs: [
          "Two reasons. First, taxable accounts: target-date funds rebalance inside the fund, which creates capital-gains distributions you can't avoid. Pure index funds let you control when gains are realised. Second, factor tilts: investors who want value, small-cap, or higher international weights can't get them inside a one-size-fits-all target-date fund.",
        ],
      },
    ],
    bestFor: [
      { persona: "New investor, 401(k)", pick: "b", rationale: "Pick the fund matching your retirement year, set the contribution percentage, ignore the news." },
      { persona: "Taxable brokerage saver", pick: "a", rationale: "Avoid forced capital-gains distributions; control rebalancing year-end." },
      { persona: "Three-fund-portfolio fan (Bogleheads)", pick: "a", rationale: "U.S. total market + international + bonds gives identical exposure at lower fees." },
      { persona: "Tinkerer with no system", pick: "b", rationale: "Automation beats intention — let the fund do the job you keep skipping." },
    ],
    verdict:
      "If you're going to leave it alone for 30 years and would otherwise drift or panic, the target-date fund is the better choice even at a slightly higher fee. If you're disciplined and especially if you're in a taxable account, the three-fund index portfolio wins on fees and control.",
    faqs: [
      { q: "Can I hold both?", a: "Yes — many investors use a target-date fund inside their 401(k) and a three-fund index portfolio in their IRA / taxable brokerage." },
      { q: "What does the 'glidepath' actually do?", a: "It gradually moves the fund from ~90% stocks in your 20s to ~30–50% stocks at retirement. Different fund families use different paths — Vanguard ends near 30% stocks, Fidelity nearer 50%." },
      { q: "Is the target year a hard deadline?", a: "No. The fund keeps glidepath-rebalancing for 5–25 years after the target date. Picking a date 5 years past your real retirement gives a slightly higher stock weight if you want it." },
    ],
    internalLinks: [
      { label: "ETF vs mutual fund", to: "/investing/vs/etf-vs-mutual-fund" },
      { label: "Index fund investing", to: "/investing/index-fund-investing" },
      { label: "Retirement Savings Calculator", to: "/tools/retirement-savings-calculator" },
      { label: "Best for late-starters (40+)", to: "/investing/best-for-late-starters" },
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
      { name: "Math optimality", a: "Suboptimal — costs more interest.", b: "Optimal — minimum total interest.", winner: "b" },
      { name: "Motivation / completion rate", a: "Higher — fast first wins reinforce the habit.", b: "Lower — first win can take many months.", winner: "a" },
      { name: "Total interest paid", a: "Slightly higher (often <$1k difference on average household debt).", b: "Lowest possible.", winner: "b" },
      { name: "Setup complexity", a: "Sort debts by balance ascending. Done.", b: "Sort by APR descending. Done.", winner: "tie" },
      { name: "Best with mixed-rate, mixed-size debts", a: "Wins when there's at least one tiny balance to knock out.", b: "Wins when one debt is dramatically higher-rate.", winner: "tie" },
    ],
    sections: [
      {
        heading: "The behavioral research is unusually clear",
        paragraphs: [
          "A widely cited Northwestern Kellogg study found that snowballers were measurably more likely to finish their debt-payoff plan than avalanchers. The interest premium was small ($1–$3 per $100 of debt), the completion-rate gap was large.",
          "The math says avalanche. The data says snowball, because finishing matters more than optimizing.",
        ],
      },
      {
        heading: "When the math gap is too big to ignore",
        paragraphs: [
          "If one debt is dramatically higher-rate — a 29% store card next to a 6% student loan — the interest premium of snowball can move from 'small' to 'painful' fast. The hybrid move: kill the smallest debt for the psychological win, then jump to the highest rate for the rest.",
          "Either way, avoid the middle path of 'paying a little extra on everything'. Both methods only work because the entire snowball or avalanche payment rolls onto the next target after each debt clears.",
        ],
      },
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
      { q: "What if my debts are all the same interest rate?", a: "The methods collapse — pay smallest first because it's faster mental closure." },
      { q: "Should I keep the credit cards open after payoff?", a: "Yes, to preserve credit utilization and average age of account, unless they carry an annual fee with no benefit." },
      { q: "What about a consolidation loan?", a: "Useful if it lowers your weighted-average APR and you won't run the cards back up. Otherwise it's a delaying tactic." },
    ],
    internalLinks: [
      { label: "Debt snowball deep-dive", to: "/debt-taxes-insurance/debt-snowball-method" },
      { label: "Debt avalanche deep-dive", to: "/debt-taxes-insurance/debt-avalanche-method" },
      { label: "Debt Payoff Calculator", to: "/tools/debt-payoff-calculator" },
      { label: "Credit Card Payoff Calculator", to: "/tools/credit-card-payoff-calculator" },
      { label: "Best for recent grads", to: "/debt-taxes-insurance/best-for-recent-grads" },
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
      "Cashback is simple, flexible, and gets the same value every time — usually 1.5–2% back. Travel rewards can be worth 2–5¢ per point if you're willing to learn airline transfer partners, but they expire, devalue, and are useless for non-travelers. The right answer depends on whether you actually fly.",
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
      { name: "Worst-case redemption value", a: "Still 2¢ — every dollar of spend.", b: "≤1¢ if you cash out points.", winner: "a" },
      { name: "Annual fee floor", a: "$0 cards earn 1.5–2%.", b: "Top transfer cards run $95–$695.", winner: "a" },
      { name: "Learning curve", a: "None.", b: "Steep — partners, devaluations, award-search tools.", winner: "a" },
      { name: "Welcome-bonus value", a: "$200–$300 typical.", b: "$750–$1,500 in travel value common.", winner: "b" },
      { name: "Useless if you don't travel", a: "No.", b: "Mostly yes.", winner: "a" },
    ],
    sections: [
      {
        heading: "The honest cashback math",
        paragraphs: [
          "On $40,000 of annual card spend, a 2% flat-cash card returns $800/year, no fee, no learning curve, no expiration. A top travel card can return $1,200–$2,000/year of travel value — but only if you actually take 2+ international trips, redeem through transfer partners, and stomach a $95–$695 annual fee.",
          "If you'd otherwise have to pay cash for those flights, the travel card wins by a wide margin. If you wouldn't have flown anyway, you're just buying yourself trips you couldn't afford and calling it 'free'.",
        ],
      },
      {
        heading: "The portfolio approach beats either alone",
        paragraphs: [
          "Most optimisers run two cards: a 2% flat-cash card as the daily driver, and one premium travel card for the welcome bonus and category multipliers (3–5x on flights, dining, groceries). You get cash on the long tail of random spend and points on the categories that actually multiply.",
          "The card spec sheet matters less than your spending pattern. Pull a year of statements before applying — it will tell you whether you actually spend $4k+/yr on travel and dining or whether you've been overpaying for an annual fee.",
        ],
      },
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
      { label: "Best for students", to: "/credit-cards/best-for-students" },
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
      { name: "Best home for an emergency fund", a: "Yes — higher rate, no minimum.", b: "Workable if you need the check feature.", winner: "a" },
    ],
    sections: [
      {
        heading: "The check-writing trap",
        paragraphs: [
          "An emergency fund that can be tapped with a checkbook on a slow Sunday morning is a feature, not a bug — until the third Sunday in a row, when it's a leak. The HYSA's mild friction (transfer to checking, 1 business day) is a feature for people who notice their balance shrinking.",
          "If you genuinely need check-writing for one-off large purchases (rent in a non-Zelle building, a contractor deposit), an MMDA is a reasonable trade. Otherwise the HYSA's higher rate is free money.",
        ],
      },
      {
        heading: "Rate is not the whole picture",
        paragraphs: [
          "The top APY on either type of account often comes from an unfamiliar online bank. The headline rate is real, but check: FDIC certificate number, IndexCD/promo expiration, transfer limits (some HYSAs cap at $25k/day), and customer-service reputation.",
          "A bank one percentage point behind the leader but with a 24/7 phone line and a 50-year history is a fair trade-off for most people's emergency fund.",
        ],
      },
    ],
    bestFor: [
      { persona: "Building an emergency fund", pick: "a", rationale: "Higher APY, no minimums, just-enough friction to prevent leakage." },
      { persona: "Holding a down-payment deposit", pick: "b", rationale: "Check-writing makes the eventual large outflow simpler." },
      { persona: "Retiree managing monthly cashflow", pick: "b", rationale: "Debit + check access for occasional large pulls without moving to checking." },
      { persona: "Anyone with <$10k saved", pick: "a", rationale: "MMDA minimums often disqualify smaller balances from the top rate." },
    ],
    verdict:
      "Default to the HYSA. Choose the money market only if you genuinely need the checkbook or debit card — and then make sure the rate gap is small enough to be worth it.",
    faqs: [
      { q: "Are these the same as a money market fund?", a: "No. A money market deposit account is FDIC-insured. A money market mutual fund is an investment product, not insured, held at a brokerage. The names are confusingly similar — always check 'FDIC' before parking emergency money." },
      { q: "How often do rates change?", a: "Both rates float with the federal funds rate and can change daily — banks raise them slowly and cut them quickly. Recheck every 6 months." },
      { q: "Should I split between accounts?", a: "If you're above $250k at one bank, yes — to stay FDIC-insured. Below that, splitting accounts adds friction without yield benefit." },
    ],
    internalLinks: [
      { label: "What is a high-yield savings account?", to: "/saving/what-is-a-high-yield-savings-account" },
      { label: "How big should your emergency fund be?", to: "/saving/how-big-should-your-emergency-fund-be" },
      { label: "CDs vs T-Bills", to: "/saving/vs/cds-vs-t-bills" },
      { label: "Emergency Fund Calculator", to: "/tools/emergency-fund-calculator" },
      { label: "Best for new parents", to: "/saving/best-for-new-parents" },
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
      { name: "Default risk", a: "FDIC-insured to $250k.", b: "Backed by U.S. Treasury — the benchmark for risk-free.", winner: "b" },
      { name: "Early withdrawal", a: "Penalty of 3–12 months interest.", b: "Sell on the secondary market at the current price.", winner: "b" },
      { name: "Minimums", a: "$500–$1,000 typical.", b: "$100 minimum on TreasuryDirect; $1,000 in brokerage.", winner: "tie" },
      { name: "Reinvestment hassle", a: "Bank rolls automatically (often at a worse rate).", b: "Manual roll, or buy a ladder.", winner: "a" },
    ],
    sections: [
      {
        heading: "Why state tax often decides the question",
        paragraphs: [
          "T-bill interest is exempt from state and local income tax. For a saver in California (9.3% top rate) or New York City (~10.9% combined), that exemption is worth roughly half a percentage point of after-tax yield. A 4.8% T-bill can beat a 5.0% CD after tax.",
          "For a saver in Texas, Florida, Tennessee or another state with no income tax, the exemption is worth nothing and the higher headline CD rate wins.",
        ],
      },
      {
        heading: "Liquidity is a real edge",
        paragraphs: [
          "A T-bill in a brokerage can be sold any business day at the current price — usually within a few cents of par for shorter maturities. A CD redeemed early forfeits months of interest. For an emergency reserve that you genuinely won't touch, the difference is academic. For 'maybe-emergency' cash, the T-bill's liquidity matters.",
        ],
      },
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
      { q: "What about brokered CDs?", a: "Same FDIC insurance as bank CDs, but trade like a security on a brokerage — you can sell early at market price instead of taking the early-withdrawal penalty. Often the right middle ground." },
      { q: "How do I build a T-bill ladder?", a: "Buy equal amounts at 4-week, 8-week, 13-week and 26-week maturities. As each matures, buy another 26-week. You get a steady cash flow and average rate exposure." },
      { q: "Are T-bills risky if rates rise?", a: "Short-term T-bills (≤6 months) move minimally in price. The longer the maturity, the more rate risk — same as any bond." },
    ],
    internalLinks: [
      { label: "HYSA vs Money Market", to: "/saving/vs/hysa-vs-money-market" },
      { label: "How big should your emergency fund be?", to: "/saving/how-big-should-your-emergency-fund-be" },
      { label: "Saving pillar", to: "/saving" },
      { label: "Best for new parents", to: "/saving/best-for-new-parents" },
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
      { name: "Visibility of leaks", a: "High — every category shows up.", b: "Low — leaks hide inside 'wants'.", winner: "a" },
      { name: "Works for variable income", a: "Yes — rebuild monthly.", b: "Roughly — average income.", winner: "a" },
      { name: "Burnout risk", a: "Real if life gets busy.", b: "Low.", winner: "b" },
      { name: "Beginner friendliness", a: "Steep.", b: "Trivial.", winner: "b" },
    ],
    sections: [
      {
        heading: "The hybrid most long-term budgeters actually run",
        paragraphs: [
          "Pure 50/30/20 surfaces the question 'why are my wants 38% this year?' but doesn't answer it. Pure zero-based answers everything but burns out anyone whose life isn't on rails.",
          "Most veteran budgeters use a hybrid: 50/30/20 as the annual sanity check, zero-based for the months where something is clearly off (new job, new baby, big move). The framework chosen on January 1st is less important than the act of looking.",
        ],
      },
      {
        heading: "Where 50/30/20 quietly fails",
        paragraphs: [
          "The rule was written for households with one steady salary and predictable bills. It struggles in two cases: variable income (freelancers, tipped workers) and high-cost-of-living areas where rent alone clears 40% of take-home. In both cases, the buckets need adjusting — or you switch to zero-based.",
        ],
      },
    ],
    bestFor: [
      { persona: "First-time budgeter", pick: "b", rationale: "Friction kills habits; 50/30/20 is the lowest-friction system that still works." },
      { persona: "Variable income / freelancer", pick: "a", rationale: "Build the budget from your actual income each month — averages lie." },
      { persona: "Couple with shared finances", pick: "a", rationale: "Category-level visibility prevents the 'where did our money go?' arguments." },
      { persona: "Already in good shape, wants light maintenance", pick: "b", rationale: "Quarterly checkpoint is enough when leaks are small." },
    ],
    verdict:
      "Start with 50/30/20 to build the habit, graduate to zero-based when you want surgical control. Switching back when life simplifies is fine — the budget is a tool, not a religion.",
    faqs: [
      { q: "Can I do both in the same year?", a: "Yes — zero-based the months that need it, 50/30/20 the rest. Pick one as the annual check-in." },
      { q: "What about pay-yourself-first?", a: "Pay-yourself-first is the savings automation that pairs with either framework — it's not a competitor." },
      { q: "Which app supports which?", a: "YNAB is built for zero-based. Monarch and Copilot work for either. Mint-style apps lean 50/30/20 because they auto-categorize." },
    ],
    internalLinks: [
      { label: "Zero-based budgeting explained", to: "/budgeting/zero-based-budgeting" },
      { label: "The 50/30/20 rule", to: "/budgeting/the-50-30-20-rule-a-beginners-guide" },
      { label: "Best for freelancers", to: "/budgeting/best-for-freelancers" },
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
        heading: "The two-account setup most savers actually run",
        paragraphs: [
          "An online bank for high-yield savings + cashback debit/checking, a local credit union for car loans and personal service. Both are free, both insured, both deliver something the other can't.",
          "Trying to consolidate to one account at one institution is usually a small downgrade — either you lose 1–2% on savings or 1–2% on loans, depending on which side you collapse to.",
        ],
      },
      {
        heading: "How to qualify for a credit union",
        paragraphs: [
          "Membership rules vary: some are employer- or geography-based, some are open to anyone in a partner association. National-charter credit unions like Alliant, Pentagon Federal and Navy Federal accept members from most of the country with a tiny one-time donation or affiliation.",
        ],
      },
    ],
    bestFor: [
      { persona: "Yield-maximizing saver", pick: "a", rationale: "Online banks own the high-yield savings game." },
      { persona: "Auto-loan shopper", pick: "b", rationale: "Credit unions consistently undercut bank auto-loan rates." },
      { persona: "Needs occasional in-person service", pick: "b", rationale: "Branch access is irreplaceable for some transactions (notarization, wires)." },
      { persona: "Cashback-checking + HYSA stack", pick: "a", rationale: "Many online banks combo a no-fee checking with a 4–5% HYSA." },
    ],
    verdict:
      "It's not online bank vs credit union — it's pick one of each. Use the online bank for savings and everyday checking, the credit union for loans and the rare branch errand.",
    faqs: [
      { q: "What about big national banks (Chase, Wells, BofA)?", a: "Convenient if you need branches everywhere, but their savings rates are typically 50–100× lower than online banks. The convenience tax is real." },
      { q: "Is NCUA insurance as safe as FDIC?", a: "Functionally yes — same $250k limit, both U.S. government backing. Credit unions in NCUA-insured status have a strong record." },
      { q: "Can I direct-deposit to multiple accounts?", a: "Most employers allow splits. Send 80–90% to the online bank, route the loan payments to the credit union to capture relationship rate discounts." },
    ],
    internalLinks: [
      { label: "How to choose a checking account", to: "/banking/how-to-choose-a-checking-account" },
      { label: "Banking pillar", to: "/banking" },
      { label: "HYSA vs Money Market", to: "/saving/vs/hysa-vs-money-market" },
      { label: "Best for expats", to: "/banking/best-for-expats" },
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
