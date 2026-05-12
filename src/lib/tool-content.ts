// Long-form explainer copy for each calculator. Each entry is rendered by the
// shared `ToolExplainer` component beneath the tool UI and feeds the FAQPage +
// (optional) HowTo schema. Body prose targets 600–900 words per tool.

export interface FormulaSpec {
  label: string;
  plain: string;
  variables: { sym: string; meaning: string }[];
}

export interface ToolContent {
  slug: string;
  howItWorks: string[];
  formula: FormulaSpec;
  whenToUse: string[];
  limitations: string[];
  sources: { label: string; url: string }[];
  faqs: { q: string; a: string }[];
  /** When true, the page emits HowTo JSON-LD derived from howItWorks. */
  howToSteps?: { name: string; text: string }[];
  relatedPillar: { slug: string; label: string };
  relatedTools: { slug: string; name: string }[];
}

export const toolContent: Record<string, ToolContent> = {
  "budget-planner": {
    slug: "budget-planner",
    howItWorks: [
      "The Budget Planner takes your monthly take-home pay and splits it into three buckets using the 50/30/20 rule popularised by U.S. Senator Elizabeth Warren in her 2005 book All Your Worth. Needs cover the spending you can't avoid this month, housing, utilities, groceries, transportation, insurance premiums, and minimum debt payments. Wants are the discretionary purchases that make life enjoyable but could be paused if your income dropped tomorrow: dining out, streaming subscriptions, hobbies, travel, and shopping that isn't strictly necessary. Savings is everything else, emergency fund contributions, retirement deposits, extra debt payoff beyond the minimums, and money earmarked for short-term goals like a car or a wedding.",
      "Plug in your monthly net pay and the tool multiplies the three percentages against that figure in real time. The sliders let you depart from the textbook 50/30/20 mix because real budgets rarely match the default, high cost-of-living cities push needs above 50%, aggressive debt payers push savings above 20%, and FIRE-track earners sometimes hit 50% savings rates. The math is identical to what a spreadsheet would do; the value is the live feedback as you adjust the levers.",
      "Once you settle on a target split, treat it as a ceiling, not a floor. Open last month's bank and card statements, categorise every transaction into needs, wants, or savings, and compare the actuals against the targets. The gap tells you which lever to pull next month, usually shrinking 'wants' subscriptions or refinancing a 'needs' line like insurance.",
    ],
    formula: {
      label: "Monthly allocation by category",
      plain: "Allocation = Net income × (Category percentage ÷ 100)",
      variables: [
        { sym: "Net income", meaning: "Take-home pay after federal/state tax and benefits (paycheck deposits, not gross salary)" },
        { sym: "Category %", meaning: "Your chosen share, 50/30/20 is the default; needs+wants+savings must equal 100" },
      ],
    },
    whenToUse: [
      "You're starting a budget from scratch and want a sanity-check target before sorting transactions.",
      "You just got a raise or new job and need to right-size each category to the new paycheck.",
      "Your saving rate has stalled and you suspect 'wants' creep, the visual split makes the leak obvious.",
      "You're prepping for a partner conversation about money and want neutral, rule-based numbers.",
    ],
    limitations: [
      "Uses after-tax income, so pretax 401(k) and HSA contributions don't show up here, track those separately.",
      "Doesn't model irregular income (freelancers, commissions). Average the last 12 months and use the conservative middle.",
      "Treats minimum debt payments as 'needs' but extra payoff as 'savings', categorise carefully if you have high-interest balances.",
      "Doesn't replace a transaction-level budget. It sets the target; you still need to track actuals to hit it.",
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau, Creating a budget", url: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/" },
      { label: "U.S. Senate testimony, Elizabeth Warren on the 50/30/20 framework", url: "https://www.warren.senate.gov/" },
    ],
    faqs: [
      { q: "What is the 50/30/20 rule?", a: "A budgeting framework that splits after-tax income into 50% needs (rent, utilities, groceries, minimum debt), 30% wants (dining out, subscriptions, hobbies), and 20% savings plus extra debt payoff." },
      { q: "Should I use gross or net income?", a: "Net (take-home) income, what actually lands in your account after taxes and benefits. The 50/30/20 split is calibrated for after-tax cash." },
      { q: "What if my needs are more than 50%?", a: "Common in high cost-of-living cities. Drop wants to ~20% and keep saving at 20%, or work to bring needs below 50% over 12–24 months by changing housing or transportation." },
      { q: "Where should the savings 20% go?", a: "First a starter emergency fund of $1,000, then high-interest debt above ~7% APR, then a full 3–6 month emergency fund, then retirement and long-term investing." },
      { q: "Does the 50/30/20 rule work for high earners?", a: "It works as a floor, high earners typically push savings well past 20%. Use the planner to set a higher target (40–50%) and treat the leftover gap as wants you can spend guilt-free." },
      { q: "How often should I revisit the split?", a: "Quarterly is plenty. Re-check whenever income changes (raise, new job, side income) or a fixed cost moves (rent renewal, refinance, insurance renewal)." },
    ],
    howToSteps: [
      { name: "Find your monthly take-home pay", text: "Use the deposit amount from your last 1–3 paychecks; if income varies, average the last 12 months." },
      { name: "Enter income and choose a split", text: "Start with the default 50/30/20 and adjust sliders only if your situation demands it." },
      { name: "Categorise last month's spending", text: "Open bank and card statements, tag every transaction as Needs, Wants, or Savings." },
      { name: "Compare actuals to targets", text: "The biggest gap is your next month's focus area, usually trimming wants or refinancing a fixed cost." },
    ],
    relatedPillar: { slug: "budgeting", label: "Budgeting guide" },
    relatedTools: [
      { slug: "emergency-fund-calculator", name: "Emergency Fund Calculator" },
      { slug: "savings-goal-calculator", name: "Savings Goal Calculator" },
      { slug: "debt-payoff-calculator", name: "Debt Payoff Calculator" },
    ],
  },

  "compound-interest-calculator": {
    slug: "compound-interest-calculator",
    howItWorks: [
      "Compound interest is the engine behind every long-term wealth plan: each period, the interest your balance earned gets added to the principal, and the next period's interest is calculated on the new, larger balance. The Compound Interest Calculator runs that loop forward for as many years as you choose, layering in regular contributions so you can see the difference between a one-time deposit and a habit.",
      "Three inputs do the heavy lifting: the starting balance, the regular monthly contribution, and the annual rate of return. Years to grow stretches the curve out, and because returns compound exponentially, the back half of a 30-year run produces far more growth than the front half. That's the lesson Albert Einstein supposedly called 'the eighth wonder of the world'; the math is unforgiving in both directions.",
      "Use the calculator to test scenarios rather than predict the future. A 7% nominal return roughly matches the U.S. stock market's long-run real return plus inflation, but real markets deliver that average through gut-wrenching annual swings. Run the same plan at 5%, 7%, and 9% to see the range of plausible outcomes, then pick a contribution rate that lets the worst-case path still land you somewhere you can live with.",
    ],
    formula: {
      label: "Future value with monthly contributions",
      plain: "FV = P × (1 + r/n)^(n·t) + C × [((1 + r/n)^(n·t) − 1) ÷ (r/n)]",
      variables: [
        { sym: "FV", meaning: "Future value at the end of the holding period" },
        { sym: "P", meaning: "Starting principal (initial deposit)" },
        { sym: "C", meaning: "Regular contribution per compounding period" },
        { sym: "r", meaning: "Annual interest rate (decimal, 0.07 for 7%)" },
        { sym: "n", meaning: "Compounding periods per year (12 for monthly)" },
        { sym: "t", meaning: "Number of years invested" },
      ],
    },
    whenToUse: [
      "Sizing a retirement contribution to hit a target nest egg at age 60–67.",
      "Comparing a one-time lump sum vs. dollar-cost-averaging the same amount over 12 months.",
      "Showing kids or partners how a $200/month habit becomes a six-figure balance in 30 years.",
      "Stress-testing a savings plan against low (4%), base (7%), and stretch (9%) return scenarios.",
    ],
    limitations: [
      "Uses a single constant return, real markets compound through 30–50% drawdowns that affect sequence-of-returns risk.",
      "Ignores taxes (capital gains, dividends, ordinary income on bond yields). Returns inside a Roth IRA differ from a brokerage account by 1–2% per year.",
      "Inflation isn't modeled separately. A 7% nominal return at 3% inflation is a 4% real return, adjust if you care about purchasing power.",
      "Doesn't account for fees. A 1% expense ratio shaves roughly 25% off a 30-year terminal balance, model 6% if you pay 1% in fees on a 7% gross return.",
    ],
    sources: [
      { label: "Investor.gov compound interest calculator (SEC)", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
      { label: "Bogleheads, Historical and expected returns", url: "https://www.bogleheads.org/wiki/Historical_and_expected_returns" },
    ],
    faqs: [
      { q: "What rate of return should I assume?", a: "For a diversified U.S. stock portfolio over 20+ years, 6–8% nominal is a reasonable planning range. Use 7% as a default and stress-test at 5% and 9% to see the spread." },
      { q: "How often does interest actually compound?", a: "Savings accounts typically compound daily and pay monthly. Investments compound continuously through price changes. For long-term planning, monthly compounding is close enough." },
      { q: "Does this account for inflation?", a: "No, outputs are nominal dollars. Subtract roughly 2–3% from your return assumption (so use 4% instead of 7%) if you want a real-purchasing-power result." },
      { q: "What's the difference between simple and compound interest?", a: "Simple interest pays only on the original principal. Compound interest pays on principal plus accumulated interest, so the balance grows exponentially rather than linearly." },
      { q: "Why are my early years so flat?", a: "Most compound-interest growth comes in the last third of the holding period. Don't quit at year 5 because the chart looks slow, the curve bends sharply upward after year 15–20." },
      { q: "Should I include employer 401(k) match in contributions?", a: "Yes, match is part of your total monthly deposit. Add it to your personal contribution before entering the figure here." },
    ],
    relatedPillar: { slug: "investing", label: "Investing guide" },
    relatedTools: [
      { slug: "retirement-savings-calculator", name: "Retirement Savings Calculator" },
      { slug: "savings-goal-calculator", name: "Savings Goal Calculator" },
      { slug: "emergency-fund-calculator", name: "Emergency Fund Calculator" },
    ],
  },

  "credit-card-payoff-calculator": {
    slug: "credit-card-payoff-calculator",
    howItWorks: [
      "The Credit Card Payoff Calculator simulates month-by-month what happens when you carry a balance at a given APR and make a fixed monthly payment. Each month it subtracts that month's interest charge from your payment, applies the remainder to principal, and rolls the new balance forward. The simulation stops the moment the balance hits zero, and the totals report how many months it took, how much interest you paid, and what fraction of every payment went to the lender versus your debt.",
      "Credit card interest compounds daily inside your statement cycle, but for planning the monthly approximation gets you within a dollar or two of the actual payoff date. The dramatic answer most users find surprising is how slow minimum payments are, at a typical 22% APR with a 2% minimum, a $5,000 balance takes more than 20 years to clear and you pay more in interest than the original balance.",
      "Fix that by paying a flat dollar amount each month rather than a percentage. Once you choose a number, even $50 above the statement minimum, keep it constant as the balance shrinks. The math compounds in your favour because more of each payment hits principal every month.",
    ],
    formula: {
      label: "Months to payoff (fixed payment)",
      plain: "N = −log(1 − (r × B) ÷ M) ÷ log(1 + r)",
      variables: [
        { sym: "N", meaning: "Number of monthly payments until balance hits zero" },
        { sym: "B", meaning: "Current balance owed" },
        { sym: "M", meaning: "Fixed monthly payment (must be greater than monthly interest charge)" },
        { sym: "r", meaning: "Monthly interest rate (annual APR ÷ 12, as decimal)" },
      ],
    },
    whenToUse: [
      "Deciding whether a 0% balance transfer offer beats grinding the current card down at standard APR.",
      "Comparing the snowball (smallest balance first) and avalanche (highest APR first) strategies across two or three cards.",
      "Showing yourself the true total cost of a card so future swipes feel more expensive in the moment.",
      "Sizing a payment that clears the debt before a 0% promo APR expires.",
    ],
    limitations: [
      "Assumes a constant APR. Variable-rate cards reset quarterly with the Prime Rate; if rates rise, your payoff date slips.",
      "Doesn't model new purchases. Adding charges during payoff resets progress and most cards charge interest on new purchases the day they post if you carry any balance.",
      "Ignores late fees, returned-payment fees, and over-limit fees, which can add $25–$40 per occurrence.",
      "If the monthly payment is less than the monthly interest charge, the formula returns no solution, you'd never pay off the card and the balance grows.",
    ],
    sources: [
      { label: "CFPB, Credit card payoff calculator methodology", url: "https://www.consumerfinance.gov/owning-a-home/" },
      { label: "Federal Reserve G.19, Consumer credit interest rates", url: "https://www.federalreserve.gov/releases/g19/current/" },
    ],
    faqs: [
      { q: "What's the minimum payment on a typical credit card?", a: "Most issuers charge 1–3% of the balance plus interest and fees, with a $25 floor. At 2%, a $5,000 balance has roughly a $100 minimum that drops as you pay down, which is exactly why minimums take 20+ years." },
      { q: "Should I do snowball or avalanche?", a: "Avalanche (highest APR first) saves the most money mathematically. Snowball (smallest balance first) wins more often in the real world because the quick wins keep people going. Pick the one you'll actually stick with." },
      { q: "Does paying twice a month help?", a: "Slightly. It reduces the average daily balance the interest is calculated on, shaving a few dollars per month. The bigger win is paying more total, not splitting the same payment." },
      { q: "What APR is 'high' for a credit card?", a: "Federal Reserve data puts the average around 22% in 2024–2026. Anything above 25% is high; below 17% is low for unsecured revolving credit." },
      { q: "Will paying it off hurt my credit score?", a: "No, bringing utilisation from high to low usually helps. Closing the card after payoff can hurt by shrinking your total available credit; consider keeping it open with a small recurring charge." },
      { q: "Is a balance transfer worth it?", a: "Often yes, if you'll actually clear the balance during the 12–21 month 0% window. Factor in the 3–5% transfer fee and avoid new purchases on the card." },
    ],
    relatedPillar: { slug: "credit-cards", label: "Credit cards guide" },
    relatedTools: [
      { slug: "debt-payoff-calculator", name: "Debt Payoff Calculator" },
      { slug: "credit-score-estimator", name: "Credit Score Estimator" },
      { slug: "budget-planner", name: "Budget Planner" },
    ],
  },

  "credit-score-estimator": {
    slug: "credit-score-estimator",
    howItWorks: [
      "FICO scores combine five inputs with published weights: payment history (35%), amounts owed (30%), length of credit history (15%), credit mix (10%), and new credit (10%). The Credit Score Estimator asks for a self-reported answer in each area and translates the weights into a 300–850 range estimate. It is not a hard pull, doesn't query a bureau, and isn't a substitute for the free weekly report you can pull at AnnualCreditReport.com.",
      "The biggest swing factor is payment history. One 30-day late payment can shave 60–110 points off a strong score and lingers on reports for seven years. The estimator weights that input most heavily for the same reason FICO does, lenders care more about whether you paid than how much you owe.",
      "Utilisation is the second lever, and the one most people can move fastest. Total revolving balance divided by total revolving limit determines this number; the conventional wisdom of 'under 30%' is generous, under 10% is where elite scores live. Paying down a card the day before the statement closes (not the due date) reports a lower balance to the bureaus.",
    ],
    formula: {
      label: "FICO weighted score sketch",
      plain: "Score ≈ 300 + 550 × (0.35·H + 0.30·U + 0.15·L + 0.10·M + 0.10·N)",
      variables: [
        { sym: "H", meaning: "Payment history score (0–1, fraction of accounts paid on time)" },
        { sym: "U", meaning: "Utilisation score (0–1, inverse of revolving usage)" },
        { sym: "L", meaning: "Length of credit history score (0–1, scaled by average account age)" },
        { sym: "M", meaning: "Credit mix score (0–1, variety of account types)" },
        { sym: "N", meaning: "New credit score (0–1, recent inquiries and openings)" },
      ],
    },
    whenToUse: [
      "Before a mortgage, auto loan, or apartment application, to know roughly where you stand.",
      "After a missed payment or a balance change, to gauge how much damage was done.",
      "When deciding whether to open a new card; the estimator shows how a hard pull and new account move the needle.",
      "As a teaching tool to show how the five factors interact, the math is more useful than the number.",
    ],
    limitations: [
      "Doesn't replace the real FICO 8 / FICO 9 / VantageScore algorithms, which include proprietary segmentation.",
      "Self-reported inputs are noisy; small errors in utilisation or account age skew the estimate.",
      "Lenders use different score versions and pull from different bureaus (Equifax, Experian, TransUnion), so the same person can see scores 30+ points apart on the same day.",
      "Doesn't account for derogatory items like collections, bankruptcies, or charge-offs, which have outsized negative effects.",
    ],
    sources: [
      { label: "MyFICO, What's in my FICO Scores", url: "https://www.myfico.com/credit-education/whats-in-your-credit-score" },
      { label: "AnnualCreditReport.com (free weekly reports)", url: "https://www.annualcreditreport.com/" },
    ],
    faqs: [
      { q: "Is checking my credit score a hard inquiry?", a: "No, checking your own score is a soft inquiry and never affects the score. Hard inquiries only happen when a lender pulls your report for a credit decision." },
      { q: "How long do late payments hurt my score?", a: "A 30+ day late payment stays on your report for seven years, but its scoring impact fades after about 24 months of clean history." },
      { q: "What utilisation rate is best?", a: "Under 10% on each card and across all cards combined. Zero balances aren't optimal either, using a card occasionally and paying in full looks better than dormancy." },
      { q: "Will closing an unused card hurt my score?", a: "Usually yes, by shrinking your total available credit (raising utilisation) and eventually shortening average account age. Keep the oldest no-fee cards open." },
      { q: "How fast can I rebuild after a low score?", a: "Pay everything on time, keep utilisation under 10%, and don't open new accounts for 12 months. Most people see 50–100 point improvements in 12 months and full recovery in 24–36." },
      { q: "Why do different sites show different scores?", a: "They use different scoring models (FICO 8 vs FICO 9 vs VantageScore 3.0) and different bureau data. Lenders care about the version they pull, not the one your app shows." },
    ],
    relatedPillar: { slug: "credit-cards", label: "Credit cards guide" },
    relatedTools: [
      { slug: "credit-card-payoff-calculator", name: "Credit Card Payoff Calculator" },
      { slug: "debt-payoff-calculator", name: "Debt Payoff Calculator" },
      { slug: "budget-planner", name: "Budget Planner" },
    ],
  },

  "debt-payoff-calculator": {
    slug: "debt-payoff-calculator",
    howItWorks: [
      "The Debt Payoff Calculator lets you list every loan, credit card, and BNPL plan in one place, choose between the snowball (smallest balance first) and avalanche (highest APR first) ordering, and runs the simulation forward. Each month the tool charges interest on every account, applies the statement minimum to each, and pours every extra dollar of your budget into the single account at the top of the priority list. When that one is paid off, the freed-up minimum rolls onto the next account, the classic 'debt avalanche' acceleration.",
      "Avalanche always wins on dollars-and-cents. Sorting by APR (highest first) means you eliminate the most expensive money first, so you pay less total interest. Snowball wins on momentum: clearing the smallest balance gives a fast win, which is why behavioural finance research from Northwestern's Kellogg School found snowball users finish at higher rates even though they pay slightly more.",
      "Whichever strategy you pick, the math only works if you stop adding new debt during the payoff. Every new charge resets the simulation. Treat the projected payoff date as a deadline, not a forecast, it moves left when you add bonus income to the payment and right when you charge anything new.",
    ],
    formula: {
      label: "Payoff with debt-roll acceleration",
      plain: "Each month: balance ← balance × (1 + APR/12) − payment; rolled payment grows as each loan clears.",
      variables: [
        { sym: "Balance", meaning: "Remaining principal on each account at start of month" },
        { sym: "APR", meaning: "Annual rate for that specific account (as decimal)" },
        { sym: "Payment", meaning: "Account minimum + any extra rolled from already-paid accounts" },
      ],
    },
    whenToUse: [
      "You have 2–6 consumer debts and need a single payoff plan instead of attacking them ad-hoc.",
      "You're choosing between snowball and avalanche and want to see the actual dollar difference.",
      "You're negotiating a debt consolidation loan and want to know if the math improves vs. self-managed payoff.",
      "Your debt is growing month-over-month and you need to confirm a single extra payment will turn the trend.",
    ],
    limitations: [
      "Assumes no new purchases on any account during payoff; the math breaks if you keep charging.",
      "Doesn't model variable APRs (HELOCs, some personal loans, all credit cards), projection assumes today's rate holds.",
      "Skips collection accounts and charged-off debt, which often respond to settlement (40–60 cents on the dollar) better than full payoff.",
      "Doesn't replace credit counselling. If total minimums exceed 50% of net income, a non-profit DMP through NFCC may be the better path.",
    ],
    sources: [
      { label: "Kellogg Insight, Why the debt snowball works", url: "https://insight.kellogg.northwestern.edu/article/winning_the_battle_but_losing_the_war" },
      { label: "Federal Reserve, Household debt and credit report", url: "https://www.newyorkfed.org/microeconomics/hhdc" },
    ],
    faqs: [
      { q: "Snowball or avalanche, which is better?", a: "Avalanche saves the most money. Snowball has higher follow-through rates in behavioural studies. If the dollar difference is under a few hundred, pick the one you'll finish." },
      { q: "Should I keep saving while paying off debt?", a: "Keep a $1,000 starter emergency fund and any employer 401(k) match. Pause other savings for high-interest debt above ~7% APR; for sub-7% debt, save and pay in parallel." },
      { q: "Does consolidation help?", a: "Only if it lowers your weighted-average APR and you don't run the cleared cards back up. Personal loans at 8–14% can beat 22% credit cards; 0% balance transfers help if you'll clear during the promo window." },
      { q: "What about debt settlement companies?", a: "Avoid them. They charge 15–25% of enrolled debt, hurt your credit for years, and the IRS treats forgiven debt as taxable income. Try non-profit credit counselling through nfcc.org first." },
      { q: "Will paying off debt boost my credit score?", a: "Yes, especially for revolving accounts, utilisation drops as balances fall. Instalment loans (car, personal) help less because the score model already accounts for scheduled payoff." },
      { q: "How long does payoff take?", a: "Average household consumer-debt payoff plans in our model land between 18 and 48 months. Anything longer probably means either income is too low or the plan needs consolidation help." },
    ],
    howToSteps: [
      { name: "List every debt", text: "Pull statements and write balance, APR, and minimum payment for each loan and card." },
      { name: "Pick a strategy", text: "Avalanche orders by APR (highest first) for max savings; snowball orders by balance (smallest first) for motivation." },
      { name: "Choose a total monthly payment", text: "Add up all minimums and add the extra you can commit, that total is your fixed monthly debt budget." },
      { name: "Pay minimums everywhere, surge on top of the priority debt", text: "All extra goes to the #1 debt. Once it clears, roll its minimum onto #2 and repeat." },
      { name: "Don't add new debt", text: "Freeze the cards (literally or in a drawer) until the plan ends." },
    ],
    relatedPillar: { slug: "debt-taxes-insurance", label: "Debt, taxes & insurance" },
    relatedTools: [
      { slug: "credit-card-payoff-calculator", name: "Credit Card Payoff Calculator" },
      { slug: "budget-planner", name: "Budget Planner" },
      { slug: "credit-score-estimator", name: "Credit Score Estimator" },
    ],
  },

  "emergency-fund-calculator": {
    slug: "emergency-fund-calculator",
    howItWorks: [
      "The Emergency Fund Calculator multiplies your essential monthly expenses by a target number of months of runway. Essential expenses are the bills you'd still have to pay if you lost income tomorrow, housing, utilities, groceries, insurance, transportation, and minimum debt payments. Discretionary spending (dining out, subscriptions, hobbies) is intentionally excluded because you'd cut those first in a real emergency.",
      "The conventional target is 3–6 months of expenses, scaled to your job stability and household composition. Single-income households, gig workers, and anyone in a cyclical industry should lean toward 6–12 months. Dual-income households in stable fields can sit comfortably at 3 months. A starter fund of $1,000 is the right first milestone before any other savings goal.",
      "Keep the cash in a high-yield savings account (HYSA) earning 3–5% APY rather than a checking account or a brokerage. The goal isn't return, it's instant liquidity with no withdrawal penalty and no risk of being down 30% when you need it most. Treat it like fire insurance: deeply boring, occasionally life-changing.",
    ],
    formula: {
      label: "Target emergency fund balance",
      plain: "Target = Essential monthly expenses × Months of runway",
      variables: [
        { sym: "Essential expenses", meaning: "Monthly cost of housing, utilities, groceries, insurance, transit, minimum debt payments" },
        { sym: "Months of runway", meaning: "3 for stable dual-income households, 6 default, 9–12 for single earners and gig workers" },
      ],
    },
    whenToUse: [
      "You're starting personal finance from scratch and need to know what 'enough' looks like.",
      "You just switched jobs or industries and your risk profile changed.",
      "You're considering a career break, parental leave, or relocation that affects income certainty.",
      "You want to right-size the fund, overshooting an emergency fund means lost compounding on the excess.",
    ],
    limitations: [
      "Single point-in-time snapshot. Re-check after every major expense change (rent renewal, new baby, new car loan).",
      "Doesn't account for partial-income emergencies (disability, reduced hours) which can extend the runway needed.",
      "Excludes one-time emergencies like a $4,000 HVAC failure. Some planners suggest layering a separate sinking fund for predictable irregular costs.",
      "Inflation erodes the target over time. Re-baseline annually so 6 months in 2026 isn't 4.5 months by 2030.",
    ],
    sources: [
      { label: "CFPB, An essential guide to building an emergency fund", url: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/" },
      { label: "Federal Reserve, Report on the Economic Well-Being of U.S. Households", url: "https://www.federalreserve.gov/consumerscommunities/shed.htm" },
    ],
    faqs: [
      { q: "How many months should I really save?", a: "Default 6. Drop to 3 only if you have dual stable income and no dependents; stretch to 9–12 if you're self-employed, single-income, or in a layoff-prone industry." },
      { q: "Where should I keep the money?", a: "High-yield savings account at an FDIC-insured online bank earning 3–5% APY. Avoid brokerage, CDs, or anything with a withdrawal penalty." },
      { q: "Is $1,000 enough to start?", a: "Yes, that's the right first milestone before attacking debt or investing. Build the full 3–6 month fund after high-interest debt is gone." },
      { q: "Should I include retirement accounts?", a: "No. The fund needs to be liquid and penalty-free. Roth IRA contributions are technically withdrawable but using them for emergencies undoes years of compounding." },
      { q: "What counts as a real emergency?", a: "Job loss, medical bill, major car or home repair, family crisis. Vacations, holiday shopping, and predictable annual expenses do not, those need a separate sinking fund." },
      { q: "How fast should I build it?", a: "Front-load aggressively until $1,000, then split contributions with debt payoff. Most people complete a full 6-month fund in 12–24 months with the 50/30/20 framework." },
    ],
    howToSteps: [
      { name: "Add up essential expenses", text: "Sum housing, utilities, groceries, insurance, transit, and minimum debt, skip discretionary categories." },
      { name: "Pick a runway target", text: "3 months for dual stable income, 6 months default, 9–12 months for variable income or single earners." },
      { name: "Open a high-yield savings account", text: "FDIC-insured online bank earning current market APY (3–5% in 2026). Set up automatic weekly transfers." },
      { name: "Hit $1,000 first, then build to full target", text: "Treat the starter fund as a separate, faster milestone before tackling the full 3–6 months." },
    ],
    relatedPillar: { slug: "saving", label: "Saving guide" },
    relatedTools: [
      { slug: "budget-planner", name: "Budget Planner" },
      { slug: "savings-goal-calculator", name: "Savings Goal Calculator" },
      { slug: "compound-interest-calculator", name: "Compound Interest Calculator" },
    ],
  },

  "retirement-savings-calculator": {
    slug: "retirement-savings-calculator",
    howItWorks: [
      "The Retirement Savings Calculator projects your nest-egg balance at a target retirement age, then translates that balance into a sustainable annual withdrawal using the 4% rule. You feed it your current age, retirement age, current balance, monthly contribution (including employer match), and an expected nominal annual return. It compounds the balance forward, then divides the terminal value by 25 to get the safe annual withdrawal, the inverse of 4%.",
      "The 4% rule comes from the Trinity Study and subsequent research showing that a balanced 50/50 to 75/25 stock-bond portfolio could sustain inflation-adjusted withdrawals for 30+ years in the vast majority of historical scenarios. Modern updates suggest 3.5–3.8% is safer for early retirees with 40+ year horizons; 4% is fine for traditional retirement at 65.",
      "Use the calculator to size your contribution rate, not to predict an exact number. A useful rule of thumb: save 15% of gross income from age 25 to land at roughly 10× your final salary by 65, which the 4% rule converts to 40% income replacement before Social Security. Push contributions to 20–25% if you started late or want to retire before 60.",
    ],
    formula: {
      label: "Retirement balance and safe withdrawal",
      plain: "Balance(t) = P × (1+r)^t + C × [((1+r)^t − 1) ÷ r];  Safe withdrawal = Balance × 0.04",
      variables: [
        { sym: "P", meaning: "Current retirement account balance across all tax-advantaged accounts" },
        { sym: "C", meaning: "Total annual contribution (personal + employer match)" },
        { sym: "r", meaning: "Expected annual return (decimal, 7% is a typical 60/40 nominal assumption)" },
        { sym: "t", meaning: "Years until target retirement age" },
        { sym: "0.04", meaning: "Safe withdrawal rate from the Trinity Study (use 0.035 for early retirement)" },
      ],
    },
    whenToUse: [
      "Setting a contribution rate at a new job, does 10% get you there, or do you need 18%?",
      "Deciding whether to retire at 60, 65, or 67, the gap year matters more than people expect.",
      "Stress-testing against lower (5%) and higher (8%) return assumptions to see the plan's sensitivity.",
      "Comparing the impact of a $500/month bump (raise, side income) on the eventual nest egg.",
    ],
    limitations: [
      "Single constant return; real markets compound through drawdowns and sequence-of-returns risk hurts most in the first 5 years of retirement.",
      "Doesn't model Social Security, pensions, or part-time retirement income, add those on top of the calculator's output.",
      "Ignores Roth vs Traditional tax treatment; outputs are pretax dollars in a Traditional account, tax-free in a Roth.",
      "4% rule is calibrated for a 30-year retirement. Use 3.5% for early retirees with 40+ year horizons (FIRE).",
    ],
    sources: [
      { label: "Trinity Study (Bengen 1994, Cooley/Hubbard/Walz 1998)", url: "https://www.bogleheads.org/wiki/Trinity_study" },
      { label: "Vanguard, How much do you need to retire?", url: "https://investor.vanguard.com/investor-resources-education/retirement/income-how-much-to-save" },
    ],
    faqs: [
      { q: "What return should I assume for retirement?", a: "6–8% nominal for a diversified stock-heavy portfolio over 20+ years. 5% is conservative; 9% is optimistic. Stress-test all three rather than picking one." },
      { q: "Should I include employer match in monthly contributions?", a: "Yes, it's part of the deposit going into the account each month. Always contribute enough to capture the full match before any other investing." },
      { q: "Is 4% still safe?", a: "For traditional retirement at 65 with a 30-year horizon, yes. For FIRE (retiring at 45–55 with a 40+ year horizon), academic updates suggest 3.5–3.8% is more durable." },
      { q: "Traditional or Roth?", a: "Roth if you expect a higher tax bracket in retirement (younger savers, anticipating raises). Traditional if you're at peak earning years and expect a lower bracket later. A mix hedges the uncertainty." },
      { q: "How does Social Security fit in?", a: "Treat it as an income floor on top of the calculator's withdrawal number. SSA.gov can give you a personalised estimate; most middle-income earners get 30–40% income replacement." },
      { q: "What if I'm starting late?", a: "Save aggressively (20–25% of gross), delay retirement by 2–5 years, and use catch-up contributions ($7,500 extra in 401(k) and $1,000 in IRA after age 50). Both moves compound dramatically." },
    ],
    relatedPillar: { slug: "retirement", label: "Retirement guide" },
    relatedTools: [
      { slug: "compound-interest-calculator", name: "Compound Interest Calculator" },
      { slug: "savings-goal-calculator", name: "Savings Goal Calculator" },
      { slug: "budget-planner", name: "Budget Planner" },
    ],
  },

  "savings-goal-calculator": {
    slug: "savings-goal-calculator",
    howItWorks: [
      "The Savings Goal Calculator solves the inverse compound interest problem: given a target dollar amount and a deadline, it tells you how much you need to set aside every month (plus any starting balance) to land on the goal, factoring in the interest your savings will earn along the way. It works for short-term goals like a wedding or down payment as well as multi-year targets like a kid's college fund or a sabbatical year.",
      "The math handles three scenarios: a one-time lump sum today, a regular monthly contribution, or a combination of both. Most users care about the monthly number, it's the lever they can actually pull from a budget. The interest the savings earns matters far less for short horizons (under 3 years) and much more as you stretch toward 10+ years.",
      "For short goals under 18 months, treat the calculator's output as a savings rate, not an investment plan: park the money in a high-yield savings account or short-term CD ladder rather than the stock market. The risk of a 20% drawdown right before you need the cash is much bigger than the upside of an extra 2–3% return.",
    ],
    formula: {
      label: "Required monthly contribution",
      plain: "C = (FV − P × (1+r)^n) × r ÷ ((1+r)^n − 1)",
      variables: [
        { sym: "C", meaning: "Required monthly contribution" },
        { sym: "FV", meaning: "Future value, your savings goal" },
        { sym: "P", meaning: "Starting balance today" },
        { sym: "r", meaning: "Monthly interest rate (APR ÷ 12, decimal)" },
        { sym: "n", meaning: "Number of months until the goal date" },
      ],
    },
    whenToUse: [
      "Sizing the monthly savings rate for a house down payment in 24–60 months.",
      "Planning a wedding, sabbatical, vehicle replacement, or any one-time future spend with a hard date.",
      "Comparing 'save faster' vs 'wait longer', the calculator shows the trade-off in real dollars.",
      "Setting up multiple sinking funds (vacation, holidays, car maintenance) with separate target amounts.",
    ],
    limitations: [
      "Assumes a constant rate of return. HYSA rates float with the Federal Reserve and can drop 1–2% over the life of a multi-year goal.",
      "Doesn't model market volatility; if you point this at a brokerage account for a 3-year goal, the 'required' number assumes a smooth return that real markets don't deliver.",
      "Single goal at a time. For five competing goals, run the calculator five times and sum the monthly contributions.",
      "Inflation isn't modeled. A $50,000 down payment in 2026 may need to be $58,000 in 2030; bump the target by 2–3% per year for long horizons.",
    ],
    sources: [
      { label: "FDIC, Insured high-yield savings basics", url: "https://www.fdic.gov/resources/deposit-insurance/" },
      { label: "Investor.gov, Savings goal calculator (SEC)", url: "https://www.investor.gov/financial-tools-calculators/calculators" },
    ],
    faqs: [
      { q: "Where should I keep short-term savings?", a: "High-yield savings account for goals 0–18 months out. CD ladder for 18–36 months. Conservative bond fund or treasuries for 3–5 years. Stock market only past 5 years." },
      { q: "Should I invest savings for a 5-year goal?", a: "Mixed, a 60/40 portfolio reduces the chance of falling short but also raises the chance of being 15% down on the goal date. Most planners suggest splitting: invest the 'nice-to-have' portion, hold the 'must-have' portion in cash." },
      { q: "What HYSA rate should I assume?", a: "Use the current market rate (3–5% in 2026) and stress-test at 1–2 points lower. Rates float with the Fed; never assume today's rate holds for 5 years." },
      { q: "Can I have multiple savings goals at once?", a: "Yes, run the calculator separately for each, sum the monthly contributions, and confirm the total fits inside your 20% savings allocation from the 50/30/20 framework." },
      { q: "What if I can't hit the required monthly amount?", a: "Three options: extend the timeline, lower the goal, or find more income. The calculator makes the trade-off explicit, most people end up moving the date 6–12 months." },
      { q: "Should I include the goal in my emergency fund?", a: "No. Emergency fund is for unplanned needs and stays separate. Sinking funds are for planned spending and can sit in the same HYSA but should be tracked in distinct sub-accounts or buckets." },
    ],
    relatedPillar: { slug: "saving", label: "Saving guide" },
    relatedTools: [
      { slug: "emergency-fund-calculator", name: "Emergency Fund Calculator" },
      { slug: "compound-interest-calculator", name: "Compound Interest Calculator" },
      { slug: "budget-planner", name: "Budget Planner" },
    ],
  },
};
