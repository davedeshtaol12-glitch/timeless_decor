"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Play, Plus } from "lucide-react";
import { categories, portfolioItems, type PortfolioFilter } from "@/data/portfolio";
import Dialog from "./Dialog";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import styles from "./Portfolio.module.css";

interface Selection {
  itemId: string;
  mode: "collection" | "media";
  mediaIndex: number;
}

export default function Portfolio() {
  const [category, setCategory] = useState<PortfolioFilter>("All");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const mediaVideoRef = useRef<HTMLVideoElement>(null);
  const pendingContactNavigation = useRef(false);
  const reducedMotion = useReducedMotion();
  const filteredItems = portfolioItems.filter((item) => category === "All" || item.category === category);
  const selectedItem = portfolioItems.find((item) => item.id === selection?.itemId);
  const selectedMedia = selectedItem?.media[selection?.mediaIndex ?? 0];

  const close = useCallback(() => {
    setSelection(null);
    setFailedSource(null);
  }, []);

  const navigateMedia = useCallback((direction: number) => {
    setSelection((current) => {
      if (!current) return current;
      const item = portfolioItems.find((entry) => entry.id === current.itemId);
      if (!item?.media.length) return current;
      return { ...current, mediaIndex: (current.mediaIndex + direction + item.media.length) % item.media.length };
    });
    setFailedSource(null);
  }, []);

  useEffect(() => {
    if (selection?.mode !== "media" || !selectedItem || selectedItem.media.length < 2) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, select, video, audio, [contenteditable='true'], [role='slider']")) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        navigateMedia(event.key === "ArrowRight" ? 1 : -1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selection?.mode, selectedItem, navigateMedia]);

  // Switching views keeps the same native dialog open. Move focus to the new
  // content so it does not remain on a button that React just removed.
  useEffect(() => {
    if (selection) modalContentRef.current?.focus({ preventScroll: true });
  }, [selection?.mode, selection?.itemId]);

  // Stop the captured element even after React clears its ref on unmount.
  useEffect(() => {
    const video = mediaVideoRef.current;
    return () => { video?.pause(); };
  }, [selection?.mode, selectedMedia?.src, failedSource]);

  // Let Dialog restore its opener first, then move keyboard focus to the
  // destination of an explicit in-page navigation request.
  useEffect(() => {
    if (selection || !pendingContactNavigation.current) return;
    pendingContactNavigation.current = false;
    const target = document.getElementById("contact");
    if (!target) return;
    const focusTarget = target.querySelector<HTMLElement>("h2") ?? target;
    const addedTabIndex = !focusTarget.hasAttribute("tabindex");
    if (addedTabIndex) {
      focusTarget.tabIndex = -1;
      focusTarget.addEventListener("blur", () => focusTarget.removeAttribute("tabindex"), { once: true });
    }
    window.history.pushState(window.history.state, "", "#contact");
    target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
    focusTarget.focus({ preventScroll: true });
  }, [selection, reducedMotion]);

  const showMedia = (itemId: string, mediaIndex = 0) => {
    setFailedSource(null);
    setSelection({ itemId, mode: "media", mediaIndex });
  };

  const goToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    pendingContactNavigation.current = true;
    close();
  };

  return (
    <section id="portfolio" className={styles.section} aria-labelledby="portfolio-heading">
      <div className={styles.container}>
        <Reveal className={styles.intro}>
          <div>
            <p className={styles.eyebrow}><span /> Our work</p>
            <SplitText as="h2" id="portfolio-heading" className={styles.heading}>A world of<br /><em>possibilities.</em></SplitText>
          </div>
          <div className={styles.introAside}>
            <p>A glimpse of the celebrations we have dressed, from elegant weddings to joyful birthdays and stage décor.</p>
            <a href="#collection-grid" className={styles.discover}>Discover the collection <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </Reveal>

        <div className={styles.filters} role="group" aria-label="Filter portfolio collections">
          {categories.map((entry) => {
            const count = portfolioItems.filter((item) => entry === "All" || item.category === entry).length;
            return (
              <button type="button" key={entry} onClick={() => setCategory(entry)} aria-pressed={category === entry} className={category === entry ? styles.activeFilter : undefined}>
                {entry}<span aria-label={`${count} collections`}>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <p className={styles.srOnly} role="status">{filteredItems.length} {filteredItems.length === 1 ? "collection" : "collections"} shown{category === "All" ? "" : ` in ${category}`}.</p>
        <div id="collection-grid" className={styles.stage} onMouseLeave={() => setActiveId(null)}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const itemNumber = String(portfolioItems.indexOf(item) + 1).padStart(2, "0");
              const videoIndex = item.media.findIndex((media) => media.type === "video");
              const active = (activeId ?? filteredItems[0]?.id) === item.id;
              const open = () => setSelection({ itemId: item.id, mode: "collection", mediaIndex: 0 });
              return (
                <motion.article key={item.id} layout={!reducedMotion} initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className={`${styles.panel} ${active ? styles.panelActive : ""}`} onMouseEnter={() => setActiveId(item.id)} onFocusCapture={() => setActiveId(item.id)}>
                  <button type="button" className={styles.panelImage} onClick={() => (active ? showMedia(item.id) : setActiveId(item.id))} aria-label={`Open ${item.title} gallery`}>
                    <Image src={item.cover} alt={item.coverAlt} fill sizes="(max-width: 760px) 100vw, 70vw" style={{ objectPosition: item.coverPosition ?? "center" }} className={styles.cover} />
                  </button>
                  <span className={styles.panelShade} aria-hidden="true" />
                  <span className={styles.panelNumber} aria-hidden="true">{itemNumber}</span>
                  <span className={styles.panelRail} aria-hidden="true">{item.title}</span>
                  <div className={styles.panelInfo}>
                    <p className={styles.panelCategory}>{item.category} · {item.media.length} {item.media.length === 1 ? "study" : "studies"}</p>
                    <h3><button type="button" onClick={open} tabIndex={active ? 0 : -1}>{item.title}</button></h3>
                    <p className={styles.panelSubtitle}>{item.subtitle}</p>
                    <div className={styles.panelActions}>
                      <button type="button" onClick={() => showMedia(item.id)} tabIndex={active ? 0 : -1}>View gallery <Plus size={15} strokeWidth={1.4} aria-hidden="true" /></button>
                      {videoIndex !== -1 && <button type="button" onClick={() => showMedia(item.id, videoIndex)} tabIndex={active ? 0 : -1} aria-label={`Watch ${item.title} film`}><Play size={11} fill="currentColor" aria-hidden="true" /> Watch film</button>}
                      <button type="button" className={styles.panelOpen} onClick={open} tabIndex={active ? 0 : -1} aria-label={`Explore ${item.title} collection`}><ArrowUpRight size={20} strokeWidth={1.3} aria-hidden="true" /></button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.emptyState}>
            <span className={styles.emptyNumber}>Your next occasion</span>
            <h3>A different stage.<br /><em>The same attention to detail.</em></h3>
            <p>Planning a corporate event, anniversary or product launch? Let’s discuss the setting, the guest experience and the story your event should tell. Our corporate collection is still to come.</p>
            <a href="#contact" className={styles.textLink}>Discuss your event <ArrowUpRight size={18} aria-hidden="true" /></a>
          </motion.div>
        )}

        <Reveal className={styles.outro}>
          <span>Every celebration tells a unique story.</span>
          <a href="#contact">Let’s create yours <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" /></a>
        </Reveal>
      </div>

      <Dialog open={selection !== null} onClose={close} title={selectedItem?.title ?? "Studio collection"} className={selection?.mode === "media" ? styles.mediaDialog : styles.collectionDialog}>
        {selectedItem && selection?.mode === "collection" && (
          <div className={styles.collectionDetail} ref={modalContentRef} tabIndex={-1} role="document" aria-label={`${selectedItem.title} collection details`}>
            <div className={styles.detailImage}><Image src={selectedItem.cover} alt={selectedItem.coverAlt} fill sizes="(max-width: 800px) 90vw, 44vw" /></div>
            <div className={styles.detailBody}>
              <p className={styles.eyebrow}>From the studio collection</p>
              <span className={styles.detailCategory}>{selectedItem.category} · Visual study</span>
              <h3>{selectedItem.title}</h3>
              <p className={styles.description}>{selectedItem.description}</p>
              <div className={styles.palette} aria-label="Collection colour palette">{selectedItem.palette.map((colour) => <span key={colour.name}><i style={{ backgroundColor: colour.color }} aria-hidden="true" />{colour.name}</span>)}</div>
              <h4>The details</h4>
              <ul>{selectedItem.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <button type="button" className={styles.textLink} onClick={() => showMedia(selectedItem.id)}>Explore the gallery <ArrowRight size={17} aria-hidden="true" /></button>
              <a href="#contact" onClick={goToContact} className={styles.detailContact}>Create something personal <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
        )}
        {selectedItem && selectedMedia && selection?.mode === "media" && (
          <div className={styles.lightbox} ref={modalContentRef} tabIndex={-1} role="document" aria-label={`${selectedItem.title} image and film gallery`}>
            <div className={styles.lightboxTop}><span>{selectedItem.category}</span><span>Visual study</span></div>
            <div className={styles.mediaFrame}>
              {selectedMedia.type === "image" ? (
                <Image key={selectedMedia.src} src={selectedMedia.src} alt={selectedMedia.alt} fill sizes="(max-width: 700px) 90vw, 80vw" className={styles.lightboxImage} />
              ) : failedSource === selectedMedia.src ? (
                <div className={styles.videoFallback}><Play size={32} aria-hidden="true" /><p>This film couldn’t load.</p><a href={selectedMedia.src} target="_blank" rel="noopener noreferrer">Open the original film <ArrowUpRight size={16} aria-hidden="true" /></a><button type="button" onClick={() => setFailedSource(null)}>Try again</button></div>
              ) : (
                <video key={selectedMedia.src} ref={mediaVideoRef} src={selectedMedia.src} controls playsInline autoPlay preload="metadata" poster={selectedMedia.poster} aria-label={selectedMedia.alt} onError={() => setFailedSource(selectedMedia.src)}>Your browser does not support video. <a href={selectedMedia.src}>Open the film.</a></video>
              )}
            </div>
            <div className={styles.lightboxBottom}>
              <div><h3>{selectedItem.title}</h3><p className={styles.mediaCaption} aria-live="polite">{selectedMedia.alt}</p></div>
              {selectedItem.media.length > 1 && <div className={styles.mediaControls}><button type="button" onClick={() => navigateMedia(-1)} aria-label="Previous image or film"><ArrowLeft size={20} aria-hidden="true" /></button><span aria-live="polite">{String(selection.mediaIndex + 1).padStart(2, "0")} / {String(selectedItem.media.length).padStart(2, "0")}</span><button type="button" onClick={() => navigateMedia(1)} aria-label="Next image or film"><ArrowRight size={20} aria-hidden="true" /></button></div>}
            </div>
            <button type="button" className={styles.backToCollection} onClick={() => setSelection({ ...selection, mode: "collection" })}>About this collection <ArrowUpRight size={14} aria-hidden="true" /></button>
          </div>
        )}
      </Dialog>
    </section>
  );
}
