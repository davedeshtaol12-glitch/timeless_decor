export const EVENT_TYPES = [
  "Weddings",
  "Birthdays",
  "Graduations",
  "Baby Showers",
  "Engagements",
  "Corporate Events",
  "Other",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export interface Inquiry {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  eventType: EventType;
  guestCount: string;
  budget: string;
  venue: string;
  message: string;
  consent: boolean;
  website: string;
}

export type InquiryField = keyof Inquiry;
export type InquiryErrors = Partial<Record<InquiryField | "form", string>>;
export type InquiryValidation =
  | { ok: true; data: Inquiry }
  | { ok: false; errors: InquiryErrors };

export const EMPTY_INQUIRY = {
  name: "",
  phone: "",
  email: "",
  eventDate: "",
  eventType: "",
  guestCount: "",
  budget: "",
  venue: "",
  message: "",
  consent: false,
  website: "",
};

/** Keep booking dates consistent for the studio, including near UTC midnight. */
export function getNairobiDate(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (name: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === name)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function hasSameOrigin(origin: string | null, requestUrl: string): boolean {
  if (!origin || origin === "null") return false;
  try {
    const incoming = new URL(origin);
    const expected = new URL(requestUrl);
    return (
      ["http:", "https:"].includes(incoming.protocol) &&
      !incoming.username &&
      !incoming.password &&
      incoming.pathname === "/" &&
      !incoming.search &&
      !incoming.hash &&
      incoming.origin === expected.origin
    );
  } catch {
    return false;
  }
}

function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function validateInquiry(input: unknown, now: Date = new Date()): InquiryValidation {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, errors: { form: "Please provide a valid inquiry." } };
  }

  const record = input as Record<string, unknown>;
  const errors: InquiryErrors = {};
  const read = (field: InquiryField, max: number): string => {
    const value = record[field];
    if (value === undefined || value === null) return "";
    if (typeof value !== "string") {
      errors[field] = "Please enter text in this field.";
      return "";
    }
    const normalized = value.trim();
    if (normalized.length > max) errors[field] = `Please use ${max} characters or fewer.`;
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(normalized)) {
      errors[field] = "Please remove unsupported control characters.";
    }
    if (field !== "message" && /[\r\n]/.test(normalized)) {
      errors[field] = "Please keep this field on a single line.";
    }
    return normalized;
  };

  const name = read("name", 100);
  const phone = read("phone", 40);
  const email = read("email", 254);
  const eventDate = read("eventDate", 10);
  const eventType = read("eventType", 40);
  const guestCount = read("guestCount", 6);
  const budget = read("budget", 160);
  const venue = read("venue", 200);
  const message = read("message", 3000);
  const website = read("website", 200);

  if (!errors.name && (name.length < 2 || !/\p{L}/u.test(name))) {
    errors.name = "Please enter your name.";
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (
    !errors.phone &&
    (!/^\+?[\d\s().-]+$/.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15)
  ) {
    errors.phone = "Please enter a valid phone number, including your country code if abroad.";
  }
  if (!errors.email && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address, or leave this field empty.";
  }
  if (!errors.eventDate && eventDate) {
    if (!isCalendarDate(eventDate)) {
      errors.eventDate = "Please choose a valid calendar date.";
    } else if (eventDate < getNairobiDate(now)) {
      errors.eventDate = "Please choose today or a future date, or leave the date open.";
    }
  }
  if (!EVENT_TYPES.includes(eventType as EventType)) {
    errors.eventType = "Please choose an event type.";
  }
  if (
    !errors.guestCount &&
    guestCount &&
    (!/^\d+$/.test(guestCount) || Number(guestCount) < 1 || Number(guestCount) > 100000)
  ) {
    errors.guestCount = "Please enter a whole number between 1 and 100,000.";
  }
  if (record.consent !== true) {
    errors.consent = "Please agree that the studio may contact you about this inquiry.";
  }
  if (website) errors.form = "We could not prepare this inquiry. Please call the studio for assistance.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      eventDate,
      eventType: eventType as EventType,
      guestCount,
      budget,
      venue,
      message,
      consent: true,
      website: "",
    },
  };
}

/** Plain text only: suitable for a clipboard, downloadable note, or SMS handoff. */
export function formatInquiry(inquiry: Inquiry): string {
  return [
    "TIMELESS DECOR AND EVENT",
    "EVENT INQUIRY",
    "",
    `Name: ${inquiry.name}`,
    `Phone: ${inquiry.phone}`,
    ...(inquiry.email ? [`Email: ${inquiry.email}`] : []),
    `Event type: ${inquiry.eventType}`,
    `Preferred date: ${inquiry.eventDate || "To be discussed"}`,
    `Guests: ${inquiry.guestCount || "To be discussed"}`,
    `Budget: ${inquiry.budget || "To be discussed"}`,
    `Venue: ${inquiry.venue || "To be discussed"}`,
    ...(inquiry.message ? ["", "My vision", inquiry.message] : []),
    "",
    "I agree to be contacted about this event inquiry.",
  ].join("\n");
}
