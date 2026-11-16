import type { Metadata } from "next";
import TTFLHeader from "../../components/TTFLHeader";
import TTFLFooter from "../../components/TTFLFooter";
import AuthenticatedInquiryForm from "../../components/AuthenticatedInquiryForm";

export const metadata: Metadata = { title: "Partnerships", description: "Explore technology, business, sponsorship, and product partnerships with The Tron Forge Limited." };

const partnershipTypes = [
  ["Technology partnerships","Integrations, product connectivity and technical collaboration."],
  ["Business partnerships","Strategic initiatives and long-term business collaboration."],
  ["Sponsorships and media","Events, campaigns, advertising and creator partnerships."],
  ["Product collaborations","Co-building and co-launching products, features and services."]
];

export default function PartnershipsPage() {
  return <div className="refresh-page"><TTFLHeader/><main>
    <section className="refresh-page-hero"><div className="refresh-shell"><p className="refresh-overline">The Tron Forge Limited <span>·</span> Partnerships</p><h1>Better work happens<br/><span>together.</span></h1><p className="refresh-page-lede">We work with businesses, organisations, creators and technology teams on ideas that benefit from shared expertise and clear execution.</p><div className="refresh-page-actions"><a className="refresh-primary" href="#partnership-form">Discuss a partnership <span>↓</span></a></div></div></section>
    <section className="refresh-contact-options"><div className="refresh-shell"><div className="refresh-service-heading"><p className="refresh-kicker">Ways to collaborate</p><h2>Different goals.<br/>A shared approach.</h2></div><div className="refresh-contact-grid">{partnershipTypes.map(([title,desc])=><article key={title}><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>
    <AuthenticatedInquiryForm type="partnership" returnPath="/partnerships#partnership-form"/>
  </main><TTFLFooter/></div>;
}