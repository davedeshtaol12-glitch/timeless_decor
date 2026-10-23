import { NextResponse } from "next/server";
import { formatInquiry, hasSameOrigin, validateInquiry } from "@/lib/inquiry";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_384;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; resetsAt: number }>();

function rateLimit(key: string): number | null {
  const now = Date.now();
  for (const [address, bucket] of attempts) {
    if (bucket.resetsAt <= now) attempts.delete(address);
  }
  const current = attempts.get(key);
  if (current && current.count >= MAX_ATTEMPTS) {
    return Math.max(1, Math.ceil((current.resetsAt - now) / 1000));
  }
  if (current) current.count += 1;
  else {
    if (attempts.size >= 5000) attempts.delete(attempts.keys().next().value!);
    attempts.set(key, { count: 1, resetsAt: now + WINDOW_MS });
  }
  return null;
}

class BodyTooLargeError extends Error {}

async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Missing body");
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        throw new BodyTooLargeError();
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text);
  } catch (error) {
    // Stop consuming malformed or oversized streams, including invalid UTF-8 chunks.
    await reader.cancel().catch(() => undefined);
    throw error;
  } finally {
    reader.releaseLock();
  }
}

const fail = (message: string, status: number, headers?: HeadersInit) =>
  NextResponse.json({ ok: false, message }, { status, headers });

export async function POST(request: Request) {
  if (!hasSameOrigin(request.headers.get("origin"), request.url)) {
    return fail("Please submit your inquiry from this website.", 403);
  }
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") || "")) {
    return fail("Please send a JSON inquiry.", 415);
  }

  // Best-effort, process-local protection. For multiple workers/serverless instances,
  // deploy a shared or edge rate limiter and ensure the proxy overwrites client IP headers.
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim().slice(0, 100) || "unknown";
  const retryAfter = rateLimit(address);
  if (retryAfter !== null) {
    return fail("Please wait before trying again, or call the studio directly.", 429, {
      "Retry-After": String(retryAfter),
    });
  }

  let body: unknown;
  try {
    body = await readBody(request);
  } catch (error) {
    return fail(
      error instanceof BodyTooLargeError ? "This inquiry is too long." : "We could not read this inquiry.",
      error instanceof BodyTooLargeError ? 413 : 400,
    );
  }

  const validation = validateInquiry(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors: validation.errors },
      { status: 400 },
    );
  }

  const configuredUrl = process.env.INQUIRY_WEBHOOK_URL?.trim();
  if (!configuredUrl) {
    return fail("Online delivery is not configured. Please use the manual contact options.", 503);
  }

  let webhookUrl: URL;
  try {
    webhookUrl = new URL(configuredUrl);
    const localDevelopment =
      process.env.NODE_ENV !== "production" &&
      webhookUrl.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(webhookUrl.hostname);
    if (webhookUrl.protocol !== "https:" && !localDevelopment) throw new Error("Invalid transport");
    if (webhookUrl.username || webhookUrl.password) throw new Error("URL credentials are unsupported");
  } catch {
    return fail("Online delivery is unavailable. Please use the manual contact options.", 503);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.INQUIRY_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        source: "timeless-decor-website",
        submittedAt: new Date().toISOString(),
        inquiry: validation.data,
        text: formatInquiry(validation.data),
      }),
      signal: controller.signal,
      cache: "no-store",
    });
    // Do not expose upstream bodies or tokens, and do not follow token-bearing redirects.
    await response.body?.cancel();
    if (!response.ok) return fail("Delivery could not be confirmed. Please contact the studio directly.", 502);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return fail(
      "Delivery could not be confirmed. Your details are still available; please contact the studio directly.",
      controller.signal.aborted ? 504 : 502,
    );
  } finally {
    clearTimeout(timeout);
  }
}
