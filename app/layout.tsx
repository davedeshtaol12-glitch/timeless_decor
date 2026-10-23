import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import CursorFX from "@/components/CursorFX";
import Providers from "@/components/Providers";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const serif = localFont({
  src: [
    { path: "../public/fonts/cormorant-garamond-latin.woff2", weight: "300 700", style: "normal" },
    { path: "../public/fonts/cormorant-garamond-latin-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-serif", display: "swap", fallback: ["Georgia"],
});
const sans = localFont({
  src: "../public/fonts/inter-latin.woff2", weight: "100 900",
  variable: "--font-sans", display: "swap", fallback: ["Arial"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: "Timeless Décor & Events — Creating Timeless Memories for Every Celebration", template: "%s | Timeless Décor & Events" },
  description: "A full-service event decoration and planning company. Weddings, birthdays, graduations, baby showers, engagements and corporate events. Call 0941097286.",
  ...(getSiteUrl() ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: "Timeless Décor & Events", description: siteConfig.tagline,
    siteName: siteConfig.name, locale: "en_US", type: "website",
    ...(getSiteUrl() ? { images: [{ url: "/media/wedding.webp", width: 640, height: 640, alt: "Ivory and gold décor by Timeless" }] } : {}),
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.tagline },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#242820" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Providers>{children}</Providers>
        <CursorFX />
        <noscript><div className="noscript-note">For gallery films and the inquiry form, enable JavaScript. You can always call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.</div></noscript>
      </body>
    </html>
  );
}
