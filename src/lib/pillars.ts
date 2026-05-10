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

export interface ClusterPost {
  title: string;
  slug: string; // relative to pillar
  excerpt: string;
  readMin: number;
  type: "Definition" | "Guide" | "Comparison" | "List";
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
  intro: string; // ~150 words
  whatIs: string; // ~200 words direct answer
  icon: LucideIcon;
  tagClass: string; // tailwind classes for the pill tag
  borderClass: string;
  clusters: ClusterGroup[];
  faqs: { q: string; a: string }[];
  relatedTools: { name: string; slug: string }[];
}

const placeholderPosts = (titles: string[]): ClusterPost[] =>
  titles.map((t, i) => ({
    title: t,
    slug: t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    excerpt:
      "A clear, jargon-free walkthrough you can put to work this week — written for real life, not finance class.",
    readMin: 6 + (i % 5),
    type: (["Definition", "Guide", "Comparison", "List"] as const)[i % 4],
  }));

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
        intro:
          "Pick a system that matches how your brain handles money — there is no single right answer.",
        posts: placeholderPosts([
          "Zero-Based Budgeting Explained",
          "The 50/30/20 Rule: A Beginner's Guide",
          "Envelope Method in 2026 (Cash & Digital)",
          "Pay-Yourself-First Budgeting",
          "Reverse Budgeting for Variable Income",
          "Kakeibo: The Japanese Mindful Budget",
        ]),
      },
      {
        name: "Budgeting Apps & Tools",
        intro:
          "Honest reviews of the apps that actually keep budgets alive past month two.",
        posts: placeholderPosts([
          "YNAB vs Monarch vs Copilot",
          "Best Free Budgeting Apps",
          "Best Budgeting Apps for Couples",
          "Spreadsheet vs App: Which Wins?",
        ]),
      },
      {
        name: "Budgeting for Life Stages",
        intro:
          "Your budget should grow with you. Here's how to retool it at every milestone.",
        posts: placeholderPosts([
          "Budgeting in Your 20s",
          "Budgeting as a New Parent",
          "Budgeting on Variable Income",
          "Budgeting Together as a Couple",
          "Retirement Budgeting Basics",
        ]),
      },
    ],
    faqs: [
      {
        q: "What is the easiest budgeting method for beginners?",
        a: "The 50/30/20 rule is the simplest entry point: 50% of after-tax income to needs, 30% to wants, 20% to savings and debt. It requires no apps and almost no math.",
      },
      {
        q: "How often should I update my budget?",
        a: "Spend 10 minutes weekly checking actuals vs plan, and 30 minutes monthly resetting categories. Most people fail by updating too rarely, not too often.",
      },
      {
        q: "Is budgeting still useful if I earn a lot?",
        a: "Yes. Higher earners often have higher leakage. A budget converts a strong income into actual wealth.",
      },
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
        posts: placeholderPosts([
          "How Credit Scores Are Calculated",
          "Building Credit From Zero",
          "How to Repair Bad Credit",
          "Credit Utilization Explained",
          "Authorized User Strategy",
        ]),
      },
      {
        name: "Choosing the Right Card",
        intro: "Cashback, travel, points, secured — match the card to your life.",
        posts: placeholderPosts([
          "Best Cashback Cards 2026",
          "Best Travel Rewards Cards",
          "Best Cards for Bad Credit",
          "Cashback vs Points vs Miles",
        ]),
      },
      {
        name: "Escaping Card Debt",
        intro: "If you carry a balance, this cluster pays for the whole site.",
        posts: placeholderPosts([
          "Balance Transfer Cards Explained",
          "Avalanche vs Snowball Method",
          "Negotiating Lower APR",
          "Should You Use a Personal Loan to Pay Off Cards?",
        ]),
      },
    ],
    faqs: [
      {
        q: "Do credit cards hurt your credit score?",
        a: "Only if you mismanage them. Used responsibly — paid in full, kept under 30% utilization — credit cards are the single best tool to build a strong credit score.",
      },
      {
        q: "How many credit cards should I have?",
        a: "There is no perfect number. Two to four well-managed cards typically optimize rewards and credit-mix scoring without becoming hard to track.",
      },
      {
        q: "What is the best card for a beginner?",
        a: "A no-annual-fee cashback card from a major issuer. Skip premium travel cards until your spending and credit history justify the fee.",
      },
    ],
    relatedTools: [
      { name: "Credit Score Estimator", slug: "credit-score-estimator" },
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
        posts: placeholderPosts([
          "What Is an Index Fund?",
          "Stocks vs Bonds vs Funds",
          "Dollar-Cost Averaging Explained",
          "Compound Interest, Visualised",
          "Risk Tolerance vs Risk Capacity",
        ]),
      },
      {
        name: "Accounts & Brokers",
        intro: "Pick the right wrapper before you pick a single fund.",
        posts: placeholderPosts([
          "Roth IRA vs Traditional IRA",
          "401(k) vs IRA",
          "Best Brokerages for Beginners",
          "Taxable vs Tax-Advantaged Accounts",
        ]),
      },
      {
        name: "Building a Portfolio",
        intro: "Three-fund portfolios, target dates, and the lazy way to win.",
        posts: placeholderPosts([
          "The Three-Fund Portfolio",
          "Target-Date Funds Explained",
          "Bogleheads Approach in Plain English",
          "How Much Should You Invest Per Month?",
        ]),
      },
    ],
    faqs: [
      {
        q: "Is investing the same as gambling?",
        a: "No. Gambling has a negative expected return; broad-market investing has a positive expected return over long horizons backed by 100+ years of data.",
      },
      {
        q: "How much money do I need to start investing?",
        a: "Most major brokerages now allow you to buy fractional shares of index funds for as little as $1. The amount matters far less than starting early.",
      },
      {
        q: "What is the safest way to invest?",
        a: "A low-cost, broadly diversified index fund held inside a tax-advantaged account is the most evidence-backed strategy for the average investor.",
      },
    ],
    relatedTools: [
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
        posts: placeholderPosts([
          "401(k) Explained",
          "Roth IRA vs Traditional IRA",
          "HSA as a Stealth Retirement Account",
          "Backdoor Roth IRA",
        ]),
      },
      {
        name: "How Much to Save",
        intro: "Targets by age, by income, and by lifestyle.",
        posts: placeholderPosts([
          "Retirement Savings by Age",
          "How Much Do You Need to Retire?",
          "The 4% Rule, Revisited",
          "Coast FIRE vs Lean FIRE vs Fat FIRE",
        ]),
      },
      {
        name: "Retirement Income",
        intro: "Turning a portfolio into a paycheck without running out.",
        posts: placeholderPosts([
          "Social Security Strategy",
          "Safe Withdrawal Rates",
          "Bucket Strategy Explained",
          "Annuities: When They Make Sense",
        ]),
      },
    ],
    faqs: [
      {
        q: "What is the most important retirement account?",
        a: "If your employer offers a 401(k) match, that's first — it's a 100% return. After the match, a Roth IRA is usually next.",
      },
      {
        q: "How much should I save for retirement?",
        a: "A common target is 15% of gross income, including any employer match. The earlier you start, the lower the percentage you'll need.",
      },
      {
        q: "Is FIRE realistic for the average person?",
        a: "Lean and Coast FIRE are realistic for most middle-income households willing to save aggressively. Full early retirement at 40 typically requires a high savings rate or high income.",
      },
    ],
    relatedTools: [
      { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
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
        posts: placeholderPosts([
          "How Big Should Your Emergency Fund Be?",
          "Where to Keep Your Emergency Fund",
          "Building an Emergency Fund on a Tight Budget",
          "Emergency Fund vs Paying Off Debt",
        ]),
      },
      {
        name: "High-Yield Savings",
        intro: "Make your cash earn its keep without lockups or risk.",
        posts: placeholderPosts([
          "Best High-Yield Savings Accounts",
          "HYSA vs Money Market vs CDs",
          "Are Online Banks Safe?",
        ]),
      },
      {
        name: "Sinking Funds",
        intro: "Plan for the surprises that aren't actually surprises.",
        posts: placeholderPosts([
          "Sinking Funds Explained",
          "Categories Every Sinking Fund Should Have",
          "Sinking Funds vs Emergency Funds",
        ]),
      },
    ],
    faqs: [
      {
        q: "How much should I have in an emergency fund?",
        a: "3 months of essential expenses if your income is stable; 6 months if it's variable; 12 months if you're self-employed or have dependents.",
      },
      {
        q: "Where should I keep my emergency fund?",
        a: "A high-yield savings account at an FDIC-insured online bank. You want safety, liquidity, and a competitive rate — not stock-market risk.",
      },
      {
        q: "Should I save or pay off debt first?",
        a: "Build a small starter emergency fund ($1,000) first, then aggressively pay off any debt above ~7% interest, then return to fully funding the emergency fund.",
      },
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
        posts: placeholderPosts([
          "Best Free Checking Accounts",
          "How to Switch Banks Without Headaches",
          "Online Banks vs Traditional Banks",
          "Joint vs Separate Accounts for Couples",
        ]),
      },
      {
        name: "Avoiding Fees",
        intro: "The fees you can almost always negotiate or avoid entirely.",
        posts: placeholderPosts([
          "How to Avoid Overdraft Fees",
          "ATM Fees: The Sneaky Tax",
          "Foreign Transaction Fees Explained",
        ]),
      },
      {
        name: "Multi-Account Strategy",
        intro: "Use accounts as guardrails, not just storage.",
        posts: placeholderPosts([
          "The Two-Bank Strategy",
          "Bills, Spending, Saving: The 3-Account Setup",
          "Best Setup for Freelancers",
        ]),
      },
    ],
    faqs: [
      {
        q: "Are online banks safe?",
        a: "Yes, as long as they are FDIC-insured. Your deposits are protected up to $250,000 per depositor per insured bank.",
      },
      {
        q: "How many bank accounts should I have?",
        a: "Most people benefit from at least three: one checking for daily spending, one high-yield savings for the emergency fund, and one for goals or bills.",
      },
      {
        q: "Can I negotiate bank fees?",
        a: "Often, yes. A polite call asking for a one-time waiver of an overdraft or maintenance fee succeeds more often than people expect.",
      },
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
        posts: placeholderPosts([
          "Avalanche vs Snowball Method",
          "Should You Refinance Your Loans?",
          "Debt Consolidation Explained",
          "When Bankruptcy Makes Sense",
        ]),
      },
      {
        name: "Taxes",
        intro: "Plain-English answers for non-accountants.",
        posts: placeholderPosts([
          "Standard vs Itemized Deduction",
          "Tax Brackets, Explained Simply",
          "Most-Missed Deductions",
          "When to Hire a CPA",
        ]),
      },
      {
        name: "Insurance",
        intro: "Which policies protect you, and which are just upsells.",
        posts: placeholderPosts([
          "Term vs Whole Life Insurance",
          "How Much Life Insurance Do You Need?",
          "Health Insurance Basics",
          "Disability Insurance: The Most Overlooked Policy",
        ]),
      },
    ],
    faqs: [
      {
        q: "Should I pay off debt or invest first?",
        a: "Pay the minimum on everything, capture any 401(k) match, then aggressively kill any debt above ~7% interest before increasing investments.",
      },
      {
        q: "Do I need life insurance if I'm single with no kids?",
        a: "Usually no. Life insurance protects dependents from lost income. If no one relies on your paycheck, you can probably skip it.",
      },
      {
        q: "Is it worth hiring a tax professional?",
        a: "Yes if you're self-employed, own rental property, had major life changes, or your return is genuinely complex. For a simple W-2 return, software is fine.",
      },
    ],
    relatedTools: [],
  },
];

export const getPillar = (slug: PillarSlug): Pillar => {
  const p = pillars.find((x) => x.slug === slug);
  if (!p) throw new Error(`Pillar not found: ${slug}`);
  return p;
};
