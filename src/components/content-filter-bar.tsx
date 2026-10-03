"use client";

import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useState, type FormEvent } from "react";
import { Search, X } from "lucide-react";

export function ContentFilterBar({
  searchPlaceholder,
  dateFromLabel,
  dateToLabel,
  clearLabel,
  categories,
  categoryLabel,
  allCategoriesLabel,
}: {
  searchPlaceholder: string;
  dateFromLabel: string;
  dateToLabel: string;
  clearLabel: string;
  categories?: string[];
  categoryLabel?: string;
  allCategoriesLabel?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [from, setFrom] = useState(searchParams.get("from") ?? "");
  const [to, setTo] = useState(searchParams.get("to") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");

  function applyParams(next: { q: string; from: string; to: string; category: string }) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.q) params.set("q", next.q);
    else params.delete("q");
    if (next.from) params.set("from", next.from);
    else params.delete("from");
    if (next.to) params.set("to", next.to);
    else params.delete("to");
    if (next.category) params.set("category", next.category);
    else params.delete("category");
    params.delete("servicesPage");
    params.delete("meetingsPage");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    applyParams({ q, from, to, category });
  }

  function handleClear() {
    setQ("");
    setFrom("");
    setTo("");
    setCategory("");
    applyParams({ q: "", from: "", to: "", category: "" });
  }

  const hasFilters = q || from || to || category;

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel mb-10 flex flex-wrap items-end justify-center gap-3 rounded-2xl border border-brand-900/10 bg-[var(--background)] p-4 shadow-sm"
    >
      <label className="flex min-w-[220px] flex-1 flex-col gap-1 text-xs font-medium text-brand-800/70">
        <span className="sr-only">{searchPlaceholder}</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={searchPlaceholder}
          className="rounded-full border border-brand-900/15 bg-[var(--background)] px-4 py-2 text-sm text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        />
      </label>

      {categories && categories.length > 0 && (
        <label className="flex flex-col gap-1 text-xs font-medium text-brand-800/70">
          {categoryLabel}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              applyParams({ q, from, to, category: e.target.value });
            }}
            className="rounded-full border border-brand-900/15 bg-[var(--background)] px-4 py-2 text-sm text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <option value="">{allCategoriesLabel}</option>
            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="flex flex-col gap-1 text-xs font-medium text-brand-800/70">
        {dateFromLabel}
        <input
          type="date"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
            applyParams({ q, from: e.target.value, to, category });
          }}
          className="rounded-full border border-brand-900/15 bg-[var(--background)] px-4 py-2 text-sm text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-xs font-medium text-brand-800/70">
        {dateToLabel}
        <input
          type="date"
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
            applyParams({ q, from, to: e.target.value, category });
          }}
          className="rounded-full border border-brand-900/15 bg-[var(--background)] px-4 py-2 text-sm text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        />
      </label>

      <button
        type="submit"
        aria-label="Search"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-brand-950 transition hover:bg-gold-400"
      >
        <Search size={16} />
      </button>

      {hasFilters && (
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-1 rounded-full border border-brand-900/15 px-4 py-2 text-sm font-medium text-brand-800 transition hover:bg-brand-50"
        >
          <X size={14} />
          {clearLabel}
        </button>
      )}
    </form>
  );
}
