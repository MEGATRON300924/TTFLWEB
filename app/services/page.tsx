import type { Metadata } from "next";
import TTFLHeader from "../../components/TTFLHeader";
import TTFLFooter from "../../components/TTFLFooter";
import AuthenticatedInquiryForm from "../../components/AuthenticatedInquiryForm";

export const metadata: Metadata = {
  metadataBase: new URL("https://thetronforge.name.ng"),
  title: "Website Design & Digital Services in Nigeria | TTFL",
  description: "Professional website design, web development, creative media, advertising and digital infrastructure services from The Tron Forge Limited.",
  applicationName: "The Tron Forge Limited",
  authors: [{ name: "The Tron Forge Limited", url: "https://thetronforge.name.ng" }],
  creator: "The Tron Forge Limited",
  publisher: "The Tron Forge Limited",
  category: "Technology",
  keywords: ["The Tron Forge Limited","TTFL services","website design Nigeria","website development Nigeria","business website Nigeria","domain registration Nigeria","Google Search setup","web development","app development","graphic design","advertising and promotion","creative media design"],
  alternates: { canonical: "https://thetronforge.name.ng/services" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { title: "Digital Services | The Tron Forge Limited", description: "Website development, creative media, advertising and technology services for businesses and creators.", url: "https://thetronforge.name.ng/services", siteName: "The Tron Forge Limited", locale: "en_NG", type: "website", images: [{ url: "https://www.max-ai.name.ng/ttfl.png", width: 1200, height: 630, alt: "The Tron Forge Limited" }] },
  twitter: { card: "summary_large_image", title: "Digital Services | The Tron Forge Limited", description: "Website development, creative media, advertising and technology services.", images: ["https://www.max-ai.name.ng/ttfl.png"] },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://thetronforge.name.ng/#organization", "name": "The Tron Forge Limited", "url": "https://thetronforge.name.ng/", "logo": "https://www.max-ai.name.ng/ttfl.png" },
    { "@type": "Service", "@id": "https://thetronforge.name.ng/services#website-development", "name": "Website development and setup", "provider": { "@id": "https://thetronforge.name.ng/#organization" }, "description": "Domain registration assistance, professional website design and development, and Google Search indexing setup.", "offers": { "@type": "Offer", "price": "20000", "priceCurrency": "NGN", "unitText": "per year" } },
    { "@type": "Service", "@id": "https://thetronforge.name.ng/services#technology-services", "name": "Technology and creative services", "provider": { "@id": "https://thetronforge.name.ng/#organization" }, "serviceType": ["Web development","App development","Digital infrastructure","Creative media design","Advertising and promotion"] },
    { "@type": "CollectionPage", "@id": "https://thetronforge.name.ng/services#webpage", "url": "https://thetronforge.name.ng/services", "name": "Services | The Tron Forge Limited", "about": { "@id": "https://thetronforge.name.ng/#organization" } }
  ]
};

const services = [
  ["Websites & platforms","Business websites, landing pages and custom web platforms designed around the way your organisation works."],
  ["Application development","Web and mobile application development for products, services and internal business operations."],
  ["Creative media design","Logos, flyers, banners, thumbnails and social graphics that give your brand a consistent visual identity."],
  ["Advertising & promotion","Campaign planning and promotional placements across relevant digital and social channels."],
  ["Digital infrastructure","Technical setup, integrations and digital tools that support reliable online operations."],
  ["Partnerships & sponsorships","Collaboration on product launches, campaigns, events and strategic opportunities."]
];

export default function ServicesPage() {
  return <div className="refresh-page"><TTFLHeader/><main>
    <section className="refresh-page-hero"><div className="refresh-shell"><p className="refresh-overline">The Tron Forge Limited <span>·</span> Services</p><h1>Useful digital work.<br/><span>Built with purpose.</span></h1><p className="refresh-page-lede">We help businesses, organisations and creators establish their presence, build digital products and communicate clearly online.</p><div className="refresh-page-actions"><a className="refresh-primary" href="#website-package">Explore services <span>↓</span></a><a className="refresh-text-link" href="/contact">Talk to our team ↗</a></div></div></section>
    <section className="refresh-service-feature" id="website-package"><div className="refresh-shell refresh-service-feature-grid"><div><p className="refresh-kicker">Website package</p><h2>Get your business online.</h2><p>We can help you secure a domain, build a professional website and prepare your site for discovery through Google Search.</p><ul><li>Domain registration assistance</li><li>Professional website design and development</li><li>Responsive layouts for mobile and desktop</li><li>Google Search setup and indexing submission</li></ul><p className="refresh-small-note">Indexing submission does not guarantee search ranking or visibility.</p></div><aside><span>Simple annual pricing</span><strong>₦20,000</strong><b>per year</b><p>Tell us your business name and what you need your website to do. We will guide you through the next steps.</p><a className="refresh-primary" href="https://paystack.shop/pay/ttfl-website-plan">Request a website <span>↗</span></a></aside></div></section>
    <section className="refresh-service-list"><div className="refresh-shell"><div className="refresh-service-heading"><p className="refresh-kicker">What we can help with</p><h2>Services for the work<br/>you want to do.</h2></div><div className="refresh-service-grid">{services.map(([name,description])=><article key={name}><h3>{name}</h3><p>{description}</p></article>)}</div></div></section>
    <section className="refresh-service-cta"><div className="refresh-shell"><div><p className="refresh-kicker">Start a conversation</p><h2>Tell us what you're<br/>working on.</h2></div><div><p>Share a little about your project, business or campaign. We will help you identify a practical next step.</p><a className="refresh-primary" href="/contact">Contact The Tron Forge Limited <span>↗</span></a></div></div></section>
    <AuthenticatedInquiryForm type="contact" returnPath="/services#contact-form"/>
  </main><TTFLFooter/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceSchema)}}/></div>;
}