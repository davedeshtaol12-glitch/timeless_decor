# Timeless Decor and Event — Complete Source

Every source, configuration, test and documentation file below is included in full. The ZIP also includes the binary photographs, films and fonts under `public/`. Generated build caches and installed dependencies are excluded.

## Start locally

```bash
npm ci
npm run dev
```

Run these commands from the extracted `timeless-decor` directory with Node.js 24 or newer.


## README.md

````markdown
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
````


## package.json

```json
{
  "name": "timeless-decor-and-event",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": { "node": ">=24.0.0" },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "test": "node scripts/test.mjs",
    "check": "npm run typecheck && npm test && npm run build"
  },
  "dependencies": {
    "framer-motion": "14.4.0",
    "lucide-react": "1.59.0",
    "next": "16.4.2",
    "react": "19.3.1",
    "react-dom": "19.3.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.3.3",
    "@types/node": "^24.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "postcss": "^8.5.6",
    "tailwindcss": "4.3.3",
    "tsx": "^4.20.0",
    "typescript": "~5.9.3"
  }
}
```


## next.config.ts

```typescript
import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};

export default config;
```


## tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#f4f0e8",
        ink: "#242820",
        champagne: "#ad9473",
        muted: "#767568",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
    },
  },
};
```


## postcss.config.mjs

```javascript
export default { plugins: { "@tailwindcss/postcss": {} } };
```


## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```


## next-env.d.ts

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";
import "./.next/types/root-params.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```


## .env.example

```text
# Optional canonical HTTPS URL. Leave empty for local development.
NEXT_PUBLIC_SITE_URL=

# Optional verified social accounts. Empty values hide the corresponding links.
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TIKTOK_URL=

# Optional HTTPS endpoint you control (CRM, automation, or email relay).
# Without it, the form prepares a private inquiry for copy, download, or SMS.
INQUIRY_WEBHOOK_URL=
INQUIRY_WEBHOOK_TOKEN=
```


## .gitignore

```text
node_modules/
.next/
out/
.env*
!.env.example
*.tsbuildinfo
.DS_Store
coverage/
*.log
```


## app/layout.tsx

```tsx
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import Providers from "@/components/Providers";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const serif = localFont({
  src: [
    { path: "../public/fonts/cormorant-garamond-latin.woff2", weight: "300 700", style: "normal" },
    { path: "../public/fonts/cormorant-garamond-latin-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-serif", display: "swap", fallback: ["Georgia"],
});
const sans = localFont({
  src: "../public/fonts/inter-latin.woff2", weight: "100 900",
  variable: "--font-sans", display: "swap", fallback: ["Arial"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: "Timeless Decor and Event — The art of celebration", template: "%s | Timeless" },
  description: "Thoughtfully imagined weddings, private celebrations, floral compositions and stage décor. Begin your celebration with Timeless Decor and Event. Call 0941097286.",
  ...(getSiteUrl() ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: "Timeless Decor and Event", description: siteConfig.tagline,
    siteName: siteConfig.name, locale: "en_US", type: "website",
    ...(getSiteUrl() ? { images: [{ url: "/media/wedding.webp", width: 640, height: 640, alt: "Ivory and gold décor by Timeless" }] } : {}),
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.tagline },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#242820" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Providers>{children}</Providers>
        <noscript><div className="noscript-note">For gallery films and the inquiry form, enable JavaScript. You can always call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.</div></noscript>
      </body>
    </html>
  );
}
```


## app/page.tsx

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Story />
        <Portfolio />
        <Process />
        <Testimonials />
        <Contact deliveryConfigured={Boolean(process.env.INQUIRY_WEBHOOK_URL?.trim())} />
      </main>
      <Footer />
    </>
  );
}
```


## app/globals.css

```css
@import "tailwindcss";
@config "../tailwind.config.js";

:root {
  --ivory: #f4f0e8;
  --ink: #242820;
  --champagne: #ad9473;
  --muted: #696b60;
  --rule: #24282026;
  --page-gutter: clamp(22px, 6vw, 112px);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 96px; scrollbar-gutter: stable; }
