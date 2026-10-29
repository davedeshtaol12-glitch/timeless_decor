"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { richTags } from "@/lib/rich";
import styles from "./Process.module.css";

export default function Process() {
  const t = useTranslations("process");
  const reasons = t.raw("reasons") as string[];
  const reduced = useReducedMotion();
  return (
    <section id="process" className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.container}>
        <Reveal className={styles.intro}>
          <div>
            <p className={styles.eyebrow}><span /> {t("eyebrow")}</p>
            <SplitText as="h2" id="experience-heading">{t.rich("title", richTags)}</SplitText>
          </div>
          <p className={styles.lead}>{t("lead")}</p>
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
          <p>{t("bottom")}</p>
          <a href="#contact">{t("bottomCta")} <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
