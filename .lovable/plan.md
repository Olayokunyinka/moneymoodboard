
# MoneyMoodBoard — Gap Analysis & Implementation Plan

## What's already built ✅

**Architecture & brand**
- Brand teal palette + 7 pillar tag colors, Inter font, 16 px / 1.7 line-height, `oklch` tokens.
- Sticky header with logo, 7 pillar links, mobile sheet, "Free Newsletter" CTA.
- Footer with logo, link grid (Topics / Tools / Company / Legal), AdSense disclaimer, copyright.
- Global `Organization` + `WebSite` JSON-LD; `BreadcrumbList` per page.

**Pages**
- Homepage with hero + trust signals, pillar grid, featured guides, tools band, latest grid, newsletter.
- 7 pillar hubs (`/budgeting`, `/credit-cards`, `/investing`, `/retirement`, `/saving`, `/banking`, `/debt-taxes-insurance`).
- One sample cluster post (`/budgeting/zero-based-budgeting`) with Quick Answer, definition body, comparison table, FAQ, JSON-LD.
- Tools hub + working Emergency Fund Calculator + 3 "coming soon" stubs.
- About, Newsletter, Contact, Privacy, Terms, Disclaimer.

---

## Gaps vs briefs ❌

### A. SEO / technical infrastructure
1. No `sitemap.xml` or `robots.txt`.
2. No self-referencing canonical tags.
3. No per-route `og:image` (1200×630) — sharing previews are blank.
4. Pillar pages are missing `WebPage` + `ItemList` schema.
5. Cluster post Quick Answer box has no `SpeakableSpecification` schema.
6. No GA4 / AdSense script slots (even as placeholders).
7. Header search icon is decorative — no search route.

### B. Cluster post template (the highest-leverage gap)
8. No "Key [Topic] Statistics" section — this is what LLMs and AI Overviews quote.
9. No Author / Reviewer box at the bottom (E-E-A-T signal — critical for YMYL finance content).
10. No social share buttons (Twitter/X, Facebook, Copy link).
11. No featured image (1200×630, also serves as OG image).
12. No in-article ad slot placeholders between H2s, after FAQ, anchor banner.
13. No external links to authoritative sources (Federal Reserve, CFPB, Bankrate…).
14. Sample post is ~700 words; brief calls for 1,200–3,000.

### C. Content reachability
15. Pillar cluster cards link to URLs that don't exist as routes (every click except one → 404). Need a catch-all stub or generated stub posts so the topical map is navigable.

### D. Pillar hub depth
16. Missing dedicated "Free [Pillar] Tool" H2 wrapper around the tool CTA.
17. Missing inline pillar-specific newsletter copy ("Get weekly budgeting tips…").

### E. Tools backlog (brief priority order)
18. Budget Planner — currently a stub.
19. Savings Goal Calculator — stub.
20. Credit Score Estimator — stub.
21. Debt Payoff Calculator (avalanche vs snowball) — not built.
22. Retirement Savings Calculator — not built.
23. Credit Card Payoff Calculator — not built.
24. Investment Return / Compound Interest Calculator — not built.

### F. Polish
25. Refine pillar tag tones to match brief's exact pastel hexes.
26. Site-wide reusable `AdSlot` component for AdSense readiness.

---

## Implementation plan (phased, in priority order)

### Phase 1 — SEO & ad-readiness infrastructure (small, high-impact)
- Add `src/routes/sitemap[.]xml.tsx` server route enumerating homepage, pillars, tools, sample post, legal pages.
- Add `src/routes/robots[.]txt.tsx` server route.
- Helper to emit a self-referencing `<link rel="canonical">` per route via `head().links`.
- Generate a 1200×630 brand OG image (`src/assets/og-default.jpg`) and reference it from the root `head()`; allow each route to override.
- `<AdSlot location="in-article" />` component — renders an empty container with `data-ad-slot` attributes. Hooks for AdSense / GA4 IDs read from env (no real IDs yet).

### Phase 2 — Cluster post template upgrade
- Convert the cluster post into a reusable `<ClusterPost>` component fed by structured data: title, summary, body sections, stats, FAQs, related, author.
- Add new sub-components:
  - `KeyStatistics` (cited stats with source links).
  - `AuthorBox` (avatar + 2-sentence bio + "Reviewed by …" line).
  - `ShareButtons` (Twitter/X, Facebook, Copy Link — no third-party SDKs).
  - `FeaturedImage` slot (1200×630, lazy-loaded after fold).
- Mark the Quick Answer container with `id="quick-answer"` and emit `SpeakableSpecification` JSON-LD pointing to that id.
- Sprinkle `AdSlot`s at the prescribed positions.
- Expand the zero-based-budgeting post to ~1,500 words and add 3–5 outbound links.

### Phase 3 — Make the topical map clickable
- Add a catch-all `/$pillar/$post` route (`src/routes/$pillar.$post.tsx`) that:
  - Validates the pillar slug; 404s if unknown.
  - Looks up the post in `pillars.ts`; if found, renders a generic `ClusterPost` stub with title, breadcrumb, "Article in production" notice, link back to the pillar hub, FAQ stub, JSON-LD.
  - This means every internal link works and Google can discover the URLs.

### Phase 4 — Pillar hub depth
- Add an H2 "Free [Pillar] Tool" section wrapping the existing CTA.
- Add an inline pillar-specific newsletter band ("Get weekly [pillar] tips in your inbox").
- Emit `WebPage` + `ItemList` schema enumerating cluster posts (helps Google understand the hub).

### Phase 5 — Tools build-out (one PR each)
Build to spec, in this order, replacing existing stubs first:
1. Budget Planner (50/30/20 + custom percentages, monthly income input, downloadable summary).
2. Savings Goal Calculator (target, starting balance, monthly contribution, optional APY → time-to-goal + chart).
3. Debt Payoff Calculator (multi-debt list, avalanche vs snowball comparison, payoff date).
4. Credit Card Payoff Calculator (single-card payoff timeline + interest saved).
5. Retirement Savings Calculator (current age, retirement age, current balance, monthly contribution, expected return).
6. Investment Return / Compound Interest Calculator (principal, monthly add, rate, years).
7. Credit Score Estimator (utilisation, on-time history, account age, mix → FICO range estimate).

Each tool gets the full template (How-to-use, 800-word explainer, FAQ, related tools, `WebApplication` + `FAQPage` schema).

### Phase 6 — Search + polish
- Lightweight client-side search modal (Cmd+K) over a static JSON index of all titles + URLs. Wire the existing search icon to it. Defer real backend search.
- Refine pillar tag tones to brief's suggested hex values.
- Audit Core Web Vitals (image sizes, font preload, layout shift).

### Out of scope (still deferred)
- Real Lovable Cloud / newsletter backend.
- Real AdSense / GA4 IDs (slots will be ready, IDs added when accounts exist).
- Author photos and bios for real people (placeholder until provided).

---

## Suggested order to ship

If you want to do this incrementally, ship Phase 1 + Phase 3 + Phase 2 first (1 turn) — that gets the site SEO-complete and fully navigable. Then Phase 4 (1 turn). Then tools in Phase 5, two per turn. Phase 6 last.

Tell me to proceed and I'll start with Phase 1–3 in one batch.
