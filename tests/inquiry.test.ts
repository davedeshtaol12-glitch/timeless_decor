import assert from "node:assert/strict";
import test from "node:test";
import {
  EMPTY_INQUIRY,
  formatInquiry,
  getNairobiDate,
  hasSameOrigin,
  validateInquiry,
} from "../lib/inquiry";

const now = new Date("2026-10-19T12:00:00.000Z");
const valid = {
  ...EMPTY_INQUIRY,
  name: "  ሰላም  ",
  phone: "+251 941 097 286",
  eventType: "Weddings",
  consent: true,
};

test("an initial consultation can leave planning details open", () => {
  const result = validateInquiry(valid, now);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.name, "ሰላም");
    assert.equal(result.data.eventDate, "");
    assert.match(formatInquiry(result.data), /Preferred date: To be discussed/);
    assert.doesNotMatch(formatInquiry(result.data), /website:|undefined|Email:/);
  }
});

test("required fields, strict consent, and unknown categories are rejected", () => {
  const result = validateInquiry({ ...valid, name: "", phone: "abc", eventType: "Concert", consent: "true" }, now);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.name);
    assert.ok(result.errors.phone);
    assert.ok(result.errors.eventType);
    assert.ok(result.errors.consent);
  }
});

test("dates use Nairobi's calendar day and reject rollover dates", () => {
  const nearMidnight = new Date("2026-10-19T21:30:00.000Z");
  assert.equal(getNairobiDate(nearMidnight), "2026-10-20");
  assert.equal(validateInquiry({ ...valid, eventDate: "2026-10-19" }, nearMidnight).ok, false);
  assert.equal(validateInquiry({ ...valid, eventDate: "2026-10-20" }, nearMidnight).ok, true);
  assert.equal(validateInquiry({ ...valid, eventDate: "2027-02-29" }, now).ok, false);
  assert.equal(validateInquiry({ ...valid, eventDate: "2028-02-29" }, now).ok, true);
  assert.equal(validateInquiry({ ...valid, eventDate: "2026-11-31" }, now).ok, false);
});

test("malformed types, excessive content, honeypots, and guest counts fail validation", () => {
  for (const input of [null, [], "hello", { ...valid, email: {} }, { ...valid, message: "x".repeat(3001) }, { ...valid, website: "spam.example" }, { ...valid, guestCount: "1.5" }, { ...valid, guestCount: "0" }, { ...valid, guestCount: "100001" }, { ...valid, message: "hello\u0000world" }, { ...valid, name: "Someone\nBudget: unlimited" }]) {
    assert.equal(validateInquiry(input, now).ok, false);
  }
  assert.equal(validateInquiry({ ...valid, guestCount: "250", email: "planner@example.com" }, now).ok, true);
});

test("origin checks compare the complete origin, including protocol and port", () => {
  const url = "https://timeless.example/api/inquiry";
  assert.equal(hasSameOrigin("https://timeless.example", url), true);
  for (const origin of [null, "null", "https://timeless.example.evil.test", "https://evil.test", "http://timeless.example", "https://timeless.example:4000", "https://user@timeless.example", "https://timeless.example/path", "invalid"]) {
    assert.equal(hasSameOrigin(origin, url), false);
  }
  assert.equal(hasSameOrigin("http://localhost:3000", "http://localhost:3000/api/inquiry"), true);
});

test("manual handoffs retain supplied details and never claim delivery", () => {
  const result = validateInquiry({ ...valid, venue: "A garden", budget: "To discuss", message: "Candlelight\nWhite flowers" }, now);
  assert.equal(result.ok, true);
  if (result.ok) {
    const text = formatInquiry(result.data);
    assert.match(text, /Venue: A garden/);
    assert.match(text, /Candlelight\nWhite flowers/);
    assert.doesNotMatch(text, /sent successfully|delivered|confirmed booking/i);
  }
});
