import type { PillarSlug } from "./pillars";

/**
 * Named-entity registry for MoneyMoodBoard.
 *
 * Each entity has:
 *  - canonical name (used as the auto-link target text and glossary term)
 *  - aliases (alternate spellings/abbreviations used in body copy)
 *  - short, plain-English definition (rendered on /glossary)
 *  - pillar (primary topical home — drives nav grouping)
 *  - sameAs (Wikipedia + Wikidata canonical URLs — knowledge-graph trust signal)
 *
 * This registry powers:
 *  1. Site-wide /glossary page with DefinedTermSet schema.
 *  2. Per-article `mentions` / `about` JSON-LD arrays.
 *  3. Author Person `knowsAbout` enrichment.
 */
export interface Entity {
  /** Canonical display name. Used as the slug source. */
  name: string;
  /** Alternate forms found in body copy (case-insensitive match). */
  aliases?: string[];
  /** Plain-English definition for glossary + schema. */
  definition: string;
  /** Primary topical home. */
  pillar: PillarSlug;
  /** Authoritative external IDs — minimum: Wikipedia + Wikidata. */
  sameAs: string[];
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const entities: Entity[] = [
  // ---------- Budgeting ----------
  {
    name: "Zero-based budgeting",
    aliases: ["zero-based budget", "ZBB"],
    definition: "A budgeting method where every dollar of income is assigned a job until income minus allocations equals zero.",
    pillar: "budgeting",
    sameAs: ["https://en.wikipedia.org/wiki/Zero-based_budgeting", "https://www.wikidata.org/wiki/Q2598971"],
  },
  {
    name: "50/30/20 rule",
    aliases: ["50/30/20", "50-30-20 rule"],
    definition: "A budgeting framework that splits take-home pay into 50% needs, 30% wants, and 20% savings and debt repayment.",
    pillar: "budgeting",
    sameAs: ["https://en.wikipedia.org/wiki/Elizabeth_Warren#All_Your_Worth", "https://www.wikidata.org/wiki/Q98723972"],
  },
  {
    name: "Envelope system",
    aliases: ["envelope budgeting", "cash envelopes"],
    definition: "A cash-management system where spending categories are funded with physical or digital envelopes that cannot be exceeded.",
    pillar: "budgeting",
    sameAs: ["https://en.wikipedia.org/wiki/Envelope_system", "https://www.wikidata.org/wiki/Q5380691"],
  },
  {
    name: "Sinking fund",
    definition: "Money set aside in regular instalments to pay for a known future expense such as car registration or annual insurance.",
    pillar: "budgeting",
    sameAs: ["https://en.wikipedia.org/wiki/Sinking_fund", "https://www.wikidata.org/wiki/Q1574022"],
  },
  {
    name: "Kakeibo",
    definition: "A Japanese household budgeting method that pairs four spending buckets with weekly mindful journaling.",
    pillar: "budgeting",
    sameAs: ["https://en.wikipedia.org/wiki/Kakeibo", "https://www.wikidata.org/wiki/Q108883083"],
  },

  // ---------- Credit cards ----------
  {
    name: "APR",
    aliases: ["annual percentage rate"],
    definition: "The yearly cost of borrowing money, expressed as a percentage and including most fees.",
    pillar: "credit-cards",
    sameAs: ["https://en.wikipedia.org/wiki/Annual_percentage_rate", "https://www.wikidata.org/wiki/Q422959"],
  },
  {
    name: "Credit utilization",
    aliases: ["utilization ratio", "credit utilisation"],
    definition: "The percentage of your available revolving credit that you are currently using — a major input to FICO and VantageScore.",
    pillar: "credit-cards",
    sameAs: ["https://en.wikipedia.org/wiki/Credit_score_in_the_United_States#Credit_utilization", "https://www.wikidata.org/wiki/Q5184792"],
  },
  {
    name: "FICO score",
    aliases: ["FICO", "FICO credit score"],
    definition: "A consumer credit score developed by Fair Isaac Corporation, ranging from 300 to 850, used by most U.S. lenders.",
    pillar: "credit-cards",
    sameAs: ["https://en.wikipedia.org/wiki/Credit_score_in_the_United_States#FICO_score", "https://www.wikidata.org/wiki/Q1394467"],
  },
  {
    name: "VantageScore",
    definition: "A credit-scoring model jointly developed by the three U.S. credit bureaus, also ranging 300 to 850.",
    pillar: "credit-cards",
    sameAs: ["https://en.wikipedia.org/wiki/VantageScore", "https://www.wikidata.org/wiki/Q7914187"],
  },
  {
    name: "Balance transfer",
    definition: "Moving credit-card debt from one card to another — usually to a card with a 0% promotional APR — to reduce interest cost.",
    pillar: "credit-cards",
    sameAs: ["https://en.wikipedia.org/wiki/Balance_transfer", "https://www.wikidata.org/wiki/Q4850872"],
  },
  {
    name: "Chargeback",
    definition: "A reversal of a credit-card payment initiated by the cardholder's bank, typically for fraud, billing errors, or undelivered goods.",
    pillar: "credit-cards",
    sameAs: ["https://en.wikipedia.org/wiki/Chargeback", "https://www.wikidata.org/wiki/Q733446"],
  },

  // ---------- Investing ----------
  {
    name: "Index fund",
    definition: "A mutual fund or ETF designed to track a market index such as the S&P 500, offering broad diversification at low cost.",
    pillar: "investing",
    sameAs: ["https://en.wikipedia.org/wiki/Index_fund", "https://www.wikidata.org/wiki/Q1421286"],
  },
  {
    name: "Exchange-traded fund",
    aliases: ["ETF", "ETFs"],
    definition: "A pooled investment fund that trades on a stock exchange like a single share, typically tracking an index.",
    pillar: "investing",
    sameAs: ["https://en.wikipedia.org/wiki/Exchange-traded_fund", "https://www.wikidata.org/wiki/Q156678"],
  },
  {
    name: "S&P 500",
    aliases: ["S and P 500", "Standard & Poor's 500"],
    definition: "A stock market index of 500 of the largest U.S. publicly-traded companies, weighted by market capitalisation.",
    pillar: "investing",
    sameAs: ["https://en.wikipedia.org/wiki/S%26P_500", "https://www.wikidata.org/wiki/Q242345"],
  },
  {
    name: "Dollar-cost averaging",
    aliases: ["DCA"],
    definition: "Investing a fixed dollar amount on a regular schedule regardless of price, reducing the impact of short-term volatility.",
    pillar: "investing",
    sameAs: ["https://en.wikipedia.org/wiki/Dollar_cost_averaging", "https://www.wikidata.org/wiki/Q5288116"],
  },
  {
    name: "Compound interest",
    definition: "Interest calculated on both the original principal and accumulated interest from previous periods.",
    pillar: "investing",
    sameAs: ["https://en.wikipedia.org/wiki/Compound_interest", "https://www.wikidata.org/wiki/Q179179"],
  },
  {
    name: "Expense ratio",
    definition: "The annual fee a fund charges its investors, expressed as a percentage of assets under management.",
    pillar: "investing",
    sameAs: ["https://en.wikipedia.org/wiki/Expense_ratio", "https://www.wikidata.org/wiki/Q5421250"],
  },

  // ---------- Retirement ----------
  {
    name: "Roth IRA",
    definition: "A U.S. retirement account funded with after-tax dollars; qualified withdrawals in retirement are tax-free.",
    pillar: "retirement",
    sameAs: ["https://en.wikipedia.org/wiki/Roth_IRA", "https://www.wikidata.org/wiki/Q1414253"],
  },
  {
    name: "Traditional IRA",
    definition: "A U.S. retirement account funded with pre-tax dollars; contributions may be tax-deductible and withdrawals are taxed as ordinary income.",
    pillar: "retirement",
    sameAs: ["https://en.wikipedia.org/wiki/Traditional_IRA", "https://www.wikidata.org/wiki/Q12064935"],
  },
  {
    name: "401(k)",
    aliases: ["401k", "401 k"],
    definition: "An employer-sponsored U.S. retirement plan that lets employees contribute a portion of pay on a pre-tax or Roth basis, often with employer matching.",
    pillar: "retirement",
    sameAs: ["https://en.wikipedia.org/wiki/401(k)", "https://www.wikidata.org/wiki/Q1208166"],
  },
  {
    name: "Required minimum distribution",
    aliases: ["RMD", "RMDs"],
    definition: "The minimum amount the IRS requires you to withdraw annually from most tax-deferred retirement accounts after a certain age.",
    pillar: "retirement",
    sameAs: ["https://en.wikipedia.org/wiki/Individual_retirement_account#Required_minimum_distributions", "https://www.wikidata.org/wiki/Q7522498"],
  },
  {
    name: "Social Security",
    aliases: ["Social Security Administration", "SSA"],
    definition: "A U.S. federal program providing retirement, disability, and survivor benefits funded by payroll taxes.",
    pillar: "retirement",
    sameAs: ["https://en.wikipedia.org/wiki/Social_Security_(United_States)", "https://www.wikidata.org/wiki/Q1457529"],
  },

  // ---------- Saving ----------
  {
    name: "High-yield savings account",
    aliases: ["HYSA", "high yield savings"],
    definition: "A savings account, usually offered by an online bank, that pays a substantially higher annual percentage yield than the national average.",
    pillar: "saving",
    sameAs: ["https://en.wikipedia.org/wiki/Savings_account", "https://www.wikidata.org/wiki/Q1166072"],
  },
  {
    name: "Annual percentage yield",
    aliases: ["APY"],
    definition: "The total interest earned on a deposit account in a year, including the effect of compounding.",
    pillar: "saving",
    sameAs: ["https://en.wikipedia.org/wiki/Annual_percentage_yield", "https://www.wikidata.org/wiki/Q4768302"],
  },
  {
    name: "Certificate of deposit",
    aliases: ["CD", "CDs"],
    definition: "A time deposit at a bank that pays a fixed interest rate for a fixed term, with penalties for early withdrawal.",
    pillar: "saving",
    sameAs: ["https://en.wikipedia.org/wiki/Certificate_of_deposit", "https://www.wikidata.org/wiki/Q1058831"],
  },
  {
    name: "Emergency fund",
    definition: "A reserve of cash kept in a liquid account to cover unexpected expenses or income loss — typically 3 to 6 months of essential outgoings.",
    pillar: "saving",
    sameAs: ["https://en.wikipedia.org/wiki/Emergency_fund", "https://www.wikidata.org/wiki/Q5371580"],
  },
  {
    name: "Money market account",
    aliases: ["MMA", "money market"],
    definition: "A deposit account that combines features of savings and checking, often paying tiered interest based on balance.",
    pillar: "saving",
    sameAs: ["https://en.wikipedia.org/wiki/Money_market_account", "https://www.wikidata.org/wiki/Q1853975"],
  },

  // ---------- Banking ----------
  {
    name: "FDIC insurance",
    aliases: ["FDIC", "FDIC-insured"],
    definition: "U.S. federal deposit insurance, currently up to $250,000 per depositor per insured bank, that protects savings if the bank fails.",
    pillar: "banking",
    sameAs: ["https://en.wikipedia.org/wiki/Federal_Deposit_Insurance_Corporation", "https://www.wikidata.org/wiki/Q608962"],
  },
  {
    name: "NCUA insurance",
    aliases: ["NCUA"],
    definition: "Equivalent of FDIC insurance for credit-union members, administered by the National Credit Union Administration.",
    pillar: "banking",
    sameAs: ["https://en.wikipedia.org/wiki/National_Credit_Union_Administration", "https://www.wikidata.org/wiki/Q6970061"],
  },
  {
    name: "Routing number",
    aliases: ["ABA routing number", "ABA number"],
    definition: "A nine-digit code that identifies a U.S. bank for processing checks and electronic transfers.",
    pillar: "banking",
    sameAs: ["https://en.wikipedia.org/wiki/ABA_routing_transit_number", "https://www.wikidata.org/wiki/Q3402970"],
  },
  {
    name: "Overdraft fee",
    aliases: ["overdraft"],
    definition: "A fee charged when an account is debited for more money than is available in the balance.",
    pillar: "banking",
    sameAs: ["https://en.wikipedia.org/wiki/Overdraft", "https://www.wikidata.org/wiki/Q857225"],
  },

  // ---------- Debt, taxes, insurance ----------
  {
    name: "Debt avalanche",
    aliases: ["avalanche method"],
    definition: "A debt-payoff strategy that targets the debt with the highest interest rate first while paying minimums on the rest.",
    pillar: "debt-taxes-insurance",
    sameAs: ["https://en.wikipedia.org/wiki/Debt-snowball_method#Debt_avalanche", "https://www.wikidata.org/wiki/Q108883156"],
  },
  {
    name: "Debt snowball",
    aliases: ["snowball method"],
    definition: "A debt-payoff strategy that targets the smallest balance first to build psychological momentum.",
    pillar: "debt-taxes-insurance",
    sameAs: ["https://en.wikipedia.org/wiki/Debt-snowball_method", "https://www.wikidata.org/wiki/Q5249028"],
  },
  {
    name: "Standard deduction",
    definition: "A fixed dollar amount the IRS lets taxpayers subtract from gross income instead of itemising deductions.",
    pillar: "debt-taxes-insurance",
    sameAs: ["https://en.wikipedia.org/wiki/Standard_deduction", "https://www.wikidata.org/wiki/Q7597286"],
  },
  {
    name: "Term life insurance",
    aliases: ["term life"],
    definition: "Life insurance that provides coverage for a fixed period (the term) and pays a death benefit only if the insured dies within that term.",
    pillar: "debt-taxes-insurance",
    sameAs: ["https://en.wikipedia.org/wiki/Term_life_insurance", "https://www.wikidata.org/wiki/Q1196100"],
  },
  {
    name: "Health Savings Account",
    aliases: ["HSA"],
    definition: "A tax-advantaged U.S. account paired with a high-deductible health plan, used to save for qualified medical expenses.",
    pillar: "debt-taxes-insurance",
    sameAs: ["https://en.wikipedia.org/wiki/Health_savings_account", "https://www.wikidata.org/wiki/Q5690425"],
  },
  {
    name: "Consumer Financial Protection Bureau",
    aliases: ["CFPB"],
    definition: "A U.S. government agency that supervises financial-products companies and enforces consumer-finance laws.",
    pillar: "debt-taxes-insurance",
    sameAs: ["https://en.wikipedia.org/wiki/Consumer_Financial_Protection_Bureau", "https://www.wikidata.org/wiki/Q5165545"],
  },
];

/** Lookup map by lowercased name + aliases. */
export const entityByTerm: Record<string, Entity> = (() => {
  const map: Record<string, Entity> = {};
  for (const e of entities) {
    map[e.name.toLowerCase()] = e;
    for (const a of e.aliases ?? []) map[a.toLowerCase()] = e;
  }
  return map;
})();

export const entitySlug = (e: Entity) => slugify(e.name);

/**
 * Return entities mentioned in a body of text.
 * Match is case-insensitive whole-word against the entity name and any aliases.
 * Used to build per-article `mentions` JSON-LD arrays.
 */
export function findEntitiesInText(text: string): Entity[] {
  const lower = text.toLowerCase();
  const seen = new Set<string>();
  const out: Entity[] = [];
  for (const e of entities) {
    const candidates = [e.name, ...(e.aliases ?? [])];
    for (const c of candidates) {
      const needle = c.toLowerCase();
      // word boundary using regex; escape special chars
      const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i");
      if (re.test(lower) && !seen.has(e.name)) {
        seen.add(e.name);
        out.push(e);
        break;
      }
    }
  }
  return out;
}
