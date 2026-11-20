import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thetronforge.name.ng"),
  title: {
    default: "The Tron Forge Limited | We Forge The Future",
    template: "%s | The Tron Forge Limited",
  },
  description:
    "The Tron Forge Limited is a Nigeria-based technology company building digital products, AI systems, online platforms, and technology services.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/assets/ttfl.png",
    apple: "/assets/ttfl.png",
  },
  openGraph: {
    siteName: "The Tron Forge Limited",
    type: "website",
    images: [{ url: "/assets/ttfl.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/ttfl.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
