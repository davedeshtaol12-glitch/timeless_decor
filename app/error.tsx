"use client";

import { useTranslations } from "next-intl";
import { richTags } from "@/lib/rich";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("errors");
  return <main className="error-page">
    <span className="eyebrow">{t("eyebrow")}</span>
    <h1>{t.rich("title", richTags)}</h1>
    <p>{t.rich("text", { phone: () => <a href="tel:+251941097286">0941097286</a> })}</p>
    <button className="button button-dark" onClick={reset}>{t("reload")}</button>
  </main>;
}
