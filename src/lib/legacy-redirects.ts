// 301 redirect map from legacy WordPress URLs (sitemap_index.xml on the
// previous moneymoodboard.com) to the new TanStack Start site. Consumed
// by src/server.ts before delegating to the SSR handler so crawlers see a
// real 301 (not a soft 200 + JS redirect) and link equity is preserved.

const EXACT: Record<string, string> = {
  // Pages
  "/about-us": "/about",
  "/contact-us": "/contact",
  "/privacy-policy": "/privacy",
  "/disclaimer": "/disclaimer",
  "/editorial-guidelines": "/about",
  "/start-here": "/",
  "/subscribe": "/newsletter",
  "/blog": "/",
  "/weekly-budget-planner": "/tools/budget-planner",

  // Standalone budgeting pages
  "/best-free-budgeting-apps": "/budgeting/best-free-budgeting-apps",
  "/what-is-zero-based-budgeting": "/budgeting/zero-based-budgeting",
  "/how-to-start-zero-based-budget": "/budgeting/zero-based-budgeting",
  "/zero-based-budgeting-vs-50-30-20": "/budgeting/the-50-30-20-rule-a-beginner-s-guide",
  "/zero-based-budgeting-irregular-income": "/budgeting/budgeting-on-variable-income",
  "/envelope-budgeting-system-explained-cash-or-digital":
    "/budgeting/envelope-method-in-2026-cash-and-digital",
  "/reverse-budgeting-pros-and-cons-pay-yourself-first-explained":
    "/budgeting/pay-yourself-first-budgeting",
  "/budgeting-for-millennials": "/budgeting/budgeting-in-your-20s",
  "/10-budgeting-mistakes-beginners-make-and-how-to-fix-them": "/budgeting",

  // Category archives
  "/personal-finance": "/",
  "/personal-finance/personal-finance-tools": "/tools",
  "/credit-debit": "/credit-cards",
  "/credit-debit/credit-cards": "/credit-cards",
  "/credit-debit/credit-scores-reports": "/credit-cards",
  "/credit-debit/credit-building": "/credit-cards",
  "/credit-debit/buy-now-pay-later-bnpl": "/credit-cards",
  "/budget-savings": "/budgeting",
  "/budget-savings/budgeting": "/budgeting",
  "/saving-budgeting/savings-accounts": "/saving",
  "/saving-budgeting/high-yield-savings": "/saving",
  "/investing/investment-strategies": "/investing",
  "/checking-accounts": "/banking",
  "/banking-and-financial-services": "/banking",

  // Banking / checking / savings posts
  "/checking-accounts/what-is-a-checking-account-beginners-guide": "/banking",
  "/checking-accounts/the-complete-guide-to-checking-accounts-how-they-work-benefits-and-best-options":
    "/banking",
  "/checking-accounts/checking-account-vs-savings-account-key-differences":
    "/banking/bills-spending-saving-the-3-account-setup",
  "/checking-accounts/how-to-open-a-checking-account-step-by-step-guide":
    "/banking/how-to-switch-banks-without-headaches",
  "/checking-accounts/types-of-checking-accounts-which-one-is-right-for-you": "/banking",
  "/checking-accounts/what-is-overdraft-protection-and-how-does-it-work":
    "/banking/how-to-avoid-overdraft-fees",
  "/checking-accounts/best-free-checking-accounts-in-the-us-2025":
    "/banking/best-free-checking-accounts",
  "/checking-accounts/best-online-checking-accounts-with-no-monthly-fees-2025":
    "/banking/best-free-checking-accounts",
  "/checking-accounts/high-interest-checking-accounts-are-they-worth-it": "/banking",
  "/checking-accounts/traditional-bank-vs-online-checking-accounts-which-is-better-in-2025":
    "/banking/online-banks-vs-traditional-banks",
  "/banking-and-financial-services/a-beginners-guide-to-banking-and-financial-services-understanding-the-basics":
    "/banking",
  "/banking-and-financial-services/the-importance-of-financial-planning-securing-your-financial-future":
    "/",
  "/banking-and-financial-services/the-benefits-of-credit-unions-a-guide-to-joining-and-saving-money":
    "/banking",
  "/saving-budgeting/savings-accounts/understanding-regular-savings-accounts-a-comprehensive-guide":
    "/saving",
  "/saving-budgeting/savings-accounts/step-by-step-guide-to-opening-your-first-savings-account":
    "/saving",
  "/saving-budgeting/savings-accounts/demystifying-savings-accounts-your-guide-to-financial-security-and-growth":
    "/saving",
  "/saving-budgeting/savings-accounts/comprehensive-guide-to-the-best-savings-accounts-for-2025":
    "/saving/best-high-yield-savings-accounts",
  "/saving-budgeting/high-yield-savings/top-high-yield-savings-accounts-for-2025":
    "/saving/best-high-yield-savings-accounts",
  "/saving-budgeting/high-yield-savings/high-yield-savings-accounts-everything-you-need-to-know":
    "/saving/best-high-yield-savings-accounts",
  "/saving-budgeting/high-yield-savings/high-yield-savings-accounts-vs-regular-savings-accounts-which-is-right-for-you":
    "/saving/hysa-vs-money-market-vs-cds",

  // Investing posts
  "/investing/investment-strategies/certificates-of-deposit-cds-a-complete-guide":
    "/saving/hysa-vs-money-market-vs-cds",
  "/investing/investment-strategies/the-importance-of-understanding-risk-in-investment-planning":
    "/investing/risk-tolerance-vs-risk-capacity",
  "/investing/investment-strategies/savings-vs-investment-understanding-the-difference":
    "/investing",

  // Personal finance posts
  "/personal-finance/personal-finance-tools/the-best-personal-finance-apps-a-deep-dive-into-todays-smartest-money-tools":
    "/budgeting/best-free-budgeting-apps",
  "/personal-finance/personal-finance-class-in-high-school": "/",
  "/personal-finance/personal-finance-101-mastering-money-management-from-scratch": "/",

  // Credit & debit posts
  "/credit-debit/credit-cards/secured-credit-cards-guide": "/credit-cards/best-cards-for-bad-credit",
  "/credit-debit/buy-now-pay-later-bnpl/bnpl-credit-score-impact": "/credit-cards",
  "/credit-debit/credit-scores-reports/how-long-to-build-credit":
    "/credit-cards/building-credit-from-zero",
  "/credit-debit/credit-scores-reports/credit-score-dropped-80-points":
    "/credit-cards/how-credit-scores-are-calculated",
  "/credit-debit/credit-scores-reports/good-credit-score-us-uk-canada":
    "/credit-cards/how-credit-scores-are-calculated",
  "/credit-debit/credit-scores-reports/credit-score-dropped-after-paying-loan":
    "/credit-cards/how-credit-scores-are-calculated",
  "/credit-debit/build-credit-20s": "/credit-cards/building-credit-from-zero",
  "/credit-debit/credit-building/best-credit-builder-apps-2025":
    "/credit-cards/building-credit-from-zero",
  "/credit-debit/credit-building/rent-reporting-apps-review":
    "/credit-cards/building-credit-from-zero",

  // Budget/savings posts
  "/budget-savings/budgeting-saving-money-guide-broke-freelancer":
    "/budgeting/budgeting-on-variable-income",
  "/budget-savings/budgeting/the-ultimate-guide-to-budgeting-how-to-take-control-of-your-money":
    "/budgeting",
};

