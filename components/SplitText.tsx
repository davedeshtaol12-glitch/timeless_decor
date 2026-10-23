"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";
type Effect = "drop" | "rise";

/**
 * Splits text into words that fall (or rise) into place from behind a mask,
 * one after another, the first time the text scrolls into view.
 * <br /> and nested elements such as <em> are preserved.
 */
export default function SplitText({ children, as = "h2", className = "", id, delay = 0, stagger = 0.075, effect = "drop", once = true, animate }: {
  children: ReactNode; as?: Tag; className?: string; id?: string; delay?: number; stagger?: number; effect?: Effect; once?: boolean; animate?: boolean;
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  if (reduced) { const Plain = as; return <Plain id={id} className={className}>{children}</Plain>; }

  const from = effect === "drop" ? "-120%" : "120%";
  const container: Variants = { hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  const word: Variants = {
    hidden: { y: from, rotate: effect === "drop" ? -6 : 6, opacity: 0 },
    shown: { y: "0%", rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 17, mass: 0.9 } },
  };

  let key = 0;
  const split = (node: ReactNode): ReactNode => Children.map(node, (child) => {
    if (typeof child === "string") {
      return child.split(/(\s+)/).map((part) => {
        if (!part) return null;
        if (/^\s+$/.test(part)) return " ";
        return <span key={key++} className="split-mask"><motion.span className="split-word" variants={word}>{part}</motion.span></span>;
      });
    }
    if (isValidElement(child)) {
      const element = child as ReactElement<{ children?: ReactNode }>;
      if (element.type === "br") return child;
      if (element.props.children !== undefined) return cloneElement(element, { key: key++ }, split(element.props.children));
    }
    return child;
  });

  const visibility = animate === undefined
    ? { initial: "hidden", whileInView: "shown", viewport: { once, amount: 0.4 } }
    : { initial: "hidden", animate: animate ? "shown" : "hidden" };

  return <Component id={id} className={className} variants={container} {...visibility}>{split(children)}</Component>;
}
