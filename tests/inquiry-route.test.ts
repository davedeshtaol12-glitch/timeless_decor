import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { POST } from "../app/api/inquiry/route";
import { EMPTY_INQUIRY } from "../lib/inquiry";

const SITE = "https://timeless.example";
const WEBHOOK = "https://booking.example/inquiries";
const validInquiry = {
  ...EMPTY_INQUIRY,
  name: "  Selam Bekele  ",
  phone: "0941097286",
  eventType: "Weddings",
  consent: true,
};
let addressSequence = 0;

function request({
  body = JSON.stringify(validInquiry),
  origin = SITE,
  contentType = "application/json",
  address = `198.51.100.${++addressSequence}`,
}: {
  body?: BodyInit;
  origin?: string | null;
  contentType?: string;
  address?: string;
} = {}) {
  return new Request(`${SITE}/api/inquiry`, {
    method: "POST",
    headers: {
      ...(origin ? { Origin: origin } : {}),
      "Content-Type": contentType,
      "X-Forwarded-For": address,
    },
    body,
  });
}

/** Every test replaces fetch before invoking the route. No request can leave the process. */
function isolate(t: TestContext) {
  const keys = ["INQUIRY_WEBHOOK_URL", "INQUIRY_WEBHOOK_TOKEN", "NODE_ENV"];
  const previous = new Map(keys.map((key) => [key, process.env[key]]));
  const nativeFetch = globalThis.fetch;
  const calls: Parameters<typeof fetch>[] = [];
  let implementation: typeof fetch = async () => {
    throw new Error("An unexpected outbound request was blocked by the test.");
  };
  delete process.env.INQUIRY_WEBHOOK_URL;
  delete process.env.INQUIRY_WEBHOOK_TOKEN;
  globalThis.fetch = (...args) => {
    calls.push(args);
    return implementation(...args);
  };
  t.after(() => {
    globalThis.fetch = nativeFetch;
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    t.mock.timers.reset();
  });
  return {
    calls,
    setFetch(next: typeof fetch) { implementation = next; },
    configure() { process.env.INQUIRY_WEBHOOK_URL = WEBHOOK; },
  };
}

test("route rejects missing and foreign origins before any outbound request", async (t) => {
  const sandbox = isolate(t);
  sandbox.configure();
  for (const origin of [null, "https://other.example", "https://timeless.example.evil.test"]) {
    const response = await POST(request({ origin }));
    assert.equal(response.status, 403);
    assert.equal((await response.json()).ok, false);
  }
  assert.equal(sandbox.calls.length, 0);
});

test("route rejects unsupported content types, malformed JSON, and invalid UTF-8", async (t) => {
  const sandbox = isolate(t);
  assert.equal((await POST(request({ contentType: "text/plain" }))).status, 415);
  assert.equal((await POST(request({ body: "{ invalid json" }))).status, 400);
  assert.equal((await POST(request({ body: new Uint8Array([0xc3, 0x28]) }))).status, 400);
  assert.equal(sandbox.calls.length, 0);
});

test("route enforces its limit in bytes, including multibyte UTF-8 bodies", async (t) => {
  const sandbox = isolate(t);
  const multibyteBody = JSON.stringify({ ...validInquiry, message: "é".repeat(9000) });
  assert.ok(multibyteBody.length < 16_384);
  assert.ok(new TextEncoder().encode(multibyteBody).byteLength > 16_384);
  for (const body of ["x".repeat(16_385), multibyteBody]) {
    const response = await POST(request({ body }));
    assert.equal(response.status, 413);
    assert.equal((await response.json()).ok, false);
  }
  assert.equal(sandbox.calls.length, 0);
});

test("route rejects field validation errors and the honeypot before delivery", async (t) => {
  const sandbox = isolate(t);
  sandbox.configure();
  const invalid = await POST(request({ body: JSON.stringify({ ...validInquiry, consent: false, eventType: "Unknown" }) }));
  assert.equal(invalid.status, 400);
  const result = await invalid.json();
  assert.ok(result.errors.consent);
  assert.ok(result.errors.eventType);
  const honeypot = await POST(request({ body: JSON.stringify({ ...validInquiry, website: "spam.example" }) }));
  assert.equal(honeypot.status, 400);
  assert.equal(sandbox.calls.length, 0);
});

test("a valid inquiry truthfully returns 503 when delivery is not configured", async (t) => {
  const sandbox = isolate(t);
  const response = await POST(request());
  assert.equal(response.status, 503);
  const result = await response.json();
  assert.equal(result.ok, false);
  assert.match(result.message, /not configured|manual contact/i);
  assert.equal(sandbox.calls.length, 0);
});

