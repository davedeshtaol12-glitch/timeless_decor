# Timeless Decor and Event

An editorial Next.js application for Timeless Decor and Event. The design combines an ivory and charcoal palette, Cormorant Garamond and Inter, a portrait-film hero, full-screen curtain navigation and an interactive décor collection.

**Studio telephone:** 0941097286. Telephone links use `tel:+251941097286`.

## 1. Run the complete project

Use **Node.js 24 or newer**. The application, public media, local fonts and dependency lockfile are included. Internet access is needed for the initial dependency installation; normal font and media loading does not depend on an external CDN.

### Windows PowerShell

Extract the ZIP, then run these commands from the extracted `timeless-decor` directory:

```powershell
npm ci
npm run dev
```

Open **http://localhost:3000**. To use the included initialization script:

```powershell
.\SETUP.ps1 -Start
```

If your organization restricts PowerShell scripts, use the two npm commands above. No system execution-policy change is required.

### macOS or Linux

From the extracted `timeless-decor` directory:

```bash
npm ci
npm run dev
```

Or run the included initialization script:

```bash
bash setup.sh --start
```

If port 3000 is already in use, Next.js prints the chosen alternative. You can also select a port explicitly:

```bash
npm run dev -- --port 3001
```

### Create a new project folder from the file-by-file source

```bash
mkdir timeless-decor
cd timeless-decor
```

Create the files at the paths shown in `SOURCE_CODE.md`, and copy the supplied `public` directory from the archive. Then initialize dependencies and start the application:

```bash
npm install
npm run dev
```

## 2. Build and verify

```bash
npm run typecheck
npm test
npm run build
npm start
```

`npm test` runs 17 meaningful validation and API tests. They exercise Nairobi calendar dates, required fields, consent, malformed payloads, byte limits, origin checks, rate limits, transport errors, timeouts and successful provider acceptance. All outbound requests in these tests are mocked; the tests do not send inquiries.

`npm run check` runs the type check, tests and production build in sequence. Production starts at **http://localhost:3000** unless a different `PORT` is configured.

## 3. Project map

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Homepage composition and inquiry delivery configuration |
| `app/layout.tsx` | Local fonts, metadata, viewport and motion provider |
| `app/globals.css` | Design tokens, masthead, curtain, hero, story, footer and responsive styling |
| `app/api/inquiry/route.ts` | Validated server-side inquiry delivery |
| `app/error.tsx`, `app/not-found.tsx` | Branded recovery states |
| `app/icon.tsx`, `app/robots.ts`, `app/sitemap.ts` | Brand icon and search metadata |
| `components/Navbar.tsx` | Fixed masthead, full-screen menu and hover imagery |
| `components/Hero.tsx` | Three visual chapters, portrait montage, background-film controls and film modal |
| `components/Story.tsx` | Editorial brand narrative and four design disciplines |
| `components/Portfolio.tsx` | Category filters, collection details, image viewing and native video playback |
| `components/Process.tsx` | Four-step consultation, design, engineering and execution accordion |
| `components/Testimonials.tsx` | Approved quote carousel and optional press links |
| `components/Contact.tsx` | Accessible inquiry form and delivery/manual handoff states |
| `components/Footer.tsx` | Navigation, verified social links, contact and privacy explanation |
| `components/Dialog.tsx`, `Reveal.tsx`, `Providers.tsx` | Shared focus-safe native dialogs and motion primitives |
| `components/*.module.css` | Scoped portfolio, process, testimonial and contact styles |
| `data/portfolio.ts` | Typed collections, media, categories, approved testimonials and press |
| `data/hero.ts` | Hero images, films and chapter captions |
| `lib/site.ts` | Brand name, telephone, validated social URLs and canonical URL |
| `lib/inquiry.ts` | Shared input validation, local date handling and inquiry text formatting |
| `public/media` | Optimized photographs, three silent films and provenance manifest |
| `public/fonts` | Self-hosted variable fonts, source records and original OFL licenses |
| `tests` | Validator and actual route-handler tests |
| `scripts/test.mjs` | Portable test discovery for Windows, macOS and Linux |
| `SETUP.ps1`, `setup.sh` | Dependency installation and optional development startup |
| `SOURCE_CODE.md` | Complete file-by-file source blocks |

## 4. Replace media and add collections

All supplied décor photographs and footage are used locally. The original JPEGs are 640 pixels square; the exported WebPs retain their available detail. The films are vertical, which is why the hero uses portrait panels on desktop and a single portrait frame on mobile.

Add new files to `public/media`, then edit `data/portfolio.ts`. Use local URLs beginning with `/media/`:

```ts
{
  id: "a-unique-collection",
  title: "Your approved collection title",
  category: "Weddings",
  subtitle: "A short, factual collection caption.",
  cover: "/media/your-cover.webp",
  coverAlt: "Describe the actual photograph clearly.",
  description: "The approved story behind this collection.",
  palette: [{ name: "Ivory", color: "#eee9db" }],
  details: ["A verified design detail."],
  media: [
    { type: "image", src: "/media/your-cover.webp", alt: "Describe the image." },
    {
      type: "video", src: "/media/your-film.mp4",
      poster: "/media/your-film-poster.webp", alt: "Describe the film."
    }
  ]
}
```

Each item must have a unique `id` and at least one media entry. Categories are typed as `Weddings`, `Corporate Galas`, `Private Soirées` and `Luxury Stage Decor`. Counts and filters update automatically. The corporate category currently shows a consultation invitation because no corporate event has been verified from the supplied media.

