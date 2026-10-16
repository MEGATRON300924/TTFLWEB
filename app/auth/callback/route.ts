import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { MAX_AUTH_BASE_URL, MAX_AUTH_CLIENT_ID, MAX_AUTH_REDIRECT_URI, safeLocalPath } from "../../../lib/max-auth";

type TokenPayload = { access_token?: string; refresh_token?: string; expires_in?: number; data?: { access_token?: string; refresh_token?: string; expires_in?: number } };

function clearTransactionCookies(response: NextResponse, secure: boolean) {
  for (const name of ["ttfl_oauth_state", "ttfl_oauth_verifier", "ttfl_oauth_next"]) {
    response.cookies.set(name, "", { httpOnly: true, secure, sameSite: "lax", path: "/auth", maxAge: 0 });
  }
  return response;
}

export async function GET(request: Request) {
  const incoming = new URL(request.url);
  const jar = await cookies();
  const secure = process.env.NODE_ENV === "production";
  const next = safeLocalPath(jar.get("ttfl_oauth_next")?.value, "/contact");
  const fail = (reason: string) => {
    const destination = new URL(next, request.url);
    destination.searchParams.set("max_auth_error", reason);
    return clearTransactionCookies(NextResponse.redirect(destination), secure);
  };
  const code = incoming.searchParams.get("code");
  const state = incoming.searchParams.get("state");
  if (incoming.searchParams.get("error")) return fail("authorization_denied");
  const savedState = jar.get("ttfl_oauth_state")?.value;
  const verifier = jar.get("ttfl_oauth_verifier")?.value;
  if (!code || !state || !savedState || state !== savedState || !verifier) return fail("invalid_oauth_state");

  try {
    const response = await fetch(`${MAX_AUTH_BASE_URL}/api/v1/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ grant_type: "authorization_code", client_id: MAX_AUTH_CLIENT_ID, code, redirect_uri: MAX_AUTH_REDIRECT_URI, code_verifier: verifier }),
      cache: "no-store",
    });
    const payload = await response.json().catch(() => ({})) as TokenPayload;
    const token = payload.data && typeof payload.data === "object" ? payload.data : payload;
    if (!response.ok || !token.access_token) return fail("token_exchange_failed");
    const maxAge = Math.max(60, Math.min(86400, Number(token.expires_in) || 3600));
    const result = NextResponse.redirect(new URL(next, request.url));
    result.cookies.set("ttfl_max_access_token", token.access_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge });
    if (token.refresh_token) result.cookies.set("ttfl_max_refresh_token", token.refresh_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 30 * 24 * 60 * 60 });
    return clearTransactionCookies(result, secure);
  } catch {
    return fail("token_exchange_unreachable");
  }
}
