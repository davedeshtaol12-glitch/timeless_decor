import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

const pillars = [
  ["01", "Our vision", "To become the leading event décor and planning company, recognized for creativity, quality, innovation and excellence in delivering memorable celebrations."],
  ["02", "Our mission", "To provide high-quality, professional, reliable and affordable event solutions, creating beautiful, memorable experiences and exceeding expectations through creativity and attention to detail."],
  ["03", "Our commitment", "Every celebration tells a unique story. We transform your vision into reality with elegant décor, creative designs and seamless execution, beautiful, stress-free and truly unforgettable."],
  ["04", "Our core values", "Excellence · Creativity · Professionalism · Integrity · Customer satisfaction · Innovation · Teamwork."],
];

export default function Story() {
  return <section id="story" className="story section-shell">
    <Reveal><div className="section-overline"><span className="eyebrow">01 / ABOUT US</span><span className="eyebrow section-overline-end">CREATING TIMELESS MEMORIES</span></div></Reveal>
    <div className="story-grid">
      <Reveal className="story-visual">
        <div className="story-main-image"><Image src="/media/story.webp" alt="An abundant composition of white flowers with an ivory event setting beyond" fill sizes="(max-width: 760px) 85vw, 38vw" className="object-cover" /></div>
        <div className="story-detail-image"><Image src="/media/detail.webp" alt="Woven Ethiopian basket details with delicate floral accents" fill sizes="(max-width: 760px) 32vw, 16vw" className="object-cover" /></div>
        <span className="image-footnote">ELEGANT. CREATIVE. PERSONALIZED.</span>
      </Reveal>
      <div className="story-narrative">
        <SplitText as="h2">Ordinary occasions,<br /><em>unforgettable<br className="desktop-break" /> celebrations.</em></SplitText>
        <Reveal delay={0.08}><p className="story-lead">Timeless Décor &amp; Events is a full-service event decoration and planning company dedicated to transforming ordinary occasions into unforgettable celebrations.</p>
          <p>We specialize in designing elegant, creative and personalized event experiences that reflect each client’s unique vision and style. Whether it’s an intimate family gathering or a grand celebration, our experienced team delivers exceptional décor, flawless coordination and outstanding customer service from concept to completion.</p>
          <a href="#services" className="text-link">Explore our services <ArrowUpRight size={17} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </div>
    <div className="disciplines-grid">{pillars.map(([number, title, description], index) => <Reveal key={number} delay={index * 0.045}>
      <article className="discipline"><span className="eyebrow">{number}</span><h3>{title}</h3><p>{description}</p></article>
    </Reveal>)}</div>
  </section>;
}
