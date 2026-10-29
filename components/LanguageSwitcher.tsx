"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const current = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const choose = (locale: Locale) => {
    if (locale === current) return;
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <div className="lang-switch" role="group" aria-label={t("label")} data-pending={pending || undefined}>
      {locales.map((locale) => (
        <button key={locale} type="button" lang={locale} aria-pressed={locale === current} aria-label={t(locale)} title={t(locale)} onClick={() => choose(locale)}>
          {t(`short.${locale}`)}
        </button>
      ))}
    </div>
  );
}
