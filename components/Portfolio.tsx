"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Play, Plus } from "lucide-react";
import { categories, portfolioItems, type PortfolioFilter, type PortfolioItem } from "@/data/portfolio";
import { richTags } from "@/lib/rich";
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
  const t = useTranslations("portfolio");
  const [category, setCategory] = useState<PortfolioFilter>("all");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const mediaVideoRef = useRef<HTMLVideoElement>(null);
  const pendingContactNavigation = useRef(false);
  const reducedMotion = useReducedMotion();
  const filteredItems = portfolioItems.filter((item) => category === "all" || item.category === category);
  const selectedItem = portfolioItems.find((item) => item.id === selection?.itemId);
  const selectedMedia = selectedItem?.media[selection?.mediaIndex ?? 0];

  /** Everything a person reads about a collection comes from messages/*.json. */
  const copy = (item: PortfolioItem) => ({
    title: t(`items.${item.id}.title`),
    subtitle: t(`items.${item.id}.subtitle`),
    coverAlt: t(`items.${item.id}.coverAlt`),
    description: t(`items.${item.id}.description`),
    palette: t.raw(`items.${item.id}.palette`) as string[],
    details: t.raw(`items.${item.id}.details`) as string[],
    media: t.raw(`items.${item.id}.media`) as string[],
    category: t(`categories.${item.category}`),
  });
  const selectedCopy = selectedItem ? copy(selectedItem) : null;

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
            <p className={styles.eyebrow}><span /> {t("eyebrow")}</p>
            <SplitText as="h2" id="portfolio-heading" className={styles.heading}>{t.rich("title", richTags)}</SplitText>
          </div>
          <div className={styles.introAside}>
            <p>{t("aside")}</p>
            <a href="#collection-grid" className={styles.discover}>{t("discover")} <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </Reveal>

        <div className={styles.filters} role="group" aria-label={t("filtersLabel")}>
          {categories.map((entry) => {
            const count = portfolioItems.filter((item) => entry === "all" || item.category === entry).length;
            return (
              <button type="button" key={entry} onClick={() => setCategory(entry)} aria-pressed={category === entry} className={category === entry ? styles.activeFilter : undefined}>
                {t(`categories.${entry}`)}<span aria-label={t("filterCount", { count })}>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <p className={styles.srOnly} role="status">{category === "all" ? t("shown", { count: filteredItems.length }) : t("shownIn", { count: filteredItems.length, category: t(`categories.${category}`) })}</p>
        <div id="collection-grid" className={styles.stage} onMouseLeave={() => setActiveId(null)}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const text = copy(item);
              const itemNumber = String(portfolioItems.indexOf(item) + 1).padStart(2, "0");
              const videoIndex = item.media.findIndex((media) => media.type === "video");
              const active = (activeId ?? filteredItems[0]?.id) === item.id;
              const open = () => setSelection({ itemId: item.id, mode: "collection", mediaIndex: 0 });
              return (
                <motion.article key={item.id} layout={!reducedMotion} initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className={`${styles.panel} ${active ? styles.panelActive : ""}`} onMouseEnter={() => setActiveId(item.id)} onFocusCapture={() => setActiveId(item.id)}>
                  <button type="button" className={styles.panelImage} onClick={() => (active ? showMedia(item.id) : setActiveId(item.id))} aria-label={t("openGallery", { title: text.title })}>
                    <Image src={item.cover} alt={text.coverAlt} fill sizes="(max-width: 760px) 100vw, 70vw" style={{ objectPosition: item.coverPosition ?? "center" }} className={styles.cover} />
                  </button>
                  <span className={styles.panelShade} aria-hidden="true" />
                  <span className={styles.panelNumber} aria-hidden="true">{itemNumber}</span>
                  <span className={styles.panelRail} aria-hidden="true">{text.title}</span>
                  <div className={styles.panelInfo}>
                    <p className={styles.panelCategory}>{text.category} · {t("studies", { count: item.media.length })}</p>
                    <h3><button type="button" onClick={open} tabIndex={active ? 0 : -1}>{text.title}</button></h3>
                    <p className={styles.panelSubtitle}>{text.subtitle}</p>
                    <div className={styles.panelActions}>
                      <button type="button" onClick={() => showMedia(item.id)} tabIndex={active ? 0 : -1}>{t("viewGallery")} <Plus size={15} strokeWidth={1.4} aria-hidden="true" /></button>
                      {videoIndex !== -1 && <button type="button" onClick={() => showMedia(item.id, videoIndex)} tabIndex={active ? 0 : -1} aria-label={t("watchFilmAria", { title: text.title })}><Play size={11} fill="currentColor" aria-hidden="true" /> {t("watchFilm")}</button>}
                      <button type="button" className={styles.panelOpen} onClick={open} tabIndex={active ? 0 : -1} aria-label={t("exploreCollection", { title: text.title })}><ArrowUpRight size={20} strokeWidth={1.3} aria-hidden="true" /></button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.emptyState}>
            <span className={styles.emptyNumber}>{t("empty.eyebrow")}</span>
            <h3>{t.rich("empty.title", richTags)}</h3>
            <p>{t("empty.text")}</p>
            <a href="#contact" className={styles.textLink}>{t("empty.cta")} <ArrowUpRight size={18} aria-hidden="true" /></a>
          </motion.div>
        )}

        <Reveal className={styles.outro}>
          <span>{t("outro")}</span>
          <a href="#contact">{t("outroCta")} <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" /></a>
        </Reveal>
      </div>

      <Dialog open={selection !== null} onClose={close} title={selectedCopy?.title ?? t("studioCollection")} className={selection?.mode === "media" ? styles.mediaDialog : styles.collectionDialog}>
        {selectedItem && selectedCopy && selection?.mode === "collection" && (
          <div className={styles.collectionDetail} ref={modalContentRef} tabIndex={-1} role="document" aria-label={t("detailsAria", { title: selectedCopy.title })}>
            <div className={styles.detailImage}><Image src={selectedItem.cover} alt={selectedCopy.coverAlt} fill sizes="(max-width: 800px) 90vw, 44vw" /></div>
            <div className={styles.detailBody}>
              <p className={styles.eyebrow}>{t("fromStudio")}</p>
              <span className={styles.detailCategory}>{t("categoryStudy", { category: selectedCopy.category })}</span>
              <h3>{selectedCopy.title}</h3>
              <p className={styles.description}>{selectedCopy.description}</p>
              <div className={styles.palette} aria-label={t("paletteAria")}>{selectedItem.paletteColours.map((colour, index) => <span key={colour}><i style={{ backgroundColor: colour }} aria-hidden="true" />{selectedCopy.palette[index]}</span>)}</div>
              <h4>{t("details")}</h4>
              <ul>{selectedCopy.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <button type="button" className={styles.textLink} onClick={() => showMedia(selectedItem.id)}>{t("exploreGallery")} <ArrowRight size={17} aria-hidden="true" /></button>
              <a href="#contact" onClick={goToContact} className={styles.detailContact}>{t("createPersonal")} <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
        )}
        {selectedItem && selectedCopy && selectedMedia && selection?.mode === "media" && (() => {
          const mediaAlt = selectedCopy.media[selection.mediaIndex] ?? selectedCopy.title;
          return (
            <div className={styles.lightbox} ref={modalContentRef} tabIndex={-1} role="document" aria-label={t("galleryAria", { title: selectedCopy.title })}>
              <div className={styles.lightboxTop}><span>{selectedCopy.category}</span><span>{t("visualStudy")}</span></div>
              <div className={styles.mediaFrame}>
                {selectedMedia.type === "image" ? (
                  <Image key={selectedMedia.src} src={selectedMedia.src} alt={mediaAlt} fill sizes="(max-width: 700px) 90vw, 80vw" className={styles.lightboxImage} />
                ) : failedSource === selectedMedia.src ? (
                  <div className={styles.videoFallback}><Play size={32} aria-hidden="true" /><p>{t("videoFailed")}</p><a href={selectedMedia.src} target="_blank" rel="noopener noreferrer">{t("openOriginal")} <ArrowUpRight size={16} aria-hidden="true" /></a><button type="button" onClick={() => setFailedSource(null)}>{t("tryAgain")}</button></div>
                ) : (
                  <video key={selectedMedia.src} ref={mediaVideoRef} src={selectedMedia.src} controls playsInline autoPlay preload="metadata" poster={selectedMedia.poster} aria-label={mediaAlt} onError={() => setFailedSource(selectedMedia.src)}>{t("noVideo")} <a href={selectedMedia.src}>{t("openFilm")}</a></video>
                )}
              </div>
              <div className={styles.lightboxBottom}>
                <div><h3>{selectedCopy.title}</h3><p className={styles.mediaCaption} aria-live="polite">{mediaAlt}</p></div>
                {selectedItem.media.length > 1 && <div className={styles.mediaControls}><button type="button" onClick={() => navigateMedia(-1)} aria-label={t("previous")}><ArrowLeft size={20} aria-hidden="true" /></button><span aria-live="polite">{String(selection.mediaIndex + 1).padStart(2, "0")} / {String(selectedItem.media.length).padStart(2, "0")}</span><button type="button" onClick={() => navigateMedia(1)} aria-label={t("next")}><ArrowRight size={20} aria-hidden="true" /></button></div>}
              </div>
              <button type="button" className={styles.backToCollection} onClick={() => setSelection({ ...selection, mode: "collection" })}>{t("aboutCollection")} <ArrowUpRight size={14} aria-hidden="true" /></button>
            </div>
          );
        })()}
      </Dialog>
    </section>
  );
}
