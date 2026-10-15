import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookOpen, Download } from "lucide-react";
import { getCachedBooksPage, getCachedBookCategoryCounts } from "@/lib/cached-content";
import { localized, type Locale } from "@/lib/localize";
import { Pagination } from "@/components/pagination";
import { CategoryTabs } from "@/components/category-tabs";

const PAGE_SIZE = 15;

function parsePage(value: string | string[] | undefined): number {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function parseParam(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default async function BooksPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("books");

  const page = parsePage(sp.page);
  const category = parseParam(sp.category);

  const [[total, books], categoryCounts] = await Promise.all([
    getCachedBooksPage((page - 1) * PAGE_SIZE, PAGE_SIZE, category),
    getCachedBookCategoryCounts(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <section className="page-banner relative overflow-hidden bg-brand-950 px-4 py-28 text-center sm:px-6 sm:py-36">
        <div className="page-banner-img" style={{ backgroundImage: "url(/images/studies-banner.jpg)" }} />
        <h1 className="relative font-serif text-3xl font-bold text-white">{t("pageTitle")}</h1>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <CategoryTabs
          basePath="/books"
          searchParams={sp}
          total={categoryCounts.total}
          counts={categoryCounts.counts}
          activeCategory={category}
          allLabel={t("allCategories")}
        />

        {books.length === 0 ? (
          <p className="text-brand-800/60">{category ? t("noResults") : t("noContent")}</p>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <article
                  key={book.id}
                  className="book-card glass-panel flex flex-col rounded-2xl border border-brand-900/10 bg-[var(--background)] shadow-sm"
                >
                  {book.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={book.coverImageUrl}
                      alt={localized(book, "title", locale as Locale)}
                      className="book-cover h-64 w-full rounded-t-2xl bg-[#0d1526] object-contain"
                    />
                  ) : (
                    <div className="book-cover flex h-64 items-center justify-center rounded-t-2xl bg-gradient-to-br from-[#142038] to-[#283d63]">
                      <BookOpen size={48} className="text-gold-400" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h2 className="font-serif font-semibold text-brand-900">
                        {localized(book, "title", locale as Locale)}
                      </h2>
                      {book.category && (
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gold-700">
                          {book.category}
                        </p>
                      )}
                    </div>
                    <a
                      className="book-download-btn mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-gold-500 px-4 py-1.5 text-sm font-semibold text-gold-700 transition hover:bg-gold-500 hover:text-brand-950"
                      href={book.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Download size={14} />
                      {t("readDownload")}
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <Pagination
              basePath="/books"
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

