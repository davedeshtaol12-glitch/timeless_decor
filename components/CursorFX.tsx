"use client";

import { useEffect, useRef } from "react";

const BALLOON_COLOURS = ["#e5b04f", "#f2d9a0", "#e58fa5", "#f4c9c0", "#9dbfd5", "#b7d3a8", "#c99a4b", "#f4eadb"];
const CONFETTI_COLOURS = ["#e5b04f", "#f2d9a0", "#fff4dc", "#e58fa5", "#9dbfd5", "#c99a4b"];

function balloonSvg(colour: string) {
  return `<svg width="34" height="62" viewBox="0 0 34 62" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="g" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".35" stop-color="${colour}"/><stop offset="1" stop-color="${colour}" stop-opacity=".78"/></radialGradient></defs><path d="M17 1C8 1 2 8.3 2 17.5 2 28 10 36.5 17 38.5 24 36.5 32 28 32 17.5 32 8.3 26 1 17 1Z" fill="url(#g)"/><path d="M17 38.5l-3.2 4.2h6.4z" fill="${colour}"/><path d="M17 43c-3 5 3 8 0 13s-2 4-1 6" fill="none" stroke="#c9b48a" stroke-width=".9" stroke-linecap="round"/></svg>`;
}

/**
 * A gilded sparkle that follows the pointer, and a burst of balloons,
 * confetti and petals wherever the page is clicked.
 */
export default function CursorFX() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const root = document.documentElement;
    if (fine) root.classList.add("fx-cursor");

    let x = -100, y = -100, rx = -100, ry = -100, frame = 0, lastTrail = 0;
    const dotNode = dot.current, ringNode = ring.current, layerNode = layer.current;
    if (!layerNode) return;

    // Native dialogs live in the top layer, so keep the effects promoted above them.
    const nodes = [layerNode, ringNode, dotNode].filter((node): node is HTMLDivElement => Boolean(node));
    const promote = () => nodes.forEach((node) => {
      try { if (node.matches(":popover-open")) node.hidePopover(); node.showPopover(); } catch { /* popover unsupported */ }
    });
    promote();
    const observer = new MutationObserver((records) => {
      if (records.some((record) => record.target instanceof HTMLDialogElement)) promote();
    });
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });

    const tick = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (dotNode) dotNode.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (ringNode) ringNode.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };
    if (fine) frame = requestAnimationFrame(tick);

    const interactive = (target: EventTarget | null) => target instanceof Element && target.closest("a, button, summary, [role='button'], input, select, textarea, label");

    const spawn = (html: string, left: number, top: number, keyframes: Keyframe[], duration: number, className: string) => {
      const node = document.createElement("span");
      node.className = className;
      node.innerHTML = html;
      node.style.left = `${left}px`; node.style.top = `${top}px`;
      layerNode.appendChild(node);
      const animation = node.animate(keyframes, { duration, easing: "cubic-bezier(.2,.7,.25,1)", fill: "forwards" });
      animation.onfinish = () => node.remove();
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      x = event.clientX; y = event.clientY;
      if (ringNode) ringNode.classList.toggle("is-link", Boolean(interactive(event.target)));
      if (dotNode) dotNode.style.opacity = "1";
      if (ringNode) ringNode.style.opacity = "1";
      if (reduced) return;
      const now = performance.now();
      if (now - lastTrail > 60) {
        lastTrail = now;
        spawn("✦", x + (Math.random() - 0.5) * 8, y + (Math.random() - 0.5) * 8,
          [{ opacity: 0.9, transform: "translate(-50%,-50%) scale(1) rotate(0deg)" }, { opacity: 0, transform: `translate(-50%, ${10 + Math.random() * 18}px) scale(.2) rotate(${Math.random() * 120 - 60}deg)` }], 750, "fx-trail");
      }
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      ringNode?.classList.add("is-down");
      if (reduced) return;
      const cx = event.clientX, cy = event.clientY;
      const scale = window.innerWidth < 760 ? 0.8 : 1;

      // Balloons float up and drift sideways.
      const balloons = 5 + Math.floor(Math.random() * 3);
      for (let i = 0; i < balloons; i += 1) {
        const colour = BALLOON_COLOURS[Math.floor(Math.random() * BALLOON_COLOURS.length)];
        const drift = (Math.random() - 0.5) * 220 * scale;
        const rise = 260 + Math.random() * 320;
        const size = (0.7 + Math.random() * 0.7) * scale;
        const sway = (Math.random() - 0.5) * 60;
        spawn(balloonSvg(colour), cx, cy, [
          { opacity: 0, transform: `translate(-50%,-50%) scale(${size * 0.2}) rotate(0deg)` },
          { opacity: 1, offset: 0.12, transform: `translate(calc(-50% + ${drift * 0.15}px), calc(-50% - 30px)) scale(${size}) rotate(${sway / 6}deg)` },
          { opacity: 1, offset: 0.7, transform: `translate(calc(-50% + ${drift * 0.7 + sway}px), calc(-50% - ${rise * 0.7}px)) scale(${size}) rotate(${-sway / 5}deg)` },
          { opacity: 0, transform: `translate(calc(-50% + ${drift}px), calc(-50% - ${rise}px)) scale(${size}) rotate(${sway / 4}deg)` },
        ], 2200 + Math.random() * 1400, "fx-balloon");
      }

      // Confetti, sparkles and petals burst outward and fall.
      const bits = 22;
      for (let i = 0; i < bits; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const distance = (50 + Math.random() * 150) * scale;
        const dx = Math.cos(angle) * distance, dy = Math.sin(angle) * distance - 30;
        const colour = CONFETTI_COLOURS[Math.floor(Math.random() * CONFETTI_COLOURS.length)];
        const kind = i % 4;
        const html = kind === 0 ? "✦" : kind === 1 ? `<i style="background:${colour}"></i>` : kind === 2 ? `<i class="petal" style="background:${colour}"></i>` : "✧";
        spawn(html, cx, cy, [
          { opacity: 1, transform: "translate(-50%,-50%) scale(.4) rotate(0deg)" },
          { opacity: 1, offset: 0.35, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1) rotate(${Math.random() * 360}deg)` },
          { opacity: 0, transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy + 140 + Math.random() * 90}px)) scale(.7) rotate(${Math.random() * 720}deg)` },
        ], 1100 + Math.random() * 800, `fx-bit fx-bit-${kind}`);
        const last = layerNode.lastElementChild as HTMLElement | null;
        if (last) last.style.color = colour;
      }

      // A soft ring pulse.
      spawn("", cx, cy, [{ opacity: 0.7, transform: "translate(-50%,-50%) scale(.2)" }, { opacity: 0, transform: "translate(-50%,-50%) scale(2.6)" }], 700, "fx-pulse");
    };
    const onUp = () => ringNode?.classList.remove("is-down");
    const onLeave = () => { if (dotNode) dotNode.style.opacity = "0"; if (ringNode) ringNode.style.opacity = "0"; };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      root.classList.remove("fx-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <>
    <div ref={ring} popover="manual" className="fx-ring" aria-hidden="true" />
    <div ref={dot} popover="manual" className="fx-dot" aria-hidden="true">✦</div>
    <div ref={layer} popover="manual" className="fx-layer" aria-hidden="true" />
  </>;
}
