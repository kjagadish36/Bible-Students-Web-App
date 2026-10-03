import { Link } from "@/i18n/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

function buildHref(basePath: string, searchParams: SearchParams, category: string) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "category" || key === "servicesPage" || key === "meetingsPage") continue;
    if (typeof value === "string" && value) params.set(key, value);
  }
  if (category) params.set("category", category);
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

// Tab-style category browser (mirrors the channel's playlist breakdown) showing a
// video count per category; clicking a tab filters both Services and Cottage Meetings.
export function CategoryTabs({
  basePath,
  searchParams,
  total,
  counts,
  activeCategory,
  allLabel,
}: {
  basePath: string;
  searchParams: SearchParams;
  total: number;
  counts: { name: string; count: number }[];
  activeCategory: string;
  allLabel: string;
}) {
  if (counts.length === 0) return null;

  return (
    <div
      role="tablist"
      className="glass-panel mb-6 flex flex-wrap items-center gap-1 rounded-2xl border border-brand-900/10 bg-[var(--background)] p-1.5 shadow-sm"
    >
      <Link
        href={buildHref(basePath, searchParams, "")}
        role="tab"
        aria-selected={activeCategory === ""}
        className={
          activeCategory === ""
            ? "flex items-center gap-1.5 rounded-xl bg-gold-500 px-4 py-2 text-sm font-semibold text-brand-950"
            : "flex items-center gap-1.5 rounded-xl border border-transparent px-4 py-2 text-sm font-medium text-brand-800 transition duration-200 hover:-translate-y-0.5 hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-brand-900 hover:shadow-sm"
        }
      >
        {allLabel}
        <span
          className={
            activeCategory === ""
              ? "rounded-full bg-black/15 px-1.5 py-0.5 text-xs"
              : "rounded-full bg-[var(--foreground)]/10 px-1.5 py-0.5 text-xs text-brand-800/70"
          }
        >
          {total}
        </span>
      </Link>
      {counts.map(({ name, count }) => (
        <Link
          key={name}
          href={buildHref(basePath, searchParams, name)}
          role="tab"
          aria-selected={activeCategory === name}
          className={
            activeCategory === name
              ? "flex items-center gap-1.5 rounded-xl bg-gold-500 px-4 py-2 text-sm font-semibold text-brand-950"
              : "flex items-center gap-1.5 rounded-xl border border-transparent px-4 py-2 text-sm font-medium text-brand-800 transition duration-200 hover:-translate-y-0.5 hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-brand-900 hover:shadow-sm"
          }
        >
          {name}
          <span
            className={
              activeCategory === name
                ? "rounded-full bg-black/15 px-1.5 py-0.5 text-xs"
                : "rounded-full bg-[var(--foreground)]/10 px-1.5 py-0.5 text-xs text-brand-800/70"
            }
          >
            {count}
          </span>
        </Link>
      ))}
    </div>
  );
}
