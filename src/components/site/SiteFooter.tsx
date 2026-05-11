import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { pillars } from "@/lib/pillars";

export function SiteFooter() {
  const tools = [
    { name: "Emergency Fund Calculator", slug: "emergency-fund-calculator" },
    { name: "Budget Planner", slug: "budget-planner" },
    { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
    { name: "Credit Score Estimator", slug: "credit-score-estimator" },
    { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator" },
    { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
    { name: "Credit Card Payoff Calculator", slug: "credit-card-payoff-calculator" },
    { name: "Compound Interest Calculator", slug: "compound-interest-calculator" },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <img src={logo} alt="MoneyMoodBoard" className="h-10 w-auto" />
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Independent personal-finance guides and free calculators for
              early earners, freelancers and first-time investors. Researched
              against primary sources, reviewed quarterly, and written without
              sales pitches.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Topics</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {pillars.map((p) => (
                <li key={p.slug}>
                  <Link to={`/${p.slug}` as string} className="text-muted-foreground hover:text-primary">
                    {p.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Tools</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link to={`/tools/${t.slug}` as string} className="text-muted-foreground hover:text-primary">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link to="/topics" className="text-muted-foreground hover:text-primary">Topical Map</Link></li>
              <li><Link to="/glossary" className="text-muted-foreground hover:text-primary">Glossary</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link to="/newsletter" className="text-muted-foreground hover:text-primary">Newsletter</Link></li>
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-foreground">Editorial</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/editorial-policy" className="text-muted-foreground hover:text-primary">Editorial policy</Link></li>
              <li><Link to="/fact-checking-policy" className="text-muted-foreground hover:text-primary">Fact-checking</Link></li>
              <li><Link to="/corrections" className="text-muted-foreground hover:text-primary">Corrections</Link></li>
              <li><Link to="/methodology" className="text-muted-foreground hover:text-primary">Methodology</Link></li>
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms</Link></li>
              <li><Link to="/disclaimer" className="text-muted-foreground hover:text-primary">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground">
          <p>
            MoneyMoodBoard is for informational purposes only. Nothing on this
            site constitutes financial, legal, or tax advice. Always consult a
            qualified professional for decisions specific to your situation.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} MoneyMoodBoard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
