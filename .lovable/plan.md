
# MoneyMoodBoard — Initial Build Plan

A frontend-only first pass that lays down the brand, all page templates, and one working tool. Newsletter signup will be a non-functional placeholder for now. Content is mostly placeholder so the structure is in place to fill in later.

## 1. Brand & design system

- Add the uploaded logo to `src/assets/logo.png` and use it in the header/footer.
- Update `src/styles.css` with brand tokens in `oklch`:
  - `--primary`: teal (matches logo ~ `#2C8C8A`)
  - `--primary-foreground`: white
  - Neutral background (off-white), foreground (near-black slate)
  - 7 pillar tag color tokens (Budgeting blue, Credit coral, Investing green, Retirement amber, Saving teal, Banking purple, Debt rose) — light bg + readable foreground for each
  - Typography: Inter (headings + body) via Google Fonts link in `__root.tsx`
  - Body line-height 1.7, base 16px

## 2. Shared layout components

`src/components/site/`:
- `SiteHeader.tsx` — sticky nav: logo, 7 pillar links, search icon (visual only), "Free Newsletter" CTA, mobile hamburger sheet.
- `SiteFooter.tsx` — logo + tagline, 4-column link grid (Pillars, Tools, Company, Legal), AdSense compliance line, copyright.
- `Breadcrumbs.tsx` — accessible nav with `BreadcrumbList` JSON-LD.
- `NewsletterCTA.tsx` — full-width branded section with email input + button (form submit shows toast, no backend).
- `PillarCard.tsx`, `ArticleCard.tsx`, `ToolCard.tsx`, `PillarTag.tsx` (color-coded).
- `JsonLd.tsx` — helper to render `<script type="application/ld+json">` blocks.
- `pillars.ts` — single source of truth: array of 7 pillars with slug, name, description, color token, icon, sample cluster groups + sample posts.

Wrap all routes with header/footer by adding them to `__root.tsx`'s `RootComponent` around `<Outlet />`.

## 3. Routes (TanStack file-based, in `src/routes/`)

- `index.tsx` — Homepage (replaces placeholder)
- `budgeting.tsx`, `credit-cards.tsx`, `investing.tsx`, `retirement.tsx`, `saving.tsx`, `banking.tsx`, `debt-taxes-insurance.tsx` — 7 pillar hub pages, all rendering a shared `<PillarHub pillar={...} />` component driven by `pillars.ts`.
- `budgeting.zero-based-budgeting.tsx` — sample cluster post demonstrating the Definition Post structure (the template other articles will follow).
- `tools.index.tsx` — Tools hub.
- `tools.emergency-fund-calculator.tsx` — working calculator + explainer.
- `tools.budget-planner.tsx`, `tools.savings-goal-calculator.tsx`, `tools.credit-score-estimator.tsx` — placeholder tool pages with "Coming soon" state but full SEO + layout.
- `about.tsx`, `newsletter.tsx`, `privacy.tsx`, `terms.tsx`, `disclaimer.tsx`, `contact.tsx` — required for footer + AdSense compliance; minimal but real content.

Each route defines its own `head()` with title/description/og tags per the brief.

## 4. Homepage sections (per brief)

Hero → Pillar grid (7 cards) → Featured "Most Popular" (3 cards) → Free Tools strip (4 cards, brand-color band) → Latest Guides (6 cards) → Newsletter CTA → Footer. Trust-signal row under hero CTAs.

## 5. Pillar Hub template

Breadcrumb → H1 + 150-word intro → "What Is [Pillar]?" direct-answer block → Table of contents → cluster sections (each = H2 + intro + 3–6 article cards) → embedded tool CTA → newsletter → related pillars. JSON-LD: `WebPage` + `BreadcrumbList` + `FAQPage` (3 stub Qs).

## 6. Cluster Post template (zero-based budgeting)

Breadcrumb → post-type pill → H1 → author + dates + read time → direct-answer summary box → article body following Definition structure (H2s: What is / How it works / vs alternative / pros & cons / who should use / how to start / FAQ) → comparison table → tool CTA → "More Budgeting Guides" internal links → FAQ accordion → JSON-LD: `Article` + `BreadcrumbList` + `FAQPage`.

## 7. Emergency Fund Calculator (working)

Inputs: monthly essential expenses, current savings, months of coverage desired (3/6/12 slider), employment stability (stable/variable/self-employed → suggested months).
Output: target fund, gap to goal, months to reach goal at user-supplied monthly contribution, progress bar.
Below tool: "How to use" steps, "What is an emergency fund" 800-word explainer (placeholder content), FAQ, related tools. Pure client-side math, no backend.

## 8. SEO scaffolding

- `head()` per route with unique title/description/og:title/og:description.
- `Organization` + `WebSite` JSON-LD injected once via root layout.
- `BreadcrumbList` on every non-home page.
- Single `<h1>` per page; semantic HTML; descriptive alt text on logo and any imagery.
- Responsive viewport already set.

## 9. Out of scope this turn

- Lovable Cloud / database / real newsletter capture.
- Auto sitemap.xml, RSS, AdSense embed code (placeholders only).
- Real article content beyond the one sample cluster post — other pillar/cluster cards link to placeholder/`#` until content is written.
- Other 3 calculators are stubbed.

## Technical notes

- TanStack Start file-based routing; flat dot-separated filenames (`tools.emergency-fund-calculator.tsx`).
- All colors via CSS variables in `src/styles.css`; no hardcoded hex in components.
- Newsletter form uses local state + sonner toast; clearly labeled as not yet wired.
- `pillars.ts` makes it trivial to add the remaining content/articles incrementally.