body { margin: 0; background: var(--ivory); color: var(--ink); font-family: var(--font-sans), Arial, sans-serif; font-size: 14px; line-height: 1.65; -webkit-font-smoothing: antialiased; overflow-x: clip; }
::selection { background: #b39d79; color: #fff; }
a { color: inherit; text-decoration: none; }
button, input, select, textarea { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
button { cursor: pointer; }
button:disabled { cursor: wait; }
button, a, input, select, textarea { touch-action: manipulation; }
:focus-visible { outline: 2px solid #a57939; outline-offset: 5px; }
img, video { display: block; max-width: 100%; }
em { font-weight: inherit; }
h1, h2, h3, p { margin-top: 0; }
svg { flex-shrink: 0; }
section[id] { scroll-margin-top: 86px; }
.object-cover { object-fit: cover; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.eyebrow { font-size: 10px; font-weight: 450; line-height: 1.6; letter-spacing: .19em; text-transform: uppercase; }
.section-shell { padding-inline: var(--page-gutter); max-width: 1800px; margin-inline: auto; }
.skip-link { position: fixed; top: 12px; left: 12px; z-index: 1000; transform: translateY(-180%); padding: 12px 20px; background: var(--ivory); color: var(--ink); }
.skip-link:focus { transform: translateY(0); }
.button { display: inline-flex; align-items: center; justify-content: space-between; gap: 34px; min-height: 54px; padding: 17px 25px; border: 1px solid transparent; font-size: 10px; text-transform: uppercase; letter-spacing: .1em; line-height: 1.5; transition: background .3s, color .3s, border-color .3s; }
.button svg { transition: transform .35s; }
.button:hover svg { transform: translate(3px, -3px); }
.button-dark { background: var(--ink); color: var(--ivory); }
.button-dark:hover { background: #454b3e; }
.text-link { display: inline-flex; align-items: center; gap: 30px; min-height: 44px; border-bottom: 1px solid #24282055; padding-bottom: 5px; font-size: 10px; text-transform: uppercase; letter-spacing: .11em; }
.text-link svg { transition: transform .3s; }
.text-link:hover svg { transform: translate(3px, -3px); }
.icon-button { display: inline-grid; place-items: center; padding: 0; width: 44px; height: 44px; border: 1px solid currentColor; border-radius: 50%; background: transparent; color: inherit; }

/* A restrained fixed masthead; the native dialog supplies the full curtain. */
.site-header { position: fixed; z-index: 30; inset: 0 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 35px; min-height: 108px; padding: 18px 3.2vw; color: var(--ivory); transition: color .4s, background .4s, min-height .4s, padding .4s; }
.site-header.is-scrolled { background: #f4f0e8f5; color: var(--ink); backdrop-filter: blur(18px); border-bottom: 1px solid var(--rule); min-height: 82px; padding-block: 12px; }
.wordmark { display: inline-flex; flex-direction: column; align-items: center; flex-shrink: 0; }
.wordmark > span { font-family: var(--font-serif), Georgia, serif; font-weight: 500; font-size: 44px; letter-spacing: -.07em; line-height: .86; }
.wordmark-dot { color: #d9c4a3; }
.is-scrolled .wordmark-dot { color: #927756; }
.wordmark small { margin-top: 9px; font-size: 6px; font-weight: 500; letter-spacing: .26em; }
.header-note { font-family: var(--font-serif), Georgia, serif; font-size: 19px; font-style: italic; margin-left: 11vw; }
.header-actions { display: flex; align-items: center; gap: 38px; }
.header-consult { display: inline-flex; align-items: center; gap: 15px; min-height: 44px; font-size: 10px; letter-spacing: .03em; }
.header-consult:hover { text-decoration: underline; text-underline-offset: 6px; }
.menu-trigger { display: inline-flex; align-items: center; justify-content: space-between; gap: 30px; min-height: 44px; padding: 0 0 0 30px; color: inherit; background: none; border: 0; border-left: 1px solid currentColor; font-size: 10px; letter-spacing: .13em; }
.menu-trigger svg { transition: transform .45s; }
.menu-trigger:hover svg { transform: rotate(90deg); }
.dialog-shell { border: 0; padding: 0; margin: auto; width: calc(100% - 48px); max-width: 1180px; max-height: calc(100dvh - 48px); background: var(--ivory); color: var(--ink); overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; box-shadow: 0 24px 100px #0004; }
.dialog-shell::backdrop { background: #121711bd; backdrop-filter: blur(8px); animation: backdrop-in .35s ease; }
.dialog-content { position: relative; min-height: 100%; }
.dialog-close { position: absolute; z-index: 10; top: 18px; right: 18px; width: 44px; height: 44px; background: #f4f0e8ed; border-color: #24282035; color: var(--ink); backdrop-filter: blur(12px); }
.dialog-close:hover { background: var(--ink); color: var(--ivory); }
.menu-dialog { width: 100%; max-width: 100%; height: 100dvh; max-height: 100dvh; margin: 0; background: transparent; }
.menu-dialog .dialog-content { background: var(--ivory); }
.menu-dialog .dialog-close { top: 30px; right: 3.2vw; }
.menu-layout { display: grid; grid-template-columns: 64% 36%; min-height: 100dvh; }
.menu-main { padding: 64px 6vw 42px; display: flex; flex-direction: column; justify-content: center; }
.menu-overline { margin-bottom: 44px; color: var(--muted); }
.menu-list { list-style: none; margin: 0; padding: 0; }
.menu-list a { display: flex; align-items: center; gap: 26px; padding: 9px 0; font-family: var(--font-serif), Georgia, serif; font-size: clamp(36px, 4.5vw, 74px); font-weight: 400; letter-spacing: -.04em; line-height: 1.13; transition: color .3s; }
.menu-list a > svg { width: 29px; height: 29px; margin-left: auto; opacity: 0; transform: translate(-10px, 10px); transition: opacity .3s, transform .3s; }
.menu-list a:hover, .menu-list a:focus-visible { color: #8b7558; }
.menu-list a:hover > svg, .menu-list a:focus-visible > svg { opacity: 1; transform: translate(0,0); }
.menu-number { font-family: var(--font-sans), Arial, sans-serif; font-size: 9px; color: var(--muted); letter-spacing: .04em; }
.menu-contact { margin-top: 48px; padding-top: 28px; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; align-items: end; gap: 20px; }
.menu-contact .eyebrow { font-size: 8px; color: var(--muted); }
.menu-phone { display: flex; align-items: center; gap: 25px; margin-top: 9px; font-family: var(--font-serif), Georgia, serif; font-size: 27px; }
.menu-socials { display: flex; gap: 17px; flex-wrap: wrap; font-size: 10px; }
.menu-socials a { display: inline-flex; align-items: center; gap: 5px; min-height: 44px; }
.menu-visual { position: relative; isolation: isolate; overflow: hidden; background: #665e4e; }
.menu-image { position: absolute; inset: 0; z-index: -2; }
.menu-visual::after { content: ""; position: absolute; z-index: -1; inset: 0; background: linear-gradient(0deg, #161b12aa, #161b1212 80%); }
.menu-visual > p { position: absolute; bottom: 55px; left: 12%; right: 9%; color: var(--ivory); font-family: var(--font-serif), Georgia, serif; font-size: clamp(36px, 3vw, 52px); line-height: 1.03; letter-spacing: -.03em; margin: 0; }

/* Three portrait panels keep the original films beautifully framed. */
.hero { position: relative; isolation: isolate; height: 100svh; min-height: 740px; max-height: 1400px; overflow: hidden; background: #46483c; color: var(--ivory); }
.hero-media { position: absolute; z-index: -3; inset: -3% 0 -4%; }
.hero-panels { position: absolute; inset: 0; display: grid; grid-template-columns: 28% 44% 28%; }
.hero-panel { position: relative; min-width: 0; overflow: hidden; }
.hero-panel + .hero-panel { border-left: 1px solid #fff3; }
.hero-panel-left img { object-position: 35% center; }
.hero-panel-right img { object-position: 56% center; }
.hero-video { position: absolute; width: 100%; height: 100%; inset: 0; object-fit: cover; }
.hero-video-wrap { position: absolute; inset: 0 28%; }
.hero-shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg, #172015a8, #172015a6 25%, #10180eb0 65%, #10170ec7); }
.hero-copy { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: absolute; inset: 12% 6% 15%; }
.hero-copy > .eyebrow { margin-bottom: 27px; font-size: 9px; letter-spacing: .23em; }
.hero h1 { font-family: var(--font-serif), Georgia, serif; font-size: clamp(78px, 10.4vw, 172px); font-weight: 400; letter-spacing: -.055em; line-height: .83; margin: 0 0 31px; text-wrap: balance; }
.hero h1 em { font-weight: 300; }
.hero-description { font-size: 12px; line-height: 1.8; font-weight: 350; letter-spacing: .01em; color: #faf7ec; margin-bottom: 28px; }
.hero-cta { background: var(--ivory); color: var(--ink); min-height: 51px; }
.hero-cta:hover { background: transparent; border-color: #f4f0e8b3; color: var(--ivory); }
.hero-side-note { position: absolute; left: 3.2vw; top: 38%; writing-mode: vertical-rl; transform: rotate(180deg); font-size: 8px; letter-spacing: .2em; opacity: .8; }
.hero-bottom { position: absolute; inset: auto 3.2vw 34px; display: grid; grid-template-columns: 1fr 1.3fr 1fr; align-items: center; gap: 40px; }
.scroll-cue { display: flex; align-items: center; gap: 16px; font-size: 8px; letter-spacing: .13em; line-height: 1.6; width: fit-content; }
.circle-arrow { display: grid; place-items: center; width: 47px; height: 47px; border: 1px solid #f4f0e877; border-radius: 50%; transition: background .3s; }
.scroll-cue:hover .circle-arrow { background: #f4f0e820; }
.scroll-cue svg { transition: transform .3s; }
.scroll-cue:hover svg { transform: translateY(4px); }
.hero-chapters { display: grid; grid-template-columns: repeat(3, 1fr); gap: 17px; }
.hero-chapters button { padding: 9px 0; min-height: 44px; border: 0; background: none; color: inherit; text-align: left; opacity: .65; transition: opacity .3s; }
.hero-chapters button[aria-pressed="true"], .hero-chapters button:hover { opacity: 1; }
.chapter-line { display: block; width: 100%; height: 1px; background: #f4f0e86b; margin-bottom: 10px; position: relative; }
.chapter-line::after { content: ""; display: block; position: absolute; inset: 0; background: var(--ivory); transform: scaleX(0); transform-origin: left; transition: transform .6s; }
[aria-pressed="true"] .chapter-line::after { transform: scaleX(1); }
.chapter-label { font-size: 9px; font-variant-numeric: tabular-nums; display: flex; gap: 9px; white-space: nowrap; }
.chapter-label > span { font-family: var(--font-serif), Georgia, serif; font-size: 15px; line-height: 1; }
.hero-film-actions { display: flex; align-items: center; justify-content: flex-end; gap: 17px; }
.watch-film { display: flex; align-items: center; gap: 11px; min-height: 44px; background: none; border: 0; color: inherit; font-size: 9px; letter-spacing: .13em; }
.watch-film:hover { text-decoration: underline; text-underline-offset: 5px; }
.hero-pause { width: 36px; height: 36px; min-width: 44px; min-height: 44px; border-color: #f4f0e861; }
.discipline-strip { display: flex; justify-content: center; align-items: center; gap: 3.3vw; padding: 33px var(--page-gutter); border-bottom: 1px solid var(--rule); font-family: var(--font-serif), Georgia, serif; font-size: clamp(19px, 1.85vw, 30px); line-height: 1.2; white-space: nowrap; }
.strip-mark { color: #a38b68; font-size: 18px; }
.film-dialog { background: #181e16; color: var(--ivory); max-width: 960px; }
.film-view { padding: 45px 35px 22px; text-align: center; }
.film-view > .eyebrow { margin-bottom: 21px; font-size: 9px; color: #dbd2bf; padding-right: 20px; }
.film-view video { width: 100%; height: min(72dvh, 850px); object-fit: contain; background: #11160f; }
.film-view > p:last-child { margin: 16px 0 0; font-family: var(--font-serif), Georgia, serif; font-size: 24px; font-style: italic; }
.film-error { padding: 80px 20px; min-height: 280px; }
.film-error .text-link { border-color: #f4f0e870; }

/* A tall image, an inset detail, and a deliberately quiet editorial column. */
.story { padding-top: 97px; padding-bottom: 38px; }
.section-overline { display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-bottom: 57px; }
.section-overline-end { color: var(--muted); font-size: 9px; }
.story-grid { display: grid; grid-template-columns: 1fr 1.05fr; align-items: center; column-gap: 11%; }
.story-visual { position: relative; padding: 0 11% 39px 0; }
.story-main-image { position: relative; aspect-ratio: .74; overflow: hidden; }
.story-main-image img { object-position: center 36%; }
.story-detail-image { position: absolute; right: -8%; bottom: 72px; width: 42%; aspect-ratio: .76; border: 8px solid var(--ivory); overflow: hidden; }
.image-footnote { position: absolute; left: 0; bottom: 12px; font-size: 8px; color: var(--muted); letter-spacing: .15em; }
.story-narrative h2 { font-family: var(--font-serif), Georgia, serif; font-size: clamp(46px, 5.6vw, 87px); line-height: .98; letter-spacing: -.045em; font-weight: 400; margin-bottom: 34px; }
.story-narrative h2 em { color: #8b7c66; }
.story-narrative p { max-width: 410px; font-size: 12px; line-height: 1.95; color: var(--muted); margin-bottom: 24px; }
.story-narrative .story-lead { color: var(--ink); font-size: 15px; font-weight: 400; line-height: 1.8; }
.story-narrative .text-link { margin-top: 10px; }
.disciplines-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3.9%; padding-top: 74px; margin-top: 28px; border-bottom: 1px solid var(--rule); padding-bottom: 48px; }
.discipline { padding-top: 18px; border-top: 1px solid var(--rule); }
.discipline > .eyebrow { display: block; color: #8b7c66; font-size: 9px; margin-bottom: 15px; }
.discipline h3 { font-family: var(--font-serif), Georgia, serif; font-size: clamp(23px, 2.15vw, 35px); font-weight: 400; line-height: 1.15; letter-spacing: -.025em; margin: 0 0 13px; }
.discipline p { font-size: 11px; line-height: 1.85; color: var(--muted); margin-bottom: 0; }

/* The final word is a typographic signature. */
.footer { background: var(--ink); color: var(--ivory); padding: 63px var(--page-gutter) 0; overflow: hidden; }
.footer-top { display: grid; grid-template-columns: 1.2fr .8fr 1fr; gap: 45px; align-items: start; }
.footer-top > p { font-family: var(--font-serif), Georgia, serif; font-size: clamp(26px, 2.75vw, 44px); line-height: 1.1; letter-spacing: -.02em; }
.footer-top > p em { color: #c4ae8d; }
.footer-top nav { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
.footer-top nav a { font-size: 11px; padding: 5px 0; color: #d6d6c9; }
.footer-top nav a:hover, .footer-contact a:hover { color: #c8af8a; }
.footer-contact { padding-top: 3px; display: flex; flex-direction: column; align-items: end; }
.footer-contact > a { display: inline-flex; align-items: center; gap: 12px; font-size: 15px; min-height: 44px; }
.footer-socials { display: flex; gap: 18px; margin-top: 18px; }
.footer-socials a { display: inline-flex; align-items: center; gap: 7px; min-height: 44px; font-size: 10px; color: #c0c3b4; }
.footer-wordmark { display: block; width: fit-content; margin: 36px auto 20px; font-family: var(--font-serif), Georgia, serif; font-size: clamp(115px, 23.6vw, 410px); line-height: .79; font-weight: 400; letter-spacing: -.065em; text-align: center; padding-right: .04em; }
.footer-wordmark > span { color: #b59c78; }
.footer-bottom { display: flex; justify-content: space-between; gap: 20px; align-items: center; border-top: 1px solid #f4f0e82b; margin-top: 41px; padding: 19px 0 22px; color: #b9bdad; font-size: 8px; letter-spacing: .07em; }
.footer-bottom > a { display: inline-flex; gap: 17px; align-items: center; min-height: 44px; }
.footer-bottom > button { background: none; border: 0; color: inherit; font-size: 10px; min-height: 44px; }
.privacy-dialog { max-width: 700px; }
.privacy-copy { padding: 60px 55px 35px; }
.privacy-copy h2 { font-family: var(--font-serif), Georgia, serif; font-weight: 400; font-size: 58px; line-height: 1; letter-spacing: -.03em; margin: 26px 0; }
.privacy-copy p { color: var(--muted); font-size: 13px; line-height: 1.9; }
.privacy-copy p a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.noscript-note { padding: 20px; background: var(--ivory); color: var(--ink); text-align: center; }
.noscript-note a { text-decoration: underline; }
.error-page { min-height: 100svh; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 7vw; }
.error-page h1 { font-family: var(--font-serif), Georgia, serif; font-size: clamp(55px,8vw,110px); font-weight: 400; line-height: .97; letter-spacing: -.045em; margin: 32px 0; }
.error-page > p { max-width: 500px; color: var(--muted); margin-bottom: 25px; }
.error-page > p a { text-decoration: underline; }
@keyframes backdrop-in { from { opacity: 0; } to { opacity: 1; } }

@media (min-width: 1800px) {
  .story { padding-inline: 7%; }
  .hero-copy { inset-block: 15% 20%; }
  .hero h1 { font-size: 185px; }
  .hero-description { font-size: 15px; }
  .hero-bottom { bottom: 46px; }
}
@media (max-width: 1100px) {
  .header-note { display: none; }
  .site-header { min-height: 92px; padding-inline: 5%; }
  .hero-bottom { gap: 22px; inset-inline: 5%; grid-template-columns: .8fr 1.5fr .8fr; }
  .hero-side-note { left: 4%; }
  .hero-chapters { gap: 12px; }
  .chapter-label > span { font-size: 13px; }
  .hero-film-actions { gap: 8px; }
  .watch-film { font-size: 8px; }
  .scroll-cue { gap: 10px; }
  .discipline-strip { gap: 2.7vw; padding-inline: 4%; }
  .story-grid { column-gap: 9%; }
  .story-narrative h2 { font-size: 58px; }
  .story-narrative p { font-size: 12px; }
  .story-narrative .story-lead { font-size: 14px; }
  .disciplines-grid { gap: 4%; }
  .discipline h3 { font-size: 26px; }
  .menu-main { padding-inline: 5%; }
  .menu-list a { font-size: 5.2vw; gap: 20px; }
  .footer-top { gap: 24px; }
}
@media (max-width: 760px) {
  html { scroll-padding-top: 80px; }
  .site-header { min-height: 83px; padding: 18px 6%; }
  .site-header.is-scrolled { min-height: 75px; }
  .wordmark > span { font-size: 38px; }
  .wordmark small { font-size: 5px; margin-top: 7px; }
  .header-actions { gap: 0; }
  .header-consult { display: none; }
  .menu-trigger { border: none; gap: 23px; padding-left: 20px; font-size: 9px; }
  .hero { min-height: 690px; max-height: 1100px; }
  .hero-panels { grid-template-columns: 1fr; }
  .hero-panel-left, .hero-panel-right { display: none; }
  .hero-panel-center { border: none !important; }
  .hero-video-wrap { inset-inline: 0; }
  .hero-media { inset-block: -2% -6%; }
  .hero-shade { background: linear-gradient(180deg,#172015a8,#172015a6 25%,#10180eb0 65%,#10170ec7); }
  .hero-copy { inset: 15% 6% 21%; }
  .hero-copy > .eyebrow { font-size: 8px; letter-spacing: .14em; margin-bottom: 27px; max-width: 280px; }
  .hero h1 { font-size: clamp(63px, 14.5vw, 110px); line-height: .88; margin-bottom: 25px; }
  .hero-description { font-size: 11px; margin-bottom: 24px; }
  .hero-cta { font-size: 9px; min-height: 50px; padding-inline: 22px; gap: 31px; }
  .hero-side-note { display: none; }
  .hero-bottom { inset: auto 6% 23px; grid-template-columns: 1fr 1fr; row-gap: 12px; }
  .hero-chapters { grid-row: 2; grid-column: 1 / -1; gap: 24px; }
  .hero-film-actions { grid-column: 2; grid-row: 1; }
  .scroll-cue { font-size: 7px; }
  .circle-arrow { width: 39px; height: 39px; }
  .chapter-label > span { font-size: 14px; }
  .hero-pause { width: 36px; height: 36px; }
  .watch-film { font-size: 8px; }
  .discipline-strip { white-space: normal; flex-wrap: wrap; row-gap: 12px; column-gap: 6%; font-size: 21px; padding: 25px 6%; text-align: center; }
  .discipline-strip > span:nth-child(4) { display: none; }
  .discipline-strip > span:not(.strip-mark) { flex-basis: 40%; }
  .strip-mark { flex-basis: 4%; }
  .story { padding-top: 66px; padding-bottom: 5px; }
  .section-overline { margin-bottom: 31px; }
  .section-overline-end { display: none; }
  .story-grid { grid-template-columns: 1fr; row-gap: 44px; }
  .story-visual { width: 90%; padding-right: 10%; padding-bottom: 33px; }
  .story-main-image { aspect-ratio: .85; }
  .story-detail-image { right: -11%; bottom: 67px; width: 45%; border-width: 6px; }
  .image-footnote { font-size: 7px; bottom: 9px; }
  .story-narrative { padding-left: 9%; }
  .story-narrative h2 { font-size: clamp(46px, 9.8vw, 71px); margin-bottom: 26px; }
  .desktop-break { display: none; }
  .story-narrative p { max-width: 450px; font-size: 12px; }
  .story-narrative .story-lead { font-size: 14px; }
  .story-narrative .text-link { font-size: 9px; margin-top: 0; }
  .disciplines-grid { grid-template-columns: 1fr 1fr; gap: 28px 7%; padding-top: 39px; margin-top: 26px; padding-bottom: 35px; }
  .discipline h3 { font-size: 27px; }
  .discipline p { font-size: 10px; }
  .menu-layout { display: block; }
  .menu-visual { display: none; }
  .menu-main { min-height: 100dvh; padding: 65px 8% 36px; }
  .menu-dialog .dialog-close { top: 20px; right: 6%; }
  .menu-overline { font-size: 8px; margin-bottom: 42px; padding-right: 45px; }
  .menu-list a { font-size: clamp(33px, 7.8vw, 55px); padding-block: 13px; gap: 17px; }
  .menu-list a > svg { width: 22px; height: 22px; opacity: .45; transform: none; }
  .menu-number { font-size: 8px; }
  .menu-contact { margin-top: 35px; align-items: start; flex-wrap: wrap; }
  .menu-phone { font-size: 28px; }
  .dialog-shell { width: calc(100% - 24px); max-height: calc(100dvh - 24px); }
  .menu-dialog { width: 100%; max-height: 100dvh; }
  .film-view { padding: 61px 15px 21px; }
  .film-view > .eyebrow { font-size: 8px; padding: 0; }
  .film-view video { height: 67dvh; }
  .film-view > p:last-child { font-size: 21px; }
  .footer { padding-top: 43px; }
  .footer-top { grid-template-columns: 1fr 1fr; gap: 30px 20px; }
  .footer-top > p { font-size: 28px; }
  .footer-top nav a { font-size: 10px; min-height: 36px; }
  .footer-contact { grid-column: 1 / -1; padding-top: 0; flex-direction: row; align-items: center; justify-content: space-between; gap: 15px; }
  .footer-contact > a { font-size: 13px; }
  .footer-socials { margin-top: 0; gap: 12px; }
  .footer-socials span { display: none; }
  .footer-wordmark { font-size: 24vw; margin: 40px auto 13px; }
  .footer-bottom { font-size: 7px; flex-wrap: wrap; gap: 1px 12px; padding-block: 14px; margin-top: 28px; }
  .footer-bottom > span { width: 100%; }
  .footer-bottom > button { font-size: 9px; }
  .footer-bottom > a { margin-left: auto; font-size: 7px; }
  .privacy-copy { padding: 62px 27px 30px; }
  .privacy-copy h2 { font-size: 47px; }
  .privacy-copy p { font-size: 12px; }
}
@media (max-width: 380px) {
  .hero h1 { font-size: 57px; }
  .hero { min-height: 680px; }
  .hero-copy > .eyebrow { font-size: 7px; }
  .chapter-label > span { font-size: 12px; }
  .hero-chapters { gap: 16px; }
  .discipline-strip { font-size: 19px; }
  .menu-list a { font-size: 31px; }
  .discipline h3 { font-size: 24px; }
}
@media (max-height: 720px) and (min-width: 761px) {
  .hero { min-height: 680px; }
  .hero h1 { font-size: 104px; }
  .hero-copy > .eyebrow { margin-bottom: 22px; }
  .hero-description { margin-bottom: 20px; }
  .menu-main { padding-block: 38px; }
  .menu-overline { margin-bottom: 22px; }
  .menu-list a { font-size: 48px; padding-block: 6px; }
  .menu-contact { margin-top: 24px; padding-top: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
  .hero-media { transform: none !important; }
}
@media (scripting: none) {
  .reveal, .hero-copy > * { opacity: 1 !important; transform: none !important; }
  .menu-trigger { display: none; }
}
```


## SETUP.ps1

```powershell
param([switch]$Start)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Install Node.js 24 or newer from https://nodejs.org/ and reopen PowerShell."
}
$timelessNodeMajor = [int]((& node -p "process.versions.node.split('.')[0]").Trim())
if ($timelessNodeMajor -lt 24) { throw "This project uses Node.js 24 or newer." }

if (Test-Path "package-lock.json") { & npm.cmd ci } else { & npm.cmd install }
if ($LASTEXITCODE -ne 0) { throw "Dependency installation failed. Check the npm output above." }

if ($Start) {
    & npm.cmd run dev
    exit $LASTEXITCODE
}
Write-Host "Timeless is ready. Run npm run dev, then open http://localhost:3000."
```


## VERIFICATION.md

```markdown
# Verification record

## Completed checks

- Production compilation: Next.js 16.4.2 with the default Turbopack compiler.
- React 19.3.1; Framer Motion 14.4.0; Tailwind CSS 4.3.3; Lucide React 1.59.0.
- TypeScript compilation passed with strict checking.
- All 17 automated inquiry tests passed. Outbound requests were mocked.
- The generated homepage contains one H1, no duplicate IDs and no unresolved static section anchors.
- Every image in the generated homepage has an alt attribute.
- All 12 media paths referenced from application data and components resolve to included files.
- All three included films were verified as H.264, yuv420p MP4 with fast-start metadata and no audio streams.
- All three local WOFF2 files were checked and decoded successfully; original font licenses are included.
- Independent code review covered modal focus, navigation, arrow-key handling, video cleanup, autoplay rejection, document visibility and SSR behavior. Identified issues were corrected.

The compiler needed access to local worker communication in the build environment. The completed production build uses the standard `next build` command.

## Verification limit

The environment did not provide the supported browser-control capability. No live browser, viewport screenshot, Lighthouse score or device-playback result is claimed. Responsive behavior and interactions were inspected in source; the production build and generated HTML were checked.

## Device review before public launch

1. Check the initial hero, menu and image proportions at approximately 390 px, 768 px and 1440 px widths.
2. Open and close the menu using keyboard and touch; activate section links and verify destination focus.
3. Filter each collection category. Open an image, use next/previous and Escape, then play a film.
4. Toggle background playback, switch hero chapters, scroll away and return, and repeat with reduced motion enabled.
5. Prepare a valid inquiry, correct invalid fields, copy and download the review, and test the SMS handoff on a phone.
6. If online delivery is configured, verify the real receiving service end to end using an authorized test inquiry.

No inquiry has been sent to a real external service during development. The default form prepares an unsent inquiry for the visitor to share.
```


## app/api/inquiry/route.ts

```typescript
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
```


## app/error.tsx

```tsx
"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="error-page">
    <span className="eyebrow">A BRIEF INTERLUDE</span>
    <h1>Let’s try<br /><em>that again.</em></h1>
    <p>Something interrupted the page. Your celebration can still begin with a call to <a href="tel:+251941097286">0941097286</a>.</p>
    <button className="button button-dark" onClick={reset}>Reload this view</button>
  </main>;
}
```


## app/icon.tsx

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#242820", color: "#f4f0e8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 49, fontFamily: "serif" }}>T</div>,
    size,
  );
}
```


## app/not-found.tsx

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return <main className="error-page">
    <span className="eyebrow">TIMELESS · 404</span>
    <h1>A different<br /><em>kind of detour.</em></h1>
    <p>This page has moved, or its story is still to be written.</p>
    <Link className="button button-dark" href="/">Return to Timeless <ArrowUpRight size={18} /></Link>
  </main>;
}
```


## app/robots.ts

```typescript
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, ...(site ? { sitemap: new URL("/sitemap.xml", site).href } : {}) };
}
```


## app/sitemap.ts

```typescript
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  return site ? [{ url: site.href, changeFrequency: "monthly", priority: 1 }] : [];
}
```


## components/Contact.module.css

```css
.section {
  position: relative;
  scroll-margin-top: 90px;
  padding: 136px 5.5% 144px;
  color: #242820;
  background: #f4f0e8;
}

.inner {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1fr);
  gap: clamp(48px, 8vw, 138px);
  max-width: 1440px;
  margin: 0 auto;
  align-items: start;
}

.introduction {
  position: sticky;
  top: 120px;
}

.eyebrow {
  display: block;
  margin: 0;
  font-family: var(--font-sans), sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: 1.7;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.introduction h2 {
  margin: 27px 0 28px;
  max-width: 610px;
  font-family: var(--font-serif), Georgia, serif;
  font-size: clamp(3.1rem, 5.15vw, 5.65rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.046em;
  text-wrap: balance;
}

.introduction h2 em {
  font-weight: 400;
  color: #8a7252;
}

.introCopy {
  max-width: 320px;
  margin: 0;
  font-family: var(--font-sans), sans-serif;
  font-size: 13px;
  line-height: 1.9;
  color: #626458;
}

.studioCard {
  display: block;
  margin-top: 56px;
  padding: 22px 0 20px;
  border-top: 1px solid #24282040;
  border-bottom: 1px solid #24282040;
  color: inherit;
  text-decoration: none;
}

.cardTop,
.cardBottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.cardTop .eyebrow { font-size: 9px; }

.phoneIcon {
  display: grid;
  width: 35px;
  height: 35px;
  place-items: center;
  border: 1px solid #24282035;
  border-radius: 50%;
  transition: background 250ms, color 250ms;
}

.studioCard:hover .phoneIcon {
  background: #242820;
  color: #f4f0e8;
}

.phoneNumber {
  display: block;
  padding: 7px 0 16px;
  font-family: var(--font-serif), Georgia, serif;
  font-size: clamp(2.1rem, 3.4vw, 3.5rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.cardBottom {
  font-family: var(--font-sans), sans-serif;
  font-size: 11px;
  color: #626458;
}

.cardBottom svg { transition: transform 250ms; }
.studioCard:hover .cardBottom svg { transform: translate(3px, -3px); }

.formPanel {
  min-width: 0;
  padding-top: 3px;
  font-family: var(--font-sans), sans-serif;
}

.formIntro {
  padding-bottom: 24px;
  margin-bottom: 28px;
  border-bottom: 1px solid #24282040;
}

.formIntro p {
  margin: 12px 0 0;
  font-family: var(--font-serif), Georgia, serif;
  font-size: 28px;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 26px 24px;
}

.field { min-width: 0; }
.full { grid-column: 1 / -1; }

.field > label,
.reviewLabel {
  display: block;
  margin-bottom: 8px;
  font-family: var(--font-sans), sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: 1.7;
  letter-spacing: 0.03em;
}

.optional { color: #6e6f65; font-weight: 400; }

.field input,
.field select,
.field textarea {
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 44px;
  padding: 9px 0 11px;
  border: 0;
  border-bottom: 1px solid #2428204d;
  border-radius: 0;
  background: transparent;
  color: #242820;
  font-family: var(--font-sans), sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6;
  transition: border-color 180ms;
}

.field select { padding-right: 18px; cursor: pointer; }
.field select option { background: #f4f0e8; color: #242820; }
.field textarea { resize: vertical; min-height: 92px; }
.field input::placeholder,
.field textarea::placeholder { color: #77796d; opacity: 1; }
.field input:hover,
.field textarea:hover,
.field select:hover { border-bottom-color: #242820a0; }

.section :is(button, a, input, select, textarea):focus-visible,
.reviewPanel h3:focus-visible,
.errorSummary:focus-visible {
  outline: 2px solid #8a7252;
  outline-offset: 5px;
}

.field :is(input, select, textarea)[aria-invalid="true"] { border-color: #8c382f; }

.fieldError {
  margin: 7px 0 0;
  color: #8c382f;
  font-size: 11px;
  line-height: 1.55;
}

.errorSummary {
  margin: 0 0 25px;
  padding: 13px 15px;
  border-left: 2px solid #8c382f;
  background: #8c382f09;
  color: #8c382f;
  font-size: 12px;
  line-height: 1.65;
}

.consentWrap { margin-top: 25px; }
.consent {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  width: fit-content;
  cursor: pointer;
  color: #626458;
  font-size: 11px;
  line-height: 1.7;
}

.consent input {
  width: 15px;
  height: 15px;
  flex: 0 0 15px;
  margin-top: 2px;
  accent-color: #242820;
  cursor: pointer;
}

.submitButton {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  min-height: 62px;
  margin-top: 28px;
  padding: 18px 25px;
  border: 1px solid #242820;
  background: #242820;
  color: #f4f0e8;
  cursor: pointer;
  font-family: var(--font-sans), sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  transition: background 220ms, color 220ms;
}

.submitButton:hover:not(:disabled) { background: #393c32; }
.submitButton:disabled { cursor: wait; opacity: 0.7; }
.submitButton svg { flex-shrink: 0; }

.privacyNote {
  margin: 13px 0 0;
  max-width: 430px;
  color: #6e6f65;
  font-family: var(--font-sans), sans-serif;
  font-size: 10px;
  line-height: 1.8;
}

.honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.deliveryError {
  margin-top: 24px;
  padding: 15px 17px;
  border: 1px solid #8c382f50;
  font-size: 12px;
  line-height: 1.7;
}

.deliveryError p { margin: 0 0 10px; color: #8c382f; }

.textButton {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  min-height: 44px;
  padding: 4px 0;
  border: 0;
  background: transparent;
  color: #242820;
  cursor: pointer;
  font-family: var(--font-sans), sans-serif;
  font-size: 11px;
  line-height: 1.6;
  text-decoration: none;
  text-underline-offset: 5px;
}

.textButton:hover { text-decoration: underline; }

.reviewPanel {
  padding: 27px 0 0;
  border-top: 1px solid #24282070;
}

.reviewPanel h3 {
  margin: 19px 0;
  max-width: 440px;
  font-family: var(--font-serif), Georgia, serif;
  font-size: clamp(2.2rem, 3.5vw, 3.2rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.035em;
}

.reviewStatus {
  margin: 0 0 26px;
  max-width: 450px;
  font-size: 12px;
  line-height: 1.8;
  color: #626458;
}

.reviewText {
  display: block;
  width: 100%;
  min-height: 265px;
  padding: 19px;
  border: 1px solid #24282038;
  border-radius: 0;
  background: #ffffff30;
  color: #242820;
  resize: vertical;
  font-family: var(--font-sans), sans-serif;
  font-size: 12px;
  line-height: 1.85;
}

.handoffActions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 15px;
}

.actionButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 47px;
  padding: 12px;
  border: 1px solid #24282065;
  border-radius: 0;
  background: transparent;
  color: #242820;
  cursor: pointer;
  font-family: var(--font-sans), sans-serif;
  font-size: 10px;
  line-height: 1.6;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: background 180ms, color 180ms;
}

.actionButton:hover { background: #242820; color: #f4f0e8; }
.smsButton { grid-column: 1 / -1; background: #242820; color: #f4f0e8; }
.smsButton:hover { background: #393c32; }
.copyStatus { margin: 12px 0 0; min-height: 18px; color: #626458; font-size: 11px; line-height: 1.7; }
.reviewFooter { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 1px solid #24282030; margin-top: 28px; padding-top: 15px; }
.spinner { animation: turn 1s linear infinite; }
@keyframes turn { to { transform: rotate(360deg); } }

@media (min-width: 1600px) {
  .section { padding-top: 160px; padding-bottom: 160px; }
}

@media (max-width: 1050px) {
  .inner { gap: 48px; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr); }
  .fields { gap: 24px 18px; }
  .introduction h2 { font-size: clamp(3rem, 5.2vw, 4.2rem); }
}

@media (max-width: 760px) {
  .section { padding: 82px 6% 88px; }
  .inner { grid-template-columns: minmax(0, 1fr); gap: 52px; }
  .introduction { position: relative; top: auto; }
  .introduction h2 { max-width: 550px; font-size: clamp(3.5rem, 9.3vw, 4.8rem); }
  .introCopy { max-width: 420px; }
  .studioCard { margin-top: 34px; }
  .phoneNumber { font-size: 2.8rem; }
  .formIntro { margin-bottom: 25px; }
  .field input,
  .field select,
  .field textarea { font-size: 16px; }
  .field > label { font-size: 11px; }
  .reviewText { font-size: 16px; }
  .privacyNote { font-size: 11px; }
}

@media (max-width: 480px) {
  .fields { grid-template-columns: minmax(0, 1fr); gap: 24px; }
  .introduction h2 { font-size: clamp(3.2rem, 12vw, 4rem); }
  .formIntro p { font-size: 26px; }
  .submitButton { padding: 18px 20px; }
  .consent { font-size: 11px; }
}

@media (prefers-reduced-motion: reduce) {
  .section *,
  .section *::before,
  .section *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```


## components/Contact.tsx

```tsx
"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Download, LoaderCircle, MessageSquare, Phone } from "lucide-react";
import {
  EMPTY_INQUIRY,
  EVENT_TYPES,
  formatInquiry,
  getNairobiDate,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
  type InquiryField,
} from "@/lib/inquiry";
import styles from "./Contact.module.css";

const PHONE_URI = "tel:+251941097286";
type TextField = Exclude<InquiryField, "consent">;

function Field({
  id,
  label,
  optional = false,
  error,
  children,
  full = false,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`${styles.field} ${full ? styles.full : ""}`}>
      <label htmlFor={id}>
        {label}{optional && <span className={styles.optional}> (optional)</span>}
      </label>
      {children}
      {error && <p className={styles.fieldError} id={`${id}-error`}>{error}</p>}
    </div>
  );
}

export default function Contact({ deliveryConfigured = false }: { deliveryConfigured?: boolean }) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const reviewRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const pendingRef = useRef(false);
  const [fields, setFields] = useState({ ...EMPTY_INQUIRY });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [mode, setMode] = useState<"form" | "review" | "sent">("form");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [deliveryUnconfirmed, setDeliveryUnconfirmed] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [today, setToday] = useState("");
  // A statically generated page may be visited days after its build. Resolve
  // the date after hydration so the HTML stays consistent and the limit is fresh.
  useEffect(() => { setToday(getNairobiDate()); }, []);

  function updateField<K extends InquiryField>(field: K, value: (typeof EMPTY_INQUIRY)[K]) {
    setFields((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[field];
      delete next.form;
      return next;
    });
    setSubmissionError("");
  }

  const inputProps = (field: TextField) => ({
    id: `${id}-${field}`,
    name: field,
    value: fields[field],
    disabled: isSubmitting,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      updateField(field, event.target.value),
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
  });

  function focusError(nextErrors: InquiryErrors) {
    requestAnimationFrame(() => {
      const firstField = Object.keys(nextErrors).find((field) => field !== "form");
      const element = firstField ? formRef.current?.elements.namedItem(firstField) : null;
      if (element instanceof HTMLElement) element.focus();
      else errorRef.current?.focus();
    });
  }

  function focusReview() {
    requestAnimationFrame(() => {
      reviewRef.current?.focus({ preventScroll: true });
      reviewRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    });
  }

  function prepareReview(inquiry: Inquiry) {
    setReviewText(formatInquiry(inquiry));
    setCopyStatus("");
    setMode("review");
    focusReview();
  }

  function prepareManually() {
    const validation = validateInquiry(fields);
    if (!validation.ok) {
      setErrors(validation.errors);
      focusError(validation.errors);
      return;
    }
    prepareReview(validation.data);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRef.current) return;
    const validation = validateInquiry(fields);
    if (!validation.ok) {
      setErrors(validation.errors);
      focusError(validation.errors);
      return;
    }
    setErrors({});
    setSubmissionError("");
    if (!deliveryConfigured) {
      setDeliveryUnconfirmed(false);
      prepareReview(validation.data);
      return;
    }

    pendingRef.current = true;
    setIsSubmitting(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
        signal: controller.signal,
      });
      const result = await response.json() as { ok?: boolean; message?: string; errors?: InquiryErrors };
      if (!response.ok || result.ok !== true) {
        if (result.errors) {
          setErrors(result.errors);
          focusError(result.errors);
        }
        setDeliveryUnconfirmed(response.status >= 500);
        setSubmissionError(result.message || "Delivery could not be confirmed. Please use the manual contact options.");
        return;
      }
      setReviewText(formatInquiry(validation.data));
      setMode("sent");
      setCopyStatus("");
      setDeliveryUnconfirmed(false);
      focusReview();
    } catch {
      setDeliveryUnconfirmed(true);
      setSubmissionError("Delivery could not be confirmed. Your details are still here; please call the studio or prepare a manual inquiry below.");
    } finally {
      clearTimeout(timeout);
      pendingRef.current = false;
      setIsSubmitting(false);
    }
  }

  async function copyInquiry() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(reviewText);
      setCopyStatus("Copied. You can paste your inquiry into a message.");
    } catch {
      textRef.current?.focus();
      textRef.current?.select();
      setCopyStatus("Your inquiry text is selected. Use your device’s Copy command to copy it.");
    }
  }

  function downloadInquiry() {
    const url = URL.createObjectURL(new Blob([reviewText], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "timeless-event-inquiry.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function editDetails() {
    setMode("form");
    setSubmissionError("");
    requestAnimationFrame(() => {
      const name = formRef.current?.elements.namedItem("name");
      if (name instanceof HTMLElement) name.focus();
    });
  }

  return (
    <section className={styles.section} id="contact" aria-labelledby={`${id}-heading`}>
      <div className={styles.inner}>
        <motion.div
          className={styles.introduction}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          <p className={styles.eyebrow}>Your next chapter</p>
          <h2 id={`${id}-heading`}>Every extraordinary event begins with a <em>conversation.</em></h2>
          <p className={styles.introCopy}>A place. A feeling. A first idea. Tell us what you are imagining, and let’s begin there.</p>

          <a className={styles.studioCard} href={PHONE_URI} aria-label="Call Timeless Decor and Event on 0941097286">
            <span className={styles.cardTop}>
              <span className={styles.eyebrow}>Speak to our studio</span>
              <span className={styles.phoneIcon}><Phone size={17} strokeWidth={1.4} aria-hidden="true" /></span>
            </span>
            <span className={styles.phoneNumber}>0941097286</span>
            <span className={styles.cardBottom}>Timeless Decor and Event <ArrowUpRight size={17} aria-hidden="true" /></span>
          </a>
        </motion.div>

        <motion.div
          className={styles.formPanel}
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {mode === "form" ? (
            <>
              <div className={styles.formIntro}>
                <span className={styles.eyebrow}>An invitation to imagine</span>
                <p>A few details, a world of possibility.</p>
              </div>
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                {Object.keys(errors).length > 0 && (
                  <p className={styles.errorSummary} role="alert" ref={errorRef} tabIndex={-1}>
                    {errors.form || "Please check the highlighted fields below."}
                  </p>
                )}
                <div className={styles.fields}>
                  <Field id={`${id}-name`} label="Your name" error={errors.name}>
                    <input {...inputProps("name")} autoComplete="name" placeholder="Full name" required maxLength={100} />
                  </Field>
                  <Field id={`${id}-phone`} label="Phone number" error={errors.phone}>
                    <input {...inputProps("phone")} type="tel" autoComplete="tel" placeholder="Your contact number" required maxLength={40} />
                  </Field>
                  <Field id={`${id}-email`} label="Email address" optional error={errors.email}>
                    <input {...inputProps("email")} type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} />
                  </Field>
                  <Field id={`${id}-eventType`} label="Occasion" error={errors.eventType}>
                    <select {...inputProps("eventType")} required>
                      <option value="">Select your occasion</option>
                      {EVENT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </Field>
                  <Field id={`${id}-eventDate`} label="Preferred date" optional error={errors.eventDate}>
                    <input {...inputProps("eventDate")} type="date" min={today || undefined} />
                  </Field>
                  <Field id={`${id}-guestCount`} label="Number of guests" optional error={errors.guestCount}>
                    <input {...inputProps("guestCount")} type="number" inputMode="numeric" min={1} max={100000} step={1} placeholder="Estimated guest count" />
                  </Field>
                  <Field id={`${id}-budget`} label="Budget range" optional error={errors.budget}>
                    <input {...inputProps("budget")} placeholder="Your preferred range & currency" maxLength={160} />
                  </Field>
                  <Field id={`${id}-venue`} label="Venue or location" optional error={errors.venue}>
                    <input {...inputProps("venue")} placeholder="A venue, a city, or still deciding" maxLength={200} />
                  </Field>
                  <Field id={`${id}-message`} label="The feeling you have in mind" optional error={errors.message} full>
                    <textarea {...inputProps("message")} rows={3} maxLength={3000} placeholder="Tell us about the atmosphere, the details, the moment…" />
                  </Field>
                </div>

                <div className={styles.honeypot} aria-hidden="true">
                  <label htmlFor={`${id}-website`}>Leave this field empty</label>
                  <input {...inputProps("website")} tabIndex={-1} autoComplete="off" />
                </div>
                <div className={styles.consentWrap}>
                  <label className={styles.consent} htmlFor={`${id}-consent`}>
                    <input
                      id={`${id}-consent`}
                      name="consent"
                      type="checkbox"
                      checked={fields.consent}
                      disabled={isSubmitting}
                      onChange={(event) => updateField("consent", event.target.checked)}
                      required
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
                    />
                    <span>I agree that Timeless Decor and Event may contact me about this inquiry.</span>
                  </label>
                  {errors.consent && <p className={styles.fieldError} id={`${id}-consent-error`}>{errors.consent}</p>}
                </div>

                {submissionError && (
                  <div className={styles.deliveryError}>
                    <p role="alert">{submissionError}</p>
                    <button type="button" onClick={prepareManually} className={styles.textButton}>
                      Prepare a manual inquiry <ArrowUpRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                )}

                <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                  <span>{isSubmitting ? "Submitting your inquiry" : deliveryConfigured ? "Send my inquiry" : "Prepare my inquiry"}</span>
                  {isSubmitting
                    ? <LoaderCircle size={19} className={styles.spinner} aria-hidden="true" />
                    : <ArrowRight size={21} strokeWidth={1.4} aria-hidden="true" />}
                </button>
                <p className={styles.privacyNote}>
                  {deliveryConfigured
                    ? "Your details will be used to respond to this inquiry. Submitting a request does not confirm a booking."
                    : "Review your inquiry, then choose how to share it. Preparing this form does not send your details."}
                </p>
              </form>
            </>
          ) : (
            <div className={styles.reviewPanel}>
              <span className={styles.eyebrow}>{mode === "sent" ? "A beautiful beginning" : "One step closer"}</span>
              <h3 ref={reviewRef} tabIndex={-1}>
                {mode === "sent" ? "Your inquiry has been submitted." : "Your vision, ready to share."}
              </h3>
              <p className={styles.reviewStatus} role="status">
                {mode === "sent"
                  ? "The booking service has accepted your details. Please call the studio if you need to confirm availability."
                  : deliveryUnconfirmed
                    ? "Your inquiry is ready. Delivery could not be confirmed. Please contact the studio before sending again."
                    : "Your inquiry is ready. It has not been sent."}
              </p>
              <label htmlFor={`${id}-review`} className={styles.reviewLabel}>Your inquiry — select or copy the text</label>
              <textarea id={`${id}-review`} className={styles.reviewText} ref={textRef} value={reviewText} readOnly rows={11} spellCheck={false} />
              <div className={styles.handoffActions}>
                <button type="button" onClick={copyInquiry} className={styles.actionButton}>
                  {copyStatus.startsWith("Copied") ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  Copy inquiry
                </button>
                <button type="button" onClick={downloadInquiry} className={styles.actionButton}>
                  <Download size={16} aria-hidden="true" /> Save as text
                </button>
                {mode !== "sent" && (
                  <a href={`sms:+251941097286?body=${encodeURIComponent(reviewText)}`} className={`${styles.actionButton} ${styles.smsButton}`}>
                    <MessageSquare size={16} aria-hidden="true" /> Open SMS <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
              <p className={styles.copyStatus} aria-live="polite">{copyStatus}</p>
              {mode !== "sent" && <p className={styles.privacyNote}>SMS opens your device’s messaging app. Review the message and send it there when you are ready.</p>}
              <div className={styles.reviewFooter}>
                <button type="button" className={styles.textButton} onClick={editDetails}><ArrowLeft size={15} aria-hidden="true" /> Edit details</button>
                <a className={styles.textButton} href={PHONE_URI}>Call the studio <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
```


## components/Dialog.tsx

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";

export default function Dialog({ open, onClose, title, children, className = "" }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const reduced = useReducedMotion();
  const curtain = className.includes("menu-dialog");
  useEffect(() => {
    const node = ref.current;
    if (!node || !open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <dialog ref={ref} aria-labelledby={id} className={`dialog-shell ${className}`}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      {open && <motion.div className="dialog-content" initial={{ opacity: curtain ? 1 : 0, y: reduced ? 0 : curtain ? "100%" : 24 }}
        animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : curtain ? 0.75 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <h2 id={id} className="sr-only">{title}</h2>
        <button type="button" className="dialog-close icon-button" onClick={onClose} aria-label="Close dialog">
          <X size={22} aria-hidden="true" />
        </button>
        {children}
      </motion.div>}
    </dialog>
  );
}
```


## components/Footer.tsx

```tsx
"use client";

import { ArrowUp, ArrowUpRight, Camera, Music2, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import Dialog from "./Dialog";
import { siteConfig, socialLinks } from "@/lib/site";

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  return <>
    <footer className="footer">
      <div className="footer-top">
        <p>Some moments deserve<br />to be <em>timeless.</em></p>
        <nav aria-label="Footer navigation"><a href="#story">Our philosophy</a><a href="#portfolio">Selected worlds</a><a href="#process">The experience</a><a href="#contact">Begin a conversation</a></nav>
        <div className="footer-contact"><a href={siteConfig.phoneHref}><Phone size={15} aria-hidden="true" />{siteConfig.phone}<ArrowUpRight size={16} aria-hidden="true" /></a>
          <div className="footer-socials">{socialLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} (opens in a new tab)`}>{link.label === "Instagram" ? <Camera size={17} aria-hidden="true" /> : <Music2 size={17} aria-hidden="true" />}<span>{link.label}</span></a>)}</div>
        </div>
      </div>
      <a href="#home" className="footer-wordmark" aria-label="Timeless Decor and Event, back to top">timeless<span>.</span></a>
      <div className="footer-bottom"><span>© {year ?? ""} TIMELESS DECOR AND EVENT</span><button type="button" onClick={() => setPrivacyOpen(true)}>Privacy & inquiries</button><a href="#home">BACK TO TOP <ArrowUp size={13} aria-hidden="true" /></a></div>
    </footer>
    <Dialog open={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Privacy and inquiries" className="privacy-dialog">
      <div className="privacy-copy"><span className="eyebrow">A NOTE ON YOUR DETAILS</span><h2>Privacy &<br /><em>inquiries.</em></h2>
        <p>The inquiry form uses the details you provide to prepare your event request. If online delivery is available, choosing to send forwards those details to the studio’s configured inquiry service. Otherwise, you choose whether to copy, download or share the prepared message by SMS.</p>
        <p>Preparing a message alone does not send it. Opening an SMS draft does not send it either; your messaging app asks you to complete that step. Your carrier’s usual messaging charges may apply.</p>
        <p>This website does not include advertising trackers or an analytics service. Fonts and décor media are served with the website. Your browser and the website host still exchange the technical information required to load pages.</p>
        <p>For questions about information you have shared, contact Timeless on <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.</p>
      </div>
    </Dialog>
  </>;
}
```


## components/Hero.tsx

```tsx
"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Pause, Play, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/hero";
import Dialog from "./Dialog";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [filmOpen, setFilmOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [autoplayAllowed, setAutoplayAllowed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [filmFailed, setFilmFailed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const filmRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.08 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const slide = heroSlides[index];
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setAutoplayAllowed(reduced === false && !connection?.saveData);
  }, [reduced]);
  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (autoplayAllowed && inView && pageVisible && !paused && !filmOpen) {
      void video.play().catch(() => setPlaying(false));
    } else video.pause();
    return () => video.pause();
  }, [autoplayAllowed, inView, pageVisible, paused, filmOpen, index]);
  useEffect(() => {
    const video = filmRef.current;
    if (!filmOpen || !video) return;
    return () => video.pause();
  }, [filmOpen]);
  const selectSlide = (next: number) => {
    if (next === index) return;
    setIndex(next); setFailed(false); setPaused(false); setPlaying(false);
  };
  const toggleBackground = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setPaused(false);
      void video.play().catch(() => setPlaying(false));
    } else { setPaused(true); video.pause(); }
  };

  return <>
    <section id="home" ref={sectionRef} className="hero" aria-label="The art of celebration">
      <motion.div className="hero-media" style={{ y: reduced ? 0 : mediaY }}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div key={slide.id} className="hero-panels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.85 }}>
            <div className="hero-panel hero-panel-left"><Image src={slide.left} alt="" fill priority={index === 0} sizes="(max-width: 700px) 20vw, 28vw" className="object-cover" /></div>
            <div className="hero-panel hero-panel-center">
              <Image src={slide.image} alt={slide.alt} fill priority sizes="(max-width: 700px) 100vw, 44vw" className="object-cover" />
            </div>
            <div className="hero-panel hero-panel-right"><Image src={slide.right} alt="" fill priority={index === 0} sizes="(max-width: 700px) 20vw, 28vw" className="object-cover" /></div>
          </motion.div>
        </AnimatePresence>
        {slide.video && autoplayAllowed && !failed && <div className="hero-video-wrap"><video key={slide.id} ref={videoRef} src={slide.video} poster={slide.image}
          className="hero-video" muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}
          onError={() => { setFailed(true); setPlaying(false); }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} /></div>}
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>THOUGHTFULLY IMAGINED. BEAUTIFULLY LIVED.</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>For moments<br /><em>beyond words.</em></motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>Beautiful spaces. Deeply personal celebrations.<br />Memories that stay.</motion.p>
        <motion.a href="#contact" className="button hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }}>Begin your celebration <ArrowUpRight size={17} aria-hidden="true" /></motion.a>
      </div>
      <span className="hero-side-note" aria-hidden="true">FLORAL DESIGN · SPATIAL STYLING · EVENT PRODUCTION</span>
      <div className="hero-bottom">
        <a href="#story" className="scroll-cue"><span className="circle-arrow"><ArrowDown size={17} aria-hidden="true" /></span><span>SCROLL TO<br />DISCOVER</span></a>
        <div className="hero-chapters" aria-label="Choose a visual chapter">
          {heroSlides.map((item, position) => <button type="button" key={item.id} aria-pressed={position === index} onClick={() => selectSlide(position)} aria-label={`View ${item.label}`}>
            <span className="chapter-line" /><span className="chapter-label">0{position + 1}<span>{item.label}</span></span>
          </button>)}
        </div>
        <div className="hero-film-actions">
          {slide.video && <button type="button" className="watch-film" onClick={() => { setFilmFailed(false); setFilmOpen(true); }}><Play size={13} fill="currentColor" aria-hidden="true" /><span>STEP INSIDE</span></button>}
          {slide.video && autoplayAllowed && !failed && <button type="button" className="icon-button hero-pause" onClick={toggleBackground} aria-label={playing ? "Pause background film" : "Play background film"}>{playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}</button>}
        </div>
      </div>
    </section>
    <div className="discipline-strip" aria-label="Celebrations we design"><span>Weddings</span><span className="strip-mark" aria-hidden="true"><Plus size={14} strokeWidth={1} /></span><span>Private soirées</span><span className="strip-mark" aria-hidden="true"><Plus size={14} strokeWidth={1} /></span><span>Stage & spatial design</span><span className="strip-mark" aria-hidden="true"><Plus size={14} strokeWidth={1} /></span><span>Corporate gatherings</span></div>
    <Dialog open={filmOpen} onClose={() => setFilmOpen(false)} title={`Step inside: ${slide.label}`} className="film-dialog">
      <div className="film-view"><p className="eyebrow">THE TIMELESS COLLECTION · {slide.label}</p>
        {filmFailed ? <div className="film-error" role="status"><p>The film could not load.</p><a href={slide.video || slide.image} target="_blank" rel="noopener noreferrer" className="text-link">Open the original film <ArrowUpRight size={16} aria-hidden="true" /></a></div> : <video ref={filmRef} key={slide.video} src={slide.video || undefined} poster={slide.image} controls autoPlay playsInline preload="metadata" aria-label={`${slide.label}: a silent décor film`} onError={() => setFilmFailed(true)}>
          Your browser does not support this film. <a href={slide.video || slide.image}>Open the media</a>.
        </video>}
        <p>{slide.caption}</p>
      </div>
    </Dialog>
  </>;
}
```


## components/Navbar.tsx

```tsx
"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Dialog from "./Dialog";
import { siteConfig, socialLinks } from "@/lib/site";

const links = [
  { label: "The beginning", href: "#home", image: "/media/hero.webp" },
  { label: "Our philosophy", href: "#story", image: "/media/detail.webp" },
  { label: "Selected worlds", href: "#portfolio", image: "/media/wedding.webp" },
  { label: "The experience", href: "#process", image: "/media/stage.webp" },
  { label: "Your celebration", href: "#contact", image: "/media/soiree.webp" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);
  const destination = useRef<string | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (open || !destination.current) return;
    const hash = destination.current;
    destination.current = null;
    const frame = requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      const heading = target.querySelector<HTMLElement>("h1,h2") || target;
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
      history.replaceState(null, "", hash);
    });
    return () => cancelAnimationFrame(frame);
  }, [open, reduced]);
  return <>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="wordmark" href="#home" aria-label="Timeless Decor and Event, home">
        <span>timeless<span className="wordmark-dot">.</span></span><small>DECOR AND EVENT</small>
      </a>
      <span className="header-note">The art of celebration</span>
      <div className="header-actions">
        <a className="header-consult" href="#contact">Let’s create together <ArrowUpRight size={15} aria-hidden="true" /></a>
        <button className="menu-trigger" type="button" aria-haspopup="dialog" aria-expanded={open}
          onClick={() => setOpen(true)}>MENU <Plus size={21} strokeWidth={1.2} aria-hidden="true" /></button>
      </div>
    </header>
    <Dialog open={open} onClose={() => setOpen(false)} title="Explore Timeless" className="menu-dialog">
      <div className="menu-layout">
        <div className="menu-main">
          <p className="eyebrow menu-overline">TIMELESS DECOR AND EVENT</p>
          <nav aria-label="Main navigation"><ol className="menu-list">
            {links.map((link, index) => <motion.li key={link.href}
              initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: index * 0.065 }}>
              <a href={link.href} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault(); destination.current = link.href; setOpen(false);
              }}>
                <span className="menu-number">0{index + 1}</span><span>{link.label}</span><ArrowUpRight aria-hidden="true" />
              </a>
            </motion.li>)}
          </ol></nav>
          <div className="menu-contact">
            <div><span className="eyebrow">A CONVERSATION AWAY</span><a className="menu-phone" href={siteConfig.phoneHref}>{siteConfig.phone} <ArrowUpRight size={19} aria-hidden="true" /></a></div>
            <div className="menu-socials">{socialLinks.map((link) => <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.label}>{link.label} <ArrowUpRight size={13} aria-hidden="true" /></a>)}</div>
          </div>
        </div>
        <aside className="menu-visual" aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.div key={active} className="menu-image" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
              <Image src={links[active].image} alt="" fill sizes="40vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <p>Some moments<br />deserve to be <em>timeless.</em></p>
        </aside>
      </div>
    </Dialog>
  </>;
}
```


## components/Portfolio.module.css

```css
.section { background: #f4f0e8; color: #242820; padding: 115px 0 85px; scroll-margin-top: 80px; }
.container { width: min(1440px, 88%); margin: 0 auto; }
.intro { display: flex; align-items: flex-end; justify-content: space-between; gap: 60px; }
.eyebrow { display: flex; align-items: center; gap: 12px; margin: 0 0 30px; text-transform: uppercase; font-size: 10px; line-height: 1.5; font-weight: 500; letter-spacing: .19em; }
.eyebrow > span { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: #ad9473; }
.heading { margin: 0; font-family: var(--font-serif), Georgia, serif; font-size: clamp(60px, 6.6vw, 108px); line-height: .95; font-weight: 400; letter-spacing: -.047em; }
.heading em { font-weight: 400; color: #8b7c66; }
.introAside { width: 270px; padding-bottom: 5px; flex-shrink: 0; }
.introAside p { color: #696b60; font-size: 13px; line-height: 1.9; margin: 0 0 24px; }
.discover { display: inline-flex; align-items: center; gap: 24px; font-size: 10px; text-transform: uppercase; letter-spacing: .1em; padding: 8px 0; }
.discover svg { transition: transform .3s ease; }
.discover:hover svg { transform: translateY(4px); }
.filters { display: flex; gap: 34px; margin: 60px 0 42px; border-bottom: 1px solid #24282028; overflow-x: auto; scrollbar-width: thin; }
.filters button { appearance: none; flex: 0 0 auto; position: relative; display: flex; align-items: center; gap: 10px; padding: 15px 0 19px; border: 0; border-bottom: 1px solid transparent; color: #696b60; background: transparent; font-size: 11px; line-height: 1.4; cursor: pointer; transition: color .25s ease; }
.filters button span { font-size: 8px; align-self: flex-start; padding-top: 1px; }
.filters button:hover, .filters button.activeFilter { color: #242820; }
.filters button.activeFilter { border-bottom-color: #242820; }
.grid { display: grid; grid-template-columns: 1.08fr .86fr; gap: 38px 9%; align-items: start; scroll-margin-top: 110px; }
.card { min-width: 0; }
.card:nth-child(even) { margin-top: 112px; }
.imageButton { position: relative; display: block; width: 100%; aspect-ratio: 1 / 1.04; padding: 0; border: 0; background: #e2ddcf; overflow: hidden; text-align: left; cursor: pointer; isolation: isolate; }
.card:nth-child(even) .imageButton { aspect-ratio: .82; }
.cover { object-fit: cover; transition: transform 1s cubic-bezier(.2,.7,.2,1); z-index: -1; }
.imageButton::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg,#0003 0%,transparent 35%,transparent 70%,#0003); z-index: -1; }
.imageButton:hover .cover, .imageButton:focus-visible .cover { transform: scale(1.035); }
.imageIndex { position: absolute; top: 24px; left: 24px; color: white; font-size: 9px; text-transform: uppercase; letter-spacing: .16em; text-shadow: 0 1px 7px #0006; }
.galleryPrompt { position: absolute; left: 24px; bottom: 24px; display: flex; align-items: center; gap: 23px; border: 1px solid #fff9; border-radius: 30px; background: #2428201a; backdrop-filter: blur(10px); color: #fff; padding: 12px 17px; font-size: 10px; letter-spacing: .05em; transition: background .3s ease; }
.imageButton:hover .galleryPrompt { background: #f4f0e8; color: #242820; }
.mediaCount { position: absolute; bottom: 37px; right: 24px; color: white; font-size: 9px; letter-spacing: .06em; text-shadow: 0 1px 7px #0006; }
.cardMeta { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin: 23px 0 10px; color: #696b60; font-size: 9px; text-transform: uppercase; letter-spacing: .15em; }
.cardMeta button { display: flex; gap: 6px; align-items: center; appearance: none; background: transparent; border: 0; padding: 4px 0; font-size: 9px; letter-spacing: .1em; color: #55584c; text-transform: uppercase; cursor: pointer; }
.cardMeta button:hover { color: #9c805a; }
.cardTitleRow { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.cardTitleRow h3 { font-family: var(--font-serif), Georgia, serif; font-size: clamp(33px,3vw,49px); font-weight: 400; letter-spacing: -.03em; line-height: 1.1; margin: 0; }
.cardTitleRow h3 button { background: none; border: 0; color: inherit; padding: 0; text-align: left; font: inherit; cursor: pointer; }
.caseButton { flex-shrink: 0; display: grid; place-items: center; width: 42px; height: 42px; background: none; border: 1px solid #24282030; border-radius: 50%; cursor: pointer; transition: color .3s, background .3s, transform .3s; }
.caseButton:hover { color: #f4f0e8; background: #242820; transform: rotate(45deg); }
.subtitle { color: #696b60; font-size: 11px; line-height: 1.7; margin: 11px 0 0; }
.outro { margin-top: 70px; display: flex; align-items: center; justify-content: space-between; gap: 25px; padding-top: 28px; border-top: 1px solid #24282028; }
.outro > span { color: #696b60; font-family: var(--font-serif), Georgia, serif; font-size: 22px; font-style: italic; }
.outro a, .textLink { display: inline-flex; align-items: center; gap: 22px; color: #242820; font-size: 10px; letter-spacing: .1em; text-transform: uppercase; background: none; border: 0; border-bottom: 1px solid #2428206b; padding: 8px 0; cursor: pointer; }
.outro a svg, .textLink svg { transition: transform .25s; }
.outro a:hover svg, .textLink:hover svg { transform: translate(2px, -2px); }
.emptyState { width: min(720px,100%); padding: 70px 0 50px; }
.emptyNumber { font-size: 9px; text-transform: uppercase; letter-spacing: .16em; color: #696b60; }
.emptyState h3 { font-family: var(--font-serif),Georgia,serif; font-size: clamp(38px,4.2vw,66px); font-weight: 400; line-height: 1.07; letter-spacing: -.035em; margin: 22px 0; }
.emptyState h3 em { font-weight: 400; color: #8b7c66; }
.emptyState p { max-width: 510px; font-size: 13px; line-height: 1.9; color: #696b60; margin: 0 0 24px; }
.srOnly { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.collectionDialog { max-width: 1100px; background: #f4f0e8; }
.mediaDialog { max-width: 1200px; background: #f4f0e8; }
.collectionDetail { display: grid; grid-template-columns: 1fr 1fr; min-height: 650px; }
.detailImage { position: relative; min-height: 450px; background: #d9d0bf; }
.detailImage img { object-fit: cover; }
.detailBody { padding: 66px 44px 42px; color: #242820; }
.detailBody .eyebrow { margin-bottom: 28px; font-size: 9px; }
.detailCategory { font-size: 9px; color: #696b60; text-transform: uppercase; letter-spacing: .1em; }
.detailBody h3 { font-family: var(--font-serif),Georgia,serif; font-size: 56px; letter-spacing: -.04em; line-height: 1.02; font-weight: 400; margin: 15px 0 23px; }
.description { font-size: 13px; line-height: 1.9; color: #65675b; }
.palette { display: flex; flex-wrap: wrap; gap: 16px; margin: 25px 0 31px; }
.palette > span { display: flex; align-items: center; gap: 7px; font-size: 9px; color: #65675b; }
.palette i { height: 18px; width: 18px; border-radius: 50%; border: 1px solid #24282018; }
.detailBody h4 { font-size: 9px; font-weight: 500; text-transform: uppercase; letter-spacing: .14em; margin: 0 0 14px; }
.detailBody ul { list-style: none; padding: 0; margin: 0 0 30px; }
.detailBody li { color: #65675b; font-size: 12px; line-height: 1.7; border-bottom: 1px solid #2428201a; padding: 10px 0; }
.detailContact { display: flex; align-items: center; gap: 10px; margin-top: 22px; font-size: 11px; color: #65675b; }
.lightbox { color: #242820; padding: 54px 35px 26px; }
.lightboxTop { display: flex; align-items: center; justify-content: space-between; padding: 0 0 20px; color: #696b60; font-size: 9px; text-transform: uppercase; letter-spacing: .14em; }
.mediaFrame { position: relative; display: flex; align-items: center; justify-content: center; min-height: 220px; height: min(62vh, 680px); width: 100%; overflow: hidden; background: #e4ded2; }
.lightboxImage { object-fit: contain; }
.mediaFrame video { display: block; width: 100%; height: 100%; object-fit: contain; }
.lightboxBottom { display: flex; align-items: flex-start; justify-content: space-between; gap: 30px; padding: 22px 0 0; }
.lightboxBottom h3 { font-family: var(--font-serif),Georgia,serif; font-size: 33px; font-weight: 400; letter-spacing: -.02em; margin: 0 0 8px; }
.mediaCaption { font-size: 11px; line-height: 1.7; color: #696b60; max-width: 620px; margin: 0; }
.mediaControls { display: flex; align-items: center; gap: 14px; flex-shrink: 0; padding-top: 3px; }
.mediaControls button { height: 40px; width: 40px; border: 1px solid #24282040; border-radius: 50%; display: grid; place-items: center; background: none; cursor: pointer; transition: background .2s,color .2s; }
.mediaControls button:hover { background: #242820; color: #f4f0e8; }
.mediaControls span { font-size: 9px; letter-spacing: .1em; font-variant-numeric: tabular-nums; }
.backToCollection { display: inline-flex; align-items: center; gap: 8px; font-size: 10px; border: 0; background: none; padding: 13px 0 0; color: #65675b; cursor: pointer; }
.videoFallback { text-align: center; color: #55584c; padding: 24px; }
.videoFallback > svg { margin: 0 auto; }
.videoFallback p { font-family: var(--font-serif),Georgia,serif; font-size: 30px; margin: 12px 0; }
.videoFallback a { display: flex; gap: 12px; align-items: center; justify-content: center; font-size: 12px; text-decoration: underline; }
.videoFallback button { display: block; margin: 15px auto 0; padding: 8px 14px; background: none; border: 1px solid #55584c; cursor: pointer; font-size: 11px; }
@media (min-width: 1800px) { .container { width: min(1600px,86%); } }
@media (max-width: 1000px) { .section { padding: 90px 0 65px; } .introAside { width: 235px; } .filters { gap: 26px; } .grid { gap: 40px 6%; } .card:nth-child(even) { margin-top: 80px; } .detailBody { padding: 60px 28px 35px; } .detailBody h3 { font-size: 46px; } }
@media (max-width: 700px) { .section { padding: 75px 0 55px; } .container { width: 88%; } .intro { display: block; } .eyebrow { font-size: 9px; margin-bottom: 25px; } .heading { font-size: clamp(57px,12vw,85px); } .introAside { width: 100%; max-width: 330px; margin: 26px 0 0 auto; } .introAside p { font-size: 12px; margin-bottom: 13px; } .filters { margin: 33px 0 28px; gap: 26px; } .filters button { font-size: 10px; padding: 13px 0 16px; } .grid { grid-template-columns: 1fr; gap: 42px; } .card:nth-child(even) { margin-top: 0; } .imageButton, .card:nth-child(even) .imageButton { aspect-ratio: 1 / 1.06; } .card:nth-child(even) { width: 92%; margin-left: auto; } .cardTitleRow h3 { font-size: 37px; } .imageIndex { top: 20px; left: 20px; } .galleryPrompt { bottom: 20px; left: 20px; } .mediaCount { bottom: 33px; right: 20px; } .outro { margin-top: 44px; align-items: flex-start; flex-direction: column; gap: 14px; } .outro > span { font-size: 23px; } .collectionDetail { display: block; min-height: 0; } .detailImage { min-height: 0; height: 290px; } .detailBody { padding: 29px 25px 32px; } .detailBody h3 { font-size: 45px; } .detailBody .eyebrow { margin-bottom: 20px; } .description { font-size: 12px; } .lightbox { padding: 56px 18px 25px; } .mediaFrame { height: 53vh; } .lightboxBottom { gap: 18px; flex-direction: column; } .lightboxBottom h3 { font-size: 34px; } .mediaCaption { font-size: 10px; } .mediaControls { width: 100%; justify-content: space-between; } .lightboxTop { font-size: 8px; } .emptyState { padding: 38px 0 20px; } }
@media (prefers-reduced-motion: reduce) { .cover, .galleryPrompt, .caseButton, .discover svg, .textLink svg, .outro a svg, .mediaControls button { transition: none; } .imageButton:hover .cover, .imageButton:focus-visible .cover, .caseButton:hover, .discover:hover svg { transform: none; } }
```


## components/Portfolio.tsx

```tsx
"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Play, Plus } from "lucide-react";
import { categories, portfolioItems, type PortfolioFilter } from "@/data/portfolio";
import Dialog from "./Dialog";
import Reveal from "./Reveal";
import styles from "./Portfolio.module.css";

interface Selection {
  itemId: string;
  mode: "collection" | "media";
  mediaIndex: number;
}

export default function Portfolio() {
  const [category, setCategory] = useState<PortfolioFilter>("All");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const mediaVideoRef = useRef<HTMLVideoElement>(null);
  const pendingContactNavigation = useRef(false);
  const reducedMotion = useReducedMotion();
  const filteredItems = portfolioItems.filter((item) => category === "All" || item.category === category);
  const selectedItem = portfolioItems.find((item) => item.id === selection?.itemId);
  const selectedMedia = selectedItem?.media[selection?.mediaIndex ?? 0];

  const close = useCallback(() => {
    setSelection(null);
    setFailedSource(null);
  }, []);

  const navigateMedia = useCallback((direction: number) => {
    setSelection((current) => {
      if (!current) return current;
      const item = portfolioItems.find((entry) => entry.id === current.itemId);
      if (!item?.media.length) return current;
      return { ...current, mediaIndex: (current.mediaIndex + direction + item.media.length) % item.media.length };
    });
    setFailedSource(null);
  }, []);

  useEffect(() => {
    if (selection?.mode !== "media" || !selectedItem || selectedItem.media.length < 2) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, select, video, audio, [contenteditable='true'], [role='slider']")) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        navigateMedia(event.key === "ArrowRight" ? 1 : -1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selection?.mode, selectedItem, navigateMedia]);

  // Switching views keeps the same native dialog open. Move focus to the new
  // content so it does not remain on a button that React just removed.
  useEffect(() => {
    if (selection) modalContentRef.current?.focus({ preventScroll: true });
  }, [selection?.mode, selection?.itemId]);

  // Stop the captured element even after React clears its ref on unmount.
  useEffect(() => {
    const video = mediaVideoRef.current;
    return () => { video?.pause(); };
  }, [selection?.mode, selectedMedia?.src, failedSource]);

  // Let Dialog restore its opener first, then move keyboard focus to the
  // destination of an explicit in-page navigation request.
  useEffect(() => {
    if (selection || !pendingContactNavigation.current) return;
    pendingContactNavigation.current = false;
    const target = document.getElementById("contact");
    if (!target) return;
    const focusTarget = target.querySelector<HTMLElement>("h2") ?? target;
    const addedTabIndex = !focusTarget.hasAttribute("tabindex");
    if (addedTabIndex) {
      focusTarget.tabIndex = -1;
      focusTarget.addEventListener("blur", () => focusTarget.removeAttribute("tabindex"), { once: true });
    }
    window.history.pushState(window.history.state, "", "#contact");
    target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
    focusTarget.focus({ preventScroll: true });
  }, [selection, reducedMotion]);

  const showMedia = (itemId: string, mediaIndex = 0) => {
    setFailedSource(null);
    setSelection({ itemId, mode: "media", mediaIndex });
  };

  const goToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    pendingContactNavigation.current = true;
    close();
  };

  return (
    <section id="portfolio" className={styles.section} aria-labelledby="portfolio-heading">
      <div className={styles.container}>
        <Reveal className={styles.intro}>
          <div>
            <p className={styles.eyebrow}><span /> The art of the occasion</p>
            <h2 id="portfolio-heading" className={styles.heading}>A world of<br /><em>possibilities.</em></h2>
          </div>
          <div className={styles.introAside}>
            <p>A glimpse into our language of colour, texture and atmosphere. Every setting begins with a feeling.</p>
            <a href="#collection-grid" className={styles.discover}>Discover the collection <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </Reveal>

        <div className={styles.filters} role="group" aria-label="Filter portfolio collections">
          {categories.map((entry) => {
            const count = portfolioItems.filter((item) => entry === "All" || item.category === entry).length;
            return (
              <button type="button" key={entry} onClick={() => setCategory(entry)} aria-pressed={category === entry} className={category === entry ? styles.activeFilter : undefined}>
                {entry}<span aria-label={`${count} collections`}>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <p className={styles.srOnly} role="status">{filteredItems.length} {filteredItems.length === 1 ? "collection" : "collections"} shown{category === "All" ? "" : ` in ${category}`}.</p>
        <div id="collection-grid" className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const itemNumber = String(portfolioItems.indexOf(item) + 1).padStart(2, "0");
              const videoIndex = item.media.findIndex((media) => media.type === "video");
              return (
                <motion.article key={item.id} layout={!reducedMotion} initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : (index % 2) * 0.08 }} className={styles.card}>
                  <button type="button" className={styles.imageButton} onClick={() => showMedia(item.id)} aria-label={`Open ${item.title} gallery`}>
                    <Image src={item.cover} alt={item.coverAlt} fill sizes="(max-width: 680px) 90vw, (max-width: 1100px) 44vw, 42vw" style={{ objectPosition: item.coverPosition ?? "center" }} className={styles.cover} />
                    <span className={styles.imageIndex}>{itemNumber} / Collection</span>
                    <span className={styles.galleryPrompt}>View gallery <Plus size={17} strokeWidth={1.4} aria-hidden="true" /></span>
                    <span className={styles.mediaCount}>{item.media.length} {item.media.length === 1 ? "study" : "studies"}</span>
                  </button>
                  <div className={styles.cardMeta}>
                    <span>{item.category}</span>
                    {videoIndex !== -1 && <button type="button" onClick={() => showMedia(item.id, videoIndex)} aria-label={`Watch ${item.title} film`}><Play size={10} fill="currentColor" aria-hidden="true" /> Watch film</button>}
                  </div>
                  <div className={styles.cardTitleRow}>
                    <h3><button type="button" onClick={() => setSelection({ itemId: item.id, mode: "collection", mediaIndex: 0 })}>{item.title}</button></h3>
                    <button type="button" className={styles.caseButton} onClick={() => setSelection({ itemId: item.id, mode: "collection", mediaIndex: 0 })} aria-label={`Explore ${item.title} collection`}><ArrowUpRight size={22} strokeWidth={1.3} aria-hidden="true" /></button>
                  </div>
                  <p className={styles.subtitle}>{item.subtitle}</p>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.emptyState}>
            <span className={styles.emptyNumber}>Your next occasion</span>
            <h3>A different stage.<br /><em>The same attention to detail.</em></h3>
            <p>Planning a corporate gala? Let’s discuss the setting, the guest experience and the story your event should tell. Our published corporate collection is still to come.</p>
            <a href="#contact" className={styles.textLink}>Discuss your event <ArrowUpRight size={18} aria-hidden="true" /></a>
          </motion.div>
        )}

        <Reveal className={styles.outro}>
          <span>A feeling is only the beginning.</span>
          <a href="#contact">Let’s create yours <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" /></a>
        </Reveal>
      </div>

      <Dialog open={selection !== null} onClose={close} title={selectedItem?.title ?? "Studio collection"} className={selection?.mode === "media" ? styles.mediaDialog : styles.collectionDialog}>
        {selectedItem && selection?.mode === "collection" && (
          <div className={styles.collectionDetail} ref={modalContentRef} tabIndex={-1} role="document" aria-label={`${selectedItem.title} collection details`}>
            <div className={styles.detailImage}><Image src={selectedItem.cover} alt={selectedItem.coverAlt} fill sizes="(max-width: 800px) 90vw, 44vw" /></div>
            <div className={styles.detailBody}>
              <p className={styles.eyebrow}>From the studio collection</p>
              <span className={styles.detailCategory}>{selectedItem.category} · Visual study</span>
              <h3>{selectedItem.title}</h3>
              <p className={styles.description}>{selectedItem.description}</p>
              <div className={styles.palette} aria-label="Collection colour palette">{selectedItem.palette.map((colour) => <span key={colour.name}><i style={{ backgroundColor: colour.color }} aria-hidden="true" />{colour.name}</span>)}</div>
              <h4>The details</h4>
              <ul>{selectedItem.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <button type="button" className={styles.textLink} onClick={() => showMedia(selectedItem.id)}>Explore the gallery <ArrowRight size={17} aria-hidden="true" /></button>
              <a href="#contact" onClick={goToContact} className={styles.detailContact}>Create something personal <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
        )}
        {selectedItem && selectedMedia && selection?.mode === "media" && (
          <div className={styles.lightbox} ref={modalContentRef} tabIndex={-1} role="document" aria-label={`${selectedItem.title} image and film gallery`}>
            <div className={styles.lightboxTop}><span>{selectedItem.category}</span><span>Visual study</span></div>
            <div className={styles.mediaFrame}>
              {selectedMedia.type === "image" ? (
                <Image key={selectedMedia.src} src={selectedMedia.src} alt={selectedMedia.alt} fill sizes="(max-width: 700px) 90vw, 80vw" className={styles.lightboxImage} />
              ) : failedSource === selectedMedia.src ? (
                <div className={styles.videoFallback}><Play size={32} aria-hidden="true" /><p>This film couldn’t load.</p><a href={selectedMedia.src} target="_blank" rel="noopener noreferrer">Open the original film <ArrowUpRight size={16} aria-hidden="true" /></a><button type="button" onClick={() => setFailedSource(null)}>Try again</button></div>
              ) : (
                <video key={selectedMedia.src} ref={mediaVideoRef} src={selectedMedia.src} controls playsInline autoPlay preload="metadata" poster={selectedMedia.poster} aria-label={selectedMedia.alt} onError={() => setFailedSource(selectedMedia.src)}>Your browser does not support video. <a href={selectedMedia.src}>Open the film.</a></video>
              )}
            </div>
            <div className={styles.lightboxBottom}>
              <div><h3>{selectedItem.title}</h3><p className={styles.mediaCaption} aria-live="polite">{selectedMedia.alt}</p></div>
              {selectedItem.media.length > 1 && <div className={styles.mediaControls}><button type="button" onClick={() => navigateMedia(-1)} aria-label="Previous image or film"><ArrowLeft size={20} aria-hidden="true" /></button><span aria-live="polite">{String(selection.mediaIndex + 1).padStart(2, "0")} / {String(selectedItem.media.length).padStart(2, "0")}</span><button type="button" onClick={() => navigateMedia(1)} aria-label="Next image or film"><ArrowRight size={20} aria-hidden="true" /></button></div>}
            </div>
            <button type="button" className={styles.backToCollection} onClick={() => setSelection({ ...selection, mode: "collection" })}>About this collection <ArrowUpRight size={14} aria-hidden="true" /></button>
          </div>
        )}
      </Dialog>
    </section>
  );
}
```


## components/Process.module.css

```css
.section { position: relative; padding: 105px 0 60px; background: #242820; color: #f4f0e8; scroll-margin-top: 80px; overflow: hidden; }
.section::before { position: absolute; content: ""; width: 450px; height: 450px; right: -270px; top: -245px; border: 1px solid #ad947321; border-radius: 50%; pointer-events: none; }
.container { width: min(1440px,88%); margin: 0 auto; }
.intro { display: flex; align-items: flex-end; justify-content: space-between; gap: 70px; margin-bottom: 58px; }
.eyebrow { display: flex; align-items: center; gap: 12px; text-transform: uppercase; font-size: 9px; letter-spacing: .19em; line-height: 1.5; color: #c6bcab; margin: 0 0 30px; }
.eyebrow > span { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: #ad9473; }
.intro h2 { font-family: var(--font-serif),Georgia,serif; font-weight: 400; line-height: 1.03; font-size: clamp(43px,4.5vw,72px); letter-spacing: -.03em; margin: 0; }
.intro h2 em { font-weight: 400; color: #b8a489; }
.lead { width: 265px; flex-shrink: 0; font-size: 12px; line-height: 1.9; color: #b7b8ab; margin: 0 0 5px; }
.steps { border-top: 1px solid #f4f0e825; }
.step { border-bottom: 1px solid #f4f0e825; }
.step h3 { font-weight: 400; margin: 0; }
.trigger { display: grid; grid-template-columns: 9% 46% 1fr 42px; align-items: center; width: 100%; border: 0; background: transparent; color: inherit; text-align: left; padding: 25px 0; cursor: pointer; }
.number { font-size: 10px; font-variant-numeric: tabular-nums; letter-spacing: .12em; color: #9eaa94; align-self: start; margin-top: 9px; }
.stepTitle { font-family: var(--font-serif),Georgia,serif; font-size: clamp(28px,2.8vw,44px); line-height: 1.05; letter-spacing: -.02em; }
.stepTitle > span { display: block; font-family: var(--font-sans),Arial,sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: .13em; color: #a6a99a; margin: 10px 0 0; line-height: 1.5; }
.note { font-size: 11px; color: #b7b8ab; padding-left: 20px; line-height: 1.6; }
.toggle { height: 38px; width: 38px; border: 1px solid #f4f0e83b; border-radius: 50%; display: grid; place-items: center; margin-left: auto; transition: background .3s ease; }
.toggle svg { transition: transform .35s ease; }
.trigger:hover .toggle { background: #f4f0e813; }
.open .toggle { background: #f4f0e8; color: #242820; }
.open .toggle svg { transform: rotate(45deg); }
.open .stepTitle { color: #dfcab0; }
.panel { overflow: hidden; }
.panelInner { margin-left: 9%; display: grid; grid-template-columns: 50.5% 1fr; gap: 0; padding: 0 80px 31px 0; }
.panelInner p { max-width: 540px; font-size: 12px; line-height: 1.95; color: #c0c2b5; padding-right: 20px; margin: 0; }
.panelInner > span { align-self: end; padding-left: 20px; padding-bottom: 3px; font-family: var(--font-serif),Georgia,serif; font-style: italic; font-size: 19px; line-height: 1.3; color: #aeb09d; max-width: 240px; }
.bottom { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding-top: 36px; }
.bottom p { color: #b7b8ab; font-size: 11px; margin: 0; }
.bottom a { display: inline-flex; align-items: center; gap: 26px; text-transform: uppercase; font-size: 9px; letter-spacing: .13em; border-bottom: 1px solid #f4f0e86b; padding: 7px 0; }
.bottom a svg { transition: transform .25s ease; }
.bottom a:hover svg { transform: translate(2px,-2px); }
@media (min-width: 1800px) { .container { width: min(1600px,86%); } }
@media (max-width: 1000px) { .section { padding: 85px 0 55px; } .intro { gap: 35px; } .lead { width: 220px; font-size: 11px; } .trigger { grid-template-columns: 9% 49% 1fr 38px; } .note { font-size: 10px; padding-left: 12px; } .panelInner { grid-template-columns: 57% 1fr; padding-right: 55px; } .panelInner > span { padding-left: 12px; font-size: 18px; } }
@media (max-width: 700px) { .section { padding: 68px 0 44px; } .intro { display: block; margin-bottom: 35px; } .eyebrow { margin-bottom: 26px; font-size: 8px; } .intro h2 { font-size: clamp(38px,8.4vw,57px); } .lead { max-width: 300px; width: 100%; margin: 25px 0 0 auto; font-size: 12px; } .trigger { grid-template-columns: 11% 1fr 35px; padding: 23px 0; gap: 0; } .number { font-size: 9px; margin-top: 7px; } .stepTitle { font-size: 31px; } .stepTitle > span { font-size: 9px; margin-top: 9px; } .note { display: none; } .toggle { width: 32px; height: 32px; } .toggle svg { width: 17px; height: 17px; } .panelInner { margin-left: 11%; display: block; padding: 0 12px 26px 0; } .panelInner p { font-size: 11px; padding: 0; line-height: 1.9; } .panelInner > span { display: block; padding: 16px 0 0; font-size: 18px; max-width: none; } .bottom { padding-top: 25px; gap: 14px; } .bottom p { font-size: 10px; max-width: 135px; line-height: 1.7; } .bottom a { gap: 16px; font-size: 8px; } }
@media (prefers-reduced-motion: reduce) { .toggle, .toggle svg, .bottom a svg { transition: none; } .bottom a:hover svg { transform: none; } }
```


## components/Process.tsx

```tsx
"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import Reveal from "./Reveal";
import styles from "./Process.module.css";

const steps = [
  {
    title: "The conversation",
    stage: "Consultation",
    note: "First, we listen.",
    description: "Tell us what you’re celebrating and how you want it to feel. We explore your vision, venue, guest list and budget, finding the details that will make the occasion unmistakably yours.",
    detail: "Your occasion. Your people. Your point of view.",
  },
  {
    title: "The imagination",
    stage: "Creative direction & design",
    note: "A feeling becomes a vision.",
    description: "Colour, flowers, texture and light come together in a coherent design direction. We shape the mood and key spaces with you, refining the concept until every element feels connected.",
    detail: "A considered palette. A clear creative direction.",
  },
  {
    title: "The details",
    stage: "Engineering & production",
    note: "Beauty, thoughtfully planned.",
    description: "We translate the approved concept into a practical production plan. Materials, decor, installation requirements and venue coordination are considered together, with scope and timings agreed before the day.",
    detail: "Materials, logistics and a plan for the room.",
  },
  {
    title: "The moment",
    stage: "Installation & execution",
    note: "Everything finds its place.",
    description: "The design comes to life, from the largest installation to the final floral detail. We arrange, refine and prepare the setting so you can step into the occasion you imagined.",
    detail: "The final details. The first impression.",
  },
];

export default function Process() {
  const [openStep, setOpenStep] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();
  const id = useId();

  return (
    <section id="process" className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.container}>
        <Reveal className={styles.intro}>
          <div>
            <p className={styles.eyebrow}><span /> The Timeless experience</p>
            <h2 id="experience-heading">Beautifully imagined.<br /><em>Thoughtfully made.</em></h2>
          </div>
          <p className={styles.lead}>From our first conversation to your first look, a clear, collaborative journey brings every detail into focus.</p>
        </Reveal>

        <div className={styles.steps}>
          {steps.map((step, index) => {
            const isOpen = openStep === index;
            const triggerId = `${id}-trigger-${index}`;
            const panelId = `${id}-panel-${index}`;
            return (
              <div className={`${styles.step} ${isOpen ? styles.open : ""}`} key={step.title}>
                <h3>
                  <button type="button" className={styles.trigger} id={triggerId} aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenStep(isOpen ? null : index)}>
                    <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.stepTitle}>{step.title}<span>{step.stage}</span></span>
                    <span className={styles.note}>{step.note}</span>
                    <span className={styles.toggle}><Plus size={21} strokeWidth={1.15} aria-hidden="true" /></span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={triggerId}>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .35, ease: [.22, 1, .36, 1] }} className={styles.panel}>
                        <div className={styles.panelInner}><p>{step.description}</p><span>{step.detail}</span></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.bottom}><p>It begins with a conversation.</p><a href="#contact">Begin yours <ArrowUpRight size={19} strokeWidth={1.4} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
```


## components/Providers.tsx

```tsx
"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```


## components/Reveal.tsx

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({ children, className = "", delay = 0 }: {
  children: ReactNode; className?: string; delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={`reveal ${className}`}
      initial={{ opacity: 0, y: reduced ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
```


## components/Story.tsx

```tsx
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const disciplines = [
  ["01", "Floral composition", "Sculptural arrangements, delicate textures and flowers that give a space its character."],
  ["02", "Atmosphere & light", "Layers of warmth, considered focal points and a setting that changes with the moment."],
  ["03", "Set & stage design", "Architectural backdrops and thoughtful spatial details that frame your story."],
  ["04", "Celebration styling", "From the first table setting to the final finishing touch, a beautifully connected whole."],
];

export default function Story() {
  return <section id="story" className="story section-shell">
    <Reveal><div className="section-overline"><span className="eyebrow">01 / OUR PHILOSOPHY</span><span className="eyebrow section-overline-end">THE FEELING IS EVERYTHING</span></div></Reveal>
    <div className="story-grid">
      <Reveal className="story-visual">
        <div className="story-main-image"><Image src="/media/story.webp" alt="An abundant composition of white flowers with an ivory event setting beyond" fill sizes="(max-width: 760px) 85vw, 38vw" className="object-cover" /></div>
        <div className="story-detail-image"><Image src="/media/detail.webp" alt="Woven Ethiopian basket details with delicate floral accents" fill sizes="(max-width: 760px) 32vw, 16vw" className="object-cover" /></div>
        <span className="image-footnote">TEXTURE. LIGHT. A SENSE OF BELONGING.</span>
      </Reveal>
      <div className="story-narrative">
        <Reveal><h2>Designed to be felt.<br /><em>Remembered<br className="desktop-break" /> forever.</em></h2></Reveal>
        <Reveal delay={0.08}><p className="story-lead">A room becomes a world. A gathering becomes a memory. And every detail tells a little of your story.</p>
          <p>At Timeless Decor and Event, we bring flowers, light, texture and space into conversation. Whether intimate or expansive, each celebration begins with what matters to you, and takes shape through a considered, personal design.</p>
          <a href="#process" className="text-link">Discover the experience <ArrowUpRight size={17} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </div>
    <div className="disciplines-grid">{disciplines.map(([number, title, description], index) => <Reveal key={number} delay={index * 0.045}>
      <article className="discipline"><span className="eyebrow">{number}</span><h3>{title}</h3><p>{description}</p></article>
    </Reveal>)}</div>
  </section>;
}
```


## components/Testimonials.module.css

```css
.section { padding: 106px 0 103px; background: #eee8dc; color: #242820; text-align: center; }
.container { width: min(1180px,88%); margin: 0 auto; }
.eyebrow { font-size: 9px; line-height: 1.5; text-transform: uppercase; letter-spacing: .19em; color: #696b60; margin: 0 0 38px; }
.quoteMark { font-family: var(--font-serif),Georgia,serif; font-size: 94px; height: 53px; line-height: 1; color: #ad9473; font-weight: 300; }
.quote { padding: 0; margin: 0 auto; max-width: 1060px; }
.quote p { font-family: var(--font-serif),Georgia,serif; font-size: clamp(36px,4.5vw,71px); line-height: 1.12; letter-spacing: -.025em; font-weight: 400; margin: 0; }
.quote em { font-weight: 400; color: #8b7c66; }
.testimonials, .philosophy { min-width: 0; }
.attribution { display: flex; align-items: center; justify-content: center; gap: 13px; margin: 32px 0 0; }
.attribution > div { display: flex; flex-direction: column; gap: 7px; }
.name { font-size: 9px; text-transform: uppercase; letter-spacing: .14em; }
.role { color: #696b60; font-size: 10px; letter-spacing: .01em; }
.portrait { border-radius: 50%; object-fit: cover; }
.controls { display: flex; justify-content: center; align-items: center; gap: 28px; margin: 28px 0 0; }
.controls button { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 50%; border: 1px solid #24282038; background: none; cursor: pointer; transition: color .2s ease, background .2s ease; }
.controls button:hover { background: #242820; color: #f4f0e8; }
.controls > span { display: flex; align-items: center; gap: 11px; font-size: 9px; font-variant-numeric: tabular-nums; color: #696b60; }
.controls i { height: 1px; width: 26px; background: #24282047; }
.press { display: flex; align-items: center; gap: 50px; border-top: 1px solid #24282024; padding-top: 30px; margin-top: 65px; text-align: left; }
.press > span { color: #696b60; font-size: 9px; text-transform: uppercase; letter-spacing: .12em; flex-shrink: 0; }
.press > div { display: flex; justify-content: space-around; flex-wrap: wrap; align-items: center; gap: 22px; flex: 1; }
.press a { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-serif),Georgia,serif; font-size: 25px; }
@media (max-width: 700px) { .section { padding: 76px 0 75px; } .eyebrow { font-size: 8px; margin-bottom: 29px; } .quoteMark { font-size: 79px; height: 47px; } .quote p { font-size: clamp(36px,8vw,50px); line-height: 1.13; } .attribution { margin-top: 25px; } .name { font-size: 8px; } .role { font-size: 9px; } .press { flex-direction: column; gap: 22px; padding-top: 24px; margin-top: 45px; } .press > div { justify-content: center; gap: 22px; } .press a { font-size: 23px; } }
@media (prefers-reduced-motion: reduce) { .controls button { transition: none; } }
```


## components/Testimonials.tsx

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { testimonials, pressMentions, type Testimonial, type PressMention } from "@/data/portfolio";
import Reveal from "./Reveal";
import styles from "./Testimonials.module.css";

interface TestimonialsProps {
  items?: Testimonial[];
  press?: PressMention[];
}

export default function Testimonials({ items = testimonials, press = pressMentions }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const current = items.length > 0 ? items[index % items.length] : null;

  return (
    <section id="voices" className={styles.section} aria-label={current ? "Client testimonials" : "Our philosophy"}>
      <div className={styles.container}>
        <Reveal>
          <p className={styles.eyebrow}>{current ? "Words that stay with us" : "The feeling we design for"}</p>
          <div className={styles.quoteMark} aria-hidden="true">“</div>
          {current ? (
            <div className={styles.testimonials} role="group" aria-roledescription="carousel" aria-label="Approved client testimonials">
              <div aria-live="polite" aria-atomic="true">
                <AnimatePresence mode="wait">
                  <motion.div key={current.id} role="group" aria-roledescription="slide" aria-label={`${index % items.length + 1} of ${items.length}`} initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }} transition={{ duration: reducedMotion ? 0 : .28 }}>
                    <blockquote className={styles.quote}><p>{current.quote}</p></blockquote>
                    <div className={styles.attribution}>
                      {current.portrait && <Image src={current.portrait} alt="" width={48} height={48} className={styles.portrait} />}
                      <div><span className={styles.name}>{current.name}</span><span className={styles.role}>{current.role}</span></div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              {items.length > 1 && <div className={styles.controls}><button type="button" onClick={() => setIndex((value) => (value - 1 + items.length) % items.length)} aria-label="Previous testimonial"><ArrowLeft size={17} aria-hidden="true" /></button><span>{String(index % items.length + 1).padStart(2, "0")} <i /> {String(items.length).padStart(2, "0")}</span><button type="button" onClick={() => setIndex((value) => (value + 1) % items.length)} aria-label="Next testimonial"><ArrowRight size={17} aria-hidden="true" /></button></div>}
            </div>
          ) : (
            <div className={styles.philosophy}>
              <blockquote className={styles.quote}><p>Beautiful for a day.<br /><em>Remembered for a lifetime.</em></p></blockquote>
              <div className={styles.attribution}><div><span className={styles.name}>Our philosophy</span><span className={styles.role}>Timeless Decor and Event</span></div></div>
            </div>
          )}
          {press.length > 0 && <div className={styles.press}><span>In the press</span><div>{press.map((entry) => <a key={entry.url} href={entry.url} target="_blank" rel="noopener noreferrer">{entry.name}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</div></div>}
        </Reveal>
      </div>
    </section>
  );
}
```


## data/hero.ts

```typescript
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
```


## data/portfolio.ts

```typescript
/**
 * Replace these local URLs and descriptions as the approved collection grows.
 * A collection is a visual study, not a claim that all its media shows one event.
 * Client names, venues, dates, guest counts and results are deliberately omitted
 * because they have not been supplied or verified.
 */
export const categories = [
  "All",
  "Weddings",
  "Corporate Galas",
  "Private Soirées",
  "Luxury Stage Decor",
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
    category: "Luxury Stage Decor",
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
    category: "Private Soirées",
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
    category: "Private Soirées",
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
```


## lib/inquiry.ts

```typescript
export const EVENT_TYPES = [
  "Weddings",
  "Corporate Galas",
  "Private Soirées",
  "Luxury Stage Decor",
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
```


## lib/site.ts

```typescript
export const siteConfig = {
  name: "Timeless Decor and Event",
  phone: "0941097286",
  phoneHref: "tel:+251941097286",
  tagline: "Some moments deserve to be timeless.",
};

function safeSocial(value: string | undefined, domains: string[]) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && domains.some((domain) =>
      url.hostname === domain || url.hostname.endsWith(`.${domain}`),
    ) ? url.href : null;
  } catch { return null; }
}

export const socialLinks = [
  { label: "Instagram", url: safeSocial(process.env.NEXT_PUBLIC_INSTAGRAM_URL, ["instagram.com"]) },
  { label: "TikTok", url: safeSocial(process.env.NEXT_PUBLIC_TIKTOK_URL, ["tiktok.com"]) },
].filter((link): link is { label: string; url: string } => Boolean(link.url));

export function getSiteUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url : undefined;
  } catch { return undefined; }
}
```


## package-lock.json

```json
{
  "name": "timeless-decor-and-event",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "timeless-decor-and-event",
      "version": "1.0.0",
      "dependencies": {
        "framer-motion": "14.4.0",
        "lucide-react": "1.59.0",
        "next": "16.4.2",
        "react": "19.3.1",
        "react-dom": "19.3.1"
      },
      "devDependencies": {
        "@tailwindcss/postcss": "4.3.3",
        "@types/node": "^24.0.0",
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0",
        "postcss": "^8.5.6",
        "tailwindcss": "4.3.3",
        "tsx": "^4.20.0",
        "typescript": "~5.9.3"
      },
      "engines": {
        "node": ">=24.0.0"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.3.0.tgz",
      "integrity": "sha512-U4+70Pc5ZS9osnCBCE5Jha/ciHM+Yp+CNMNC/7HvYbNRk1Ldd+f7qO65W5qfhu/TCv+/ozljlXXe9Nj8419DMA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.11.3",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.11.3.tgz",
      "integrity": "sha512-Xz4Tpyki7XyrpbUK1jR1AhdAdaXyhhY4lZ3neLodmhpuWfy2PAQN5B46sAiU4liOXGLkHypn/qU+jvfWSCYYLA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.28.2.tgz",
      "integrity": "sha512-XExcO+dvLKvVtNTibSTBej1NCAbaGhWn9Ww1ZPx80qsahhPFe/8jgWP0IchNe0F3HwkU7n8ejhH8bjonqht8mQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.28.2.tgz",
      "integrity": "sha512-kXXoiPVVGQcnIYGOeaovwOURpniDBpSq4A03qkQ+BMQqtGG6HYap3xne9C1O1yo4TR3qxlCX5IqqmX6fFo2Lqg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.28.2.tgz",
      "integrity": "sha512-5YfKeeI8qWfBZIX+u2xZC3Zlb3Os/gLS2sbEKM+I4ZOcsWmHS2WLysCcQZDAFRslDUU5Oiq44gf6PYN1vGwG5A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.28.2.tgz",
      "integrity": "sha512-O387ite7SzUyCcy3JQX4P4bLtEA7bLLkx+esve5JHnyYfNTxcVpXZo9jhdB0lTKN44gztELTdU7nS8Nr16Fs1Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.28.2.tgz",
      "integrity": "sha512-n4KqkOQrraxHJcgjM1RvwbigfQKIKJVpM7xp+KsxiyUSrRdIXnt73VhrPAx0fV44hgfmIVKjxMN9J1t5jySVkw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.28.2.tgz",
      "integrity": "sha512-uq6suIWYP37qzGddBKPw5QEQPi6HiLGsO7UmkpfyaYNQ3D+rN6w6WfwH+nuqcGXWvawGwxOEroO4YGnFh95azw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.28.2.tgz",
      "integrity": "sha512-n+I0BTSRIoy+d6RPKnEVwql5UwBJolytvY4mAOIEJorKlqgPII8ix6slVVrfZ5Tnj7glIZvloylbB/EJPMWEXw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.28.2.tgz",
      "integrity": "sha512-78XJTJkvPs0kz2w61301PJjXl4g7q3JqiYMZ/M/yVI73EHBrCRTgkhu9oqG7vPqq+a/yadEW8aD+agKlk5xrmg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.28.2.tgz",
      "integrity": "sha512-XlDnu2q5yoqems+xay6wSAcg9DDD7K9RLKZEBOMZm3ckNpJBvOX20tSfby8KfrrhINDyv9V2YVZKY/SpoGJI8w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.28.2.tgz",
      "integrity": "sha512-pW4AC0P3it8c7do9MVM4p51FzHzdM/TZrerurgRcHJ2WTa1VQ1CIq18xncfpBJw4ojkiZZrKW2yIBWBP92j6Ug==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.28.2.tgz",
      "integrity": "sha512-CYbnj78HsIeA+DhgUKgFCfvNsTHFhMMrinUrMZpDXJXKN8T3XViTZ/+wtHeVxEWY8ewSzTFN+nRmSwO2tZaLUQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.28.2.tgz",
      "integrity": "sha512-buwkd8nsph4R+ajRvw0qM5Hja/TXQow3ptzWO2EbG/cqcIkHloRrdlBtQlshyYGTNFvfkfJ5tpPLVkY4DtsPfQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.28.2.tgz",
      "integrity": "sha512-ZVykbDyk7519VwiNb9Lcj9m8XM6v5V9uKPvrEMkkEedVewf+0itkhahp4HDpgERXhwLRpWFypsGbG/J8s0QjJA==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.28.2.tgz",
      "integrity": "sha512-CAXl+Dtd9UUuJd8pKKdwh6MLm3MUMiqMPmhZ3tTSXPqfyQ3vDl6R5hZdZ/kYojK4ofXtdfSv1tFq8XzWx3heNQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.28.2.tgz",
      "integrity": "sha512-GeXCej4IQtU1B+QlDV8W/RRvbzI3O/Stss+/bCXv4lZls5WGRtu2a+3JkA3i4qIUlMXpcHebWpF8AkJhATowuA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.28.2.tgz",
      "integrity": "sha512-3H1weTYZPxt/WOhByszQZybS9w5lKzUn1FDMsgEChbHWQwHYQQRfBxgCcZvPhjHfKyJjIievvMmEUawJrdY9Dg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.28.2.tgz",
      "integrity": "sha512-4xTZr1FUmSoQW4XIWmit3tzQrUTZM+N3P0XV8xROKYF50XfI7xeO90+1bZvNwxIufQ9hDQVRJH5YhgPVF8A/HQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.28.2.tgz",
      "integrity": "sha512-sSATRjPeDBg3pdgHoQfoYBob11Kk1FGa9lui5RIHZCoCkJa9QKlvl3/vKz2usCmYYjs7ymJR/2Nnsqe+Hjt5nw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.28.2.tgz",
      "integrity": "sha512-lqnzCV+mM0gIADaKihiCg6ifgfU2L3h5E33rNQBN1Y4MaVGnzryzmvvf7UHxprpQdE8hpqLolJ9Rl+SkIRDpyw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.28.2.tgz",
      "integrity": "sha512-AL2qJILH7lNjrDmCQDvdxMfAUIv8KMNZOvrwAQ8i8//ntL9FflhOyMJ8OZSMBb8/AWXe3/5v5S20y3zCoZWKoQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.28.2.tgz",
      "integrity": "sha512-QtiuPytchRyC4rwUKhexJdQKvDuZ6hWloi3igqPQNUJCS1/v9EiO3UTOXR6A3FoMo4fnAKbWJdqaIwhOzh8qEw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.28.2.tgz",
      "integrity": "sha512-WkhYDmpTjLvGlScA1rwjRUmhl4k8oXR3cIbtqWmELgU/dFeHHlEllxDvdWcNJV9rbzCexB5vz8gtNewWLgCT7Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.28.2.tgz",
      "integrity": "sha512-GPMSkTOtMnv2U2F8gxe4Io6qmVs+YKyp832Etqqxr0hFngmXQ3rzwytelm3GIn7T4VviRUlf3sOgBOiTdvaf7g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.28.2.tgz",
      "integrity": "sha512-PIhhEkE9uPBleRBrQEJpUn7MBnibZzbGzYWPmY3x+YoVg/95zbjB4CxPPOQ8l5tYYM4mMaCthF8/1DIfBQQyWQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.28.2.tgz",
      "integrity": "sha512-YmJbfTlvU7Sdn9BB+4PRES4oB6pxgS37MAONj+hBr/cpXS1aBPKXxNnDbu+QCWPj0o9dgyxeq79g6c5P8KeuYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.28.2.tgz",
      "integrity": "sha512-5ebpxr3nWMzrL/rnUI755Jkuee0bHL/Gq0WTF9lvcpv73wAp5eu8MfBUgWK9bhWvZjj7yX8etf/8tI8Ney695g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@img/colour": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@img/colour/-/colour-1.1.0.tgz",
      "integrity": "sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@img/sharp-darwin-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.35.5.tgz",
      "integrity": "sha512-QRUlFQ0WxvdWyqqG/WtI3iupfD5rBzmCHXSdPsY91sAtVtTo7Q4cb6zOccZ3gqEqkr0f1As1ehLqmEpDsRf+lg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-arm64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-darwin-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.35.5.tgz",
      "integrity": "sha512-+BR255RhDlpygUpOc/Jdt1nT6DQ3XG/ERo5wbcdOf5Q320dKtPCKPLR1LJs9VGXRaMa8l1uUa0tkCNOXiAxZUw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-x64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-freebsd-wasm32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-freebsd-wasm32/-/sharp-freebsd-wasm32-0.35.5.tgz",
      "integrity": "sha512-Y/z91nEZ4uIBX5X3nfTovjU9lHNKFYbL2lpHCLVNmXQK03VIZvXBBt0KxbPGp2SdGSF+2mQU4e+hQaWOt86iAw==",
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "dependencies": {
        "@img/sharp-wasm32": "0.35.5"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-arm64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.3.4.tgz",
      "integrity": "sha512-5R89nBYiRdUlSWJxPhO+GVtaXzXSxKnRu/xqMn3KTA3L9EB9Oy/P+Nn2f2vlhPuUdy/Zusb2DarbyTpGCfEDuw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-x64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.3.4.tgz",
      "integrity": "sha512-iR2OKH80yi0U+dUplyh3/xdpFvps6YkCwsXenIJxqxR1v9o+xtKTGbS9H7cps+2Vxjc8B1j96p75NmTGjIhtpQ==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.3.4.tgz",
      "integrity": "sha512-LmRtTsOHuvM2+wlO2Db37dx5MiZhB0FvSunciw48YjdOkZz9KAiRbm8ujeMOA1INqmei5NapFxYEK1D1ZSidmw==",
      "cpu": [
        "arm"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.3.4.tgz",
      "integrity": "sha512-Y3dgX/6lE2QhQb+Gxy0WZxfg9MEm/JBjamZpS2IklP7xIQoKN4hzAm7KcMVGtaVDt3neE9OKBC7vAfonA/Lr1A==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-ppc64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.3.4.tgz",
      "integrity": "sha512-Le6boB8Tai0Nis+gIxIpKx68UDVVIqdR8Tin5Yf1z2LJJQLDJvCDRqRu+jC2qCoD+eIomonmOwB4smBRxfVpYQ==",
      "cpu": [
        "ppc64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-riscv64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.3.4.tgz",
      "integrity": "sha512-aHkkIEHPRdQEegJN20MLmGtxYD9R2wQr3Cwpddnu5+YKMt6Uzax7S9h5gpZTo8wyrGuZSlfQ63OevL5mTyOC7Q==",
      "cpu": [
        "riscv64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-s390x": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.3.4.tgz",
      "integrity": "sha512-ra/mB6MikESDUO7Yg+Mi95bFBb9GsObURuhnOv3OqknjGe9sZrG8tCe9q0xSIGrtLgvgw0gKnFWcK4blSgQOuQ==",
      "cpu": [
        "s390x"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-x64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.3.4.tgz",
      "integrity": "sha512-GJ//SSXbnwSDes02umB3nDJLFcQzw8a18V8fyhqr6tV515tOEMdImjjxj1AoafMRz56F3PHgftnj1QEKSU1zkw==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-arm64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.3.4.tgz",
      "integrity": "sha512-hvulFwtjUcagsis6BBxHwGFwWoNZjgYmULGVrZcyfNbjA8hKILbRxGg15/7w5HDyXHXUos/j6baAWqnCyQ2DWA==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-x64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.3.4.tgz",
      "integrity": "sha512-6zXKeE/p39I1AmA3cJG35eyBGNqNddLnUXjhwBnsGjFPWqf5VKkDBEqaEkPDoTEtkxwi2vv8Tcr2mDyP4So7Fg==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-linux-arm": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm/-/sharp-linux-arm-0.35.5.tgz",
      "integrity": "sha512-LEaXK2WdXVK5ykcw0buWyPMsmLLL2vpHLD6yrNSW+JGEL3BZPA4tpKN6iaMc4AxTTAoaX/sU1rOL51lcIz48ZQ==",
      "cpu": [
        "arm"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.35.5.tgz",
      "integrity": "sha512-LYVx5JTsOM2CBzmxreh+nl64/3H6Xb09iSLknqH47z2T2DFFxDeFLP5y4dJwe6H7uGQlHPyEEtIqyo3DYsRwdQ==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-ppc64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.35.5.tgz",
      "integrity": "sha512-QVxAAq8evVRI9ia2vqgwrmWucn5Dfv+JdWzj75pD8omHLPSP7f8p20O8jxzjCcuCEQEOtYOZUmX1hkiZ0kdevA==",
      "cpu": [
        "ppc64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-ppc64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-riscv64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.35.5.tgz",
      "integrity": "sha512-LtdreXguaavKODPIfzJ4kffx7UNt1omwtK0rch4EBbbSTXPnxWmYSayXdLJw0fJzQ97kHt1gL/yh4tvU+nCyRQ==",
      "cpu": [
        "riscv64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-riscv64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-s390x": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.35.5.tgz",
      "integrity": "sha512-UZasTOFiYzotTsGOCu42BfUzP6Tu6Do/947iRm1RsLKvlllxwGcn4RN27LibGWceix4Y+Pmw3jsnTcCQIgWjqA==",
      "cpu": [
        "s390x"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-s390x": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-x64/-/sharp-linux-x64-0.35.5.tgz",
      "integrity": "sha512-SxFtLTeJInhAA9Q836kux2vZNeOBQEx658qvbboZScr0wIARym3IcGmW7KpVD5sbVg0Ojy+udFQdayYIZyoNog==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-x64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.35.5.tgz",
      "integrity": "sha512-9HbMclmI1zlNkFRs3z9/eBtDjfD0sGlrX1z6b1qwmiFY5ElDLh4BC0LPBdVp7z1DXFiKlIcznf+ZlsuZzLxQqg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-arm64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.35.5.tgz",
      "integrity": "sha512-4KOphqB035HrVdqLZfCgMzzERrQkkzOwRhl4OAkRO1YCldbaFjySXMaK534Mo0V+LndnlJk+sbUyLeU0ULyD1A==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-x64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-wasm32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-wasm32/-/sharp-wasm32-0.35.5.tgz",
      "integrity": "sha512-Ptsga1su4tQx+LLF1ECS9U6nz5kmrXKo6XVbtR48Ke3ZRxxgaWBu7IDtEe1quo8hiupwm6WFqxVlXaSf7IINGQ==",
      "license": "Apache-2.0 AND LGPL-3.0-or-later AND MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/runtime": "^1.11.3"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-webcontainers-wasm32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-webcontainers-wasm32/-/sharp-webcontainers-wasm32-0.35.5.tgz",
      "integrity": "sha512-hfhF/FmoQyTUkA0bIKFOtw536BQSeBMe6BF6QyWlrPxT754+TFLaZ7sKKTfvvM0yJgKgaYTwnFCIZ/GuDw5SUA==",
      "cpu": [
        "wasm32"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@img/sharp-wasm32": "0.35.5"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.35.5.tgz",
      "integrity": "sha512-X4t7g+7ZA5DKblCBEXGjUqqemj4vczING/5viFwAL8h4N3qYeyjwdCvRLHi4EdOUI+2Z7UFlp1VM+p/AuEtm6Q==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-ia32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.35.5.tgz",
      "integrity": "sha512-5Zm82LoBc43nhwNybZlG7Y1KO//Zhsn306fQl29ZOuStHLGTo3BWL83q3cznX0poxSAMuYL1On/BHBxkBeKr6A==",
      "cpu": [
        "ia32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-x64/-/sharp-win32-x64-0.35.5.tgz",
      "integrity": "sha512-x76eH0vEiHlcMQu8Y8IenntaACtddpT6W0wmXtWrnKcnKI7ME5DdgqhAD6SEWOEl1v2zDvkZDhFA9KnURwpfqg==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",
      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@next/env": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/env/-/env-16.4.2.tgz",
      "integrity": "sha512-nTUTFH7G5/J/fmpkjVLegOkqyKOP0CEsJcMsyO4UCYeN1su+YMW/MfaSErnJskL7XM+UDK6aTvslxsRCyya/sA==",
      "license": "MIT"
    },
    "node_modules/@next/swc-darwin-arm64": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-16.4.2.tgz",
      "integrity": "sha512-ONkhFvZNFWlsEHOM/81AtxdyuJP2KRYKYR0JxPwvcu1AuPMMMgcL+wW2luldJvMtZwKtUxoSkCychW5wIeoYSw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-darwin-x64": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-16.4.2.tgz",
      "integrity": "sha512-luPCMbOsCoaF+kXJEUjmjmOZg1lC3BflhmUu+ZmW4tBu2vW/4AXak8JBFvePizGkxVmNiAw/r9ra+6UviCWtWQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-gnu": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-16.4.2.tgz",
      "integrity": "sha512-xhwFTAncJyaCNy5KqKKuKaIIdCy1/1ZV1s5S1G0hhT7wGMkDTlfJ6aQbfRFnIG/s3/kDrxQ8aycVe+c5QnP8ow==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-musl": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-16.4.2.tgz",
      "integrity": "sha512-T1PNmfbPcxr5ndtWUL/3wQtLXsz808lq6sc2GrNT5k2oquF7UyqZddHSuAewHVsWsGXe6nsl9HoN1YNriVjuSg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-gnu": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-16.4.2.tgz",
      "integrity": "sha512-N9cDUOCGtkJG5PNKDFZUF3xXndrJJcpLp121uAGjIGvO/U2p9tfdNOM9htj7+5f72l0m8rMw/cvYacUJBQoudg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-musl": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-16.4.2.tgz",
      "integrity": "sha512-yY2uh1YhX6ufuYy2FCbw1dqblbhI57GLYAJfCkqD9auTv6pLrH67Uccjc3QMKBeCYAG6lkgu08ExmX1bbjejjQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-arm64-msvc": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-16.4.2.tgz",
      "integrity": "sha512-j/ArWRIHpMMB6wYLMhr2puTguBt70lNU/Cmjl9p6dTDE8DGknYJMP9PdwPk2dqpCNL/KIX9yfngDvIesxJPmsg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-x64-msvc": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-16.4.2.tgz",
      "integrity": "sha512-AA4edyWHDko3NCSo0x6GomsdgFb0oR1J3MXU1b5xt6FRFg4AucrMPW3S0hCe/9onU0O1BbpGQBsqo1r0Gneu1g==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@swc/helpers": {
      "version": "0.5.23",
      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.23.tgz",
      "integrity": "sha512-5lSsMOTXURePglDfvuAQUqkGek9Hg2kksOYay2m0+XR++b2NWYL/4sWyuvVBIs8oKnJaxkdi9whaL/sqN13afw==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.8.0"
      }
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.3.3.tgz",
      "integrity": "sha512-/T8IKEsf9VTU6tLjgC7+sv2mOPtQxzE2jMw7u4Tt40Tx+QSZxpzh95/H6cMKoja9XuW7iMdLJYBB0o9G1CaAgg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.24.1",
        "jiti": "^2.7.0",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.3.3.tgz",
      "integrity": "sha512-krXjAikiaFSPaK/FkAQT5UTx3VormQaiZ5hBFlJZ9UFQGB/rwg1MZIhHAG9smMQRTdyJxP6Qt5MwMtdyU5FWrA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-x64": "4.3.3",
        "@tailwindcss/oxide-freebsd-x64": "4.3.3",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-musl": "4.3.3",
        "@tailwindcss/oxide-linux-x64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-x64-musl": "4.3.3",
        "@tailwindcss/oxide-wasm32-wasi": "4.3.3",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.3.3",
        "@tailwindcss/oxide-win32-x64-msvc": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.3.3.tgz",
      "integrity": "sha512-Y85A2gmPSkl5Ve5qR86GL4HT509cFqQh1aes9p3sSkyTPwt0Pppf3GkwGe4JPACcRYjgJIEhQgM6dBClnr0NYw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.3.3.tgz",
      "integrity": "sha512-BiaWatpBcERQFDlOjRDpIVXuFK5PJez5SA4JMg6VYZdBYU+qKfV/vqjcIs+IYmtitf1xYQZTwXvU/8y4lfZUGw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.3.3.tgz",
      "integrity": "sha512-fAeUqfV5ndhxRwai8cXGzdLvul9utWOmeTkv69unv4ZXixjn61Z+p9lCWdwOwA3TYboG3BwdVuN/RDjhBRl0mw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.3.3.tgz",
      "integrity": "sha512-iyf5bV6+wnAlflVeEy7R25dupxTNECZN5QMI0qNT6eT+EgaGdZcKhGkr5SdoaWiLJ3spLqIY9VCeSGrwmtg4kw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.3.3.tgz",
      "integrity": "sha512-aAYUprJAJQWWbRrPvtjdroZ56Md+JM8pMiopS6xGEwDfLhqj+2ver2p4nU4Mb3CRqcMmNBjo8KkUgcxhkzVQGQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.3.3.tgz",
      "integrity": "sha512-nDxldcEENOxZRzC2uu9jrutZdAAQtb+8WWDCSnWL1zvBk1+FN+x6MtDViPB5AJMfttVCUhehGWus3XBPgatM/w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.3.3.tgz",
      "integrity": "sha512-Md44bD6veX/PC5iyF8cDVnw4HBIANZepRZZ7a8DQOvkfo5WUBwcp6iAuCUz23u+4SUkhJlD3eL7hNdW8ezd/kA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.3.3.tgz",
      "integrity": "sha512-tx7us1muwOKAKWao2v/GaafFeQboE6aj88vC6ziN2NCGcRm8gWUhwjzg+YdVB1e4boAtdtma4L43onunI6NS4w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.3.3.tgz",
      "integrity": "sha512-SJxX60smvHgasZoBy11dX6YRjXJFovwWBoedhbQPOBzgFWBHGB+TVPWB9BxzR7TTxU8FQZAI2AyiNCMzFm8Img==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.3.3.tgz",
      "integrity": "sha512-jx1+rPhY/5Ympkktd656HBWEBLxP7dH06losBLjjf5vgCODXvi9KhtftWcMIwTFIDqBr7cRnQkdLnAG+IOlGvQ==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.11.1",
        "@emnapi/runtime": "^1.11.1",
        "@emnapi/wasi-threads": "^1.2.2",
        "@napi-rs/wasm-runtime": "^1.1.4",
        "@tybys/wasm-util": "^0.10.2",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.3.3.tgz",
      "integrity": "sha512-3rc292Ca2ceK6Ulcc/bAVnTs/3nDtoPhyEKlgPv+yQJQi/JS/AMJlqzxvlDacL1nekbrcf6bTqp/jV4qgnPxNQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.3.3.tgz",
      "integrity": "sha512-yJ0pwIVc/nYeGoV02WtsN8KYyLQv7kyI2wDnkezyJlGGjkd4QLwDGAwl47YpPJeuI0M0ObaXGSPjvWDPeTPggw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/postcss": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/postcss/-/postcss-4.3.3.tgz",
      "integrity": "sha512-JTSZZGQi1AyKirbLN3azmjVzef92tcX7h+iSqPdaeStyFpGpDlKvvpxeOE8njhbUanbRwr3z8DyzhICWnMtQeg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "@tailwindcss/node": "4.3.3",
        "@tailwindcss/oxide": "4.3.3",
        "postcss": "^8.5.16",
        "tailwindcss": "4.3.3"
      }
    },
    "node_modules/@types/node": {
      "version": "24.19.2",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.19.2.tgz",
      "integrity": "sha512-93d49wCWJkCyN87MxLpNN6KXPCwFw7bVUg79mGUV1OS40JGWwVCr8n61DXCSqz7CV6/VfPkb7xec7uP2M+QHWQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": ">=7.24.0 <7.24.7"
      }
    },
    "node_modules/@types/react": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.3.0.tgz",
      "integrity": "sha512-N0rFCuH9YoxG9/m61l9MfpJKfmLOVU0em7ipIz6TRgSSkvReLB9vL85GB+yr8Bs5leqpvg96JSwF4ZS1s4viQg==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.3.0.tgz",
      "integrity": "sha512-ZI7bU42mZXXKHn/qNLEw2IrbiINU7X5+vfgdixBHkCNpYWXjKgfQ/P+uyGb5CjOLB9UcnTeg3rylQtV2hym44Q==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.3.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.29",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.29.tgz",
      "integrity": "sha512-YeesxhUmR4h5y5V8KF8iBCqJb8YFrBJ++XBTeGcWIaQOYXGN19JM0FoiOjAhwuDoln8owMgXcWBmgHtYSkky2w==",
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001816",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001816.tgz",
      "integrity": "sha512-+8Yx7BXCoqk6IF8yTicjfUR6D/ldJzdlsodlEOiOSPmhK844WIgk67/zIQaGAOxNkZyyvBlrRFnLvqKIoqbAFw==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/client-only": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/client-only/-/client-only-0.0.1.tgz",
      "integrity": "sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==",
      "license": "MIT"
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "devOptional": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/enhanced-resolve": {
      "version": "5.26.0",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.26.0.tgz",
      "integrity": "sha512-9vhedylFonb2YGogzUKX6+Ja72gOJbN1QHAqdrvqLwhdl/QWbKopzoUC9EbQNVsAns/bx/4uyqalrQAoy1IByw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/esbuild": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.28.2.tgz",
      "integrity": "sha512-HKVLS8dvII+xoKW9kmqxbRKrnWEXfJJr/FZhhJmiqIB0e053QNYFqOBouTMO/k5sID4MvCiUCvv8b9M4h32wIA==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.28.2",
        "@esbuild/android-arm": "0.28.2",
        "@esbuild/android-arm64": "0.28.2",
        "@esbuild/android-x64": "0.28.2",
        "@esbuild/darwin-arm64": "0.28.2",
        "@esbuild/darwin-x64": "0.28.2",
        "@esbuild/freebsd-arm64": "0.28.2",
        "@esbuild/freebsd-x64": "0.28.2",
        "@esbuild/linux-arm": "0.28.2",
        "@esbuild/linux-arm64": "0.28.2",
        "@esbuild/linux-ia32": "0.28.2",
        "@esbuild/linux-loong64": "0.28.2",
        "@esbuild/linux-mips64el": "0.28.2",
        "@esbuild/linux-ppc64": "0.28.2",
        "@esbuild/linux-riscv64": "0.28.2",
        "@esbuild/linux-s390x": "0.28.2",
        "@esbuild/linux-x64": "0.28.2",
        "@esbuild/netbsd-arm64": "0.28.2",
        "@esbuild/netbsd-x64": "0.28.2",
        "@esbuild/openbsd-arm64": "0.28.2",
        "@esbuild/openbsd-x64": "0.28.2",
        "@esbuild/openharmony-arm64": "0.28.2",
        "@esbuild/sunos-x64": "0.28.2",
        "@esbuild/win32-arm64": "0.28.2",
        "@esbuild/win32-ia32": "0.28.2",
        "@esbuild/win32-x64": "0.28.2"
      }
    },
    "node_modules/framer-motion": {
      "version": "14.4.0",
      "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-14.4.0.tgz",
      "integrity": "sha512-HtO1fxord2rnXYRyr1laG4uY7+OtgwDc9Szcg1wlMq/LF7BO3/S7a+KEo691U7pSi+i0ueRuRqaD1UaLEmZHuQ==",
      "license": "MIT",
      "dependencies": {
        "motion-dom": "14.4.0",
        "motion-utils": "14.1.1",
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/jiti": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.7.0.tgz",
      "integrity": "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "dev": true,
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lucide-react": {
      "version": "1.59.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-1.59.0.tgz",
      "integrity": "sha512-5qgMyyCPU6OvnKpLS2t693+ZtiqA8oaSweWoUows0BLFKFf6V75m4+CptpmohZHpD5IuOVIBXHBBiv2vpLJmtw==",
      "license": "ISC",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/motion-dom": {
      "version": "14.4.0",
      "resolved": "https://registry.npmjs.org/motion-dom/-/motion-dom-14.4.0.tgz",
      "integrity": "sha512-1q8RyHSdr5COpzrv3JgJ9XRjOO88ZN9CwflpkGgyO/SR/SNRP/dD6EU8SEo092kcKY34IzHC5diJPKrQRMA8lQ==",
      "license": "MIT",
      "dependencies": {
        "motion-utils": "14.1.1"
      }
    },
    "node_modules/motion-utils": {
      "version": "14.1.1",
      "resolved": "https://registry.npmjs.org/motion-utils/-/motion-utils-14.1.1.tgz",
      "integrity": "sha512-3VvN5Uvf8B6qG+OfOui6Nht5EWp+vLuU3IqcAj7ItZGKqtmTjCebl5sGZF7/08gEHRnEl1AP/fIwbcEyVrcQGQ==",
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.20",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.20.tgz",
      "integrity": "sha512-uKdg2G3GNCKQn9byYOpxbGqrT2fGO5KRt5J/8b3pok8rT6qxGWF6hxMyJiEYtAf+FVyYuD9hRaDqX5uPFYJ4ZQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/next": {
      "version": "16.4.2",
      "resolved": "https://registry.npmjs.org/next/-/next-16.4.2.tgz",
      "integrity": "sha512-r+oBJojfefUjOiWkBhXgLS+igxX/7BWyK59uHnyOyplMSLtBZ+QLP3okrdYTbrfrbrmNTVWLBPaHDX9KRaIt3w==",
      "license": "MIT",
      "dependencies": {
        "@next/env": "16.4.2",
        "@swc/helpers": "0.5.23",
        "baseline-browser-mapping": "^2.9.19",
        "caniuse-lite": "^1.0.30001579",
        "postcss": "8.5.23",
        "styled-jsx": "5.1.6"
      },
      "bin": {
        "next": "dist/bin/next"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "optionalDependencies": {
        "@next/swc-darwin-arm64": "16.4.2",
        "@next/swc-darwin-x64": "16.4.2",
        "@next/swc-linux-arm64-gnu": "16.4.2",
        "@next/swc-linux-arm64-musl": "16.4.2",
        "@next/swc-linux-x64-gnu": "16.4.2",
        "@next/swc-linux-x64-musl": "16.4.2",
        "@next/swc-win32-arm64-msvc": "16.4.2",
        "@next/swc-win32-x64-msvc": "16.4.2",
        "sharp": "^0.35.5"
      },
      "peerDependencies": {
        "@opentelemetry/api": "^1.1.0",
        "@playwright/test": "^1.51.1",
        "babel-plugin-react-compiler": "*",
        "react": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "react-dom": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "sass": "^1.3.0"
      },
      "peerDependenciesMeta": {
        "@opentelemetry/api": {
          "optional": true
        },
        "@playwright/test": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        },
        "sass": {
          "optional": true
        }
      }
    },
    "node_modules/next/node_modules/postcss": {
      "version": "8.5.23",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.23.tgz",
      "integrity": "sha512-g50586zr4bZmwFiTlflMu8E0bDTb5I5gertgwAKmsdUlTQIhZtunzUlD1WSzwcVWPoAVpsrA6vlfCD7oXvRwgg==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.16",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/postcss": {
      "version": "8.5.31",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.31.tgz",
      "integrity": "sha512-YUbWYCgErwnMAVkjUnYa+KlMBzGpHwiIt/DE7f0G33AuX2LH9UcTk6KgWxd3zRU+pN3u/C+Xl3EnMLM4Hea7Sg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.20",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/react": {
      "version": "19.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-19.3.1.tgz",
      "integrity": "sha512-QNhWdt7nrgVWWQG58QuGsAR3jv3Hbe4mb4vz7w2csnHavciZJgda1CPNaldF6eVxv90ud3jUXpKlHL69gO38yw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.3.1.tgz",
      "integrity": "sha512-Y0bARz53lhEC1NMCASs0/j+faB/zqt3R8hpvg1e8+61ZVJ4UL0UdC4cBbXfZMcIuhrfgeILTLe+ZeBCavQPtKQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.28.0"
      },
      "peerDependencies": {
        "react": "^19.3.1"
      }
    },
    "node_modules/scheduler": {
      "version": "0.28.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.28.0.tgz",
      "integrity": "sha512-juorfCmIkIw8tT+p5BXSm6PJjQF/ycEYmKyzURCIt/RaZIhL+PulbQ9Yu2z1HdOJDdqDTlxA1+xKBmHXJsczAw==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "7.8.5",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.5.tgz",
      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",
      "license": "ISC",
      "optional": true,
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/sharp": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/sharp/-/sharp-0.35.5.tgz",
      "integrity": "sha512-Ywn4OnzGukp7CDMrp08RQ50YKmuwG47brZgIVPTvBaaAfQlRlygrRqSrxdCiL9M+LlzLBiJ68IR1QqvzHyjC7g==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@img/colour": "^1.1.0",
        "detect-libc": "^2.1.2",
        "semver": "^7.8.5"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-darwin-arm64": "0.35.5",
        "@img/sharp-darwin-x64": "0.35.5",
        "@img/sharp-freebsd-wasm32": "0.35.5",
        "@img/sharp-libvips-darwin-arm64": "1.3.4",
        "@img/sharp-libvips-darwin-x64": "1.3.4",
        "@img/sharp-libvips-linux-arm": "1.3.4",
        "@img/sharp-libvips-linux-arm64": "1.3.4",
        "@img/sharp-libvips-linux-ppc64": "1.3.4",
        "@img/sharp-libvips-linux-riscv64": "1.3.4",
        "@img/sharp-libvips-linux-s390x": "1.3.4",
        "@img/sharp-libvips-linux-x64": "1.3.4",
        "@img/sharp-libvips-linuxmusl-arm64": "1.3.4",
        "@img/sharp-libvips-linuxmusl-x64": "1.3.4",
        "@img/sharp-linux-arm": "0.35.5",
        "@img/sharp-linux-arm64": "0.35.5",
        "@img/sharp-linux-ppc64": "0.35.5",
        "@img/sharp-linux-riscv64": "0.35.5",
        "@img/sharp-linux-s390x": "0.35.5",
        "@img/sharp-linux-x64": "0.35.5",
        "@img/sharp-linuxmusl-arm64": "0.35.5",
        "@img/sharp-linuxmusl-x64": "0.35.5",
        "@img/sharp-webcontainers-wasm32": "0.35.5",
        "@img/sharp-win32-arm64": "0.35.5",
        "@img/sharp-win32-ia32": "0.35.5",
        "@img/sharp-win32-x64": "0.35.5"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.2.tgz",
      "integrity": "sha512-KGj/8Y43x35aZVDtt+J4mK1hoLGHULMYfSkODJNQjNDC3oW1PqPoxMwo0pLUsWM/UEGzON/NxeHywEfNXNP3Vw==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/styled-jsx": {
      "version": "5.1.6",
      "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.6.tgz",
      "integrity": "sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==",
      "license": "MIT",
      "dependencies": {
        "client-only": "0.0.1"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "peerDependencies": {
        "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0"
      },
      "peerDependenciesMeta": {
        "@babel/core": {
          "optional": true
        },
        "babel-plugin-macros": {
          "optional": true
        }
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.3.3.tgz",
      "integrity": "sha512-gOhV3P7ufE62QDGg1zVaTgCR+EtPv92k2nIhVcVKcLmxT1sUBsQGhnZj175j+MqRt4zLF7ic+sCYjfhxMxj7YQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.3.tgz",
      "integrity": "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/tsx": {
      "version": "4.23.15",
      "resolved": "https://registry.npmjs.org/tsx/-/tsx-4.23.15.tgz",
      "integrity": "sha512-Yiex1Ovn8z2xPpOWckIiysV1SSyRMY9BkLF++q0yKiDxCqRhosKfMg3janKkiLBwZ5c/YryloKwGZcrEmtwxKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "~0.28.0"
      },
      "bin": {
        "tsx": "dist/cli.mjs"
      },
      "engines": {
        "node": ">=18.0.0"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "7.24.6",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.24.6.tgz",
      "integrity": "sha512-WRNW+sJgj5OBN4/0JpHFqtqzhpbnV0GuB+OozA9gCL7a993SmU+1JBZCzLNxYsbMfIeDL+lTsphD5jN5N+n0zg==",
      "dev": true,
      "license": "MIT"
    }
  }
}
```


## public/fonts/Cormorant-Garamond-OFL.txt

```text
Copyright 2015 the Cormorant Project Authors (github.com/CatharsisFonts/Cormorant)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```


## public/fonts/Inter-OFL.txt

```text
Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```


## public/fonts/SOURCES.json

```json
{
  "retrievedOn": "2026-10-19",
  "provider": "Google Fonts official CSS API and Google Fonts official GitHub repository",
  "stylesheet": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Inter:wght@100..900&display=swap",
  "purpose": "Locally hosted font assets; no runtime Google Fonts request required.",
  "assets": [
    {
      "file": "cormorant-garamond-latin-italic.woff2",
      "family": "Cormorant Garamond",
      "style": "italic",
      "weightRange": "300 700",
      "subset": "Latin",
      "source": "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtImSo.woff2",
      "bytes": 39260,
      "sha256": "6f2f5c3b1abc3d0bb035a927f66a90ca873f94fc31c4966c8d024142c2036e55",
      "license": "SIL Open Font License 1.1",
      "verifiedVariableAxes": [
        {
          "tag": "wght",
          "name": "Weight",
          "min": 300.0,
          "default": 300.0,
          "max": 700.0
        }
      ],
      "verification": "WOFF2 signature and declared file size verified; font decoded by system FreeType; variable axes extracted using FT_Get_MM_Var."
    },
    {
      "file": "cormorant-garamond-latin.woff2",
      "family": "Cormorant Garamond",
      "style": "normal",
      "weightRange": "300 700",
      "subset": "Latin",
      "source": "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2",
      "bytes": 37640,
      "sha256": "d80df8ff5aecd299a61549f9e29ab1ed0b9b05f4ea71d50fe978e07d5240b235",
      "license": "SIL Open Font License 1.1",
      "verifiedVariableAxes": [
        {
          "tag": "wght",
          "name": "Weight",
          "min": 300.0,
          "default": 300.0,
          "max": 700.0
        }
      ],
      "verification": "WOFF2 signature and declared file size verified; font decoded by system FreeType; variable axes extracted using FT_Get_MM_Var."
    },
    {
      "file": "inter-latin.woff2",
      "family": "Inter",
      "style": "normal",
      "weightRange": "100 900",
      "subset": "Latin",
      "source": "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2",
      "bytes": 48256,
      "sha256": "3100e775e8616cd2611beecfa23a4263d7037586789b43f035236a2e6fbd4c62",
      "license": "SIL Open Font License 1.1",
      "verifiedVariableAxes": [
        {
          "tag": "wght",
          "name": "Weight",
          "min": 100.0,
          "default": 400.0,
          "max": 900.0
        }
      ],
      "verification": "WOFF2 signature and declared file size verified; font decoded by system FreeType; variable axes extracted using FT_Get_MM_Var."
    },
    {
      "file": "Cormorant-Garamond-OFL.txt",
      "source": "https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/OFL.txt",
      "bytes": 4387,
      "sha256": "60700d351cac4650c51f3f9db318d2a420f8b45052dba2715eb5fec41f0f6956"
    },
    {
      "file": "Inter-OFL.txt",
      "source": "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt",
      "bytes": 4377,
      "sha256": "5b9321a4298cfeb6b34354164a1c3afc3db114569984c502b9b35d988fd58c57"
    }
  ]
}
```


## public/fonts/google-fonts-source.css

```css
/* cyrillic-ext */
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: italic;
  font-weight: 300 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtFmSq17w.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: italic;
  font-weight: 300 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtMmSq17w.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: italic;
  font-weight: 300 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtHmSq17w.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: italic;
  font-weight: 300 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtGmSq17w.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: italic;
  font-weight: 300 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtImSo.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpHtKgS4.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYrXtKgS4.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpntKgS4.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYp3tKgS4.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2) format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```


## public/media/SOURCES.json

```json
{
  "project": "Timeless Decor and Event",
  "preparedOn": "2026-10-19",
  "mediaOrigin": "All imagery and films originate from the eight files uploaded by the user in this session. No stock or generated imagery is used.",
  "license": "User-supplied for the requested website. No independent assertion of ownership, photographer identity, publication license, completed-client work, client endorsement, or event facts is made. Several source filenames reference Klickpin; their external original publication is unknown.",
  "attribution": "Original visible branding and contact watermarks retained on supplied photographs. No photographer attribution supplied.",
  "assets": [
    {
      "file": "wedding.webp",
      "source": "WhatsApp Image 2026-10-16 at 10.56.50 AM.jpeg",
      "sourceType": "user-provided photograph",
      "description": "Ivory and gold wedding d\u00e9cor with floral stage and a flower-filled reflective walkway.",
      "dimensions": [
        640,
        640
      ],
      "bytes": 146424,
      "illustrative": false,
      "eventClientDateVenue": "Not supplied; descriptive collection titles only",
      "processing": "Converted to WebP; original branding retained."
    },
    {
      "file": "stage.webp",
      "source": "WhatsApp Image 2026-10-16 at 10.56.52 AM.jpeg",
      "sourceType": "user-provided photograph",
      "description": "Sculptural ivory arches, candlelight, flowers, and traditional Ethiopian basket details.",
      "dimensions": [
        640,
        640
      ],
      "bytes": 80006,
      "illustrative": false,
      "eventClientDateVenue": "Not supplied; descriptive collection titles only",
      "processing": "Converted to WebP; original branding retained."
    },
    {
      "file": "soiree.webp",
      "source": "WhatsApp Image 2026-10-16 at 10.56.51 AM.jpeg",
      "sourceType": "user-provided photograph",
      "description": "Blush and cream balloon installation with fluted display plinths.",
      "dimensions": [
        640,
        640
      ],
      "bytes": 72218,
      "illustrative": false,
      "eventClientDateVenue": "Not supplied; descriptive collection titles only",
      "processing": "Converted to WebP; original branding retained."
    },
    {
      "file": "celebration.webp",
      "source": "WhatsApp Image 2026-10-16 at 10.56.51 AM (1).jpeg",
      "sourceType": "user-provided photograph",
      "description": "Colorful balloon and floral installation with white display plinths.",
      "dimensions": [
        640,
        455
      ],
      "bytes": 70402,
      "illustrative": false,
      "eventClientDateVenue": "Not supplied; descriptive collection titles only",
      "processing": "Converted to WebP; original branding retained. Original black letterbox trimmed."
    },
    {
      "file": "hero.webp",
      "source": "From_Klickpin_com_Mental_Wellness_Tips_42_Ideas_to_Copy_pin_id_.mp4",
      "sourceType": "still from user-provided video",
      "sourceFrameSeconds": 2.5,
      "description": "Cinematic portrait view across white flowers to a sculptural ivory stage.",
      "dimensions": [
        720,
        1280
      ],
      "bytes": 109484,
      "illustrative": false,
      "eventClientDateVenue": "Not supplied; descriptive collection titles only",
      "processing": "Extracted source video frame; converted to WebP."
    },
    {
      "file": "story.webp",
      "source": "From_Klickpin_com_Mental_Wellness_Tips_42_Ideas_to_Copy_pin_id_.mp4",
      "sourceType": "still from user-provided video",
      "sourceFrameSeconds": 1,
      "description": "Close-up white floral arrangement and clear chairs in an event space.",
      "dimensions": [
        720,
        1280
      ],
      "bytes": 100018,
      "illustrative": false,
      "eventClientDateVenue": "Not supplied; descriptive collection titles only",
      "processing": "Extracted source video frame; converted to WebP."
    },
    {
      "file": "detail.webp",
      "source": "From_Klickpin_com_870039221750554134_pin_id_870039221750554134.mp4",
      "sourceType": "still from user-provided video",
      "sourceFrameSeconds": 2,
      "description": "Traditional woven basket details alongside florals and candlelight.",
      "dimensions": [
        720,
        1280
      ],
      "bytes": 111090,
      "illustrative": false,
      "eventClientDateVenue": "Not supplied; descriptive collection titles only",
      "processing": "Extracted source video frame; converted to WebP."
    },
    {
      "file": "gala.webp",
      "source": "From_Klickpin_com_Mental_Wellness_Tips_42_Ideas_to_Copy_pin_id_.mp4",
      "sourceType": "still from user-provided video",
      "sourceFrameSeconds": 21,
      "description": "White floral tablescape detail. Filename is a presentation slot; not verified as a corporate gala.",
      "dimensions": [
        720,
        1280
      ],
      "bytes": 88690,
      "illustrative": false,
      "eventClientDateVenue": "Not supplied; descriptive collection titles only",
      "processing": "Extracted source video frame; converted to WebP."
    },
    {
      "file": "film-soiree.webp",
      "source": "IMG_0581.MP4",
      "sourceType": "still from user-provided video",
      "sourceFrameSeconds": 3,
      "description": "Pink balloon celebration installation and bow-shaped d\u00e9cor.",
      "dimensions": [
        464,
        848
      ],
      "bytes": 43016,
      "illustrative": false,
      "eventClientDateVenue": "Not supplied; descriptive collection titles only",
      "processing": "Extracted source video frame; converted to WebP."
    },
    {
      "file": "film-wedding.webp",
      "source": "From_Klickpin_com_Fresh_sunset_drive_moments_with_simple_charm_and.mp4",
      "sourceType": "still from user-provided video",
      "sourceFrameSeconds": 4,
      "description": "White sculptural stage with arch lighting and floral arrangements.",
      "dimensions": [
        720,
        1280
      ],
      "bytes": 106828,
      "illustrative": false,
      "eventClientDateVenue": "Not supplied; descriptive collection titles only",
      "processing": "Extracted source video frame; converted to WebP."
    },
    {
      "file": "hero.mp4",
      "source": "From_Klickpin_com_Mental_Wellness_Tips_42_Ideas_to_Copy_pin_id_.mp4",
      "sourceType": "user-provided video",
      "description": "First 14 seconds; visual wedding/floral d\u00e9cor study.",
      "dimensions": [
        720,
        1280
      ],
      "durationSeconds": 14.0,
      "bytes": 2235860,
      "illustrative": false,
      "processing": "H.264, 24 fps, yuv420p, fast-start MP4; audio track removed for a silent editorial experience.",
      "eventClientDateVenue": "Not supplied; descriptive collection titles only"
    },
    {
      "file": "film-wedding.mp4",
      "source": "From_Klickpin_com_Fresh_sunset_drive_moments_with_simple_charm_and.mp4",
      "sourceType": "user-provided video",
      "description": "Full clip; illuminated white floral arches.",
      "dimensions": [
        720,
        1280
      ],
      "durationSeconds": 7.375,
      "bytes": 1269806,
      "illustrative": false,
      "processing": "H.264, 24 fps, yuv420p, fast-start MP4; audio track removed for a silent editorial experience.",
      "eventClientDateVenue": "Not supplied; descriptive collection titles only"
    },
    {
      "file": "film-soiree.mp4",
      "source": "IMG_0581.MP4",
      "sourceType": "user-provided video",
      "description": "Full clip; pink balloon installation.",
      "dimensions": [
        464,
        848
      ],
      "durationSeconds": 19.583333,
      "bytes": 1480507,
      "illustrative": false,
      "processing": "H.264, 24 fps, yuv420p, fast-start MP4; audio track removed for a silent editorial experience.",
      "eventClientDateVenue": "Not supplied; descriptive collection titles only"
    }
  ],
  "designReferences": [
    {
      "url": "https://chapter.millanova.com/",
      "notes": "Four cinematic stories; fullscreen portrait film imagery; spare Explore/About/Collection navigation; strong display type contrasted with modest sans captions. Source design only; no code, media or proprietary fonts copied."
    },
    {
      "url": "https://www.verostudio.com/",
      "notes": "Menu/Close overlay control, dominant serif and italic editorial titles, comprehensive navigation and contact, recurring direct commission CTA. Source design only; no code, media or proprietary fonts copied."
    }
  ]
}
```


## scripts/test.mjs

```javascript
import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = readdirSync(new URL("../tests/", import.meta.url))
  .filter((name) => name.endsWith(".test.ts"))
  .sort()
  .map((name) => fileURLToPath(new URL(`../tests/${name}`, import.meta.url)));
const result = spawnSync(process.execPath,
  ["--import", "tsx", "--test", "--test-isolation=none", ...files],
  { cwd: root, stdio: "inherit" },
);
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
```


## setup.sh

```bash
#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
if ! command -v node >/dev/null 2>&1; then
  printf '%s\n' 'Install Node.js 24 or newer from https://nodejs.org/ first.' >&2
  exit 1
fi
timeless_node_major="$(node -p "process.versions.node.split('.')[0]")"
if [ "$timeless_node_major" -lt 24 ]; then
  printf '%s\n' 'This project uses Node.js 24 or newer.' >&2
  exit 1
fi
if [ -f package-lock.json ]; then npm ci; else npm install; fi
if [ "${1:-}" = '--start' ]; then exec npm run dev; fi
printf '%s\n' 'Timeless is ready. Run npm run dev, then open http://localhost:3000.'
```


## tests/inquiry-route.test.ts

```typescript
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
```


## tests/inquiry.test.ts

```typescript
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
```
