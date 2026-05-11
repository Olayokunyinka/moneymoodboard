import {
  Wallet,
  CreditCard,
  TrendingUp,
  Sunset,
  PiggyBank,
  Landmark,
  Receipt,
  type LucideIcon,
} from "lucide-react";

export type PillarSlug =
  | "budgeting"
  | "credit-cards"
  | "investing"
  | "retirement"
  | "saving"
  | "banking"
  | "debt-taxes-insurance";

export type PostType = "Definition" | "Guide" | "Comparison" | "List";

export interface ClusterPost {
  title: string;
  slug: string; // relative to pillar
  excerpt: string;
  readMin: number;
  type: PostType;
}

export interface ClusterGroup {
  name: string;
  intro: string;
  posts: ClusterPost[];
}

export interface Pillar {
  slug: PillarSlug;
  name: string;
  shortName: string;
  navLabel: string;
  oneLiner: string;
  intro: string;
  whatIs: string;
  icon: LucideIcon;
  tagClass: string;
  borderClass: string;
  clusters: ClusterGroup[];
  faqs: { q: string; a: string }[];
  relatedTools: { name: string; slug: string }[];
}

const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const p = (
  title: string,
  excerpt: string,
  readMin: number,
  type: PostType,
  slugOverride?: string,
): ClusterPost => ({
  title,
  slug: slugOverride ?? slugify(title),
  excerpt,
  readMin,
  type,
});

