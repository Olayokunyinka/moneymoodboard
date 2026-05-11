import type { PillarSlug } from "./pillars";

/**
 * Persona-based recommendation pages live at /<pillar>/best-for/<persona>.
 * They satisfy "best X for Y" / "Y starter pack" intent that the cluster
 * articles don't surface well, while feeding the topical map with
 * audience-typed nodes for the knowledge graph.
 */
export interface PersonaApproach {
  /** Short headline (H3). */
  name: string;
  /** Why this approach fits this persona. */
  rationale: string;
  /** Optional internal link to the relevant guide/tool. */
  to?: string;
}

export interface Persona {
  pillar: PillarSlug;
  /** URL slug. */
  slug: string;
  /** Persona display name — used in title + headings + audienceType schema. */
  personaName: string;
  /** Full H1 title. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Quick-answer paragraph. */
  summary: string;
  /** 2–3 sentence sketch of who this persona is and what's specifically different about their money picture. */
  profile: string;
  /** 3 prioritized approaches. */
  approaches: PersonaApproach[];
  /** Common pitfalls. */
  pitfalls: string[];
  /** Recommended tools. */
  recommendedTools: { name: string; slug: string }[];
  faqs: { q: string; a: string }[];
  /** Internal links — must include ≥2 cross-pillar references. */
  internalLinks: { label: string; to: string }[];
  published: string;
  updated: string;
}

