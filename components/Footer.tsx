"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUp, ArrowUpRight, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import Dialog from "./Dialog";
import SplitText from "./SplitText";
import { richTags } from "@/lib/rich";
import { phoneNumbers, siteConfig, socialLinks } from "@/lib/site";

export default function Footer() {
  const t = useTranslations("footer");
  const header = useTranslations("header");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  return <>
    <footer className="footer">
      <div className="footer-top">
        <SplitText as="p" effect="rise">{t.rich("message", richTags)}</SplitText>
        <nav aria-label={t("navLabel")}><a href="#story">{t("about")}</a><a href="#services">{t("services")}</a><a href="#portfolio">{t("work")}</a><a href="#process">{t("why")}</a><a href="#contact">{t("contact")}</a></nav>
        <div className="footer-contact">
          {phoneNumbers.map((phone) => <a key={phone.href} href={phone.href}><Phone size={15} aria-hidden="true" />{phone.display}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
          <div className="footer-socials">{socialLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} (opens in a new tab)`}>{link.label === "Telegram" ? <Send size={17} aria-hidden="true" /> : <span aria-hidden="true">♪</span>}<span>{link.label}</span></a>)}</div>
        </div>
      </div>
      <a href="#home" className="footer-logo" aria-label={t("logoLabel")}><Image src="/brand/logo.png" alt={header("logoAlt")} width={900} height={751} /></a>
      <div className="footer-bottom"><span>{t("rights", { year: year ?? "" })}</span><button type="button" onClick={() => setPrivacyOpen(true)}>{t("privacy")}</button><a href="#home">{t("backToTop")} <ArrowUp size={13} aria-hidden="true" /></a></div>
    </footer>
    <Dialog open={privacyOpen} onClose={() => setPrivacyOpen(false)} title={t("privacyTitle")} className="privacy-dialog">
      <div className="privacy-copy"><span className="eyebrow">{t("privacyEyebrow")}</span><h2>{t.rich("privacyHeading", richTags)}</h2>
        <p>{t("privacy1")}</p>
        <p>{t("privacy2")}</p>
        <p>{t("privacy3")}</p>
        <p>{t.rich("privacy4", { phone: () => <a href={siteConfig.phoneHref}>{siteConfig.phone}</a> })}</p>
      </div>
    </Dialog>
  </>;
}
