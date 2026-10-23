"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="error-page">
    <span className="eyebrow">A BRIEF INTERLUDE</span>
    <h1>Let’s try<br /><em>that again.</em></h1>
    <p>Something interrupted the page. Your celebration can still begin with a call to <a href="tel:+251941097286">0941097286</a>.</p>
    <button className="button button-dark" onClick={reset}>Reload this view</button>
  </main>;
}
