import { NextResponse } from "next/server";
import { getMaxAuthUser } from "../../../lib/max-auth";

export const runtime = "nodejs";
function clean(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function escapeHtml(value: string) { return value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] || c); }

export async function POST(request: Request) {
  const user = await getMaxAuthUser();
  if (!user) return NextResponse.json({ error: "Sign in with your MAX Account before submitting this form." }, { status: 401 });
  if (!user.email) return NextResponse.json({ error: "Your MAX Account needs an email address to submit this form." }, { status: 400 });
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; } catch { return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 }); }
  const type = body.type === "partnership" ? "partnership" : body.type === "contact" ? "contact" : "";
  if (!type) return NextResponse.json({ error: "Unknown form type." }, { status: 400 });
  const name = clean(body.name, 120) || clean(user.name, 120) || clean(user.preferred_username, 120);
  const email = clean(user.email, 254);
  const organization = clean(body.organization, 160);
  const website = clean(body.website, 500);
  const subject = clean(body.subject, 180);
  const message = clean(body.message, 6000);
  const partnershipType = clean(body.partnershipType, 120);
  if (!name || message.length < 10) return NextResponse.json({ error: "Please provide your name and a message of at least 10 characters." }, { status: 400 });
  if (website && !/^https?:\/\//i.test(website)) return NextResponse.json({ error: "Website URL must start with https:// or http://." }, { status: 400 });
  if (type === "partnership" && !partnershipType) return NextResponse.json({ error: "Please select a partnership type." }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) return NextResponse.json({ error: "Form delivery is not configured yet. Please email info@thetronforge.name.ng directly." }, { status: 503 });
  const recipient = type === "partnership" ? (process.env.TTFL_PARTNERSHIPS_EMAIL || "info@thetronforge.name.ng") : (process.env.TTFL_CONTACT_EMAIL || "info@thetronforge.name.ng");
  const title = type === "partnership" ? "New TTFL partnership enquiry" : "New TTFL contact enquiry";
  const rows: [string, string][] = [["Name", name], ["MAX Account email", email], ["Organization", organization || "Not provided"], ["Website", website || "Not provided"], ["Subject", subject || "Not provided"], ["Partnership type", type === "partnership" ? partnershipType : "Not applicable"], ["MAX Auth subject", user.sub], ["Message", message]];
  const html = `<h2>${escapeHtml(title)}</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse">${rows.map(([k,v]) => `<tr><th align="left">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</table>`;
  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [recipient], reply_to: email, subject: `${title}: ${subject || name}`, html }), cache: "no-store" });
    if (!response.ok) return NextResponse.json({ error: "We couldn't deliver your message right now. Please try again or email us directly." }, { status: 502 });
    return NextResponse.json({ success: true, message: "Thanks — your message has been sent to The Tron Forge Limited." }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "We couldn't reach the message delivery service. Please try again later." }, { status: 502 });
  }
}
