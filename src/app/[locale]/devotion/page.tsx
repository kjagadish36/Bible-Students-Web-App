import { getTranslations, setRequestLocale } from "next-intl/server";
import { Calendar, ChevronLeft, ChevronRight, ExternalLink, Quote, BookOpen, Moon, Sunrise, BookMarked } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCachedDevotion, getClassicReadings, type DevotionCategory } from "@/lib/devotion";

const CATEGORY_ICON: Record<DevotionCategory, typeof BookOpen> = {
  manna: BookOpen,
  songsnight: Moon,
  promises: Sunrise,
};

function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseSelectedDate(value: string | string[] | undefined, fallback: Date): Date {
  const raw = Array.isArray(value) ? value[0] : value;
  const match = raw?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const parsed = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return fallback;
}

export default async function DevotionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("devotion");

  const now = new Date();
  const selectedDate = parseSelectedDate(sp.date, now);
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  const isToday = toIsoDate(selectedDate) === toIsoDate(now);

  const prevDate = new Date(selectedDate);
  prevDate.setDate(selectedDate.getDate() - 1);
  const nextDate = new Date(selectedDate);
  nextDate.setDate(selectedDate.getDate() + 1);

  const devotion = await getCachedDevotion(month, day, locale);
  const classicReadings = getClassicReadings(locale);

  const categoryLabel: Record<DevotionCategory, string> = {
    manna: t("mannaLabel"),
    songsnight: t("songsnightLabel"),
    promises: t("promisesLabel"),
  };

  const dateDisplay = devotion.title || selectedDate.toLocaleDateString(locale, { month: "long", day: "numeric" });

  return (
    <div>
      <section className="page-banner relative overflow-hidden bg-brand-950 px-4 py-28 text-center sm:px-6 sm:py-36">
        <div className="page-banner-img" style={{ backgroundImage: "url(/images/studies-banner.jpg)" }} />
        <h1 className="relative font-serif text-3xl font-bold text-white">{t("pageTitle")}</h1>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <form className="mb-5 flex flex-wrap items-center justify-center gap-3">
          <label htmlFor="devotion-date" className="label text-xs text-brand-800/60">
            {t("dateLabel")}
          </label>
          <input
            id="devotion-date"
            type="date"
            name="date"
            defaultValue={toIsoDate(selectedDate)}
            className="rounded-full border border-brand-900/15 bg-[var(--background)] px-4 py-2 text-sm text-brand-800 focus:border-gold-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-brand-950 shadow-sm transition hover:bg-gold-400"
          >
            {t("goLabel")}
          </button>
        </form>

        <div className="mb-3 flex items-center justify-center gap-2 text-brand-900">
          <Calendar size={18} className="text-gold-600" />
          <p className="font-serif text-lg font-semibold sm:text-xl">{dateDisplay}</p>
          {isToday && (
            <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-semibold text-gold-700">
              {t("today")}
            </span>
          )}
        </div>

        <nav className="mb-8 flex items-center justify-between gap-3" aria-label={t("pageTitle")}>
          <Link
            href={`/devotion?date=${toIsoDate(prevDate)}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-900/15 px-4 py-2 text-sm font-medium text-brand-800/80 transition hover:bg-brand-50 hover:text-brand-900"
          >
            <ChevronLeft size={16} />
            {t("prev")}
          </Link>
          <Link
            href={`/devotion?date=${toIsoDate(nextDate)}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-900/15 px-4 py-2 text-sm font-medium text-brand-800/80 transition hover:bg-brand-50 hover:text-brand-900"
          >
            {t("next")}
            <ChevronRight size={16} />
          </Link>
        </nav>

        {devotion.entries.length === 0 ? (
          <div className="glass-panel flex flex-col items-center gap-3 rounded-2xl border border-brand-900/10 bg-[var(--background)] px-6 py-12 text-center shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
              <BookOpen size={20} />
            </span>
            <p className="text-brand-800/60">{t("noContent")}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {devotion.entries.map((entry) => {
              const Icon = CATEGORY_ICON[entry.category];
              return (
                <article
                  key={entry.category}
                  className="glass-panel overflow-hidden rounded-2xl border border-brand-900/10 bg-[var(--background)] shadow-sm"
                >
                  <div className="flex items-center gap-3 border-b border-brand-900/10 bg-brand-950 px-6 py-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                      <Icon size={18} />
                    </span>
                    <h2 className="font-serif text-lg font-semibold text-white">
                      {categoryLabel[entry.category]}
                    </h2>
                  </div>
                  <div className="px-6 py-7 sm:px-8">
                    {entry.verse && (
                      <div className="flex gap-3">
                        <Quote size={22} className="mt-1 shrink-0 text-gold-500/70" />
                        <p className="font-serif text-lg font-semibold text-brand-900 italic">{entry.verse}</p>
                      </div>
                    )}
                    <p className="mt-5 whitespace-pre-line text-brand-800/80">{entry.content}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-brand-800/40">
          {t("sourceLabel")}:{" "}
          <a
            href={devotion.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 underline hover:text-brand-800/70"
          >
            {t("sourceLinkText")}
            <ExternalLink size={12} />
          </a>
        </p>

        {classicReadings.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-2.5">
              <BookMarked size={18} className="text-gold-600" />
              <h2 className="font-serif text-xl font-bold text-brand-900">{t("classicReadingsTitle")}</h2>
            </div>
            <p className="mt-1.5 text-sm text-brand-800/60">{t("classicReadingsNote")}</p>
            <div className="mt-4 space-y-2.5">
              {classicReadings.map((reading) => (
                <details
                  key={reading.title}
                  className="glass-panel group rounded-xl border border-brand-900/10 bg-[var(--background)] px-5 py-3.5 shadow-sm"
                >
                  <summary className="cursor-pointer list-none font-serif text-base font-semibold text-brand-900 marker:content-none">
                    {reading.title}
                  </summary>
                  <p className="mt-3 whitespace-pre-line text-sm text-brand-800/80">{reading.content}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

