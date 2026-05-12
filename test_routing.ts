import { findPostView } from './src/lib/pillars';
import { getArticleBody } from './src/lib/articles';

const slugs = [
  ['saving', 'what-is-a-high-yield-savings-account'],
  ['credit-cards', 'how-credit-cards-work'],
  ['investing', 'what-is-an-etf'],
  ['retirement', '401k-basics'],
  ['investing', 'index-fund-investing'],
  ['banking', 'how-to-choose-a-checking-account'],
  ['investing', 'what-is-dollar-cost-averaging'],
  ['retirement', 'roth-ira-explained'],
  ['retirement', 'traditional-ira-explained']
];

for (const [pillar, post] of slugs) {
  const found = findPostView(pillar, post);
  if (!found) {
    console.log(`❌ Route NOT FOUND: ${pillar}/${post}`);
  } else {
    const body = getArticleBody(pillar as any, post);
    if (!body) {
      console.log(`✅ Route found but BODY MISSING: ${pillar}/${post}`);
    } else {
      console.log(`✅ Fully works: ${pillar}/${post}`);
    }
  }
}
