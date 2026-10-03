import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookOpen, Megaphone, MapPin, PlayCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CHURCH_MAPS_URL } from "@/lib/site-config";

const PLACEHOLDER_PREFIX = "TODO_REPLACE_";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const verse = await getTranslations("verse");
  const address = t("address");
  const hasRealAddress = !address.startsWith(PLACEHOLDER_PREFIX);

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-950">
        <div className="hero-slide" style={{ backgroundImage: "url(/images/home-slide-1.jpg)" }} />
        <div className="hero-slide" style={{ backgroundImage: "url(/images/home-slide-2.jpg)" }} />
        <div className="hero-slide" style={{ backgroundImage: "url(/images/home-slide-3.jpg)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#0d1526]" />
        <div className="relative mx-auto max-w-5xl px-4 py-32 text-center sm:py-44 lg:py-56">
          <div className="label mx-auto inline-flex items-center rounded-full border border-gold-400/30 bg-white/5 px-3 py-1 text-[11px] text-gold-400 backdrop-blur-md">
            Faith • Fellowship • Truth
          </div>
          <h1 className="mt-6 font-serif text-4xl font-bold text-white drop-shadow-[0_0_20px_rgba(248,221,154,0.18)] sm:text-5xl lg:text-7xl">
            {t("churchName")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-brand-100/85 sm:text-lg">
            {t("tagline")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className="gold-glow rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-6 py-2.5 text-sm font-semibold text-brand-950 shadow-[0_16px_38px_rgba(248,221,154,0.28)] transition hover:brightness-110"
            >
              {t("servicesTeaser")}
            </Link>
            <a
              href={CHURCH_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,255,255,0.06)] backdrop-blur-md transition hover:bg-white/10"
            >
              {t("viewMap")}
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-950 py-20">
        <div
          className="page-banner-img"
          style={{ backgroundImage: "url(/images/home-verse-band.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1526]/60 via-transparent to-[#0d1526]/60" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <p className="font-serif text-xl italic leading-relaxed text-white sm:text-2xl">
            “{verse("text")}”
          </p>
          <p className="label mt-4 text-xs text-gold-400">
            {verse("ref")}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-start">
        <div>
          <div className="mb-6 overflow-hidden rounded-2xl shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/story-photo.jpg"
              alt={t("aboutTitle")}
              className="h-56 w-full object-cover"
            />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-brand-900">
            {t("aboutTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-brand-800/80">{t("aboutBody")}</p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-brand-900">
            <MapPin size={22} className="text-gold-600" />
            {t("locationTitle")}
          </h2>
          <p className="mt-2 text-brand-800/80">{address}</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-brand-900/10 shadow-sm">
            {hasRealAddress ? (
              <iframe
                title="church-location"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              />
            ) : (
              <div className="flex h-64 w-full items-center justify-center bg-brand-50 text-sm text-brand-800/60">
                Map will appear here once {address} is set.
              </div>
            )}
          </div>
          {hasRealAddress && (
            <a
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:underline"
              href={CHURCH_MAPS_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t("viewMap")} →
            </a>
          )}
        </div>
      </section>

      <section className="bg-brand-50/60 px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
          <HomeCard
            href="/services"
            icon={<PlayCircle size={22} />}
            title={t("servicesTeaser")}
            cta={t("exploreMore")}
          />
          <HomeCard
            href="/announcements"
            icon={<Megaphone size={22} />}
            title={t("announcementsTeaser")}
            cta={t("exploreMore")}
          />
          <HomeCard
            href="/books"
            icon={<BookOpen size={22} />}
            title={t("booksTeaser")}
            cta={t("exploreMore")}
          />
        </div>
      </section>
    </div>
  );
}

function HomeCard({
  href,
  icon,
  title,
  cta,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="glass-panel group flex flex-col justify-between rounded-2xl border p-6 transition hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-[0_18px_40px_rgba(248,221,154,0.12)]"
    >
      <span className="gold-glow flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-50 text-gold-700">
        {icon}
      </span>
      <p className="mt-4 text-brand-900 dark:text-brand-50">{title}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 dark:text-gold-400">
        {cta}
        <span className="transition group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