export const personas: Persona[] = [
  {
    pillar: "budgeting",
    slug: "freelancers",
    personaName: "Freelancers",
    title: "Best Budgeting Method for Freelancers (2026 Playbook)",
    metaTitle: "Best Budgeting for Freelancers (2026) | MoneyMoodBoard",
    metaDescription:
      "A budgeting system that survives variable income — the safe-paycheck method, tax escrow, and the buffer fund every freelancer needs.",
    summary:
      "Freelancers don't fail at budgeting because they're bad with money — they fail because most budgets assume a fixed paycheck on the 1st and 15th. The fix is a three-account 'pay yourself a salary' system: business income lands in one account, a fixed monthly salary transfers to personal, taxes go straight into an escrow, and the rest builds a buffer that smooths the slow months.",
    profile:
      "You earn irregularly — sometimes a $12,000 month, sometimes a $1,500 month. Nobody withholds your taxes. Half your tools (health insurance, retirement, paid leave) you have to buy yourself, on top of running the actual business. The standard 50/30/20 template was not written for you.",
    approaches: [
      {
        name: "Run yourself like a tiny business: three accounts, one salary",
        rationale:
          "Open a business checking account, a tax-escrow savings, and your personal checking. Every dollar of revenue lands in business checking. On the 1st of each month, move (a) your fixed salary to personal, (b) ~30% to tax escrow, (c) leave the rest as buffer. Your personal life now looks like a salaried job and any standard budget works on the personal side.",
        to: "/budgeting/reverse-budgeting-for-variable-income",
      },
      {
        name: "Set the salary off your lowest 12 months, not your average",
        rationale:
          "Averages flatter you. Take the lowest three months of the last 12 and average those — that's your safe salary. The good months pile into buffer; the bad months don't break the budget. Most freelancers who 'feel broke at $15k/mo' set their salary off boom months and ended up trapped.",
      },
      {
        name: "Pay quarterly estimated taxes the day the escrow lands",
        rationale:
          "The IRS expects four payments a year (April 15, June 15, Sept 15, Jan 15). Missing them means underpayment penalties. Each quarter, pay from the escrow on the exact day the calendar says — never from buffer or personal.",
        to: "/debt-taxes-insurance",
      },
    ],
    pitfalls: [
      "Treating gross revenue like take-home pay. Taxes (self-employment + income) often run 25–35% — that money was never yours.",
      "Skipping retirement because cashflow is lumpy. A SEP-IRA or Solo 401(k) accepts annual lump sums; one good month a year is enough.",
      "Letting one big invoice fund a lifestyle upgrade. Buffer it, salary it, decide on the upgrade in 90 days when it isn't novelty money anymore.",
      "Mixing business and personal cards. The bookkeeping nightmare alone costs hours every quarter.",
    ],
    recommendedTools: [
      { name: "Budget Planner", slug: "budget-planner" },
      { name: "Emergency Fund Calculator", slug: "emergency-fund-calculator" },
    ],
    faqs: [
      { q: "What percentage should I escrow for taxes?", a: "Start at 30% if you're solo and in a moderate state. Higher if you're in CA/NY (32–35%); lower if you have an S-corp election (25–28%). Reconcile after each tax return and adjust." },
      { q: "How big should a freelancer emergency fund be?", a: "6–9 months of essential expenses — double the salary-worker benchmark, because your income gap can be 'no work' instead of 'no job for two months'." },
      { q: "Should I incorporate?", a: "Usually not below $40k net. S-corp election starts paying for itself around $60–80k net via SE-tax savings, but adds payroll and a separate return." },
    ],
    internalLinks: [
      { label: "Reverse budgeting for variable income", to: "/budgeting/reverse-budgeting-for-variable-income" },
      { label: "Zero-based vs 50/30/20", to: "/budgeting/vs/zero-based-vs-50-30-20" },
      { label: "Best for self-employed (retirement)", to: "/retirement/best-for-self-employed" },
      { label: "How big should your emergency fund be?", to: "/saving/how-big-should-your-emergency-fund-be" },
      { label: "Budget Planner Tool", to: "/tools/budget-planner" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  {
    pillar: "credit-cards",
    slug: "students",
    personaName: "Students",
    title: "Best Credit Cards & Habits for Students (2026)",
    metaTitle: "Best Credit Cards for Students (2026) | MoneyMoodBoard",
    metaDescription:
      "How students should pick a first credit card, build credit without debt, and graduate with a 750+ score and zero balance.",
    summary:
      "Your goal as a student isn't rewards — it's building a credit file that opens doors after graduation. Pick one no-fee secured or student card, run a single small recurring charge through it (Netflix, $12/mo), set autopay-in-full, and don't touch the card for anything else. That alone produces a 720+ score by senior year.",
    profile:
      "You're 18–24, thin or no credit file, low income, easily approved for store cards that will wreck your credit if you accept them. You have 5–10 years until a mortgage application — that runway is your superpower if you don't blow it.",
    approaches: [
      {
        name: "Open one starter card, run a tiny recurring charge, autopay in full",
        rationale:
          "A secured card (with a refundable deposit) or a no-fee student card from a real bank — not a store card. Run one charge under $20/month and pay automatically from your bank. Your utilization stays under 5%, your payment history is perfect, and you never touch the card otherwise.",
        to: "/credit-cards/how-to-build-credit",
      },
      {
        name: "Avoid every store card pitched at the register",
        rationale:
          "Store cards have brutal APRs (28–30%), tiny limits, and approval optimised for impulse signups. They wreck utilization (small limit + small balance = high %) and don't help your score the way a real bank card does.",
      },
      {
        name: "Become an authorized user on a family member's well-managed card",
        rationale:
          "If a parent has a 10+ year card with perfect history, being added as an authorized user inherits that account's age and history on your report. Three months of this is worth two years of self-built credit.",
      },
    ],
    pitfalls: [
      "Carrying a balance 'to build credit' — utilization matters, balances cost you 24% interest. Pay in full, every time.",
      "Closing the first card after graduation. Average age of accounts matters; keep the no-fee card forever, even with $0 use.",
      "Maxing out limit increases. A new $5k limit isn't $5k to spend; it's headroom that drops your utilization ratio.",
      "Co-signing for a friend's card / car. Their late payment is on your credit report. Don't.",
    ],
    recommendedTools: [
      { name: "Credit Score Estimator", slug: "credit-score-estimator" },
      { name: "Budget Planner", slug: "budget-planner" },
    ],
    faqs: [
      { q: "Will applying for a card hurt my score?", a: "A single hard inquiry drops your score 2–5 points and fades in 12 months. Worth it. Applying for 5 in a month — much less so." },
      { q: "What credit score should I aim for at graduation?", a: "720+ opens nearly every door. 750+ gets you the best loan rates. Both are achievable on $0 of balances if you start early." },
      { q: "Does paying my phone bill build credit?", a: "Not by default. Services like Experian Boost can add utility and phone history to your Experian report, but only the Experian report — not Equifax or TransUnion." },
    ],
    internalLinks: [
      { label: "How credit cards work", to: "/credit-cards/how-credit-cards-work" },
      { label: "Cashback vs travel rewards", to: "/credit-cards/vs/cashback-vs-travel-rewards" },
      { label: "Best for recent grads (debt)", to: "/debt-taxes-insurance/best-for-recent-grads" },
      { label: "Credit Score Estimator", to: "/tools/credit-score-estimator" },
      { label: "Budgeting pillar", to: "/budgeting" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  {
    pillar: "investing",
    slug: "late-starters",
    personaName: "Late Starters (40+)",
    title: "Best Investing Plan for Late Starters (40+) in 2026",
    metaTitle: "Best Investing for Late Starters 40+ (2026) | MoneyMoodBoard",
    metaDescription:
      "Catch-up contributions, glidepath choices, and the realistic 20-year plan for investors starting after 40 — without taking reckless risk.",
    summary:
      "Starting at 40 with little saved isn't a tragedy — it's a 25-year window of compounding with catch-up contributions the IRS specifically wrote for you. The plan is uncomplicated: max the catch-up limits, default to a target-date fund or three-fund portfolio, and don't try to make up for lost time by taking more risk than you can stomach.",
    profile:
      "You're 40+ with under $50k saved for retirement. You've heard the 'start at 25' lectures one too many times. You can save more aggressively now (peak earning years, kids' costs easing), and the IRS rewards you with catch-up contribution limits starting at 50.",
    approaches: [
      {
        name: "Hit the catch-up limits the second you're eligible",
        rationale:
          "In 2026, anyone 50+ can put $31,000 in a 401(k) (vs $23,500) and $8,000 in an IRA (vs $7,000). The 60–63 catch-up under SECURE 2.0 raises the 401(k) limit even higher. These exist because Congress knew people would start late — use them in full.",
        to: "/retirement",
      },
      {
        name: "Default to a target-date fund + don't chase risk",
        rationale:
          "Late starters often overcorrect into individual stocks or leveraged ETFs trying to 'make up for lost time'. The math doesn't reward that — risk-adjusted returns are dominated by saving rate, not asset choice. A target-date fund matching your retirement year is the simplest, most evidence-backed move.",
        to: "/investing/vs/index-funds-vs-target-date",
      },
      {
        name: "Plan to work to 67 or 70, not 65",
        rationale:
          "Every year past 65 boosts Social Security by ~8% (delayed retirement credits), gives the portfolio one more compounding year, and removes one withdrawal year. The single most powerful lever for late starters isn't return — it's runway.",
      },
    ],
    pitfalls: [
      "Trying to time the market because you 'don't have time to ride out volatility'. Volatility is the price of return; sitting in cash is what guarantees a shortfall.",
      "Cashing out a 401(k) when switching jobs. Roll to an IRA or the new 401(k); never take the check.",
      "Skipping the HSA if eligible. Triple tax advantage and the best stealth retirement account in the IRS code.",
      "Paying for advice on commission. Fee-only fiduciary or low-cost robo only; never anyone selling you the annuity.",
    ],
    recommendedTools: [
      { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
      { name: "Compound Interest Calculator", slug: "compound-interest-calculator" },
    ],
    faqs: [
      { q: "Is it too late if I'm 45 with $0?", a: "No. Saving $1,500/mo from 45 to 67 at a 7% return ends near $900k. Add Social Security and a paid-off home and you have a viable retirement." },
      { q: "Should I delay Social Security?", a: "If health and cashflow allow, yes — every year past 62 increases the benefit ~7–8% up to age 70. Delay is the highest guaranteed return in finance for late starters." },
      { q: "Are catch-up contributions on top of the regular limit?", a: "Yes. The 401(k) base limit is $23,500 in 2026; the 50+ catch-up adds $7,500 on top. IRA: $7,000 base + $1,000 catch-up." },
    ],
    internalLinks: [
      { label: "Index funds vs target-date funds", to: "/investing/vs/index-funds-vs-target-date" },
      { label: "401(k) vs IRA", to: "/retirement/vs/401k-vs-ira" },
      { label: "Best for self-employed (retirement)", to: "/retirement/best-for-self-employed" },
      { label: "Retirement Savings Calculator", to: "/tools/retirement-savings-calculator" },
      { label: "Compound Interest Calculator", to: "/tools/compound-interest-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  {
    pillar: "retirement",
    slug: "self-employed",
    personaName: "Self-Employed",
    title: "Best Retirement Plan for the Self-Employed (2026)",
    metaTitle: "Best Retirement Account for Self-Employed (2026) | MoneyMoodBoard",
    metaDescription:
      "Solo 401(k) vs SEP-IRA vs SIMPLE-IRA — which retirement account the self-employed should actually open in 2026.",
    summary:
      "The self-employed have access to retirement accounts with far higher limits than salaried workers — and most don't open one. For solo operators with no employees, the Solo 401(k) wins on flexibility (Roth option, loans, higher employee deferral). The SEP-IRA wins on simplicity. The SIMPLE-IRA is rarely the right answer.",
    profile:
      "You're a freelancer, consultant, single-member LLC owner, or S-corp shareholder/employee. No HR department picks your retirement plan for you. You have access to accounts that can shelter $60k+/year — but only if you set them up.",
    approaches: [
      {
        name: "Open a Solo 401(k) if you have any consistent self-employment income",
        rationale:
          "You contribute as both employee ($23,500 in 2026) and employer (up to ~20–25% of net SE income), to a combined ceiling of $70,000 (+$7,500 catch-up at 50+). Roth Solo 401(k) is increasingly common. Plan loans up to $50k are available. The setup is more paperwork than a SEP, but the benefits dwarf it.",
        to: "/retirement",
      },
      {
        name: "If you want truly zero paperwork, use a SEP-IRA",
        rationale:
          "Opens in 5 minutes at any major brokerage. Contribute up to ~20% of net SE income (~25% of W-2 wages for S-corps) to a $70,000 ceiling. No annual filing. The trade-off: no employee deferral, no Roth option, no loans. For sporadic or moderate income, the simplicity often wins.",
      },
      {
        name: "Layer a Roth IRA on top either way",
        rationale:
          "The Solo 401(k) or SEP-IRA covers the deductible side. A backdoor Roth IRA gives you $7,000 of tax-free growth on top, with no income limit. Don't leave it on the table.",
        to: "/retirement/vs/roth-vs-traditional-ira",
      },
    ],
    pitfalls: [
      "Waiting until your accountant asks at tax-prep time. Many plans must be opened by Dec 31 of the contribution year; the contribution itself can be made up until tax filing.",
      "Picking a SIMPLE-IRA out of habit. Lower limits, harder to escape if income grows.",
      "Forgetting Form 5500-EZ once the Solo 401(k) clears $250k in assets. Late-filing penalty is steep.",
      "Mixing a SEP-IRA with a backdoor Roth without realising the pro-rata rule taxes the conversion.",
    ],
    recommendedTools: [
      { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
      { name: "Compound Interest Calculator", slug: "compound-interest-calculator" },
    ],
    faqs: [
      { q: "What if I have one employee (a spouse)?", a: "Solo 401(k) still works — spouses count as 'self-employed', not employees, and double your household limit." },
      { q: "What if I hire someone else?", a: "Solo 401(k) becomes a regular 401(k) (or you switch to a SEP/SIMPLE with eligible-employee rules). Plan ahead 12 months." },
      { q: "Can I have both a Solo 401(k) and a day-job 401(k)?", a: "Yes — but the $23,500 employee deferral limit is per person, not per plan. The employer side at each is separate." },
    ],
    internalLinks: [
      { label: "401(k) vs IRA", to: "/retirement/vs/401k-vs-ira" },
      { label: "Roth IRA vs Traditional IRA", to: "/retirement/vs/roth-vs-traditional-ira" },
      { label: "Best for freelancers (budgeting)", to: "/budgeting/best-for-freelancers" },
      { label: "Retirement Savings Calculator", to: "/tools/retirement-savings-calculator" },
      { label: "Best for late-starters (investing)", to: "/investing/best-for-late-starters" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  {
    pillar: "saving",
    slug: "new-parents",
    personaName: "New Parents",
    title: "Best Saving Plan for New Parents (2026)",
    metaTitle: "Best Saving Plan for New Parents (2026) | MoneyMoodBoard",
    metaDescription:
      "Emergency fund, 529 vs Roth, parental-leave bridge — the saving plan that survives a baby's first three years without burnout.",
    summary:
      "A new baby changes saving in three concrete ways: a bigger emergency fund, a parental-leave bridge, and the question of whether to save for college. Don't let the college question paralyze the first two — fund the emergency reserve and the leave bridge first; the 529 can wait six months.",
    profile:
      "You have a baby on the way (or under 2) and the standard $1k starter emergency fund suddenly feels comically small. One partner may stop working or go part-time. Childcare alone can rival a mortgage payment. The old budget needs to grow up.",
    approaches: [
      {
        name: "Rebuild the emergency fund to 6 months of new household expenses",
        rationale:
          "Your fixed costs jumped — daycare, insurance, formula, gear. The old 3-month buffer covers maybe 2 of the new months. Recalculate using your post-baby budget, not the pre-baby one. Park it in a high-yield savings account.",
        to: "/saving/how-big-should-your-emergency-fund-be",
      },
      {
        name: "Build a 'leave bridge' separate from the emergency fund",
        rationale:
          "If parental leave is partially paid or unpaid, the gap is predictable and shouldn't deplete the real emergency fund. Save the leave-period shortfall in a separate HYSA or short-term T-bill 6–12 months before the due date. Use it for income gap only; everything else is a real emergency.",
        to: "/saving/vs/hysa-vs-money-market",
      },
      {
        name: "Open a 529 only after the first two are funded",
        rationale:
          "A 529 is great — tax-free growth for qualified education expenses, state-tax deduction in many states — but college is 18 years away. Your emergency reserve is the only thing that prevents a $4k car repair from becoming a credit-card debt. Order matters: emergency fund first, leave bridge second, 529 third.",
      },
    ],
    pitfalls: [
      "Cashing out 401(k) to pay off the credit card. Lost match + 10% penalty + tax — the most expensive 'fix' in personal finance.",
      "Buying whole life insurance 'for the baby' from a salesperson. The baby doesn't need a death benefit; you do (term life, much cheaper).",
      "Forgetting to update the W-4. A new dependent changes withholding; an extra $200/mo in take-home is hiding in HR.",
      "Letting the HSA lapse if switching jobs. Roll the HSA — it's the best stealth retirement account you have.",
    ],
    recommendedTools: [
      { name: "Emergency Fund Calculator", slug: "emergency-fund-calculator" },
      { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
    ],
    faqs: [
      { q: "529 or Roth IRA for college?", a: "If you'd otherwise max neither, the Roth wins — withdrawals for qualified education are penalty-free, contributions are always withdrawable, and unused money becomes retirement. If you're already maxing retirement, the 529's tax benefits start to pay off." },
      { q: "Should we get life insurance now?", a: "Yes if either parent's income would be missed. Term life for 20–30 years at 10–15× income; takes 30 minutes online. Stay-at-home parents need a smaller policy too — childcare replacement is real money." },
      { q: "How much should we save for the actual delivery?", a: "Check your insurance's out-of-pocket maximum — that's your worst case. For most plans it's $3–9k. Save that, plus a buffer for unexpected NICU days." },
    ],
    internalLinks: [
      { label: "HYSA vs Money Market", to: "/saving/vs/hysa-vs-money-market" },
      { label: "CDs vs T-Bills", to: "/saving/vs/cds-vs-t-bills" },
      { label: "Saving pillar", to: "/saving" },
      { label: "How much life insurance do you need?", to: "/debt-taxes-insurance/how-much-life-insurance-do-you-need" },
      { label: "Emergency Fund Calculator", to: "/tools/emergency-fund-calculator" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  {
    pillar: "banking",
    slug: "expats",
    personaName: "Expats & Remote Workers",
    title: "Best Banking Setup for Expats & Remote Workers (2026)",
    metaTitle: "Best Banking for Expats & Remote Workers (2026) | MoneyMoodBoard",
    metaDescription:
      "Multi-currency accounts, FX-free debit cards, and the banking stack expats and digital nomads actually use in 2026.",
    summary:
      "If you live and earn across borders, your bank choice is no longer about branches — it's about FX fees, wire reliability, and which accounts won't freeze when you log in from Lisbon. A two-account stack (a U.S. online bank + a multi-currency fintech like Wise) covers 95% of scenarios.",
    profile:
      "You earn in USD but live abroad, or earn abroad and have U.S. obligations (loans, family, taxes). Your debit card gets declined at random. International wires cost $40 and arrive in three days. A regular checking account no longer fits the life you have.",
    approaches: [
      {
        name: "Keep one U.S.-domiciled online bank for income, taxes, U.S. bills",
        rationale:
          "ACH-friendly, U.S. routing number, FDIC-insured. Use Schwab Bank or Charles Schwab Investor Checking for unlimited worldwide ATM-fee rebates, or a fintech like SoFi for high-yield savings. Direct deposit lands here.",
        to: "/banking/how-to-choose-a-checking-account",
      },
      {
        name: "Layer a Wise (or Revolut) multi-currency account",
        rationale:
          "Hold balances in USD, EUR, GBP and 40+ currencies. Convert at the real mid-market rate plus ~0.4% fee — vastly cheaper than any traditional bank. Spend abroad from the matching currency balance with no FX markup.",
      },
      {
        name: "Open a local bank account in your country of residence — eventually",
        rationale:
          "Many local services (utility direct debits, landlord deposits, government refunds) only work with a local IBAN. Open one once you're staying >12 months; before that, Wise is enough.",
      },
    ],
    pitfalls: [
      "Logging into U.S. banks from foreign IPs without a heads-up — accounts get frozen for fraud risk. Notify them or use a U.S. VPN endpoint.",
      "Using a U.S. card abroad with 3% FX fees. That's $300/year on $10k of spend, completely avoidable.",
      "Closing the U.S. credit card while abroad. Your U.S. credit file decays — you may need it for a future mortgage, car loan, or moving back.",
      "Forgetting FBAR / FATCA. Any non-U.S. account over $10k aggregate triggers FBAR filing requirements; ignore it at your peril.",
    ],
    recommendedTools: [
      { name: "Budget Planner", slug: "budget-planner" },
      { name: "Compound Interest Calculator", slug: "compound-interest-calculator" },
    ],
    faqs: [
      { q: "Is Wise FDIC-insured?", a: "USD balances at Wise are held in pooled accounts and FDIC-insured up to $250k through partner banks. Non-USD balances aren't FDIC-insured but have segregated safeguards." },
      { q: "Can I keep using my U.S. bank if I move abroad?", a: "Yes, but check before you go. Some banks close accounts of non-resident customers; Schwab, Charles Schwab and most online banks don't." },
      { q: "Do I still file U.S. taxes?", a: "If you're a U.S. citizen or green-card holder — yes, every year, no matter where you live. Foreign Earned Income Exclusion or Foreign Tax Credit usually wipes out most of the bill." },
    ],
    internalLinks: [
      { label: "Online bank vs credit union", to: "/banking/vs/online-bank-vs-credit-union" },
      { label: "Banking pillar", to: "/banking" },
      { label: "HYSA vs Money Market", to: "/saving/vs/hysa-vs-money-market" },
      { label: "Best for self-employed", to: "/retirement/best-for-self-employed" },
      { label: "Budget Planner", to: "/tools/budget-planner" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },

  {
    pillar: "debt-taxes-insurance",
    slug: "recent-grads",
    personaName: "Recent Graduates",
    title: "Best Debt & Insurance Plan for Recent Graduates (2026)",
    metaTitle: "Best Debt Plan for Recent Graduates (2026) | MoneyMoodBoard",
    metaDescription:
      "Student-loan strategy, first credit-card moves, term life or none, and the 90-day money plan for the first job out of school.",
    summary:
      "The first 12 months after graduation set the next 10 years of money habits. Three priorities: pick a student-loan repayment plan deliberately, lock in workplace benefits (401(k) match, HSA, term life), and build a $1,000 starter emergency fund before anything else. Investing waits 30 days; surviving the first surprise expense without a credit card doesn't.",
    profile:
      "You graduated in the last 24 months, started your first salaried job, have student loans (federal or private), zero emergency fund, and a benefits portal you've been clicking through randomly. Your decisions here compound for 30 years.",
    approaches: [
      {
        name: "Build a $1k starter emergency fund before extra debt payments",
        rationale:
          "Surprise expenses ($600 car repair, $400 ER copay) will happen in the first year. Without a buffer, they go onto a credit card at 24% — and you're now servicing two debts instead of one. Save $1k first, then attack the loans.",
        to: "/saving/how-big-should-your-emergency-fund-be",
      },
      {
        name: "Capture the 401(k) match before any extra loan payment",
        rationale:
          "If your employer matches 4% of salary, that's an instant 100% return on your contribution. No loan is at 100% APR. Match first, then loans, then the rest of the 401(k) — in that order.",
        to: "/retirement/vs/401k-vs-ira",
      },
      {
        name: "Pick a federal student-loan plan deliberately",
        rationale:
          "Standard 10-year, graduated, or income-driven (SAVE/PAYE depending on 2026 rules). Income-driven is right if your salary is low vs the loan balance; standard is right if you can comfortably afford it. Auto-default plans never optimise for you. Pick on purpose.",
      },
    ],
    pitfalls: [
      "Refinancing federal student loans to private before exhausting forgiveness / income-driven options. Once refinanced you can't go back.",
      "Buying whole-life insurance from a campus recruiter. You almost certainly don't need life insurance yet; if you do, term is 10× cheaper.",
      "Maxing out a Roth IRA while carrying 24% credit-card debt. Kill the debt first; the math is brutal.",
      "Ignoring the HSA. If you're on a high-deductible plan, the HSA is the most tax-advantaged account in the U.S. — and the only one you can fund regardless of retirement contributions.",
    ],
    recommendedTools: [
      { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator" },
      { name: "Budget Planner", slug: "budget-planner" },
    ],
    faqs: [
      { q: "Should I pay off student loans aggressively or invest?", a: "Above ~7% interest: pay aggressively. Below ~5%: invest the difference (after capturing the match). Between: split, but lean toward whichever gives you better sleep." },
      { q: "Do I need life insurance fresh out of school?", a: "Almost never. Term life makes sense only if someone depends on your income (spouse, child). Otherwise wait until that's true." },
      { q: "What about renter's insurance?", a: "Yes — $10–$20/month, covers all your stuff plus liability if a guest gets hurt. The single highest-ROI insurance product in your 20s." },
    ],
    internalLinks: [
      { label: "Snowball vs Avalanche", to: "/debt-taxes-insurance/vs/snowball-vs-avalanche" },
      { label: "Debt Payoff Calculator", to: "/tools/debt-payoff-calculator" },
      { label: "Best for students (credit cards)", to: "/credit-cards/best-for-students" },
      { label: "Best for freelancers (budgeting)", to: "/budgeting/best-for-freelancers" },
      { label: "401(k) vs IRA", to: "/retirement/vs/401k-vs-ira" },
    ],
    published: "2026-05-12",
    updated: "2026-05-12",
  },
];

export const getPersona = (
  pillarSlug: string,
  personaSlug: string,
): Persona | undefined =>
  personas.find((p) => p.pillar === pillarSlug && p.slug === personaSlug);

export const getPersonasForPillar = (pillarSlug: PillarSlug): Persona[] =>
  personas.filter((p) => p.pillar === pillarSlug);
