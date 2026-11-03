import type { Metadata } from "next";
import LegacyPage from "../../components/LegacyPage";

export const metadata: Metadata = {
  metadataBase: new URL("https://thetronforge.name.ng"),
  title: "Website Design & Digital Services in Nigeria | TTFL",
  description:
    "Get a professional business website, domain registration assistance and Google Search setup for ₦20,000 per year. Explore web development, branding, advertising and digital services from The Tron Forge Limited.",
  applicationName: "The Tron Forge Limited",
  authors: [{ name: "The Tron Forge Limited", url: "https://thetronforge.name.ng" }],
  creator: "The Tron Forge Limited",
  publisher: "The Tron Forge Limited",
  category: "Technology",
  keywords: [
    "The Tron Forge Limited",
    "TTFL services",
    "website design Nigeria",
    "website development Nigeria",
    "affordable website design Nigeria",
    "business website Nigeria",
    "₦20,000 website package",
    "domain registration Nigeria",
    "Google Search setup",
    "Google website indexing",
    "professional website for small business",
    "web development",
    "app development",
    "graphic design",
    "digital marketing",
    "advertising and promotion",
    "creative media design",
  ],
  alternates: {
    canonical: "https://thetronforge.name.ng/services",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Professional Website Design in Nigeria from ₦20,000 | TTFL",
    description:
      "Launch your business online with a professional website, domain registration assistance and Google Search setup. Website packages from ₦20,000 per year.",
    url: "https://thetronforge.name.ng/services",
    siteName: "The Tron Forge Limited",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "https://www.max-ai.name.ng/ttfl.png",
        width: 1200,
        height: 630,
        alt: "The Tron Forge Limited — Website Design and Digital Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Website Design in Nigeria | The Tron Forge Limited",
    description:
      "Get a professional website, domain assistance and Google Search setup for ₦20,000 per year.",
    images: ["https://www.max-ai.name.ng/ttfl.png"],
  },
};