For external image URLs, add the precise permitted hosts to `images.remotePatterns` in `next.config.ts`; Next Image intentionally rejects unconfigured remote hosts. Keeping media local provides a more predictable deployment.

Change the hero in `data/hero.ts`. Set `video` to an empty string for an image-only chapter. Use H.264 MP4 with a poster for broad playback support. Background films are muted, looped and paused outside the viewport, when the tab is hidden or when another hero film is open. Reduced-motion and data-saving visitors receive a still poster and may open the film explicitly.

`public/media/SOURCES.json` maps each asset to the supplied attachment. No stock imagery or fabricated client identities, venues, event dates or guest counts have been added. Related photographs and films are presented as visual studies rather than being asserted to document one event.

## 5. Configure actual studio details

Copy `.env.example` to `.env.local` and set the values that are ready:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-real-domain.example
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/your-real-account/
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@your-real-account
```

The domains and account names above illustrate the format; replace them with real values. Empty social settings hide the links. The code also rejects unsupported or malformed social URLs. The site does not assume an unprovided email, physical address or WhatsApp account.

The real canonical URL enables canonical and social-image metadata and adds the home page to `sitemap.xml`. Rebuild after changing `NEXT_PUBLIC_*` settings.

Approved testimonials and press coverage go in the typed arrays at the end of `data/portfolio.ts`. The quote carousel and portrait support are already implemented. Until genuine quotations are added, the section displays an explicitly attributed studio philosophy. No client endorsements or press logos are invented.

## 6. Inquiry flow

### Included, without any credentials

The form validates name, telephone, occasion and consent, plus the optional event date, email, guest count, budget, venue and notes. It then prepares an inquiry for review.

The review explicitly says that the inquiry **has not been sent**. A visitor can copy the full text, save a text file, open an SMS draft to the studio, or call the studio directly. If clipboard access is unavailable, the text is selected so the visitor can copy manually. SMS behavior depends on the visitor’s device and messaging app; the copy, download and telephone alternatives remain available.

### Enable online submission

Set a server-side HTTPS endpoint you control:

```dotenv
INQUIRY_WEBHOOK_URL=https://your-service.example/inquiries
INQUIRY_WEBHOOK_TOKEN=your-optional-secret
```

Rebuild and restart after enabling or disabling this delivery setting; the server-rendered page selects its submit mode at build time. Keep the token server-side. Never prefix it with `NEXT_PUBLIC_`.

The endpoint receives a JSON POST with this structure:

```json
{
  "source": "timeless-decor-website",
  "submittedAt": "ISO-8601 UTC timestamp",
  "inquiry": {
    "name": "Visitor name",
    "phone": "Visitor telephone",
    "email": "Optional email",
    "eventType": "Weddings",
    "eventDate": "YYYY-MM-DD or empty",
    "guestCount": "120",
    "budget": "Optional budget and currency",
    "venue": "Optional venue",
    "message": "Optional notes",
    "consent": true,
    "website": ""
  },
  "text": "The complete formatted inquiry"
}
```

The exact validated payload types are defined in `lib/inquiry.ts`. All form fields except `consent` remain trimmed strings; `guestCount` is a validated whole-number string, and omitted optional values become empty strings. The illustrative values above explain each field rather than serving as a test fixture.

A configured token is sent as `Authorization: Bearer ...`. Connect the endpoint to a CRM, email relay or automation that actually handles inquiries. A successful HTTP response means the receiving service accepted the request; it does not confirm the event booking. The interface reports success only after acceptance. Timeouts or upstream failures preserve the details and offer manual contact without claiming delivery. Requests are not retried automatically.

The route validates same-origin JSON, consent, field types, calendar dates, body size, honeypot and rate limits. It does not follow redirects with the secret token. The included rate limiter is process-local: a multi-instance or serverless deployment should use its host’s edge/shared limiter and trusted forwarding headers. Configure the receiving service’s access control, retention and duplicate handling for your deployment.

## 7. Design and accessibility

- Full-height hero with real films, manual visual chapters, poster fallbacks and playback controls.
- Persistent masthead and an animated full-screen menu with photographic hover states.
- Native modal dialogs with Escape dismissal, focus containment and return focus.
- Contextual keyboard focus after navigating from a modal to a page section.
- Keyboard-operable filters, image controls and process accordion.
- Native video controls and explicit recovery when a film cannot load.
- Visible focus rings, skip link, semantic headings, field labels and live validation messages.
- Local variable fonts with font swapping, responsive image sizing and lazy gallery loading.
- Reduced-motion support and touch-friendly responsive layouts.

The references informed the cinematic pacing and editorial navigation; their media, copy, proprietary fonts and source code are not included. Reference URLs are recorded in the asset manifest.

## 8. Deployment handoff

Publish the application on a host that supports a Next.js Node runtime and route handlers. Supply production environment values, run `npm ci`, run `npm run build` and start with `npm start` where your host expects a Node process. A purely static host cannot execute `/api/inquiry`.

Before public launch, confirm the actual domain and social profiles, approve the final copy and media, and connect the webhook if direct online delivery is wanted. Check the menu, native videos and form on your target iPhone/Android and desktop browsers. Automated source/build checks do not replace that device review.

The archive contains source, assets and configuration, with no `node_modules`, build cache, user inquiry data or secret environment files.
