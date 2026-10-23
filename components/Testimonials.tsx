"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { testimonials, pressMentions, type Testimonial, type PressMention } from "@/data/portfolio";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import styles from "./Testimonials.module.css";

interface TestimonialsProps {
  items?: Testimonial[];
  press?: PressMention[];
}

export default function Testimonials({ items = testimonials, press = pressMentions }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const current = items.length > 0 ? items[index % items.length] : null;

  return (
    <section id="voices" className={styles.section} aria-label={current ? "Client testimonials" : "Our philosophy"}>
      <div className={styles.container}>
        <Reveal>
          <p className={styles.eyebrow}>{current ? "Words that stay with us" : "Our motto"}</p>
          <div className={styles.quoteMark} aria-hidden="true">“</div>
          {current ? (
            <div className={styles.testimonials} role="group" aria-roledescription="carousel" aria-label="Approved client testimonials">
              <div aria-live="polite" aria-atomic="true">
                <AnimatePresence mode="wait">
                  <motion.div key={current.id} role="group" aria-roledescription="slide" aria-label={`${index % items.length + 1} of ${items.length}`} initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }} transition={{ duration: reducedMotion ? 0 : .28 }}>
                    <blockquote className={styles.quote}><SplitText as="p" stagger={0.045}>{current.quote}</SplitText></blockquote>
                    <div className={styles.attribution}>
                      {current.portrait && <Image src={current.portrait} alt="" width={48} height={48} className={styles.portrait} />}
                      <div><span className={styles.name}>{current.name}</span><span className={styles.role}>{current.role}</span></div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              {items.length > 1 && <div className={styles.controls}><button type="button" onClick={() => setIndex((value) => (value - 1 + items.length) % items.length)} aria-label="Previous testimonial"><ArrowLeft size={17} aria-hidden="true" /></button><span>{String(index % items.length + 1).padStart(2, "0")} <i /> {String(items.length).padStart(2, "0")}</span><button type="button" onClick={() => setIndex((value) => (value + 1) % items.length)} aria-label="Next testimonial"><ArrowRight size={17} aria-hidden="true" /></button></div>}
            </div>
          ) : (
            <div className={styles.philosophy}>
              <blockquote className={styles.quote}><SplitText as="p">Creating timeless memories<br /><em>through elegant celebrations.</em></SplitText></blockquote>
              <div className={styles.attribution}><div><span className={styles.name}>Our motto</span><span className={styles.role}>Timeless Décor &amp; Events</span></div></div>
            </div>
          )}
          {press.length > 0 && <div className={styles.press}><span>In the press</span><div>{press.map((entry) => <a key={entry.url} href={entry.url} target="_blank" rel="noopener noreferrer">{entry.name}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</div></div>}
        </Reveal>
      </div>
    </section>
  );
}
