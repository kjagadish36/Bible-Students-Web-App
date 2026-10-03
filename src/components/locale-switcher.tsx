"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <label className="flex items-center gap-1.5 text-sm text-brand-800">
      <Globe size={16} className="shrink-0 text-gold-600" />
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => router.replace(pathname, { locale: e.target.value })}
        className="cursor-pointer rounded-full border border-brand-900/15 bg-transparent px-2 py-1 text-sm font-medium text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {t(loc)}
          </option>
        ))}
      </select>
    </label>
  );
}

