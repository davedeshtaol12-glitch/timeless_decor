"use client";

import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Plus, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { heroPanels } from "@/data/hero";

const COUNT = heroPanels.length;
const STEP = 360 / COUNT;

export default function Reel() {
  const t = useTranslations("reel");
  const [active, setActive] = useState(0);
  const [sound, setSound] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [coarse, setCoarse] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const eased = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });
  const rotation = useTransform(eased, [0, 1], [0, -(COUNT - 1) * STEP]);
  const slide = heroPanels[active];
  const panelText = (id: string, key: "label" | "caption" | "alt") => t(`panels.${id}.${key}`);

  useMotionValueEvent(eased, "change", (value) => setActive(Math.min(COUNT - 1, Math.max(0, Math.round(value * (COUNT - 1))))));

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", update);
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !sound;
    if (pageVisible && !reduced) void video.play().catch(() => undefined); else video.pause();
  }, [active, pageVisible, reduced, sound]);

  const moveCursor = (event: React.PointerEvent) => {
    const node = cursorRef.current;
    if (node) node.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  };
  const goTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: section.offsetTop + travel * (index / (COUNT - 1)), behavior: reduced ? "auto" : "smooth" });
  };

  return <>
    <section id="reel" ref={sectionRef} className="reel" aria-label={t("aria")} onPointerMove={moveCursor}>
      <div className="reel-stage">
        <h2 className="sr-only">{t("heading")}</h2>
        <div className="ring-scene" aria-hidden={false}>
          <div className="ring-tilt"><motion.div className="ring" style={{ rotateY: reduced ? 0 : rotation }}>
            {heroPanels.map((panel, index) => (
              <button type="button" key={panel.id} className={`ring-panel ${index === active ? "is-active" : ""}`}
                style={{ transform: `rotateY(${index * STEP}deg) translateZ(var(--ring-radius))` }}
                onClick={() => goTo(index)} aria-label={`${panelText(panel.id, "label")}: ${panelText(panel.id, "caption")}`} aria-current={index === active}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={panel.image} alt={panelText(panel.id, "alt")} draggable={false} loading="eager" />
                {index === active && panel.video && !reduced && <video key={panel.id} ref={videoRef} src={panel.video} poster={panel.image} muted={!sound} loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} />}
              </button>
            ))}
          </motion.div></div>
        </div>
        <div className="reel-center" aria-live="polite">
          <Plus size={13} strokeWidth={1.2} aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.div key={slide.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}>
              <p className="reel-title">{panelText(slide.id, "label")}</p>
              <p className="reel-caption">{panelText(slide.id, "caption")}</p>
            </motion.div>
          </AnimatePresence>
          <a href="#contact" className="reel-cta">{t("cta")} <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
        <p className="reel-credit">{t("credit")} <span>{t("creditSuffix")}</span></p>
        <div className="reel-index" aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}</div>
        <button type="button" className="sound-toggle" onClick={() => setSound((value) => !value)} aria-pressed={sound} aria-label={sound ? t("soundOn") : t("soundOff")}>
          <span>{sound ? t("on") : t("off")}</span>{sound ? <Volume2 size={15} aria-hidden="true" /> : <VolumeX size={15} aria-hidden="true" />}
        </button>
        {!coarse && <div ref={cursorRef} className="explore-cursor" aria-hidden="true"><span>{t("cursor")}</span></div>}
        <span className="reel-hint" aria-hidden="true">{t("hint")}</span>
      </div>
    </section>
  </>;
}
