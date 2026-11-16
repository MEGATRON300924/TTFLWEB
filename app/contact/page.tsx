import type { Metadata } from "next";
import TTFLHeader from "../../components/TTFLHeader";
import TTFLFooter from "../../components/TTFLFooter";
import AuthenticatedInquiryForm from "../../components/AuthenticatedInquiryForm";

export const metadata: Metadata = { title: "Contact", description: "Contact The Tron Forge Limited for general enquiries, MAX AI, and TTFL Store." };

const contacts = [
  ["General enquiries","Questions about The Tron Forge Limited and our technology projects.","info@thetronforge.name.ng","mailto:info@thetronforge.name.ng"],
  ["MAX AI partnerships","Integrations, collaborations, media, and MAX AI opportunities.","partners@max-ai.name.ng","mailto:partners@max-ai.name.ng"],
  ["MAX AI support","Help with MAX AI products and services.","help@max-ai.name.ng","mailto:help@max-ai.name.ng"],
  ["TTFL Store support","Marketplace orders, vendors, and account support.","TTFL Store Help Center","https://www.ttflstore.name.ng/support"]
];

export default function ContactPage() {
  return <div className="refresh-page"><TTFLHeader/><main>
    <section className="refresh-page-hero"><div className="refresh-shell"><p className="refresh-overline">The Tron Forge Limited <span>·</span> Contact</p><h1>Let's start a<br/><span>conversation.</span></h1><p className="refresh-page-lede">Choose the right contact for your question, or send our team a message using your MAX Account.</p></div></section>
    <section className="refresh-contact-options"><div className="refresh-shell"><div className="refresh-service-heading"><p className="refresh-kicker">Get in touch</p><h2>How can we help?</h2></div><div className="refresh-contact-grid">{contacts.map(([title,desc,label,url])=><article key={title}><h3>{title}</h3><p>{desc}</p><a href={url}>{label} ↗</a></article>)}</div></div></section>
    <AuthenticatedInquiryForm type="contact" returnPath="/contact#contact-form"/>
  </main><TTFLFooter/></div>;
}