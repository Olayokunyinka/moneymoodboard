import { createFileRoute } from "@tanstack/react-router";
import { pickWeeklyDraft } from "@/lib/newsletter/auto-compose";
import { renderNewsletterHtml } from "@/lib/newsletter/render";
import {
  createCampaign,
  sendCampaignNow,
  sendTestCampaign,
} from "@/lib/newsletter/brevo.server";

const NEWSLETTER_LIST_ID = 3;

function authorized(request: Request): boolean {
  const expected = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!expected) return false;
  const provided =
    request.headers.get("apikey") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    "";
  // Constant-time-ish compare
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ provided.charCodeAt(i);
  }
  return diff === 0;
}

export const Route = createFileRoute("/api/public/newsletter/cron")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!authorized(request)) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(request.url);
        const dryRun = url.searchParams.get("dryRun") === "1";
        const isTest = url.searchParams.get("test") === "1";

        const draft = pickWeeklyDraft(new Date());
        if (!draft) {
          return Response.json(
            { error: "No published articles available" },
            { status: 422 },
          );
        }

        const address = process.env.NEWSLETTER_PHYSICAL_ADDRESS || "";
        const html = renderNewsletterHtml(draft, { address });

        if (dryRun) {
          return Response.json({
            ok: true,
            dryRun: true,
            subject: draft.subject,
            previewText: draft.previewText,
            heroUrl: draft.hero.url,
            more: draft.more,
            htmlBytes: html.length,
            html,
          });
        }

        const senderName = process.env.NEWSLETTER_FROM_NAME;
        const senderEmail = process.env.NEWSLETTER_FROM_EMAIL;
        if (!senderName || !senderEmail) {
          return Response.json(
            {
              error:
                "Missing NEWSLETTER_FROM_NAME or NEWSLETTER_FROM_EMAIL env vars",
            },
            { status: 500 },
          );
        }

        const today = new Date().toISOString().slice(0, 10);
        const campaignName = `Weekly ${today} - ${draft.subject}`.slice(0, 100);

        try {
          const { id } = await createCampaign({
            name: campaignName,
            subject: draft.subject,
            previewText: draft.previewText,
            htmlContent: html,
            senderName,
            senderEmail,
            listIds: [NEWSLETTER_LIST_ID],
          });

          if (isTest) {
            const testEmail = process.env.NEWSLETTER_TEST_EMAIL;
            if (!testEmail) {
              return Response.json(
                { error: "NEWSLETTER_TEST_EMAIL not configured" },
                { status: 500 },
              );
            }
            await sendTestCampaign(id, [testEmail]);
            return Response.json({
              ok: true,
              test: true,
              campaignId: id,
              subject: draft.subject,
              sentTo: testEmail,
            });
          }

          await sendCampaignNow(id);
          return Response.json({
            ok: true,
            campaignId: id,
            subject: draft.subject,
          });
        } catch (e: unknown) {
          const err = e as { message?: string; status?: number; data?: unknown };
          console.error("Newsletter cron failed:", err);
          return Response.json(
            {
              error: err.message || "Newsletter send failed",
              brevoStatus: err.status,
              brevoData: err.data,
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
