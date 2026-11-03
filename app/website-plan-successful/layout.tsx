import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Plan Payment Confirmation | The Tron Forge Limited",
  description: "Thank you for subscribing to the TTFL website plan. Complete your website requirements form and send your application to our team.",
  alternates: { canonical: "https://thetronforge.name.ng/website-plan-successful" },
  robots: { index: false, follow: false },
};

export default function WebsitePlanSuccessfulLayout({ children }: { children: React.ReactNode }) {
  return children;
}
