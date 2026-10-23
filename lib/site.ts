export const siteConfig = {
  name: "Timeless Décor & Events",
  phone: "0941097286",
  phoneHref: "tel:+251941097286",
  tagline: "Creating Timeless Memories for Every Celebration",
  motto: "Creating Timeless Memories Through Elegant Celebrations.",
};

/** Every number the studio answers on, in the order it should be shown. */
export const phoneNumbers = [
  { display: "0941 097 286", href: "tel:+251941097286", note: "Main line" },
  { display: "0945 992 009", href: "tel:+251945992009", note: "Studio" },
  { display: "0946 627 077", href: "tel:+251946627077", note: "Studio" },
];

export const socialLinks = [
  { label: "Telegram", handle: "@Timeless.de", url: "https://t.me/Timeless.de" },
  // Replace with the studio's own TikTok profile URL once it is available.
  { label: "TikTok", handle: "Timeless Décor & Events", url: "https://tiktok.com/" },
];

/** What the studio does, in Amharic, as supplied by the studio. */
export const amharicServices = [
  "ማንኛውም ዲኮር አይነት",
  "የዲኮር ስራ",
  "የድርጅት አመታዊ ፕሮግራም",
  "የኬተሪንግ",
  "የካሜራና ቪዲዮ",
  "ኢቨንት ማዘጋጀት",
];

export function getSiteUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url : undefined;
  } catch { return undefined; }
}
