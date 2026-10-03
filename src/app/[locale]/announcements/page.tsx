import { getTranslations, setRequestLocale } from "next-intl/server";
import { Megaphone } from "lucide-react";
import { getCachedAnnouncements } from "@/lib/cached-content";
import { localized, type Locale } from "@/lib/localize";

export default async function AnnouncementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("announcements");

  const announcements = await getCachedAnnouncements();

  return (
    <div>
      <section className="page-banner relative overflow-hidden bg-brand-950 px-4 py-28 text-center sm:px-6 sm:py-36">
        <div className="page-banner-img" style={{ backgroundImage: "url(/images/gatherings-banner.jpg)" }} />
        <h1 className="relative font-serif text-3xl font-bold text-white">{t("pageTitle")}</h1>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <article className="glass-panel mx-auto mb-10 max-w-2xl rounded-2xl border border-brand-900/10 bg-[var(--background)] px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12">
          <p className="label text-gold-600">{t("serviceTimingsBadge")}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
            <div>
              <p className="font-serif text-4xl font-bold text-brand-900 sm:text-5xl">
                {t("serviceTimingsStart")}
              </p>
              <p className="label mt-2 text-xs text-brand-800/60">{t("serviceTimingsStartLabel")}</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-bold text-brand-900 sm:text-5xl">
                {t("serviceTimingsEnd")}
              </p>
              <p className="label mt-2 text-xs text-brand-800/60">{t("serviceTimingsEndLabel")}</p>
            </div>
          </div>
          <p className="mt-8 text-brand-800/80">{t("serviceTimingsBody")}</p>
        </article>

        {announcements.length === 0 ? (
          <div className="glass-panel flex flex-col items-center gap-3 rounded-2xl border border-brand-900/10 bg-[var(--background)] px-6 py-12 text-center shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
              <Megaphone size={20} />
            </span>
            <p className="text-brand-800/60">{t("noContent")}</p>
          </div>
        ) : (
          <div className="space-y-5">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="glass-panel flex gap-4 rounded-2xl border border-brand-900/10 bg-[var(--background)] p-6 shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <Megaphone size={18} />
                </span>
                <div>
                  <p className="text-xs font-medium tracking-wide text-brand-800/50 uppercase">
                    {announcement.publishedAt.toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="mt-1 font-serif text-lg font-semibold text-brand-900">
                    {localized(announcement, "title", locale as Locale)}
                  </h2>
                  <p className="mt-2 whitespace-pre-line text-brand-800/80">
                    {localized(announcement, "body", locale as Locale)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

