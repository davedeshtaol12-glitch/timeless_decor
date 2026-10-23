/**
 * Replace these local URLs and descriptions as the approved collection grows.
 * A collection is a visual study, not a claim that all its media shows one event.
 * Client names, venues, dates, guest counts and results are deliberately omitted
 * because they have not been supplied or verified.
 */
export const categories = [
  "All",
  "Weddings",
  "Birthdays",
  "Corporate Events",
  "Stage Decor",
] as const;

export type PortfolioFilter = (typeof categories)[number];
export type EventCategory = Exclude<PortfolioFilter, "All">;

export interface PortfolioMedia {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: EventCategory;
  subtitle: string;
  cover: string;
  coverAlt: string;
  coverPosition?: string;
  description: string;
  palette: { name: string; color: string }[];
  details: string[];
  media: PortfolioMedia[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "ivory-and-gold",
    title: "Ivory & gold",
    category: "Weddings",
    subtitle: "Soft florals. A luminous setting.",
    cover: "/media/wedding.webp",
    coverAlt:
      "An ivory wedding stage with gold furniture, white floral arrangements and a flower-filled glass walkway.",
    description:
      "An exploration of white-on-white texture, graceful floral forms and the quiet warmth of gold. Draped ceilings and carefully framed focal points turn a room into a setting for a meaningful moment.",
    palette: [
      { name: "Ivory", color: "#eee9db" },
      { name: "Warm gold", color: "#b9a16a" },
      { name: "Leaf green", color: "#536443" },
    ],
    details: [
      "White floral arrangements layered against soft ivory draping.",
      "Gold accents and repeating architectural frames.",
      "A related film study of floral arches and illuminated details.",
    ],
    media: [
      {
        type: "image",
        src: "/media/wedding.webp",
        alt: "White and gold wedding decor with an elevated stage and floral glass walkway.",
      },
      {
        type: "video",
        src: "/media/film-wedding.mp4",
        poster: "/media/film-wedding.webp",
        alt: "A film study of ivory floral arches, luminous frames and draped event decor.",
      },
    ],
  },
  {
    id: "rooted-in-ritual",
    title: "Rooted in ritual",
    category: "Stage Decor",
    subtitle: "Heritage, with a contemporary rhythm.",
    cover: "/media/stage.webp",
    coverAlt:
      "Sculptural ivory arches with flowers, warm lights and colourful woven basket details.",
    description:
      "Sculptural arches create a calm architectural backdrop, while woven details bring colour, texture and cultural character. A visual study of how a contemporary setting can hold a deeply familiar feeling.",
    palette: [
      { name: "Chalk", color: "#e9e0ce" },
      { name: "Woven straw", color: "#bda270" },
      { name: "Terracotta", color: "#a34f3d" },
    ],
    details: [
      "Layered ivory arches with warm accent lighting.",
      "Woven basket details placed among soft floral arrangements.",
      "A complementary study of woven textures and a coffee ceremony setting.",
    ],
    media: [
      {
        type: "image",
        src: "/media/stage.webp",
        alt: "Layered cream arches decorated with warm lights, flowers and colourful woven baskets.",
      },
      {
        type: "image",
        src: "/media/detail.webp",
        alt: "Woven baskets and pale flowers behind a coffee ceremony setting with white cups.",
      },
    ],
  },
  {
    id: "a-softer-celebration",
    title: "A softer celebration",
    category: "Birthdays",
    subtitle: "A little wonder, beautifully imagined.",
    cover: "/media/soiree.webp",
    coverAlt:
      "Blush and cream balloons, white arches and floral accents in an intimate celebration setting.",
    description:
      "Blush, cream and a sense of play. Rounded forms, gentle colour and delicate floral accents bring a considered touch to personal celebrations, with space for the smallest details to feel special.",
    palette: [
      { name: "Blush", color: "#e6b7a9" },
      { name: "Vanilla", color: "#eee0c6" },
      { name: "Pearl", color: "#f6f1e8" },
    ],
    details: [
      "An organic balloon arrangement in warm pastel shades.",
      "White arches and plinths create a soft, sculptural backdrop.",
      "A related birthday film explores pink draping and oversized bow details.",
    ],
    media: [
      {
        type: "image",
        src: "/media/soiree.webp",
        alt: "A pastel balloon arch over an ivory backdrop with white display plinths and floral accents.",
      },
      {
        type: "video",
        src: "/media/film-soiree.mp4",
        poster: "/media/film-soiree.webp",
        alt: "A birthday decor film with pink balloons, a large bow and soft draped details.",
      },
    ],
  },
  {
    id: "joy-in-full-colour",
    title: "Joy, in full colour",
    category: "Birthdays",
    subtitle: "For the wonderfully expressive moments.",
    cover: "/media/celebration.webp",
    coverAlt:
      "A colourful celebration display with a playful balloon arrangement and decorative backdrop.",
    description:
      "A brighter expression of celebration, built around playful colour and generous balloon forms. This study makes room for personality, turning a decorative focal point into part of the occasion’s character.",
    palette: [
      { name: "Rose", color: "#db8ba0" },
      { name: "Butter", color: "#e9d179" },
      { name: "Soft blue", color: "#9dbfd5" },
    ],
    details: [
      "A playful mix of balloon colours and scales.",
      "A decorative backdrop that gives the celebration a focal point.",
      "An expressive direction for a personal occasion.",
    ],
    media: [
      {
        type: "image",
        src: "/media/celebration.webp",
        alt: "A colourful balloon installation framing a decorative celebration backdrop.",
      },
    ],
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  portrait?: string;
}

export interface PressMention {
  name: string;
  url: string;
}

// Publish only approved, attributable client quotations. Empty by design:
// the component shows an explicitly attributed studio philosophy instead.
export const testimonials: Testimonial[] = [];

// Add genuine published coverage here. No invented press logos or endorsements.
export const pressMentions: PressMention[] = [];
