import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Phone, MapPin, Info } from "lucide-react";
import { CHURCH_MAPS_URL } from "@/lib/site-config";

const PLACEHOLDER_PREFIX = "TODO_REPLACE_";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const home = await getTranslations("home");

  const email = t("email");
  const phone = t("phone");
  const otherInfo = t("otherInfo");
  const address = home("address");

  const hasEmail = !email.startsWith(PLACEHOLDER_PREFIX);
  const hasPhone = !phone.startsWith(PLACEHOLDER_PREFIX);
  const hasOtherInfo = !otherInfo.startsWith(PLACEHOLDER_PREFIX);

  return (
    <div>
      <section className="page-banner relative overflow-hidden bg-brand-950 px-4 py-20 text-center sm:px-6 sm:py-24">
        <div className="page-banner-img" style={{ backgroundImage: "url(/images/connect-banner.jpg)" }} />
        <h1 className="relative font-serif text-3xl font-bold text-white">{t("pageTitle")}</h1>
        <p className="relative mx-auto mt-3 max-w-xl text-brand-100/80">{t("intro")}</p>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="space-y-4">
          <ContactRow
            icon={<Mail size={20} />}
            label={t("emailLabel")}
            value={hasEmail ? email : t("emailLabel")}
            href={hasEmail ? `mailto:${email}` : undefined}
            isPlaceholder={!hasEmail}
          />
          <ContactRow
            icon={<Phone size={20} />}
            label={t("phoneLabel")}
            value={hasPhone ? phone : t("phoneLabel")}
            href={hasPhone ? `tel:${phone.replace(/[^+\d]/g, "")}` : undefined}
            isPlaceholder={!hasPhone}
          />
          <ContactRow
            icon={<MapPin size={20} />}
            label={t("addressLabel")}
            value={address}
            href={CHURCH_MAPS_URL}
            isPlaceholder={false}
          />
          <ContactRow
            icon={<Info size={20} />}
            label={t("otherLabel")}
            value={hasOtherInfo ? otherInfo : t("otherLabel")}
            isPlaceholder={!hasOtherInfo}
          />
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  isPlaceholder,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  isPlaceholder: boolean;
}) {
  const content = (
    <div className="glass-panel flex items-start gap-4 rounded-2xl border border-brand-900/10 bg-[var(--background)] p-5 shadow-sm transition hover:shadow-md">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
        {icon}
      </span>
      <div>
        <p className="text-xs font-medium tracking-wide text-brand-800/50 uppercase">
          {label}
        </p>
        <p
          className={
            isPlaceholder
              ? "mt-1 text-brand-800/50 italic"
              : "mt-1 font-medium text-brand-900"
          }
        >
          {isPlaceholder ? `${value} not set yet` : value}
        </p>
      </div>
    </div>
  );

  if (href && !isPlaceholder) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
