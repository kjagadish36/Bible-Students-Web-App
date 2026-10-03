import { getTranslations, setRequestLocale } from "next-intl/server";
import { Video } from "lucide-react";
import { getCachedVideosPage, getCachedCategoryCounts } from "@/lib/cached-content";
import { localized, type Locale } from "@/lib/localize";
import { YoutubeCard } from "@/components/youtube-card";
import { Pagination } from "@/components/pagination";
import { ContentFilterBar } from "@/components/content-filter-bar";
import { CategoryTabs } from "@/components/category-tabs";
import { CHURCH_YOUTUBE_CHANNEL_URL } from "@/lib/site-config";

const PAGE_SIZE = 15;

function parsePage(value: string | string[] | undefined): number {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function parseParam(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default async function ServicesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const page = parsePage(sp.page);
  const search = parseParam(sp.q);
  const dateFrom = parseParam(sp.from);
  const dateTo = parseParam(sp.to);
  const category = parseParam(sp.category);
  const hasFilters = Boolean(search || dateFrom || dateTo || category);

  const [[total, videos], categoryCounts] = await Promise.all([
    getCachedVideosPage((page - 1) * PAGE_SIZE, PAGE_SIZE, search, dateFrom, dateTo, category),
    getCachedCategoryCounts(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <section className="page-banner relative overflow-hidden bg-brand-950 px-4 py-28 text-center sm:px-6 sm:py-36">
        <div className="page-banner-img" style={{ backgroundImage: "url(/images/messages-banner.jpg)" }} />
        <h1 className="relative font-serif text-3xl font-bold text-white">{t("pageTitle")}</h1>
        <a
          className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-brand-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
          href={CHURCH_YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noreferrer"
        >
          <Video size={18} />
          {t("visitChannel")}
        </a>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <CategoryTabs
          basePath="/services"
          searchParams={sp}
          total={categoryCounts.total}
          counts={categoryCounts.counts}
          activeCategory={category}
          allLabel={t("allCategories")}
        />

        <ContentFilterBar
          searchPlaceholder={t("searchPlaceholder")}
          dateFromLabel={t("dateFrom")}
          dateToLabel={t("dateTo")}
          clearLabel={t("clearFilters")}
        />

        {videos.length === 0 ? (
          <p className="mt-3 text-brand-800/60">{hasFilters ? t("noResults") : t("noContent")}</p>
        ) : (
          <>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => {
                const locationText = localized(video, "location", locale as Locale);
                return (
                  <YoutubeCard
                    key={video.id}
                    title={localized(video, "title", locale as Locale)}
                    youtubeId={video.youtubeId ?? "TODO_REPLACE_YOUTUBE_ID"}
                    watchLabel={t("watchOnYoutube")}
                    meta={video.preacher ?? (locationText || undefined)}
                    category={video.category ?? undefined}
                  />
                );
              })}
            </div>
            <Pagination
              basePath="/services"
              searchParams={sp}
              paramName="page"
              currentPage={page}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
}



