// Server-only Brevo API client. Uses the direct Brevo API with BREVO_API_KEY,
// matching the existing /api/public/newsletter signup endpoint.

const BREVO_BASE = "https://api.brevo.com/v3";

function key(): string {
  const k = process.env.BREVO_API_KEY;
  if (!k) throw new Error("BREVO_API_KEY is not configured");
  return k;
}

async function brevo<T = any>(
  path: string,
  init: { method?: string; body?: unknown } = {},
): Promise<T> {
  const res = await fetch(`${BREVO_BASE}${path}`, {
    method: init.method || "GET",
    headers: {
      "api-key": key(),
      "content-type": "application/json",
      accept: "application/json",
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const msg =
      (data && (data.message || data.code)) ||
      `Brevo ${init.method || "GET"} ${path} failed (${res.status})`;
    const err = new Error(msg) as Error & { status?: number; data?: any };
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data as T;
}

export interface BrevoSender {
  id?: number;
  name: string;
  email: string;
  active?: boolean;
}

export async function listSenders(): Promise<BrevoSender[]> {
  const data = await brevo<{ senders?: BrevoSender[] }>("/senders");
  return data.senders || [];
}

export interface BrevoList {
  id: number;
  name: string;
  totalSubscribers?: number;
}

export async function listContactLists(): Promise<BrevoList[]> {
  const data = await brevo<{ lists?: BrevoList[] }>(
    "/contacts/lists?limit=50&offset=0",
  );
  return data.lists || [];
}

export interface CreateCampaignInput {
  name: string;
  subject: string;
  htmlContent: string;
  senderId?: number;
  senderName?: string;
  senderEmail?: string;
  listIds: number[];
  scheduledAt?: string; // ISO
  previewText?: string;
}

export async function createCampaign(
  input: CreateCampaignInput,
): Promise<{ id: number }> {
  const sender =
    input.senderId !== undefined
      ? { id: input.senderId }
      : { name: input.senderName!, email: input.senderEmail! };
  const body: Record<string, unknown> = {
    name: input.name,
    subject: input.subject,
    sender,
    htmlContent: input.htmlContent,
    recipients: { listIds: input.listIds },
    type: "classic",
  };
  if (input.previewText) body.previewText = input.previewText;
  if (input.scheduledAt) body.scheduledAt = input.scheduledAt;
  return brevo<{ id: number }>("/emailCampaigns", {
    method: "POST",
    body,
  });
}

export async function sendTestCampaign(
  campaignId: number,
  emailTo: string[],
): Promise<void> {
  await brevo(`/emailCampaigns/${campaignId}/sendTest`, {
    method: "POST",
    body: { emailTo },
  });
}

export async function sendCampaignNow(campaignId: number): Promise<void> {
  await brevo(`/emailCampaigns/${campaignId}/sendNow`, { method: "POST" });
}
