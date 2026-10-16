import { cookies } from "next/headers";

export const MAX_AUTH_CLIENT_ID = process.env.MAX_AUTH_CLIENT_ID?.trim() || "max_client_OHnbfpb_bEfwe1z9";
export const MAX_AUTH_BASE_URL = (process.env.MAX_AUTH_BASE_URL || "https://auth.max-ai.name.ng").replace(/\/$/, "");
export const TTFL_SITE_URL = (process.env.TTFL_SITE_URL || "https://thetronforge.name.ng").replace(/\/$/, "");
export const MAX_AUTH_REDIRECT_URI = `${TTFL_SITE_URL}/auth/callback`;

export type MaxAuthUser = {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  preferred_username?: string;
  email?: string;
  email_verified?: boolean;
  picture?: string;
};

export async function getMaxAuthUser(accessToken?: string): Promise<MaxAuthUser | null> {
  const token = accessToken || (await cookies()).get("ttfl_max_access_token")?.value;
  if (!token) return null;
  try {
    const response = await fetch(`${MAX_AUTH_BASE_URL}/api/v1/oauth/userinfo`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const payload = await response.json() as Record<string, unknown>;
    const data = payload.data && typeof payload.data === "object" ? payload.data as Record<string, unknown> : payload;
    if (typeof data.sub !== "string" || !data.sub) return null;
    return data as MaxAuthUser;
  } catch {
    return null;
  }
}

export function safeLocalPath(value: string | null | undefined, fallback = "/contact") {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || value.includes("\r") || value.includes("\n")) return fallback;
  return value;
}
