"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";

export default function Dialog({ open, onClose, title, children, className = "" }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string;
}) {
  const t = useTranslations("common");
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const reduced = useReducedMotion();
  const curtain = className.includes("menu-dialog");
  useEffect(() => {
    const node = ref.current;
    if (!node || !open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <dialog ref={ref} aria-labelledby={id} className={`dialog-shell ${className}`}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      {open && <motion.div className="dialog-content" initial={{ opacity: curtain ? 1 : 0, y: reduced ? 0 : curtain ? "100%" : 24 }}
        animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : curtain ? 0.75 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <h2 id={id} className="sr-only">{title}</h2>
        <button type="button" className="dialog-close icon-button" onClick={onClose} aria-label={t("closeDialog")}>
          <X size={22} aria-hidden="true" />
        </button>
        {children}
      </motion.div>}
    </dialog>
  );
}
