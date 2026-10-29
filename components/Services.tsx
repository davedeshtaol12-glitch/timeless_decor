"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SplitText from "./SplitText";
import { serviceGroupIds } from "@/data/services";
import { richTags } from "@/lib/rich";

export default function Services() {
  const t = useTranslations("services");
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const groups = serviceGroupIds.map((id) => ({ id, title: t(`groups.${id}.title`), items: t.raw(`groups.${id}.items`) as string[] }));
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  const biggest = Math.max(...groups.map((group) => group.items.length));
  const current = groups[active];
  const share = Math.round((current.items.length / total) * 100);

  return (
    <section id="services" className="services section-shell" aria-labelledby="services-heading">
      <div className="section-overline"><span className="eyebrow">{t("overline")}</span><span className="eyebrow section-overline-end">{t("overlineEnd")}</span></div>
      <div className="services-grid">
        <div className="services-intro">
          <SplitText as="h2" id="services-heading">{t.rich("title", richTags)}</SplitText>
          <p>{t("intro")}</p>
          <a href="#contact" className="text-link">{t("link")} <ArrowUpRight size={17} aria-hidden="true" /></a>

          <div className="service-score" role="region" aria-label={t("scoreAria", { title: current.title })} aria-live="polite">
            <p className="score-label">{t("scoreLabel")}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={current.id} className="score-body"
                initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : 0.22 }}>
                <p className="score-title">{current.title}</p>
                <div className="score-figures">
                  <span className="score-number">{String(current.items.length).padStart(2, "0")}</span>
                  <span className="score-unit">{t("offerings", { count: current.items.length })}</span>
                </div>
                <div className="score-meter" aria-hidden="true"><span style={{ transform: `scaleX(${current.items.length / biggest})` }} /></div>
                <p className="score-share"><strong>{share}%</strong> {t("catalogueShare")}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ol className="services-list">
          {groups.map((group, index) => {
            const open = index === active;
            return (
              <motion.li key={group.id} className={open ? "is-open" : undefined}
                initial={{ opacity: 0, y: reduced ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActive(index)}>
                <button type="button" className="service-head" aria-expanded={open} onClick={() => setActive(index)} onFocus={() => setActive(index)}>
                  <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="service-title">{group.title}</span>
                  <span className="service-count">{group.items.length}</span>
                </button>
                <div className="service-body" aria-hidden={!open}>
                  <ul>{group.items.map((item, itemIndex) => <li key={item} style={{ transitionDelay: open ? `${0.18 + itemIndex * 0.05}s` : "0s" }}>{item}</li>)}</ul>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
