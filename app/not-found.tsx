import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { richTags } from "@/lib/rich";

export default function NotFound() {
  const t = useTranslations("errors");
  return <main className="error-page">
    <span className="eyebrow">{t("notFoundEyebrow")}</span>
    <h1>{t.rich("notFoundTitle", richTags)}</h1>
    <p>{t("notFoundText")}</p>
    <Link className="button button-dark" href="/">{t("notFoundCta")} <ArrowUpRight size={18} /></Link>
  </main>;
}
