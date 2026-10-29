import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { richTags } from "@/lib/rich";

export default function Story() {
  const t = useTranslations("story");
  const pillars = t.raw("pillars") as { title: string; text: string }[];
  return <section id="story" className="story section-shell">
    <Reveal><div className="section-overline"><span className="eyebrow">{t("overline")}</span><span className="eyebrow section-overline-end">{t("overlineEnd")}</span></div></Reveal>
    <div className="story-grid">
      <Reveal className="story-visual">
        <div className="story-main-image"><Image src="/media/story.webp" alt={t("mainImageAlt")} fill sizes="(max-width: 760px) 85vw, 38vw" className="object-cover" /></div>
        <div className="story-detail-image"><Image src="/media/detail.webp" alt={t("detailImageAlt")} fill sizes="(max-width: 760px) 32vw, 16vw" className="object-cover" /></div>
        <span className="image-footnote">{t("footnote")}</span>
      </Reveal>
      <div className="story-narrative">
        <SplitText as="h2">{t.rich("title", { ...richTags, br: () => <br className="desktop-break" /> })}</SplitText>
        <Reveal delay={0.08}><p className="story-lead">{t("lead")}</p>
          <p>{t("body")}</p>
          <a href="#services" className="text-link">{t("link")} <ArrowUpRight size={17} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </div>
    <div className="disciplines-grid">{pillars.map((pillar, index) => <Reveal key={pillar.title} delay={index * 0.045}>
      <article className="discipline"><span className="eyebrow">{String(index + 1).padStart(2, "0")}</span><h3>{pillar.title}</h3><p>{pillar.text}</p></article>
    </Reveal>)}</div>
  </section>;
}
