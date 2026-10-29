/**
 * Structure only: ids, categories, images and colours. All visible text
 * (titles, descriptions, palette names, alt text) lives in messages/*.json
 * under portfolio.items.<id>. Add a new collection here and add its text there.
 * A collection is a visual study, not a claim that all its media shows one event.
 * Client names, venues, dates, guest counts and results are deliberately omitted
 * because they have not been supplied or verified.
 */
export const categories = ["all", "weddings", "birthdays", "corporate", "stage"] as const;

export type PortfolioFilter = (typeof categories)[number];
export type EventCategory = Exclude<PortfolioFilter, "all">;

export interface PortfolioMedia {
  type: "image" | "video";
  src: string;
  poster?: string;
}

export interface PortfolioItem {
  id: string;
  category: EventCategory;
  cover: string;
  coverPosition?: string;
  paletteColours: string[];
  media: PortfolioMedia[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "ivory-and-gold",
    category: "weddings",
    cover: "/media/wedding.webp",
    paletteColours: ["#eee9db", "#b9a16a", "#536443"],
    media: [
      { type: "image", src: "/media/wedding.webp" },
      { type: "video", src: "/media/film-wedding.mp4", poster: "/media/film-wedding.webp" },
    ],
  },
  {
    id: "rooted-in-ritual",
    category: "stage",
    cover: "/media/stage.webp",
    paletteColours: ["#e9e0ce", "#bda270", "#a34f3d"],
    media: [
      { type: "image", src: "/media/stage.webp" },
      { type: "image", src: "/media/detail.webp" },
    ],
  },
  {
    id: "a-softer-celebration",
    category: "birthdays",
    cover: "/media/soiree.webp",
    paletteColours: ["#e6b7a9", "#eee0c6", "#f6f1e8"],
    media: [
      { type: "image", src: "/media/soiree.webp" },
      { type: "video", src: "/media/film-soiree.mp4", poster: "/media/film-soiree.webp" },
    ],
  },
  {
    id: "joy-in-full-colour",
    category: "birthdays",
    cover: "/media/celebration.webp",
    paletteColours: ["#db8ba0", "#e9d179", "#9dbfd5"],
    media: [{ type: "image", src: "/media/celebration.webp" }],
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
// the component shows the studio motto instead.
export const testimonials: Testimonial[] = [];

// Add genuine published coverage here. No invented press logos or endorsements.
export const pressMentions: PressMention[] = [];
