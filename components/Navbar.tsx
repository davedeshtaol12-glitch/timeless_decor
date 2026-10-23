"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ContactPanel from "./ContactPanel";
import Dialog from "./Dialog";
import { siteConfig, socialLinks } from "@/lib/site";

const links = [
  { label: "The beginning", href: "#home", image: "/media/hero.webp" },
  { label: "The reel", href: "#reel", image: "/media/film-wedding.webp" },
  { label: "About us", href: "#story", image: "/media/detail.webp" },
  { label: "Our services", href: "#services", image: "/media/celebration.webp" },
  { label: "Our work", href: "#portfolio", image: "/media/wedding.webp" },
  { label: "Why choose us", href: "#process", image: "/media/stage.webp" },
  { label: "Contact us", href: "#contact", image: "/media/soiree.webp" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [active, setActive] = useState(0);
  const destination = useRef<string | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (open || !destination.current) return;
    const hash = destination.current;
    destination.current = null;
    const frame = requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      const heading = target.querySelector<HTMLElement>("h1,h2") || target;
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
      history.replaceState(null, "", hash);
    });
    return () => cancelAnimationFrame(frame);
  }, [open, reduced]);
  return <>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="wordmark" href="#home" aria-label="Timeless Décor & Events, home">
        <Image src="/brand/logo.png" alt="Timeless Décor and Event Planners" width={900} height={751} priority className="wordmark-logo" />
      </a>
      <span className="header-note">Creating timeless memories</span>
      <div className="header-actions">
        <button className="header-consult" type="button" aria-haspopup="dialog" onClick={() => setContactOpen(true)}><span>Contact us</span><ArrowUpRight size={15} aria-hidden="true" /></button>
        <button className="menu-trigger" type="button" aria-haspopup="dialog" aria-expanded={open}
          onClick={() => setOpen(true)}>MENU <Plus size={21} strokeWidth={1.2} aria-hidden="true" /></button>
      </div>
    </header>
    <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
    <Dialog open={open} onClose={() => setOpen(false)} title="Explore Timeless" className="menu-dialog">
      <div className="menu-layout">
        <div className="menu-main">
          <p className="eyebrow menu-overline">TIMELESS DÉCOR & EVENTS</p>
          <nav aria-label="Main navigation"><ol className="menu-list">
            {links.map((link, index) => <motion.li key={link.href}
              initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: index * 0.065 }}>
              <a href={link.href} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault(); destination.current = link.href; setOpen(false);
              }}>
                <span className="menu-number">0{index + 1}</span><span>{link.label}</span><ArrowUpRight aria-hidden="true" />
              </a>
            </motion.li>)}
          </ol></nav>
          <div className="menu-contact">
            <div><span className="eyebrow">A CONVERSATION AWAY</span><a className="menu-phone" href={siteConfig.phoneHref}>{siteConfig.phone} <ArrowUpRight size={19} aria-hidden="true" /></a></div>
            <div className="menu-socials">{socialLinks.map((link) => <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.label}>{link.label} <ArrowUpRight size={13} aria-hidden="true" /></a>)}</div>
          </div>
        </div>
        <aside className="menu-visual" aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.div key={active} className="menu-image" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
              <Image src={links[active].image} alt="" fill sizes="40vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <p>Creating timeless<br />memories through <em>elegant celebrations.</em></p>
        </aside>
      </div>
    </Dialog>
  </>;
}
