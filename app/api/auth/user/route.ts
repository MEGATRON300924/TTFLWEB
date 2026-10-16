import { NextResponse } from "next/server";
import { getMaxAuthUser } from "../../../../lib/max-auth";

export async function GET() {
  const user = await getMaxAuthUser();
  if (!user) return NextResponse.json({ authenticated: false, user: null }, { status: 200, headers: { "Cache-Control": "no-store" } });
  return NextResponse.json({ authenticated: true, user: { sub: user.sub, name: user.name || [user.given_name, user.family_name].filter(Boolean).join(" "), email: user.email, emailVerified: user.email_verified, username: user.preferred_username, picture: user.picture } }, { headers: { "Cache-Control": "no-store" } });
}
