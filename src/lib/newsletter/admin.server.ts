// Simple admin password gate using an encrypted session cookie.
// Set NEWSLETTER_ADMIN_PASSWORD in project secrets. The same value also
// double-serves as the SESSION_SECRET for cookie encryption.
import { useSession } from "@tanstack/react-start/server";

const COOKIE_NAME = "mmb_admin";

export interface AdminSession {
  ok?: true;
}

function password(): string {
  const p = process.env.NEWSLETTER_ADMIN_PASSWORD;
  if (!p || p.length < 12) {
    throw new Error(
      "NEWSLETTER_ADMIN_PASSWORD is not configured (must be at least 12 characters)",
    );
  }
  return p;
}

export async function getAdminSession() {
  return useSession<AdminSession>({
    password: password(),
    name: COOKIE_NAME,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    },
  });
}

export async function isAdmin(): Promise<boolean> {
  try {
    const s = await getAdminSession();
    return s.data.ok === true;
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    throw new Response("Unauthorized", { status: 401 });
  }
}

export async function loginAdmin(provided: string): Promise<boolean> {
  const expected = password();
  // Constant-time-ish comparison
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (diff !== 0) return false;
  const s = await getAdminSession();
  await s.update({ ok: true });
  return true;
}

export async function logoutAdmin(): Promise<void> {
  const s = await getAdminSession();
  await s.clear();
}
