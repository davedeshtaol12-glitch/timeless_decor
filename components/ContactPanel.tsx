"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Phone, Send } from "lucide-react";
import Dialog from "./Dialog";
import { amharicServices, phoneNumbers, siteConfig, socialLinks } from "@/lib/site";

function TikTokIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3c.3 2.4 1.8 4 4.1 4.2v3.1c-1.5 0-2.9-.4-4.1-1.2v6.3c0 3.4-2.7 6.1-6.1 6.1S4.4 19.8 4.4 16.4s2.7-6.1 6.1-6.1c.3 0 .6 0 .9.1v3.2c-.3-.1-.6-.2-.9-.2-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V3z" /></svg>;
}

export default function ContactPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion();
  const rise = (index: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 26 }, animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.25 + index * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <Dialog open={open} onClose={onClose} title="Contact Timeless Décor & Events" className="contact-dialog">
      <div className="cp-layout">
        <div className="cp-main">
          <motion.p className="cp-eyebrow" {...rise(0)}>Contact us</motion.p>
          <motion.h3 className="cp-title" {...rise(1)}>Let’s create<br /><em>something timeless.</em></motion.h3>
          <motion.p className="cp-lead" {...rise(2)}>Call, message or send us your idea. We’ll answer every celebration with the same care.</motion.p>

          <ul className="cp-phones">
            {phoneNumbers.map((phone, index) => (
              <motion.li key={phone.href} {...rise(3 + index)}>
                <a href={phone.href} className="cp-phone">
                  <span className="cp-phone-icon"><Phone size={18} strokeWidth={1.4} aria-hidden="true" /></span>
                  <span className="cp-phone-text"><small>{phone.note}</small><strong>{phone.display}</strong></span>
                  <span className="cp-phone-call">Call <ArrowUpRight size={15} aria-hidden="true" /></span>
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.div className="cp-socials" {...rise(6)}>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} ${link.handle} (opens in a new tab)`}>
                <span>{link.label === "Telegram" ? <Send size={17} strokeWidth={1.4} aria-hidden="true" /> : <TikTokIcon />}</span>
                <span className="cp-social-text"><small>{link.label}</small><strong>{link.handle}</strong></span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </motion.div>

          <motion.div className="cp-services" lang="am" {...rise(7)}>
            {amharicServices.map((service) => <span key={service}>{service}</span>)}
          </motion.div>
        </div>

        <aside className="cp-visual" aria-hidden="true">
          <Image src="/media/hero.webp" alt="" fill sizes="40vw" className="object-cover" />
          <div className="cp-visual-shade" />
          <Image src="/brand/logo.png" alt="" width={200} height={167} className="cp-logo" />
          <p>{siteConfig.motto}</p>
        </aside>
      </div>
    </Dialog>
  );
}
