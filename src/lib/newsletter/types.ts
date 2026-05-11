import type { PillarSlug } from "@/lib/pillars";

export interface NewsletterMore {
  title: string;
  url: string;
  pillar?: PillarSlug;
}

export interface NewsletterDraft {
  subject: string;
  previewText: string;
  hero: {
    title: string;
    summary: string;
    url: string;
    pillar?: PillarSlug;
    ctaLabel?: string;
    image?: string;
    imageAlt?: string;
  };
  tip: {
    title: string;
    body: string;
  };
  tool?: {
    name: string;
    description: string;
    url: string;
  };
  more: NewsletterMore[]; // up to 3
  /** ISO datetime string for scheduled send */
  scheduledAt?: string;
}

export const EMPTY_DRAFT: NewsletterDraft = {
  subject: "",
  previewText: "",
  hero: { title: "", summary: "", url: "", ctaLabel: "Read the guide" },
  tip: { title: "This week's practical tip", body: "" },
  more: [],
};
