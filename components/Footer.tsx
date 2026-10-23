"use client";

import Image from "next/image";
import { ArrowUp, ArrowUpRight, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import Dialog from "./Dialog";
import SplitText from "./SplitText";
import { phoneNumbers, siteConfig, socialLinks } from "@/lib/site";

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  return <>
    <footer className="footer">
      <div className="footer-top">
        <SplitText as="p" effect="rise">Creating timeless<br />memories through <em>elegant celebrations.</em></SplitText>
        <nav aria-label="Footer navigation"><a href="#story">About us</a><a href="#services">Our services</a><a href="#portfolio">Our work</a><a href="#process">Why choose us</a><a href="#contact">Begin a conversation</a></nav>
        <div className="footer-contact">
          {phoneNumbers.map((phone) => <a key={phone.href} href={phone.href}><Phone size={15} aria-hidden="true" />{phone.display}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
          <div className="footer-socials">{socialLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} (opens in a new tab)`}>{link.label === "Telegram" ? <Send size={17} aria-hidden="true" /> : <span aria-hidden="true">♪</span>}<span>{link.label}</span></a>)}</div>
        </div>
      </div>
      <a href="#home" className="footer-logo" aria-label="Timeless Décor & Events, back to top"><Image src="/brand/logo.png" alt="Timeless Décor and Event Planners" width={900} height={751} /></a>
      <div className="footer-bottom"><span>© {year ?? ""} TIMELESS DÉCOR & EVENTS</span><button type="button" onClick={() => setPrivacyOpen(true)}>Privacy & inquiries</button><a href="#home">BACK TO TOP <ArrowUp size={13} aria-hidden="true" /></a></div>
    </footer>
    <Dialog open={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Privacy and inquiries" className="privacy-dialog">
      <div className="privacy-copy"><span className="eyebrow">A NOTE ON YOUR DETAILS</span><h2>Privacy &<br /><em>inquiries.</em></h2>
        <p>The inquiry form uses the details you provide to prepare your event request. If online delivery is available, choosing to send forwards those details to the studio’s configured inquiry service. Otherwise, you choose whether to copy, download or share the prepared message by SMS.</p>
        <p>Preparing a message alone does not send it. Opening an SMS draft does not send it either; your messaging app asks you to complete that step. Your carrier’s usual messaging charges may apply.</p>
        <p>This website does not include advertising trackers or an analytics service. Fonts and décor media are served with the website. Your browser and the website host still exchange the technical information required to load pages.</p>
        <p>For questions about information you have shared, contact Timeless on <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.</p>
      </div>
    </Dialog>
  </>;
}