export const pillars: Pillar[] = [
  {
    slug: "budgeting",
    name: "Budgeting",
    shortName: "Budgeting",
    navLabel: "Budgeting",
    oneLiner: "Zero-based budgeting, envelope method, budgeting apps.",
    intro:
      "Budgeting is how you tell your money where to go before the month tells you where it went. Whether you earn a steady salary, juggle variable income, or share finances with a partner, a good budget brings calm, clarity and choice. This pillar breaks down the most popular budgeting methods — zero-based, 50/30/20, envelope, pay-yourself-first — and helps you pick the one that fits your brain and your bills. You'll find step-by-step setup guides, app comparisons, templates, and budgeting playbooks for specific life stages: students, new parents, couples, freelancers and retirees. Every guide is written to be read once and used for years.",
    whatIs:
      "Budgeting is the practice of planning how you'll spend, save, and give every dollar of your income before the month begins. It works by listing your expected income, assigning amounts to fixed bills, variable spending, savings goals and debt payoff, then tracking the gap between plan and reality. A budget isn't a restriction — it's a permission slip. By deciding in advance, you stop relying on willpower at the checkout and start building the financial life you actually want. Budgeting is for anyone with income and outflows, regardless of how much they earn.",
    icon: Wallet,
    tagClass: "bg-pillar-budgeting text-pillar-budgeting-fg",
    borderClass: "hover:border-pillar-budgeting-fg/50",
    clusters: [
      {
        name: "Budgeting Methods",
        intro: "Pick a system that matches how your brain handles money — there is no single right answer.",
        posts: [
          p("Zero-Based Budgeting Explained", "Assign every dollar a job until income minus allocations equals zero — the system that gives the fastest control over your money.", 9, "Definition", "zero-based-budgeting"),
          p("The 50/30/20 Rule: A Beginner's Guide", "Split take-home pay 50% needs, 30% wants, 20% savings and debt — the simplest budget that still works in a high-cost-of-living world.", 7, "Guide"),
          p("Envelope Method in 2026 (Cash & Digital)", "The classic cash-envelope system, modernized for tap-to-pay and digital banks — including the apps that replicate it without paper.", 8, "Guide"),
          p("Pay-Yourself-First Budgeting", "Move savings before spending happens. The 'set it and forget it' method behind almost every six-figure savings story.", 6, "Definition"),
          p("Reverse Budgeting for Variable Income", "Plan from the lowest paycheck of the last 12 months, not the average. The budget freelancers and tipped workers actually stick to.", 7, "Guide"),
          p("Kakeibo: The Japanese Mindful Budget", "A 120-year-old pen-and-paper method that pairs four simple buckets with weekly journaling — slow, deliberate, surprisingly effective.", 6, "Definition"),
        ],
      },
      {
        name: "Budgeting Apps & Tools",
        intro: "Honest reviews of the apps that actually keep budgets alive past month two.",
        posts: [
          p("YNAB vs Monarch vs Copilot", "A head-to-head review of the three apps serious budgeters actually pay for in 2026 — pricing, philosophy, and who each one is for.", 10, "Comparison"),
          p("Best Free Budgeting Apps", "Eight free apps that handle real budgets without selling your data or upselling you on premium tiers you don't need.", 8, "List"),
          p("Best Budgeting Apps for Couples", "Shared accounts, joint goals, separate fun money. The five apps built around two-person finances — and which one fits which couple.", 7, "List"),
          p("Spreadsheet vs App: Which Wins?", "When a Google Sheet outperforms a $99-a-year app, and when the app is worth every cent. A side-by-side breakdown.", 6, "Comparison"),
        ],
      },
      {
        name: "Budgeting for Life Stages",
        intro: "Your budget should grow with you. Here's how to retool it at every milestone.",
        posts: [
          p("Budgeting in Your 20s", "Small income, big leverage. The categories, percentages and habits that turn an entry-level salary into long-term wealth.", 8, "Guide"),
          p("Budgeting as a New Parent", "Childcare, diapers, daycare waitlists. The budget shifts that hit hardest in year one — and what to plan for before baby arrives.", 9, "Guide"),
          p("Budgeting on Variable Income", "Build a paycheck from a feast-or-famine income. The buffer-account system used by freelancers, realtors and rideshare drivers.", 8, "Guide"),
          p("Budgeting Together as a Couple", "Yours, mine, ours — the three-account setup most successful couples land on, plus how to run a monthly money date that doesn't suck.", 8, "Guide"),
          p("Retirement Budgeting Basics", "Spending in retirement isn't just less — it's different. How housing, healthcare and travel reshape a budget after age 65.", 9, "Guide"),
        ],
      },
    ],
    faqs: [
      { q: "What is the easiest budgeting method for beginners?", a: "The 50/30/20 rule is the simplest entry point: 50% of after-tax income to needs, 30% to wants, 20% to savings and debt. It requires no apps and almost no math." },
      { q: "How often should I update my budget?", a: "Spend 10 minutes weekly checking actuals vs plan, and 30 minutes monthly resetting categories. Most people fail by updating too rarely, not too often." },
      { q: "Is budgeting still useful if I earn a lot?", a: "Yes. Higher earners often have higher leakage. A budget converts a strong income into actual wealth." },
    ],
    relatedTools: [
      { name: "Budget Planner", slug: "budget-planner" },
      { name: "Emergency Fund Calculator", slug: "emergency-fund-calculator" },
    ],
  },
  {
    slug: "credit-cards",
    name: "Credit & Cards",
    shortName: "Credit",
    navLabel: "Credit Cards",
    oneLiner: "Building credit, picking the right card, avoiding interest.",
    intro:
      "Credit cards are one of the most powerful — and most misunderstood — tools in personal finance. Used well, they build credit, pay you cashback or travel rewards, and protect your purchases. Used poorly, they quietly cost the average household thousands of dollars a year in interest. This pillar covers everything from building credit from zero, to choosing your first card, to picking between cashback, points and travel cards, to escaping high-interest debt with balance transfers. Every guide assumes you want to win the game, not just survive it.",
    whatIs:
      "A credit card is a revolving line of credit issued by a bank that lets you borrow up to a set limit and repay it monthly. If you pay the full statement balance by the due date, you owe no interest — turning the card into a free 30-day loan, plus rewards and protections. If you only pay the minimum, the card charges interest (often 20% APR or higher) on the unpaid balance, which compounds quickly. Used responsibly, credit cards are the fastest legitimate way to build a strong credit score, which lowers the cost of every future loan you take.",
    icon: CreditCard,
    tagClass: "bg-pillar-credit text-pillar-credit-fg",
    borderClass: "hover:border-pillar-credit-fg/50",
    clusters: [
      {
        name: "Building & Repairing Credit",
        intro: "From thin file to 800+, the moves that actually move the needle.",
        posts: [
          p("How Credit Scores Are Calculated", "FICO and VantageScore break a three-digit number into five weighted factors. Here's what each one is worth and how to influence it.", 8, "Definition"),
          p("Building Credit From Zero", "Secured cards, credit-builder loans, becoming an authorized user — the four routes to a real credit history when you have none.", 7, "Guide"),
          p("How to Repair Bad Credit", "A 12-month plan to take a sub-600 score to the 700s, including which collections to dispute first and which to leave alone.", 10, "Guide"),
          p("Credit Utilization Explained", "Why your score drops the day after you swipe your card — and the simple trick that keeps utilization low without spending less.", 6, "Definition"),
          p("Authorized User Strategy", "The legitimate way to inherit a parent's or partner's credit age. When it helps, when it hurts, and how to do it right.", 6, "Guide"),
        ],
      },
      {
        name: "Choosing the Right Card",
        intro: "Cashback, travel, points, secured — match the card to your life.",
        posts: [
          p("Best Cashback Cards 2026", "Five no-annual-fee cards that pay 2% or more on everyday spending, plus one premium card that justifies its fee for high spenders.", 9, "List"),
          p("Best Travel Rewards Cards", "Sapphire, Venture, Amex Gold — a clear-eyed comparison of the four travel cards worth keeping, ranked by total value after fees.", 10, "List"),
          p("Best Cards for Bad Credit", "Secured cards that graduate to unsecured, and the three issuers most likely to approve you with a sub-650 score.", 8, "List"),
          p("Cashback vs Points vs Miles", "The same $1,000 of spending can return $20 or $200 depending on the currency. Here's how to know which one your lifestyle should chase.", 8, "Comparison"),
        ],
      },
      {
        name: "Escaping Card Debt",
        intro: "If you carry a balance, this cluster pays for the whole site.",
        posts: [
          p("Balance Transfer Cards Explained", "0% APR offers can save thousands — or trap you in a worse position. The math on transfer fees, promo length and post-promo APR.", 9, "Guide"),
          p("Avalanche vs Snowball Method", "Highest interest first vs smallest balance first. Both work; only one fits your psychology. How to choose without losing months.", 7, "Comparison"),
          p("Negotiating Lower APR", "A 10-minute phone call still works in 2026. The exact script, who to ask for, and the leverage points that actually move the rate.", 5, "Guide"),
          p("Should You Use a Personal Loan to Pay Off Cards?", "When consolidation actually saves money, and when it just resets the clock on debt you'll re-run up in 18 months.", 7, "Guide"),
        ],
      },
    ],
    faqs: [
      { q: "Do credit cards hurt your credit score?", a: "Only if you mismanage them. Used responsibly — paid in full, kept under 30% utilization — credit cards are the single best tool to build a strong credit score." },
      { q: "How many credit cards should I have?", a: "There is no perfect number. Two to four well-managed cards typically optimize rewards and credit-mix scoring without becoming hard to track." },
      { q: "What is the best card for a beginner?", a: "A no-annual-fee cashback card from a major issuer. Skip premium travel cards until your spending and credit history justify the fee." },
    ],
    relatedTools: [
      { name: "Credit Score Estimator", slug: "credit-score-estimator" },
      { name: "Credit Card Payoff Calculator", slug: "credit-card-payoff-calculator" },
    ],
  },
  {
    slug: "investing",
    name: "Investing",
    shortName: "Investing",
    navLabel: "Investing",
    oneLiner: "Index funds, brokerage accounts, dollar-cost averaging.",
    intro:
      "Investing is how ordinary people quietly become wealthy — not by stock-picking, not by timing the market, but by consistently buying low-cost, broadly diversified funds for decades. This pillar starts at the very beginning (what is a stock, what is a fund, what is a brokerage) and moves through choosing accounts, picking index funds, building portfolios, and avoiding the behavioral mistakes that cost most investors more than fees ever do. We don't predict markets and we don't sell hype.",
    whatIs:
      "Investing is the act of putting your money into assets — typically stocks, bonds, real estate or funds that hold them — with the expectation that they will grow in value over time. Unlike saving (which preserves money), investing accepts short-term risk in exchange for long-term growth that historically outpaces inflation. The simplest, most evidence-backed approach is to buy a low-cost, diversified index fund inside a tax-advantaged account, contribute to it regularly, and leave it alone for decades. Investing is for anyone with a time horizon longer than five years and a stable emergency fund.",
    icon: TrendingUp,
    tagClass: "bg-pillar-investing text-pillar-investing-fg",
    borderClass: "hover:border-pillar-investing-fg/50",
    clusters: [
      {
        name: "Investing Basics",
        intro: "The foundational vocabulary every investor needs.",
        posts: [
          p("What Is an Index Fund?", "A single fund that owns hundreds of companies, charges almost nothing, and beats most professional stock-pickers. The cornerstone of modern investing.", 7, "Definition"),
          p("Stocks vs Bonds vs Funds", "Three asset types in 600 words. What each one is, how it earns money, and where it fits in a portfolio at any age.", 6, "Comparison"),
          p("Dollar-Cost Averaging Explained", "Invest the same amount every month, regardless of price. The unsexy strategy that quietly beats lump-sum timing for most real-world investors.", 6, "Definition"),
          p("Compound Interest, Visualised", "The same $200 a month becomes $300,000 or $1.2 million depending on when you start. The chart that makes 20-year-olds open a brokerage.", 6, "Guide"),
          p("Risk Tolerance vs Risk Capacity", "What you feel vs what your finances can actually absorb — and why mixing them up wrecks portfolios in the first market drop.", 7, "Definition"),
        ],
      },
      {
        name: "Accounts & Brokers",
        intro: "Pick the right wrapper before you pick a single fund.",
        posts: [
          p("Roth IRA vs Traditional IRA", "Pay tax now or later? The decision hinges on your current vs future tax bracket — and the answer surprises most under-40 earners.", 8, "Comparison"),
          p("401(k) vs IRA", "Why most investors should use both, in a specific order, to capture every dollar of tax advantage available in 2026.", 7, "Comparison"),
          p("Best Brokerages for Beginners", "Fidelity, Schwab, Vanguard, Robinhood — the strengths, weaknesses and hidden fees of the five brokers a first-time investor should consider.", 9, "List"),
          p("Taxable vs Tax-Advantaged Accounts", "What goes where to keep the IRS away from your gains. The asset-location rules every investor should know by year three.", 8, "Comparison"),
        ],
      },
      {
        name: "Building a Portfolio",
        intro: "Three-fund portfolios, target dates, and the lazy way to win.",
        posts: [
          p("The Three-Fund Portfolio", "US stocks, international stocks, total-bond market. The portfolio Vanguard's founder recommended to his own kids — and why it still works.", 8, "Guide"),
          p("Target-Date Funds Explained", "One fund that re-balances itself as you age toward retirement. The trade-offs hidden inside its 0.10% expense ratio.", 6, "Definition"),
          p("Bogleheads Approach in Plain English", "Low fees, broad diversification, do less. The philosophy behind the most evidence-backed investing community on the internet.", 7, "Guide"),
          p("How Much Should You Invest Per Month?", "15% of gross income is the headline answer. Here's how that flexes by age, income, debt and employer match.", 7, "Guide"),
        ],
      },
    ],
    faqs: [
      { q: "Is investing the same as gambling?", a: "No. Gambling has a negative expected return; broad-market investing has a positive expected return over long horizons backed by 100+ years of data." },
      { q: "How much money do I need to start investing?", a: "Most major brokerages now allow you to buy fractional shares of index funds for as little as $1. The amount matters far less than starting early." },
      { q: "What is the safest way to invest?", a: "A low-cost, broadly diversified index fund held inside a tax-advantaged account is the most evidence-backed strategy for the average investor." },
    ],
    relatedTools: [
      { name: "Compound Interest Calculator", slug: "compound-interest-calculator" },
      { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
    ],
  },
  {
    slug: "retirement",
    name: "Retirement",
    shortName: "Retirement",
    navLabel: "Retirement",
    oneLiner: "401(k), Roth IRA, FIRE, retirement income strategies.",
    intro:
      "Retirement planning isn't just for people in their 50s — the earlier you start, the easier it gets, thanks to compounding. This pillar covers the accounts that actually matter (401(k), Roth IRA, HSA), how much to save at every age, the FIRE movement, Social Security, and how to convert a pile of investments into a paycheck once you stop working. Whether you want to retire at 40 or 70, the math is the same.",
    whatIs:
      "Retirement is the life stage when work becomes optional and your investments — combined with pensions or Social Security — replace your paycheck. Planning for retirement means saving and investing enough during your working years that withdrawals can cover your living expenses for 25+ years without depleting the principal. The classic guideline is the 4% rule: a portfolio can sustainably support annual withdrawals equal to 4% of its starting value, adjusted yearly for inflation. The earlier you begin contributing, the more compounding does the heavy lifting.",
    icon: Sunset,
    tagClass: "bg-pillar-retirement text-pillar-retirement-fg",
    borderClass: "hover:border-pillar-retirement-fg/50",
    clusters: [
      {
        name: "Retirement Accounts",
        intro: "Pick the right tax-advantaged buckets before you pick funds.",
        posts: [
          p("401(k) Explained", "Payroll-deducted, employer-matched, tax-deferred. The most powerful retirement account most workers under-use by 80%.", 8, "Definition"),
          p("Roth IRA vs Traditional IRA", "The single decision that can be worth $200,000 over a career. A clear-eyed walkthrough, including the rules most people miss.", 8, "Comparison", "roth-vs-traditional-ira"),
          p("HSA as a Stealth Retirement Account", "Triple tax-advantaged, never taxed if used for medical bills in retirement. The account high-income earners max before their IRA.", 8, "Guide"),
          p("Backdoor Roth IRA", "The legal workaround for high earners locked out of direct Roth contributions. Step-by-step, including the pro-rata rule that trips most people up.", 9, "Guide"),
        ],
      },
      {
        name: "How Much to Save",
        intro: "Targets by age, by income, and by lifestyle.",
        posts: [
          p("Retirement Savings by Age", "1x salary by 30, 3x by 40, 6x by 50, 10x by 67. The Fidelity benchmarks, plus what to do if you're behind.", 7, "Guide"),
          p("How Much Do You Need to Retire?", "Multiply annual spending by 25 — then subtract Social Security. The full-fat number for a comfortable retirement at every income level.", 8, "Guide"),
          p("The 4% Rule, Revisited", "Bill Bengen's 4% rule turns 30 this year. What's held up, what hasn't, and the safer 3.5% rule some planners now prefer.", 9, "Definition"),
          p("Coast FIRE vs Lean FIRE vs Fat FIRE", "Four flavors of financial independence, each with a different target number and lifestyle. Figure out which one actually fits your life.", 8, "Comparison"),
        ],
      },
      {
        name: "Retirement Income",
        intro: "Turning a portfolio into a paycheck without running out.",
        posts: [
          p("Social Security Strategy", "Claim at 62, 67, or 70 — the choice can swing lifetime benefits by $200,000+. How to decide based on health, marriage and other income.", 9, "Guide"),
          p("Safe Withdrawal Rates", "Why 4% is a starting point, not a guarantee. How sequence-of-returns risk, inflation and longevity reshape the math.", 8, "Definition"),
          p("Bucket Strategy Explained", "Three buckets — cash, bonds, stocks — refilled in sequence. The retirement-income approach that sleeps best at night.", 7, "Definition"),
          p("Annuities: When They Make Sense", "Mostly a sales product; occasionally a brilliant tool. The two types worth considering, and the four to walk away from.", 8, "Guide"),
        ],
      },
    ],
    faqs: [
      { q: "What is the most important retirement account?", a: "If your employer offers a 401(k) match, that's first — it's a 100% return. After the match, a Roth IRA is usually next." },
      { q: "How much should I save for retirement?", a: "A common target is 15% of gross income, including any employer match. The earlier you start, the lower the percentage you'll need." },
      { q: "Is FIRE realistic for the average person?", a: "Lean and Coast FIRE are realistic for most middle-income households willing to save aggressively. Full early retirement at 40 typically requires a high savings rate or high income." },
    ],
    relatedTools: [
      { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
      { name: "Compound Interest Calculator", slug: "compound-interest-calculator" },
    ],
  },
  {
    slug: "saving",
    name: "Saving",
    shortName: "Saving",
    navLabel: "Saving",
    oneLiner: "Emergency funds, sinking funds, high-yield savings.",
    intro:
      "Before you invest, before you pay off debt aggressively, before you do anything else with extra money — you need a savings buffer. This pillar covers emergency funds, sinking funds for predictable irregular expenses, high-yield savings accounts, and the psychological side of building a buffer when money is tight. Saving isn't glamorous, but it's the foundation that makes every other financial move possible.",
    whatIs:
      "Saving is the act of setting aside money you won't spend immediately, typically in a low-risk account that preserves principal. Unlike investing, saving prioritises safety and liquidity over growth. The two most important savings goals are an emergency fund (3–6 months of essential expenses, in a high-yield savings account) and sinking funds for predictable irregular expenses like car repairs, holidays and annual insurance premiums. Saving creates the cash buffer that prevents one bad month from becoming one bad decade.",
    icon: PiggyBank,
    tagClass: "bg-pillar-saving text-pillar-saving-fg",
    borderClass: "hover:border-pillar-saving-fg/50",
    clusters: [
      {
        name: "Emergency Funds",
        intro: "How much you need, where to keep it, and how to build it fast.",
        posts: [
          p("How Big Should Your Emergency Fund Be?", "Three months for stable W-2 earners, six for variable income, twelve for the self-employed. How to size yours in 10 minutes.", 6, "Guide"),
          p("Where to Keep Your Emergency Fund", "High-yield savings beats checking, treasury bills beat HYSAs at the top end. The two-account setup that earns the most without losing liquidity.", 6, "Guide"),
          p("Building an Emergency Fund on a Tight Budget", "A four-step plan to get to $1,000 in 90 days when your budget is already maxed out. The categories most people forget to cut.", 7, "Guide"),
          p("Emergency Fund vs Paying Off Debt", "The starter $1,000, then high-interest debt, then full emergency fund. The order of operations that prevents one crisis becoming another.", 6, "Comparison"),
        ],
      },
      {
        name: "High-Yield Savings",
        intro: "Make your cash earn its keep without lockups or risk.",
        posts: [
          p("Best High-Yield Savings Accounts", "Six FDIC-insured online banks paying 4%+ APY in 2026, with no minimums and no monthly fees. Including the one with the best app.", 7, "List"),
          p("HYSA vs Money Market vs CDs", "Three flavors of safe cash, three different trade-offs between yield and access. The right one depends on when you'll need the money.", 7, "Comparison"),
          p("Are Online Banks Safe?", "FDIC insurance, ACH speed, customer service horror stories. What 'safe' actually means and how to vet a bank in five minutes.", 6, "Definition"),
        ],
      },
      {
        name: "Sinking Funds",
        intro: "Plan for the surprises that aren't actually surprises.",
        posts: [
          p("Sinking Funds Explained", "Save monthly for expenses you know are coming — Christmas, car repairs, annual insurance. The category that smooths the entire budget.", 6, "Definition"),
          p("Categories Every Sinking Fund Should Have", "Twelve categories most households need, with realistic monthly amounts. The list that prevents 'where did that come from' moments.", 6, "List"),
          p("Sinking Funds vs Emergency Funds", "One funds the predictable; the other funds the catastrophic. Why mixing them sabotages both.", 5, "Comparison"),
        ],
      },
    ],
    faqs: [
      { q: "How much should I have in an emergency fund?", a: "3 months of essential expenses if your income is stable; 6 months if it's variable; 12 months if you're self-employed or have dependents." },
      { q: "Where should I keep my emergency fund?", a: "A high-yield savings account at an FDIC-insured online bank. You want safety, liquidity, and a competitive rate — not stock-market risk." },
      { q: "Should I save or pay off debt first?", a: "Build a small starter emergency fund ($1,000) first, then aggressively pay off any debt above ~7% interest, then return to fully funding the emergency fund." },
    ],
    relatedTools: [
      { name: "Emergency Fund Calculator", slug: "emergency-fund-calculator" },
      { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
    ],
  },
  {
    slug: "banking",
    name: "Banking",
    shortName: "Banking",
    navLabel: "Banking",
    oneLiner: "Checking accounts, online banks, fees, transfers.",
    intro:
      "Your bank is the operating system of your financial life. The wrong one quietly costs you in fees, lost interest, and friction. The right one earns you money, moves it instantly, and stays out of your way. This pillar covers choosing checking accounts, switching banks, online vs traditional banks, avoiding overdraft fees, and using multiple accounts to enforce your budget.",
    whatIs:
      "Banking is the everyday infrastructure that holds and moves your money — primarily through checking and savings accounts at FDIC-insured institutions. A modern banking setup typically combines a fee-free checking account for spending, a high-yield savings account for emergency funds and short-term goals, and (optionally) a separate account for bills or business income. Choosing the right combination eliminates fees, maximises interest on idle cash, and reduces the daily friction of managing money.",
    icon: Landmark,
    tagClass: "bg-pillar-banking text-pillar-banking-fg",
    borderClass: "hover:border-pillar-banking-fg/50",
    clusters: [
      {
        name: "Checking Accounts",
        intro: "Find an account that pays you, not one that fines you.",
        posts: [
          p("Best Free Checking Accounts", "Seven truly fee-free checking accounts in 2026 — no minimums, no maintenance fees, free ATM networks, and one that pays you to switch.", 8, "List"),
          p("How to Switch Banks Without Headaches", "A two-week switch plan that catches every auto-pay and direct deposit before closing the old account. The checklist banks don't give you.", 7, "Guide"),
          p("Online Banks vs Traditional Banks", "Higher rates and better apps vs branches and cash deposits. What you actually trade by going fully online — and the hybrid setup most people end up with.", 7, "Comparison"),
          p("Joint vs Separate Accounts for Couples", "All-in, all-separate, or the three-account hybrid. The pros and cons of each — and the conversation to have before deciding.", 7, "Comparison"),
        ],
      },
      {
        name: "Avoiding Fees",
        intro: "The fees you can almost always negotiate or avoid entirely.",
        posts: [
          p("How to Avoid Overdraft Fees", "Opt-out of overdraft 'protection,' use buffer accounts, or switch to a bank that simply doesn't charge them. The four-step fix.", 6, "Guide"),
          p("ATM Fees: The Sneaky Tax", "The average American pays $300 a year in ATM fees. The networks, banks and habits that drop that to zero.", 5, "Guide"),
          p("Foreign Transaction Fees Explained", "Why your card charges 3% abroad — and the four cards and one debit card that don't, including the best for digital nomads.", 6, "Definition"),
        ],
      },
      {
        name: "Multi-Account Strategy",
        intro: "Use accounts as guardrails, not just storage.",
        posts: [
          p("The Two-Bank Strategy", "One bank for spending, one for saving, separated on purpose. The structural friction that prevents most impulse purchases.", 6, "Guide"),
          p("Bills, Spending, Saving: The 3-Account Setup", "A simple architecture that pays bills automatically, caps weekly spending, and saves the rest without willpower.", 7, "Guide"),
          p("Best Setup for Freelancers", "Business checking, tax bucket, owner-pay, profit. The Profit First system simplified for solo earners with irregular income.", 8, "Guide"),
        ],
      },
    ],
    faqs: [
      { q: "Are online banks safe?", a: "Yes, as long as they are FDIC-insured. Your deposits are protected up to $250,000 per depositor per insured bank." },
      { q: "How many bank accounts should I have?", a: "Most people benefit from at least three: one checking for daily spending, one high-yield savings for the emergency fund, and one for goals or bills." },
      { q: "Can I negotiate bank fees?", a: "Often, yes. A polite call asking for a one-time waiver of an overdraft or maintenance fee succeeds more often than people expect." },
    ],
    relatedTools: [{ name: "Budget Planner", slug: "budget-planner" }],
  },
  {
    slug: "debt-taxes-insurance",
    name: "Debt, Taxes & Insurance",
    shortName: "Debt & Taxes",
    navLabel: "Debt & Taxes",
    oneLiner: "Paying off debt, filing taxes, picking insurance.",
    intro:
      "These three topics scare people more than any others — and that fear is exactly why they leak the most money. This pillar demystifies debt payoff strategy (avalanche vs snowball, refinancing, settlement), tax filing (standard vs itemized, common deductions, when to hire a pro), and insurance (which policies you actually need, which are wasted spend). The goal is simple: stop overpaying.",
    whatIs:
      "Debt, taxes and insurance are the three financial obligations that quietly determine how much of your income you actually keep. Debt extracts interest from your future earnings; taxes claim a share of every dollar you make; insurance trades small predictable payments for protection against large unpredictable losses. Understanding each one — and shopping all three on a regular cadence — typically frees up more money than any budget change ever will.",
    icon: Receipt,
    tagClass: "bg-pillar-debt text-pillar-debt-fg",
    borderClass: "hover:border-pillar-debt-fg/50",
    clusters: [
      {
        name: "Paying Off Debt",
        intro: "The math, the psychology, and the order of operations.",
        posts: [
          p("Avalanche vs Snowball Method", "Highest APR first vs smallest balance first. The numbers favor one, behavior favors the other. How to choose without losing the year.", 7, "Comparison", "avalanche-vs-snowball"),
          p("Should You Refinance Your Loans?", "Student loans, auto loans, mortgages — when refi saves real money and when it just resets the clock. A decision framework, not a sales pitch.", 8, "Guide"),
          p("Debt Consolidation Explained", "Combine multiple debts into one payment at a lower rate. The three legitimate routes — and the three traps that look like consolidation but aren't.", 7, "Definition"),
          p("When Bankruptcy Makes Sense", "Chapter 7 vs Chapter 13, what stays and what goes, and the math on whether 7 years of damaged credit beats 20 years of payments.", 9, "Guide"),
        ],
      },
      {
        name: "Taxes",
        intro: "Plain-English answers for non-accountants.",
        posts: [
          p("Standard vs Itemized Deduction", "$14,600 single, $29,200 married for 2026. When itemizing beats the standard deduction — and the four deductions most filers miss.", 7, "Comparison"),
          p("Tax Brackets, Explained Simply", "Marginal vs effective rates, why a raise can't 'put you in a worse bracket,' and where the bracket cliffs actually hurt.", 6, "Definition"),
          p("Most-Missed Deductions", "HSA contributions, student-loan interest, self-employment expenses, charitable miles. Twelve deductions that quietly save thousands.", 8, "List"),
          p("When to Hire a CPA", "Self-employed, multi-state, rental income, equity comp — the five situations where a $400 CPA pays for itself many times over.", 6, "Guide"),
        ],
      },
      {
        name: "Insurance",
        intro: "Which policies protect you, and which are just upsells.",
        posts: [
          p("Term vs Whole Life Insurance", "Cheap protection vs expensive investment-in-disguise. Why 90% of households need only term — and the rare cases where whole life makes sense.", 8, "Comparison"),
          p("How Much Life Insurance Do You Need?", "The DIME formula, 10× income rule, and human-life-value method. Three ways to size a policy, plus which one fits your situation.", 7, "Guide"),
          p("Health Insurance Basics", "Deductible, premium, copay, out-of-pocket max. The vocabulary that turns a confusing benefits portal into a clear cost calculation.", 8, "Definition"),
          p("Disability Insurance: The Most Overlooked Policy", "You're more likely to be disabled than die during working years — yet most workers carry zero disability coverage. The cheap fix.", 7, "Definition"),
        ],
      },
    ],
    faqs: [
      { q: "Should I pay off debt or invest first?", a: "Pay the minimum on everything, capture any 401(k) match, then aggressively kill any debt above ~7% interest before increasing investments." },
      { q: "Do I need life insurance if I'm single with no kids?", a: "Usually no. Life insurance protects dependents from lost income. If no one relies on your paycheck, you can probably skip it." },
      { q: "Is it worth hiring a tax professional?", a: "Yes if you're self-employed, own rental property, had major life changes, or your return is genuinely complex. For a simple W-2 return, software is fine." },
    ],
    relatedTools: [
      { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator" },
      { name: "Credit Card Payoff Calculator", slug: "credit-card-payoff-calculator" },
    ],
  },
];

export const getPillar = (slug: PillarSlug): Pillar => {
  const pillar = pillars.find((x) => x.slug === slug);
  if (!pillar) throw new Error(`Pillar not found: ${slug}`);
  return pillar;
};

export const findPost = (
  pillarSlug: string,
  postSlug: string,
): { pillar: Pillar; post: ClusterPost; clusterName: string } | null => {
  const pillar = pillars.find((p) => p.slug === pillarSlug);
  if (!pillar) return null;
  for (const cluster of pillar.clusters) {
    const post = cluster.posts.find((p) => p.slug === postSlug);
    if (post) return { pillar, post, clusterName: cluster.name };
  }
  return null;
};

export const getAllPosts = (): { pillar: Pillar; post: ClusterPost }[] =>
  pillars.flatMap((pillar) =>
    pillar.clusters.flatMap((c) => c.posts.map((post) => ({ pillar, post }))),
  );
