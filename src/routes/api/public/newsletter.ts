import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const BREVO_URL = "https://api.brevo.com/v3/contacts";
const LIST_ID = 3;

const Body = z.object({
  email: z.string().trim().email().max(255),
  firstName: z.string().trim().max(100).optional(),
});

export const Route = createFileRoute("/api/public/newsletter")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = Body.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ error: "Invalid email" }, { status: 400 });
        }

        const BREVO_API_KEY = process.env.BREVO_API_KEY;
        if (!BREVO_API_KEY) {
          console.error("Newsletter: missing BREVO_API_KEY");
          return Response.json(
            { error: "Newsletter service not configured" },
            { status: 500 },
          );
        }

        const res = await fetch(BREVO_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "api-key": BREVO_API_KEY,
          },
          body: JSON.stringify({
            email: parsed.data.email,
            listIds: [LIST_ID],
            updateEnabled: true,
            attributes: parsed.data.firstName
              ? { FIRSTNAME: parsed.data.firstName }
              : undefined,
          }),
        });

        if (res.ok) {
          return Response.json({ ok: true, alreadySubscribed: false });
        }

        let data: any = null;
        try {
          data = await res.json();
        } catch {}
        // Brevo returns 400 with code "duplicate_parameter" when contact already exists
        if (res.status === 400 && data?.code === "duplicate_parameter") {
          return Response.json({ ok: true, alreadySubscribed: true });
        }

        console.error("Brevo contact create failed", res.status, data);
        return Response.json(
          { error: "Could not subscribe right now. Please try again." },
          { status: 502 },
        );
      },
    },
  },
});