test("invalid webhook configurations fail closed without exposing credentials", async (t) => {
  const sandbox = isolate(t);
  Object.assign(process.env, { NODE_ENV: "production", INQUIRY_WEBHOOK_TOKEN: "private-token" });
  for (const url of ["not a url", "http://booking.example/inquiries", "https://user:password@booking.example/inquiries", "ftp://booking.example/inquiries"]) {
    process.env.INQUIRY_WEBHOOK_URL = url;
    const response = await POST(request());
    assert.equal(response.status, 503);
    const result = await response.text();
    assert.doesNotMatch(result, /private-token|password|booking\.example/);
  }
  assert.equal(sandbox.calls.length, 0);
});

test("upstream rejections cannot become successful inquiries or leak provider responses", async (t) => {
  const sandbox = isolate(t);
  sandbox.configure();
  for (const status of [400, 429, 500]) {
    sandbox.setFetch(async () => new Response("private upstream diagnostics", { status }));
    const response = await POST(request());
    assert.equal(response.status, 502);
    const result = await response.json();
    assert.equal(result.ok, false);
    assert.match(result.message, /could not be confirmed/i);
    assert.doesNotMatch(JSON.stringify(result), /private upstream diagnostics/);
  }
  assert.equal(sandbox.calls.length, 3);
});

test("transport failures are reported without claiming delivery", async (t) => {
  const sandbox = isolate(t);
  sandbox.configure();
  sandbox.setFetch(async () => { throw new Error("private network diagnostics"); });
  const response = await POST(request());
  assert.equal(response.status, 502);
  const result = await response.json();
  assert.equal(result.ok, false);
  assert.doesNotMatch(JSON.stringify(result), /private network diagnostics/);
  assert.equal(sandbox.calls.length, 1);
});

test("the actual abort timeout returns 504 and cancels the mocked outbound request", { timeout: 2000 }, async (t) => {
  const sandbox = isolate(t);
  sandbox.configure();
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let notifyStarted!: () => void;
  let receivedSignal: AbortSignal | null | undefined;
  const started = new Promise<void>((resolve) => { notifyStarted = resolve; });
  sandbox.setFetch((_url, init) => new Promise((_resolve, reject) => {
    receivedSignal = init?.signal;
    assert.ok(receivedSignal);
    receivedSignal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
    notifyStarted();
  }));
  const pending = POST(request());
  await Promise.race([
    started,
    pending.then(() => { throw new Error("The route did not reach the mocked provider."); }),
  ]);
  t.mock.timers.tick(8000);
  const response = await pending;
  assert.equal(response.status, 504);
  assert.equal(receivedSignal?.aborted, true);
  assert.equal((await response.json()).ok, false);
  assert.equal(sandbox.calls.length, 1);
});

test("only accepted upstream responses produce success, with the expected private payload", async (t) => {
  const sandbox = isolate(t);
  sandbox.configure();
  process.env.INQUIRY_WEBHOOK_TOKEN = "test-secret-token";
  sandbox.setFetch(async () => new Response(null, { status: 202 }));
  const response = await POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(sandbox.calls.length, 1);

  const [url, init] = sandbox.calls[0];
  assert.equal(String(url), WEBHOOK);
  assert.equal(init?.method, "POST");
  assert.equal(init?.redirect, "error");
  assert.equal(new Headers(init?.headers).get("authorization"), "Bearer test-secret-token");
  const sent = JSON.parse(String(init?.body));
  assert.equal(sent.source, "timeless-decor-website");
  assert.equal(sent.inquiry.name, "Selam Bekele");
  assert.equal(sent.inquiry.phone, "0941097286");
  assert.equal(sent.inquiry.consent, true);
  assert.ok(Number.isFinite(new Date(sent.submittedAt).getTime()));
  assert.match(sent.text, /Name: Selam Bekele/);
  assert.doesNotMatch(sent.text, /test-secret-token/);
});

test("the process-local rate limit rejects repeat submissions with a retry interval", async (t) => {
  const sandbox = isolate(t);
  const address = "198.51.100.240";
  for (let attempt = 0; attempt < 5; attempt += 1) {
    assert.equal((await POST(request({ address }))).status, 503);
  }
  const response = await POST(request({ address }));
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get("retry-after")) > 0);
  assert.equal((await response.json()).ok, false);
  assert.equal(sandbox.calls.length, 0);
});
