import { useTranslations } from "next-intl";
import { Video, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CHURCH_MAPS_URL, CHURCH_YOUTUBE_CHANNEL_URL } from "@/lib/site-config";
import { ChurchLogo } from "@/components/church-logo";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const home = useTranslations("home");

  const links = [
    { href: "/", label: nav("home") },
    { href: "/services", label: nav("services") },
    { href: "/announcements", label: nav("announcements") },
    { href: "/books", label: nav("books") },
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <footer className="border-t border-gold-500/20 bg-brand-950 text-brand-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <ChurchLogo className="h-12 w-12 shrink-0" />
            <p className="font-serif text-lg font-semibold text-white">
              {home("churchName")}
            </p>
          </div>
          <p className="mt-2 max-w-xs text-sm text-brand-100/70">{home("tagline")}</p>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-fit text-brand-100/80 transition hover:text-gold-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <a
            href={CHURCH_YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-2 text-brand-100/80 transition hover:text-gold-400"
          >
            <Video size={18} className="shrink-0" />
            YouTube
          </a>
          <a
            href={CHURCH_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-2 text-brand-100/80 transition hover:text-gold-400"
          >
            <MapPin size={18} className="shrink-0" />
            {home("address")}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-brand-100/60">
        {t("copyright", { year: new Date().getFullYear(), churchName: home("churchName") })}
      </div>
    </footer>
  );
}

