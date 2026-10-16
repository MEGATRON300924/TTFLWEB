import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { MAX_AUTH_BASE_URL, MAX_AUTH_CLIENT_ID, MAX_AUTH_REDIRECT_URI, safeLocalPath } from "../../../lib/max-auth";

function base64url(value: Buffer) {
  return value.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function GET(request: Request) {
  const next = safeLocalPath(new URL(request.url).searchParams.get("next"));
  const state = base64url(crypto.randomBytes(32));
  const verifier = base64url(crypto.randomBytes(48));
  const challenge = base64url(crypto.createHash("sha256").update(verifier).digest());
  const jar = await cookies();
  const secure = process.env.NODE_ENV === "production";
  for (const [name, value] of [["ttfl_oauth_state", state], ["ttfl_oauth_verifier", verifier], ["ttfl_oauth_next", next]] as const) {
    jar.set(name, value, { httpOnly: true, secure, sameSite: "lax", path: "/auth", maxAge: 600 });
  }
  const authorize = new URL(`${MAX_AUTH_BASE_URL}/api/v1/oauth/authorize`);
  authorize.searchParams.set("client_id", MAX_AUTH_CLIENT_ID);
  authorize.searchParams.set("redirect_uri", MAX_AUTH_REDIRECT_URI);
  authorize.searchParams.set("response_type", "code");
  authorize.searchParams.set("scope", "openid profile email");
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("code_challenge", challenge);
  authorize.searchParams.set("code_challenge_method", "S256");
  authorize.searchParams.set("client_name", "The Tron Forge Limited");
  return NextResponse.redirect(authorize);
}
