import { createFileRoute } from "@tanstack/react-router";
import { PillarHub } from "@/components/site/PillarHub";
import { getPillar } from "@/lib/pillars";
import { pillarHeroes } from "@/lib/pillar-extras";
import { absUrl, canonical, ogImage } from "@/lib/seo";

const pillar = getPillar("investing");
const hero = pillarHeroes[pillar.slug];

export const Route = createFileRoute("/investing")({
  head: () => ({
    meta: [
      { title: `${pillar.name}: The Complete Guide | MoneyMoodBoard` },
      { name: "description", content: pillar.intro.slice(0, 158) },
      { property: "og:title", content: `${pillar.name}: The Complete Guide | MoneyMoodBoard` },
      { property: "og:description", content: pillar.intro.slice(0, 158) },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absUrl(`/${pillar.slug}`) },
      ...ogImage(hero),
    ],
    links: [canonical(`/${pillar.slug}`)],
  }),
  component: () => <PillarHub pillar={pillar} />,
});
