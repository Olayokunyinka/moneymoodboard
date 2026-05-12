// Hex equivalents of the pillar tokens, needed because email clients can't
// resolve oklch() or CSS variables. Keep these in sync with src/styles.css.
import type { PillarSlug } from "@/lib/pillars";

export const PILLAR_COLORS: Record<
  PillarSlug,
  { bg: string; fg: string; label: string }
> = {
  budgeting: { bg: "#D6EAF8", fg: "#1F4E79", label: "Budgeting" },
  "credit-cards": { bg: "#FADBD8", fg: "#922B21", label: "Credit cards" },
  investing: { bg: "#D5E8D4", fg: "#1E5631", label: "Investing" },
  retirement: { bg: "#FDEBD0", fg: "#7E4F1A", label: "Retirement" },
  saving: { bg: "#D1F2EB", fg: "#0E5C4F", label: "Saving" },
  banking: { bg: "#E8DAEF", fg: "#5B2C6F", label: "Banking" },
  "debt-taxes-insurance": { bg: "#F9EBEA", fg: "#8B2C2A", label: "Debt, taxes & insurance" },
};

export const BRAND = {
  primary: "#1B7F8C", // teal
  primaryDark: "#0F5660",
  text: "#1A2233",
  muted: "#5A6878",
  border: "#E2E8EE",
  bg: "#FBFAF6",
  card: "#FFFFFF",
  accent: "#E5F3F4",
};
