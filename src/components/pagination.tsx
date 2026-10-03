import { Link } from "@/i18n/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

function buildHref(
  basePath: string,
  searchParams: SearchParams,
  paramName: string,
  page: number,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (key === paramName) continue;
    if (typeof value === "string" && value) params.set(key, value);
  }
  if (page > 1) params.set(paramName, String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

// Collapses long page ranges to "1 ... 4 5 6 ... 20" style.
function pageList(current: number, total: number): (number | "…")[] {
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result: (number | "…")[] = [];
  let prev = 0;
  for (const page of sorted) {
    if (prev && page - prev > 1) result.push("…");
    result.push(page);
    prev = page;
  }
  return result;
}

export function Pagination({
  basePath,
  searchParams,
  paramName,
  currentPage,
  totalPages,
}: {
  basePath: string;
  searchParams: SearchParams;
  paramName: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination">
      {pageList(currentPage, totalPages).map((page, i) =>
        page === "…" ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-brand-800/40">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(basePath, searchParams, paramName, page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={
              page === currentPage
                ? "flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-sm font-semibold text-brand-950 shadow-sm"
                : "flex h-9 w-9 items-center justify-center rounded-full border border-brand-900/15 text-sm font-medium text-brand-800 transition hover:bg-brand-50"
            }
          >
            {page}
          </Link>
        ),
      )}
    </nav>
  );
}
