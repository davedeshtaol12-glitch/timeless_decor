import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import en from "../messages/en.json";
import { LOCALE_COOKIE, defaultLocale, isLocale, type Locale } from "./config";

type Messages = Record<string, unknown>;

/** Keys missing from a translation fall back to English, so partial files are safe. */
function merge(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const existing = result[key];
    if (value && typeof value === "object" && !Array.isArray(value) && existing && typeof existing === "object" && !Array.isArray(existing)) {
      result[key] = merge(existing as Messages, value as Messages);
    } else if (value !== undefined && value !== null && value !== "") {
      result[key] = value;
    }
  }
  return result;
}

async function resolveLocale(): Promise<Locale> {
  const stored = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(stored)) return stored;
  const accepted = (await headers()).get("accept-language")?.toLowerCase() ?? "";
  if (/(^|,)\s*am\b/.test(accepted)) return "am";
  if (/(^|,)\s*(om|orm)\b/.test(accepted)) return "om";
  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await resolveLocale();
  const messages = locale === "en" ? (en as Messages) : merge(en as Messages, (await import(`../messages/${locale}.json`)).default);
  return { locale, messages };
});
