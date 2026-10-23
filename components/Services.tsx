"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SplitText from "./SplitText";

const services = [
  { title: "Wedding decoration", items: ["Wedding stage design", "Floral arrangements", "Reception décor", "Bridal table decoration", "Church and outdoor wedding décor"] },
  { title: "Birthday decoration", items: ["Children’s birthday parties", "Adult birthday celebrations", "Theme-based birthday setups", "Balloon decorations", "Dessert and cake tables"] },
  { title: "Graduation decoration", items: ["Graduation party décor", "Photo booth setup", "Stage decoration", "Customized backdrops"] },
  { title: "Baby shower decoration", items: ["Elegant baby shower themes", "Gender reveal decoration", "Balloon garlands", "Table styling", "Welcome signage"] },
  { title: "Engagement decoration", items: ["Romantic engagement setups", "Proposal decoration", "Family engagement ceremonies", "Floral and lighting arrangements"] },
  { title: "Corporate events & anniversaries", items: ["Corporate anniversary celebrations", "Office decoration", "Award ceremonies", "Product launches", "Conferences and seminars"] },
  { title: "Other events", items: ["Bridal showers", "Anniversaries", "Baptisms", "Holiday parties", "Cultural celebrations", "Family gatherings", "Private events", "Event rentals and styling"] },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return (
    <section id="services" className="services section-shell" aria-labelledby="services-heading">
      <div className="section-overline"><span className="eyebrow">02 / OUR SERVICES</span><span className="eyebrow section-overline-end">FROM CONCEPT TO COMPLETION</span></div>
      <div className="services-grid">
        <div className="services-intro">
          <SplitText as="h2" id="services-heading">Every celebration,<br /><em>beautifully dressed.</em></SplitText>
          <p>From intimate gatherings to grand occasions, we design, style and deliver the setting for your day.</p>
          <a href="#contact" className="text-link">Plan your event <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <ol className="services-list">
          {services.map((service, index) => {
            const open = index === active;
            return (
              <motion.li key={service.title} className={open ? "is-open" : undefined}
                initial={{ opacity: 0, y: reduced ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActive(index)}>
                <button type="button" className="service-head" aria-expanded={open} onClick={() => setActive(index)} onFocus={() => setActive(index)}>
                  <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="service-title">{service.title}</span>
                  <span className="service-count">{service.items.length}</span>
                </button>
                <div className="service-body" aria-hidden={!open}>
                  <ul>{service.items.map((item, itemIndex) => <li key={item} style={{ transitionDelay: open ? `${0.18 + itemIndex * 0.05}s` : "0s" }}>{item}</li>)}</ul>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
