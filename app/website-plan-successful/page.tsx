"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Metadata } from "next";

const WHATSAPP_NUMBER = "12502556589";

const categories = [
  "Business / Company",
  "Personal brand / Portfolio",
  "E-commerce / Online store",
  "Restaurant / Food business",
  "Education / School",
  "Non-profit / Community organisation",
  "Church / Religious organisation",
  "Health / Medical",
  "Real estate / Property",
  "Creative / Media",
  "Technology / Software",
  "Blog / News / Magazine",
  "Other",
];

export default function WebsitePlanSuccessfulPage() {
  const [form, setForm] = useState({ siteName: "", category: "", existingWebsite: "", fullName: "", email: "", phone: "", details: "" });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const message = useMemo(() => [
    "Hello The Tron Forge Limited! I have paid for the website plan and I'm sharing my website details.",
    "",
    `Website / site name: ${form.siteName}`,
    `Category: ${form.category}`,
    `Existing website or reference: ${form.existingWebsite || "Not provided"}`,
    `Full name: ${form.fullName}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone || "Not provided"}`,
    `Additional details: ${form.details || "Not provided"}`,
  ].join("\n"), [form]);

  function update(key: keyof typeof form, value: string) {
    setForm(current => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSending(true);
    try {
      const response = await fetch("/api/website-plan-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We couldn't send your application. Please try again.");
      setSubmitted(true);
      setWhatsAppUrl(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="website-plan-page">
      <div className="website-plan-wrap">
        <a className="website-plan-brand" href="/">
          <img src="https://www.max-ai.name.ng/ttfl.png" alt="The Tron Forge Limited" />
          <span>The Tron Forge Limited</span>
        </a>

        <section className="website-plan-card">
          <div className="website-plan-success-icon" aria-hidden="true">✓</div>
          <p className="eyebrow">Payment received</p>
          <h1>Thanks for joining the subscription!</h1>
          <p className="website-plan-intro">
            We’re excited to help bring your website to life. Complete the short form below so our team can understand what you need and begin the setup process.
          </p>
          <div className="website-plan-price"><strong>Website plan</strong><span>₦20,000 / year</span></div>

          {submitted ? (
            <div className="website-plan-submitted" role="status">
              <h2>Your application has been received.</h2>
              <p>We’ve sent your details to The Tron Forge Limited. As a backup, please continue on WhatsApp and send us the same application details.</p>
              <a className="website-plan-submit website-plan-whatsapp" href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                Continue on WhatsApp <span aria-hidden="true">↗</span>
              </a>
              <p className="website-plan-small">If WhatsApp does not open, save the form details and email info@thetronforge.name.ng.</p>
              <button className="website-plan-reset" type="button" onClick={() => { setSubmitted(false); setWhatsAppUrl(""); }}>Edit application</button>
            </div>
          ) : (
            <form className="website-plan-form" onSubmit={submit}>
              <div className="website-plan-form-heading">
                <h2>Tell us about your website</h2>
                <p>Fields marked with * are required.</p>
              </div>
              <label>
                Website / site name *
                <input required maxLength={120} value={form.siteName} onChange={e => update("siteName", e.target.value)} placeholder="e.g. Ade’s Fashion House" />
              </label>
              <label>
                What type of website do you need? *
                <select required value={form.category} onChange={e => update("category", e.target.value)}>
                  <option value="">Choose a category</option>
                  {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
              </label>
              <label>
                Do you already have a website? <span className="website-plan-optional">(optional)</span>
                <input type="url" maxLength={500} value={form.existingWebsite} onChange={e => update("existingWebsite", e.target.value)} placeholder="https://yourwebsite.com" />
                <small>Share your current website or a link to a design you like as a reference.</small>
              </label>
              <div className="website-plan-fields">
                <label>
                  Your full name *
                  <input required maxLength={120} autoComplete="name" value={form.fullName} onChange={e => update("fullName", e.target.value)} placeholder="Full name" />
                </label>
                <label>
                  Email address *
                  <input required type="email" maxLength={254} autoComplete="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@example.com" />
                </label>
              </div>
              <label>
                WhatsApp / phone number <span className="website-plan-optional">(optional)</span>
                <input type="tel" maxLength={40} autoComplete="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="Include your country code" />
              </label>
              <label>
                What would you like your website to include? <span className="website-plan-optional">(optional)</span>
                <textarea rows={4} maxLength={3000} value={form.details} onChange={e => update("details", e.target.value)} placeholder="Tell us about your business, preferred colours, pages, features, or anything else we should know." />
              </label>
              {error ? <p className="website-plan-error" role="alert">{error}</p> : null}
              <button className="website-plan-submit" type="submit" disabled={sending}>
                {sending ? "Sending application…" : "Submit website application"}
              </button>
              <p className="website-plan-small">After submitting, you’ll be asked to continue on WhatsApp as an alternative in case our email notification doesn’t reach us.</p>
            </form>
          )}
        </section>
        <p className="website-plan-footer">Need help? <a href="mailto:info@thetronforge.name.ng">info@thetronforge.name.ng</a></p>
      </div>
      <style jsx>{`
        .website-plan-page{min-height:100vh;background:var(--bg,#f6f7f8);color:var(--ink,#151719);padding:34px 18px 56px}
        .website-plan-wrap{width:100%;max-width:760px;margin:0 auto}
        .website-plan-brand{display:flex;align-items:center;gap:11px;width:max-content;margin:0 auto 28px;color:inherit;text-decoration:none;font-weight:700}
        .website-plan-brand img{width:38px;height:38px;object-fit:contain}
        .website-plan-card{background:var(--surface,#fff);border:1px solid var(--border,rgba(0,0,0,.09));border-radius:22px;padding:clamp(22px,5vw,46px);box-shadow:0 14px 50px rgba(0,0,0,.055)}
        .website-plan-success-icon{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:#e8f6ed;color:#16834a;font-size:27px;font-weight:700;margin-bottom:20px}
        .eyebrow{font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--brand,#2563eb);margin:0 0 10px}
        h1{font-size:clamp(30px,5vw,43px);letter-spacing:-.045em;line-height:1.12;margin:0 0 14px}
        .website-plan-intro{font-size:15px;line-height:1.75;color:var(--ink-soft,#626970);max-width:610px;margin:0}
        .website-plan-price{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 18px;margin:25px 0 30px;border-radius:12px;background:var(--bg,#f6f7f8);font-size:14px}
        .website-plan-price span{font-weight:700}
        .website-plan-form-heading{margin-bottom:20px}
        .website-plan-form h2,.website-plan-submitted h2{font-size:21px;letter-spacing:-.02em;margin:0 0 6px}
        .website-plan-form-heading p,.website-plan-small{font-size:12px;line-height:1.6;color:var(--ink-soft,#697078);margin:0}
        .website-plan-form{display:grid;gap:17px}
        .website-plan-form label{display:grid;gap:8px;font-size:13px;font-weight:650}
        .website-plan-form input,.website-plan-form select,.website-plan-form textarea{width:100%;min-height:48px;border:1px solid var(--border,#dfe2e5);border-radius:9px;background:var(--surface,#fff);color:var(--ink,#151719);padding:12px 13px;font:inherit;font-size:14px;outline:none}
        .website-plan-form textarea{resize:vertical;min-height:110px}
        .website-plan-form input:focus,.website-plan-form select:focus,.website-plan-form textarea:focus{border-color:var(--brand,#2563eb);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
        .website-plan-form label small{font-size:11px;font-weight:400;color:var(--ink-soft,#697078);line-height:1.5}
        .website-plan-optional{font-weight:400;color:var(--ink-soft,#697078)}
        .website-plan-fields{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .website-plan-submit{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:51px;border:0;border-radius:9px;background:var(--brand,#17191c);color:#fff;text-decoration:none;font:inherit;font-size:14px;font-weight:700;cursor:pointer;padding:13px 18px}
        .website-plan-submit:disabled{opacity:.6;cursor:wait}
        .website-plan-whatsapp{background:#16834a;margin:20px 0 12px}
        .website-plan-error{color:#b42318;font-size:13px;margin:0}
        .website-plan-submitted p{font-size:14px;line-height:1.7;color:var(--ink-soft,#626970)}
        .website-plan-reset{background:none;border:0;text-decoration:underline;color:var(--ink-soft,#626970);padding:8px 0;cursor:pointer}
        .website-plan-footer{text-align:center;font-size:13px;color:var(--ink-soft,#697078);margin:22px 0 0}
        .website-plan-footer a{color:inherit}
        @media(max-width:560px){.website-plan-fields{grid-template-columns:1fr}.website-plan-card{border-radius:16px}.website-plan-price{align-items:flex-start;flex-direction:column;gap:5px}}
      `}</style>
    </main>
  );
}
