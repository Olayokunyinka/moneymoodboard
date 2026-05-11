import type { NewsletterDraft } from "./types";
import { BRAND, PILLAR_COLORS } from "./pillar-colors";

const SITE_URL = "https://moneymoodboard.com";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function abs(url: string): string {
  if (!url) return SITE_URL;
  if (/^https?:\/\//i.test(url)) return url;
  return SITE_URL + (url.startsWith("/") ? url : `/${url}`);
}

function pillarChip(slug?: string): string {
  if (!slug) return "";
  const c = PILLAR_COLORS[slug as keyof typeof PILLAR_COLORS];
  if (!c) return "";
  return `<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:${c.bg};color:${c.fg};font-size:12px;font-weight:600;letter-spacing:.02em;font-family:Inter,Arial,sans-serif;">${esc(c.label)}</span>`;
}

/**
 * Render a newsletter draft into a full email HTML document.
 * Inline styles only. 600px max width. Mobile-friendly. Light backgrounds only.
 */
export interface RenderOptions {
  address?: string;
}

export function renderNewsletterHtml(
  draft: NewsletterDraft,
  opts: RenderOptions = {},
): string {
  const address = esc(opts.address || "");
  const preview = esc(draft.previewText || "");
  const hero = draft.hero;
  const tip = draft.tip;

  const heroImage = hero.image
    ? `<tr><td style="padding:0;"><a href="${esc(abs(hero.url))}" style="display:block;text-decoration:none;"><img src="${esc(hero.image)}" alt="${esc(hero.imageAlt || hero.title)}" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;"></a></td></tr>`
    : "";

  const heroBlock = hero.title
    ? `
    ${heroImage}
    <tr><td class="mmb-pad" style="padding:32px 32px 8px 32px;">
      ${pillarChip(hero.pillar)}
      <h2 style="margin:14px 0 12px 0;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;color:${BRAND.text};font-weight:700;letter-spacing:-0.01em;">${esc(hero.title)}</h2>
      <p style="margin:0 0 22px 0;font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.6;color:${BRAND.muted};">${esc(hero.summary)}</p>
      <a href="${esc(abs(hero.url))}" style="display:inline-block;background:${BRAND.primary};color:#ffffff;text-decoration:none;font-family:Inter,Arial,sans-serif;font-weight:600;font-size:15px;padding:13px 24px;border-radius:8px;">${esc(hero.ctaLabel || "Read the guide")} &rarr;</a>
    </td></tr>
    <tr><td class="mmb-pad" style="padding:28px 32px 0 32px;"><div style="height:1px;background:${BRAND.border};"></div></td></tr>`
    : "";

  const tipBlock = tip.body
    ? `
    <tr><td style="padding:24px 32px 0 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.accent};border-radius:12px;">
        <tr><td style="padding:20px 22px;">
          <div style="font-family:Inter,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${BRAND.primaryDark};margin-bottom:8px;">One practical tip</div>
          <div style="font-family:Inter,Arial,sans-serif;font-size:18px;font-weight:600;color:${BRAND.text};margin-bottom:8px;">${esc(tip.title)}</div>
          <div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.55;color:${BRAND.text};">${esc(tip.body).replace(/\n/g, "<br>")}</div>
        </td></tr>
      </table>
    </td></tr>`
    : "";

  const toolBlock = draft.tool
    ? `
    <tr><td style="padding:24px 32px 0 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BRAND.border};border-radius:12px;">
        <tr><td style="padding:20px 22px;">
          <div style="font-family:Inter,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${BRAND.primary};margin-bottom:8px;">New tool</div>
          <div style="font-family:Inter,Arial,sans-serif;font-size:18px;font-weight:700;color:${BRAND.text};margin-bottom:6px;">${esc(draft.tool.name)}</div>
          <div style="font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.55;color:${BRAND.muted};margin-bottom:14px;">${esc(draft.tool.description)}</div>
          <a href="${esc(abs(draft.tool.url))}" style="font-family:Inter,Arial,sans-serif;font-size:14px;font-weight:600;color:${BRAND.primary};text-decoration:none;">Try it now &rarr;</a>
        </td></tr>
      </table>
    </td></tr>`
    : "";

  const moreBlock =
    draft.more.length > 0
      ? `
    <tr><td style="padding:28px 32px 0 32px;">
      <div style="font-family:Inter,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:14px;">More this week</div>
      ${draft.more
        .filter((m) => m.title && m.url)
        .map(
          (m) => `
        <div style="margin-bottom:14px;">
          ${pillarChip(m.pillar)}
          <div style="margin-top:6px;font-family:Inter,Arial,sans-serif;font-size:15px;font-weight:600;line-height:1.4;">
            <a href="${esc(abs(m.url))}" style="color:${BRAND.text};text-decoration:none;">${esc(m.title)} &rarr;</a>
          </div>
        </div>`,
        )
        .join("")}
    </td></tr>`
      : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(draft.subject || "MoneyMoodBoard Weekly")}</title>
<style>@media (max-width:620px){.mmb-container{width:100% !important;}.mmb-pad{padding-left:20px !important;padding-right:20px !important;}}</style>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};-webkit-font-smoothing:antialiased;">
<div style="display:none;font-size:1px;color:${BRAND.bg};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preview}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.bg};">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" class="mmb-container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${BRAND.card};border-radius:14px;overflow:hidden;border:1px solid ${BRAND.border};">
      <tr><td style="background:${BRAND.primary};padding:18px 24px;">
        <table role="presentation" width="100%"><tr>
          <td align="left" style="font-family:Inter,Arial,sans-serif;color:#ffffff;font-weight:700;font-size:18px;letter-spacing:.02em;">MoneyMoodBoard</td>
          <td align="right" style="font-family:Inter,Arial,sans-serif;color:#ffffff;font-size:12px;opacity:.85;">Weekly</td>
        </tr></table>
      </td></tr>
      ${heroBlock}
      ${tipBlock}
      ${toolBlock}
      ${moreBlock}
      <tr><td style="padding:32px 32px 16px 32px;">
        <div style="height:1px;background:${BRAND.border};margin-bottom:20px;"></div>
        <p style="margin:0 0 8px 0;font-family:Inter,Arial,sans-serif;font-size:13px;color:${BRAND.muted};line-height:1.5;">Practical money guides, calculators and one tip a week. From <a href="${SITE_URL}" style="color:${BRAND.primary};text-decoration:none;">moneymoodboard.com</a>.</p>
        <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:12px;color:${BRAND.muted};line-height:1.5;">You're getting this because you subscribed at moneymoodboard.com. <a href="{{ unsubscribe }}" style="color:${BRAND.muted};text-decoration:underline;">Unsubscribe</a>${address ? ` &middot; ${address}` : ""}</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}
