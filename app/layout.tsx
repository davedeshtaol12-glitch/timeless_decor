import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
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

const OG_LOCALES = { en: "en_US", am: "am_ET", om: "om_ET" } as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale() as keyof typeof OG_LOCALES;
  return {
    metadataBase: getSiteUrl(),
    title: { default: t("title"), template: t("titleTemplate") },
    description: t("description"),
    ...(getSiteUrl() ? { alternates: { canonical: "/" } } : {}),
    openGraph: {
      title: t("ogTitle"), description: t("tagline"),
      siteName: siteConfig.name, locale: OG_LOCALES[locale] ?? "en_US", type: "website",
      ...(getSiteUrl() ? { images: [{ url: "/media/wedding.webp", width: 640, height: 640, alt: t("ogImageAlt") }] } : {}),
    },
    twitter: { card: "summary_large_image", title: t("ogTitle"), description: t("tagline") },
  };
}
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#242820" };

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("common");
  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a className="skip-link" href="#main">{t("skipToContent")}</a>
          <Providers>{children}</Providers>
          <CursorFX />
          <noscript><div className="noscript-note">{t("noscript")} <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.</div></noscript>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
