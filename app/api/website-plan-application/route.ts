import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] || c);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return NextResponse.json({ error: "Please submit a valid application." }, { status: 400 }); }

  const siteName = clean(body.siteName, 120);
  const category = clean(body.category, 120);
  const existingWebsite = clean(body.existingWebsite, 500);
  const fullName = clean(body.fullName, 120);
  const email = clean(body.email, 254);
  const phone = clean(body.phone, 40);
  const details = clean(body.details, 3000);

  if (!siteName || !category || !fullName || !email) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (existingWebsite && !/^https?:\/\//i.test(existingWebsite)) {
    return NextResponse.json({ error: "Website links must start with https:// or http://." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    return NextResponse.json({ error: "Email delivery is not configured yet. Please send your application to info@thetronforge.name.ng." }, { status: 503 });
  }

  const fields: [string, string][] = [
    ["Website / site name", siteName],
    ["Website category", category],
    ["Existing website / reference", existingWebsite || "Not provided"],
    ["Customer name", fullName],
    ["Customer email", email],
    ["Phone / WhatsApp", phone || "Not provided"],
    ["Additional requirements", details || "Not provided"],
    ["Plan", "Website plan — ₦20,000 per year"],
  ];
  const html = `<h2>New website plan application</h2><p>A customer has submitted the website plan application after checkout redirection.</p><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse">${fields.map(([key, value]) => `<tr><th align="left">${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}</table>`;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [process.env.TTFL_WEBSITE_PLAN_EMAIL?.trim() || "info@thetronforge.name.ng"],
        reply_to: email,
        subject: `Website plan application — ${siteName}`,
        html,
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json({ error: "We couldn't deliver your application by email. Please continue on WhatsApp so we still receive your details." }, { status: 502 });
    }
    return NextResponse.json({ success: true, message: "Your website application has been sent." }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "We couldn't reach the email service. Please continue on WhatsApp so we still receive your details." }, { status: 502 });
  }
}
