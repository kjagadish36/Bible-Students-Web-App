"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChurchLogo } from "@/components/church-logo";

const CONFETTI_COLORS = ["#F6D27A", "#E6C35C", "#D4AF37", "#FFF3C4", "#B8860B", "#FFFFFF"];

export function SiteHeader() {
  const t = useTranslations("nav");
  const home = useTranslations("home");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const logoWrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = logoWrapRef.current;
    if (!wrap) return;

    function burst() {
      for (let i = 0; i < 26; i++) {
        const p = document.createElement("span");
        const angle = Math.random() * Math.PI * 2;
        const distance = 34 + Math.random() * 46;
        p.className = "gconf" + (i % 3 === 0 ? " s" : "");
        p.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        p.style.setProperty("--x", Math.cos(angle) * distance + "px");
        p.style.setProperty("--y", Math.sin(angle) * distance + "px");
        p.style.setProperty("--r", Math.random() * 540 - 270 + "deg");
        p.style.animationDelay = Math.random() * 0.15 + "s";
        wrap!.appendChild(p);
        setTimeout(() => p.remove(), 1900);
      }
    }

    const initialTimeout = setTimeout(burst, 2600);
    const interval = setInterval(burst, 6000);
    let last = 0;
    const onEnter = () => {
      const now = Date.now();
      if (now - last > 1200) {
        last = now;
        burst();
      }
    };
    wrap.addEventListener("mouseenter", onEnter);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      wrap.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/devotion", label: t("devotion") },
    { href: "/announcements", label: t("announcements") },
    { href: "/books", label: t("books") },
    { href: "/contact", label: t("contact") },
  ];

  const churchName = home("churchName");
  const churchNameWords = churchName.split(" ");
  const churchNameSplit = Math.ceil(churchNameWords.length / 2);
  const churchNameKicker = churchNameWords.slice(0, churchNameSplit).join(" ");
  const churchNameTitle = churchNameWords.slice(churchNameSplit).join(" ");

  return (
    <header className="relative z-30 border-b border-brand-900/10 bg-[var(--background)]/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3.5">
          <span className="logo-wrap" ref={logoWrapRef}>
            <span className="fairy" />
            <span className="fairy f2" />
            <span className="dust" />
            <ChurchLogo className="logo h-12 w-12 shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-rotate-6 hover:scale-105" />
          </span>
          <span className="flex flex-col leading-tight">
            <small className="label text-[0.68rem] text-gold-600 sm:text-xs">{churchNameKicker}</small>
            <b className="mt-1 font-serif text-lg font-bold not-italic text-brand-900 sm:text-xl lg:text-[1.35rem]">
              {churchNameTitle}
            </b>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "relative px-3.5 py-2 text-sm font-semibold text-gold-600 after:absolute after:bottom-0.5 after:left-1/2 after:h-[2px] after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-gold-500 after:content-['']"
                    : "relative px-3.5 py-2 text-sm font-medium text-brand-800/80 transition after:absolute after:bottom-0.5 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-gold-500 after:transition-all after:duration-300 hover:text-brand-900 hover:after:w-6 after:content-['']"
                }
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-4 flex items-center gap-3 border-l border-brand-900/10 pl-4">
            <ThemeToggle />
            <LocaleSwitcher />
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-brand-900/15 p-2.5 text-brand-900 transition hover:bg-brand-50 md:hidden"
          aria-expanded={open ? "true" : "false"}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1.5 border-t border-brand-900/10 bg-[var(--background)] px-5 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={
                pathname === link.href
                  ? "rounded-lg border-l-4 border-gold-500 bg-gold-500/10 px-3.5 py-2.5 text-sm font-semibold text-gold-600"
                  : "rounded-lg border-l-4 border-transparent px-3.5 py-2.5 text-sm font-medium text-brand-800"
              }
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center justify-between gap-3 border-t border-brand-900/10 pt-4">
            <ThemeToggle />
            <LocaleSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}

