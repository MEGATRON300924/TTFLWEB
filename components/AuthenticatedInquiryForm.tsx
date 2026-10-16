"use client";

import { FormEvent, useEffect, useState } from "react";
type Props = { type: "contact" | "partnership"; returnPath: string };
type User = { name?: string; email?: string; username?: string };

export default function AuthenticatedInquiryForm({ type, returnPath }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", organization: "", website: "", subject: "", partnershipType: "", message: "" });
  useEffect(() => {
    let active = true;
    fetch("/api/auth/user", { cache: "no-store" }).then(r => r.json()).then(data => {
      if (!active) return;
      if (data.authenticated && data.user) {
        setUser(data.user);
        setForm(current => ({ ...current, name: data.user.name || data.user.username || "" }));
      }
    }).catch(() => {}).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  function update(key: keyof typeof form, value: string) { setForm(current => ({ ...current, [key]: value })); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    if (!user) { setError("Sign in with your MAX Account before submitting."); return; }
    setSending(true);
    try {
      const response = await fetch("/api/forms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, type }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Please try again.");
      setNotice(result.message || "Your message has been sent.");
      setForm(current => ({ ...current, subject: "", message: "", website: "", organization: "" }));
    } catch (value) { setError(value instanceof Error ? value.message : "Something went wrong. Please try again."); }
    finally { setSending(false); }
  }
  const signInHref = `/auth/start?next=${encodeURIComponent(returnPath)}`;
  return <section className="section-alt" id={type === "contact" ? "contact-form" : "partnership-form"}><div className="wrap"><div className="inquiry-panel"><div className="inquiry-heading"><p className="eyebrow">POWERED BY MAX AUTH</p><h2>{type === "partnership" ? "Tell us about your partnership" : "Send TTFL a message"}</h2><p className="section-lede">Use your MAX Account so we can associate your enquiry with the right contact details. Your account email is verified through MAX Auth.</p></div>{loading ? <p role="status">Checking your MAX Account…</p> : user ? <div className="max-account-banner"><span className="max-account-dot" /><span>Signed in as <strong>{user.name || user.username || "MAX Account"}</strong>{user.email ? <small>{user.email}</small> : null}</span><a href="https://auth.max-ai.name.ng">MAX Auth</a></div> : <div className="max-auth-prompt"><div><strong>Sign in to continue</strong><p>We’ll use your MAX Account name and email for this enquiry.</p></div><a className="btn btn-filled" href={signInHref}>Sign in with MAX Auth →</a></div>}{notice ? <div className="form-notice success" role="status">{notice}</div> : null}{error ? <div className="form-notice error" role="alert">{error}</div> : null}<form className="ttfl-inquiry-form" onSubmit={submit}><div className="form-field"><label htmlFor={type+"-name"}>Your name</label><input id={type+"-name"} required maxLength={120} autoComplete="name" value={form.name} onChange={e=>update("name",e.target.value)} disabled={!user || sending}/></div><div className="form-field"><label htmlFor={type+"-email"}>MAX Account email</label><input id={type+"-email"} value={user?.email || "Sign in to load your email"} readOnly aria-readonly="true" disabled={!user}/></div><div className="form-field"><label htmlFor={type+"-org"}>Organization <span>(optional)</span></label><input id={type+"-org"} maxLength={160} autoComplete="organization" value={form.organization} onChange={e=>update("organization",e.target.value)} disabled={!user || sending}/></div>{type === "partnership" ? <><div className="form-field"><label htmlFor="partnership-kind">Partnership type</label><select id="partnership-kind" required value={form.partnershipType} onChange={e=>update("partnershipType",e.target.value)} disabled={!user || sending}><option value="">Select a partnership type</option><option>Technology / integration</option><option>Business / strategic</option><option>Sponsorship</option><option>Advertising / media</option><option>Product collaboration</option><option>Creator / influencer</option><option>Other</option></select></div><div className="form-field"><label htmlFor="partnership-website">Organization website <span>(optional)</span></label><input id="partnership-website" type="url" placeholder="https://" maxLength={500} value={form.website} onChange={e=>update("website",e.target.value)} disabled={!user || sending}/></div></> : <div className="form-field"><label htmlFor="contact-subject">Subject <span>(optional)</span></label><input id="contact-subject" maxLength={180} value={form.subject} onChange={e=>update("subject",e.target.value)} disabled={!user || sending}/></div>}<div className="form-field form-field-full"><label htmlFor={type+"-message"}>{type === "partnership" ? "Your proposal" : "How can we help?"}</label><textarea id={type+"-message"} required minLength={10} maxLength={6000} rows={6} value={form.message} onChange={e=>update("message",e.target.value)} placeholder={type === "partnership" ? "Tell us about your organization, proposal, and what you would like to build together…" : "Tell us what you need help with or what you would like to discuss…"} disabled={!user || sending}/></div><div className="form-field-full"><p className="form-privacy-note">By submitting, you agree that TTFL may use the details in your MAX Account and this message to respond to your enquiry. Do not include passwords, payment details, or other sensitive information.</p><button type="submit" className="btn btn-filled" disabled={!user || sending}>{sending ? "Sending…" : type === "partnership" ? "Submit partnership enquiry →" : "Send message →"}</button></div></form></div></div></section>;
}
