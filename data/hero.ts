/**
 * Structure only. Every visible word (labels, captions, alt text) lives in
 * messages/*.json under hero.slides.<id> and reel.panels.<id>.
 */
export const heroSlides = [
  { id: "ivory", image: "/media/hero.webp", left: "/media/story.webp", right: "/media/wedding.webp", video: "/media/hero.mp4" },
  { id: "ritual", image: "/media/detail.webp", left: "/media/stage.webp", right: "/media/wedding.webp", video: "" },
  { id: "blush", image: "/media/film-soiree.webp", left: "/media/soiree.webp", right: "/media/celebration.webp", video: "/media/film-soiree.mp4" },
] as const;

/** Panels on the scroll-driven 3D ring. */
export const heroPanels = [
  { id: "ivory", image: "/media/hero.webp", video: "/media/hero.mp4" },
  { id: "wedding", image: "/media/film-wedding.webp", video: "/media/film-wedding.mp4" },
  { id: "ritual", image: "/media/detail.webp", video: "" },
  { id: "blush", image: "/media/film-soiree.webp", video: "/media/film-soiree.mp4" },
  { id: "stage", image: "/media/stage.webp", video: "" },
  { id: "soiree", image: "/media/soiree.webp", video: "" },
  { id: "celebration", image: "/media/celebration.webp", video: "" },
  { id: "gala", image: "/media/gala.webp", video: "" },
] as const;
