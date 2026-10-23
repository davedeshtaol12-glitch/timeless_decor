"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Pause, Play, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/hero";
import Dialog from "./Dialog";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [filmOpen, setFilmOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [autoplayAllowed, setAutoplayAllowed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [filmFailed, setFilmFailed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const filmRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.08 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const slide = heroSlides[index];
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setAutoplayAllowed(reduced === false && !connection?.saveData);
  }, [reduced]);
  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (autoplayAllowed && inView && pageVisible && !paused && !filmOpen) {
      void video.play().catch(() => setPlaying(false));
    } else video.pause();
    return () => video.pause();
  }, [autoplayAllowed, inView, pageVisible, paused, filmOpen, index]);
  useEffect(() => {
    const video = filmRef.current;
    if (!filmOpen || !video) return;
    return () => video.pause();
  }, [filmOpen]);
  const selectSlide = (next: number) => {
    if (next === index) return;
    setIndex(next); setFailed(false); setPaused(false); setPlaying(false);
  };
  const toggleBackground = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setPaused(false);
      void video.play().catch(() => setPlaying(false));
    } else { setPaused(true); video.pause(); }
  };

  return <>
    <section id="home" ref={sectionRef} className="hero" aria-label="The art of celebration">
      <motion.div className="hero-media" style={{ y: reduced ? 0 : mediaY }}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div key={slide.id} className="hero-panels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.85 }}>
            <div className="hero-panel hero-panel-left"><Image src={slide.left} alt="" fill priority={index === 0} sizes="(max-width: 700px) 20vw, 28vw" className="object-cover" /></div>
            <div className="hero-panel hero-panel-center">
              <Image src={slide.image} alt={slide.alt} fill priority sizes="(max-width: 700px) 100vw, 44vw" className="object-cover" />
            </div>
            <div className="hero-panel hero-panel-right"><Image src={slide.right} alt="" fill priority={index === 0} sizes="(max-width: 700px) 20vw, 28vw" className="object-cover" /></div>
          </motion.div>
        </AnimatePresence>
        {slide.video && autoplayAllowed && !failed && <div className="hero-video-wrap"><video key={slide.id} ref={videoRef} src={slide.video} poster={slide.image}
          className="hero-video" muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}
          onError={() => { setFailed(true); setPlaying(false); }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} /></div>}
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>TIMELESS DÉCOR &amp; EVENTS</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>Creating timeless<br /><em>memories.</em></motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>Elegant, creative and personalized celebrations,<br />from concept to completion.</motion.p>
        <motion.a href="#contact" className="button hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }}>Begin your celebration <ArrowUpRight size={17} aria-hidden="true" /></motion.a>
      </div>
      <span className="hero-side-note" aria-hidden="true">WEDDINGS · BIRTHDAYS · GRADUATIONS · CORPORATE EVENTS</span>
      <div className="hero-bottom">
        <a href="#reel" className="scroll-cue"><span className="circle-arrow"><ArrowDown size={17} aria-hidden="true" /></span><span>SCROLL TO<br />DISCOVER</span></a>
        <div className="hero-chapters" aria-label="Choose a visual chapter">
          {heroSlides.map((item, position) => <button type="button" key={item.id} aria-pressed={position === index} onClick={() => selectSlide(position)} aria-label={`View ${item.label}`}>
            <span className="chapter-line" /><span className="chapter-label">0{position + 1}<span>{item.label}</span></span>
          </button>)}
        </div>
        <div className="hero-film-actions">
          {slide.video && <button type="button" className="watch-film" onClick={() => { setFilmFailed(false); setFilmOpen(true); }}><Play size={13} fill="currentColor" aria-hidden="true" /><span>STEP INSIDE</span></button>}
          {slide.video && autoplayAllowed && !failed && <button type="button" className="icon-button hero-pause" onClick={toggleBackground} aria-label={playing ? "Pause background film" : "Play background film"}>{playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}</button>}
        </div>
      </div>
    </section>
    <div className="discipline-strip" aria-label="Celebrations we design"><span>Weddings</span><span className="strip-mark" aria-hidden="true"><Plus size={14} strokeWidth={1} /></span><span>Birthdays</span><span className="strip-mark" aria-hidden="true"><Plus size={14} strokeWidth={1} /></span><span>Graduations & baby showers</span><span className="strip-mark" aria-hidden="true"><Plus size={14} strokeWidth={1} /></span><span>Corporate events</span></div>
    <Dialog open={filmOpen} onClose={() => setFilmOpen(false)} title={`Step inside: ${slide.label}`} className="film-dialog">
      <div className="film-view"><p className="eyebrow">TIMELESS DÉCOR &amp; EVENTS · {slide.label}</p>
        {filmFailed ? <div className="film-error" role="status"><p>The film could not load.</p><a href={slide.video || slide.image} target="_blank" rel="noopener noreferrer" className="text-link">Open the original film <ArrowUpRight size={16} aria-hidden="true" /></a></div> : <video ref={filmRef} key={slide.video} src={slide.video || undefined} poster={slide.image} controls autoPlay playsInline preload="metadata" aria-label={`${slide.label}: a silent décor film`} onError={() => setFilmFailed(true)}>
          Your browser does not support this film. <a href={slide.video || slide.image}>Open the media</a>.
        </video>}
        <p>{slide.caption}</p>
      </div>
    </Dialog>
  </>;
}
