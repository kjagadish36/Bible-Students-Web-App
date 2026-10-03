"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : systemDark ? "dark" : "light";

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    document.documentElement.style.colorScheme = initialTheme;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [mounted, theme]);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle color mode"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-900/15 bg-white/60 text-brand-900 shadow-sm backdrop-blur-sm"
      >
        <Sun size={16} />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-900/15 bg-[var(--background)] text-[var(--foreground)] shadow-sm transition hover:scale-[1.02] hover:border-gold-500/60"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
