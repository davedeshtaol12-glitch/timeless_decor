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
