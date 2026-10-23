export const heroSlides = [
  { id: "ivory", label: "Ivory & gold", caption: "A study in light, texture and quiet grandeur.",
    image: "/media/hero.webp", left: "/media/story.webp", right: "/media/wedding.webp",
    video: "/media/hero.mp4", alt: "White floral arches and candlelit details in an ivory event setting" },
  { id: "ritual", label: "Rooted in ritual", caption: "Thoughtful details. A beautiful sense of belonging.",
    image: "/media/detail.webp", left: "/media/stage.webp", right: "/media/wedding.webp",
    video: "", alt: "Traditional woven baskets with white and blush floral accents" },
  { id: "blush", label: "In full bloom", caption: "A little wonder. A world of possibility.",
    image: "/media/film-soiree.webp", left: "/media/soiree.webp", right: "/media/celebration.webp",
    video: "/media/film-soiree.mp4", alt: "A pink balloon celebration with a sculptural bow and table setting" },
] as const;

/** Panels on the scroll-driven 3D ring in the hero. */
export const heroPanels = [
  { id: "ivory", label: "Ivory & gold", caption: "A study in light, texture and quiet grandeur.", image: "/media/hero.webp", video: "/media/hero.mp4", alt: "White floral arches and candlelit details in an ivory event setting" },
  { id: "wedding", label: "The wedding", caption: "Vows beneath a canopy of blooms.", image: "/media/film-wedding.webp", video: "/media/film-wedding.mp4", alt: "A wedding ceremony dressed in florals" },
  { id: "ritual", label: "Rooted in ritual", caption: "Thoughtful details. A beautiful sense of belonging.", image: "/media/detail.webp", video: "", alt: "Traditional woven baskets with white and blush floral accents" },
  { id: "blush", label: "In full bloom", caption: "A little wonder. A world of possibility.", image: "/media/film-soiree.webp", video: "/media/film-soiree.mp4", alt: "A pink balloon celebration with a sculptural bow and table setting" },
  { id: "stage", label: "The stage", caption: "Spaces designed to be felt.", image: "/media/stage.webp", video: "", alt: "A sculpted stage design" },
  { id: "soiree", label: "Private soirée", caption: "An evening, beautifully imagined.", image: "/media/soiree.webp", video: "", alt: "A candlelit private soirée table" },
  { id: "celebration", label: "Celebration", caption: "Joy, composed with care.", image: "/media/celebration.webp", video: "", alt: "A joyful celebration setting" },
  { id: "gala", label: "The gala", caption: "Grand rooms. Quiet details.", image: "/media/gala.webp", video: "", alt: "A gala dinner arranged with floral centrepieces" },
] as const;
