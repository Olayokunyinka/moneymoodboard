import { createFileRoute } from "@tanstack/react-router";
import { PillarHub } from "@/components/site/PillarHub";
import { getPillar } from "@/lib/pillars";

const pillar = getPillar("credit-cards");

export const Route = createFileRoute("/credit-cards")({
  head: () => ({
    meta: [
      { title: `${pillar.name}: The Complete Guide | MoneyMoodBoard` },
      { name: "description", content: pillar.intro.slice(0, 158) },
      { property: "og:title", content: `${pillar.name}: The Complete Guide | MoneyMoodBoard` },
      { property: "og:description", content: pillar.intro.slice(0, 158) },
      { property: "og:type", content: "article" },
    ],
  }),
  component: () => <PillarHub pillar={pillar} />,
});