// Prefix fallbacks — catch any unmapped legacy URL under a known section so
// we never serve a 404 for a path that *clearly* belonged to the old site.
// Order matters: more-specific prefixes must come before broader ones.
const PREFIX_RULES: Array<[string, string]> = [
  ["/toolkits/", "/newsletter"],
  ["/thank-you-", "/"],
  ["/personal-finance/personal-finance-tools/", "/tools"],
  ["/personal-finance/", "/"],
  ["/credit-debit/", "/credit-cards"],
  ["/checking-accounts/", "/banking"],
  ["/banking-and-financial-services/", "/banking"],
  ["/saving-budgeting/high-yield-savings/", "/saving"],
  ["/saving-budgeting/savings-accounts/", "/saving"],
  ["/saving-budgeting/", "/saving"],
  ["/investing/investment-strategies/", "/investing"],
  ["/budget-savings/budgeting/", "/budgeting"],
  ["/budget-savings/", "/budgeting"],
  ["/wp-content/", "/"],
  ["/wp-includes/", "/"],
  ["/wp-admin/", "/"],
];

/** Map a legacy WordPress pathname to its new equivalent, or null if none. */
export function getLegacyRedirect(pathname: string): string | null {
  // Normalize: strip trailing slash (except root), keep leading slash.
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (EXACT[normalized]) return EXACT[normalized];

  // Re-check with the trailing slash for safety (handles bare "/toolkits/").
  for (const [prefix, target] of PREFIX_RULES) {
    if (pathname.startsWith(prefix) || normalized + "/" === prefix) {
      return target;
    }
  }

  return null;
}