const page = `
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header">
  <div class="wrap nav">
    <a href="/" class="brand">
      <div class="venture-logo"><img src="https://www.max-ai.name.ng/ttfl.png" alt="The Tron Forge Limited" loading="lazy"></div>
      <span>Tron Forge Limited</span>
    </a>
    <nav class="primary-nav" aria-label="Primary">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/ecosystem">Ecosystem</a></li>
        <li><a href="/services" aria-current="page">Services</a></li>
        <li><a href="/ventures">Ventures</a></li>
        <li><a href="/founder">Founder</a></li>
        <li><a href="/gallery">Gallery</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <div class="nav-actions">
      <a href="/contact" class="btn nav-cta desktop-only">Get Started</a>
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span></button>
    </div>
  </div>
</header>

<nav class="breadcrumb wrap" aria-label="Breadcrumb">
  <ol><li><a href="/">Home</a></li><li aria-current="page">Services</li></ol>
</nav>

<main id="main">
  <section class="page-title">
    <div class="wrap">
      <p class="eyebrow">What we do</p>
      <h1>Digital services that move your business forward.</h1>
      <p class="lede">From getting your business online to creating the visuals that help your brand stand out, The Tron Forge Limited helps turn your ideas into practical digital experiences.</p>
      <div class="btn-row">
        <a href="#website-package" class="btn btn-filled">Get a website</a>
        <a href="/contact" class="btn btn-outline">Talk to our team</a>
      </div>
    </div>
  </section>

  <section id="website-package">
    <div class="wrap">
      <p class="eyebrow">Featured service</p>
      <h2>Get your business online.</h2>
      <p class="section-lede">You do not need to figure out the technical setup yourself. We can help you secure a domain, build a professional website, and submit your website for discovery on Google.</p>
      <div class="grid-2">
        <div class="tile">
          <span class="status-tag status-live">Website package</span>
          <h3>Professional website setup</h3>
          <p>We help you get a domain name, create a professional website for your business or organisation, and configure your site for Google Search indexing.</p>
          <ul style="list-style:disc;padding-left:20px;margin:18px 0;color:var(--ink-soft);font-size:14px;line-height:1.9">
            <li>Domain registration assistance</li>
            <li>Professional website design and development</li>
            <li>Mobile-friendly website layout</li>
            <li>Google Search setup and indexing submission</li>
          </ul>
        </div>
        <div class="tile">
          <p class="eyebrow">Simple annual pricing</p>
          <h3 style="font-size:42px;letter-spacing:-.04em;margin:8px 0 2px;color:var(--ink)">₦20,000</h3>
          <p style="font-weight:600;color:var(--ink);margin-bottom:18px">per year</p>
          <p>One affordable annual package to help establish your online presence. Contact us with your business name and what you need your website to do, and we will guide you through the next steps.</p>
          <a href="mailto:info@thetronforge.name.ng?subject=Website%20Development%20Enquiry" class="btn btn-filled">Request a website</a>
          <p style="font-size:12px;margin:14px 0 0">Google indexing helps your site become discoverable; search ranking and visibility are not guaranteed.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section-alt">
    <div class="wrap">
      <h2>More ways we can help.</h2>
      <p class="section-lede">Practical creative and technology services for businesses, brands, and creators.</p>
      <div class="grid-3">
        <div class="tile">
          <span class="tile-dot" style="background:var(--brand)"></span>
          <h3>Creative media design</h3>
          <p>Logos, flyers, banners, thumbnails, and social media graphics that give your brand a consistent visual identity.</p>
        </div>
        <div class="tile">
          <span class="tile-dot" style="background:var(--brand-2)"></span>
          <h3>Advertising & promotion</h3>
          <p>Promotional support and advertising opportunities across relevant digital and social platforms.</p>
        </div>
        <div class="tile">
          <span class="tile-dot" style="background:var(--ink)"></span>
          <h3>Web & app development</h3>
          <p>Custom websites, web platforms, and application solutions shaped around your project requirements.</p>
        </div>
        <div class="tile">
          <span class="tile-dot" style="background:var(--brand-2)"></span>
          <h3>Digital infrastructure</h3>
          <p>Technical setup and digital tools that help organisations establish and manage their online operations.</p>
        </div>
        <div class="tile">
          <span class="tile-dot" style="background:var(--brand)"></span>
          <h3>Partnerships & sponsorships</h3>
          <p>Collaboration on campaigns, product launches, events, sponsorships, and strategic opportunities.</p>
          <a href="/partnerships" class="tile-link">Explore partnerships →</a>
        </div>
        <div class="tile">
          <span class="tile-dot" style="background:var(--ink)"></span>
          <h3>Affiliate opportunities</h3>
          <p>Opportunities to promote selected TTFL products and services through your own network.</p>
          <a href="/contact" class="tile-link">Ask about the programme →</a>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="cta-band">
        <div>
          <h2>Ready to take your next step?</h2>
          <p>Tell us what you need, and let’s work out the right solution for your business.</p>
        </div>
        <a href="/contact" class="btn btn-filled">Contact The Tron Forge</a>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-col">
        <a href="/" class="brand">
          <div class="venture-logo"><img src="https://www.max-ai.name.ng/ttfl.png" alt="The Tron Forge Limited" loading="lazy"></div>
          <span>Tron Forge Limited</span>
        </a>
        <p class="footer-tagline">We Forge The Future.</p>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/ecosystem">Ecosystem</a></li>
          <li><a href="/ventures">Ventures</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/partnerships">Partnerships</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Ecosystem</h4>
        <ul>
          <li><a href="https://www.max-ai.name.ng/" target="_blank" rel="noopener noreferrer">MAX AI</a></li>
          <li><a href="https://www.ttflstore.name.ng/" target="_blank" rel="noopener noreferrer">TTFL Store</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <ul>
          <li><a href="/contact">Contact us</a></li>
          <li><a href="https://www.instagram.com/thetronforgelimitedig/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://x.com/TheTronForgeLTD" target="_blank" rel="noopener noreferrer">X</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul><li><a href="mailto:info@thetronforge.name.ng">info@thetronforge.name.ng</a></li></ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 The Tron Forge Limited. All rights reserved.</span>
      <span><a href="/privacy">Privacy Policy</a> &nbsp;·&nbsp; <a href="/terms">Terms of Service</a></span>
    </div>
  </div>
</footer>
`;

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://thetronforge.name.ng/#organization",
      "name": "The Tron Forge Limited",
      "url": "https://thetronforge.name.ng/",
      "logo": "https://www.max-ai.name.ng/ttfl.png"
    },
    {
      "@type": "Service",
      "@id": "https://thetronforge.name.ng/services#website-development",
      "name": "Website development and setup",
      "provider": { "@id": "https://thetronforge.name.ng/#organization" },
      "description": "Domain registration assistance, professional website design and development, and Google Search indexing setup.",
      "offers": {
        "@type": "Offer",
        "price": "20000",
        "priceCurrency": "NGN",
        "unitText": "per year"
      }
    },
    {
      "@type": "CollectionPage",
      "@id": "https://thetronforge.name.ng/services#webpage",
      "url": "https://thetronforge.name.ng/services",
      "name": "Services | The Tron Forge Limited",
      "about": { "@id": "https://thetronforge.name.ng/#organization" }
    }
  ]
};

export default function ServicesPage() {
  return (
    <>
      <LegacyPage html={page} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
