"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import styles from "./Process.module.css";

const reasons = [
  "Professional and experienced team",
  "Creative and customized designs",
  "High-quality décor materials",
  "Affordable packages",
  "On-time delivery and setup",
  "Friendly and reliable customer service",
  "Attention to every detail",
  "Complete event management solutions",
];

export default function Process() {
  const reduced = useReducedMotion();
  return (
    <section id="process" className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.container}>
        <Reveal className={styles.intro}>
          <div>
            <p className={styles.eyebrow}><span /> Why choose us</p>
            <SplitText as="h2" id="experience-heading">Why choose<br /><em>Timeless Décor &amp; Events?</em></SplitText>
          </div>
          <p className={styles.lead}>Elegant ideas, dependable people and a team that stays with you from the first conversation to the final detail.</p>
        </Reveal>

        <ol className={styles.reasons}>
          {reasons.map((reason, index) => (
            <motion.li key={reason} className={styles.reason}
              initial={{ opacity: 0, x: reduced ? 0 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.reasonTitle}>{reason}</span>
              <ArrowUpRight className={styles.reasonArrow} size={22} strokeWidth={1.2} aria-hidden="true" />
            </motion.li>
          ))}
        </ol>

        <div className={styles.bottom}>
          <p>Every celebration tells a unique story.</p>
          <a href="#contact">Begin your story <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
