import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

// Content changes rarely; cache DB reads so a traffic spike doesn't hammer SQLite.
// Admin actions call revalidateTag(...) on write so edits show up immediately.
const REVALIDATE_SECONDS = 60;

export const getCachedBooksPage = unstable_cache(
  async (skip: number, take: number, category: string = "") => {
    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    return Promise.all([
      prisma.book.count({ where }),
      prisma.book.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
    ]);
  },
  ["books-list"],
  { revalidate: REVALIDATE_SECONDS, tags: ["books"] },
);

// Per-category book counts for the Books page category tabs, plus the overall
// total so an "All" tab can show a grand total (mirrors getCachedCategoryCounts).
export const getCachedBookCategoryCounts = unstable_cache(
  async () => {
    const [grouped, total] = await Promise.all([
      prisma.book.groupBy({
        by: ["category"],
        where: { category: { not: null } },
        _count: true,
        orderBy: { category: "asc" },
      }),
      prisma.book.count(),
    ]);
    const counts = grouped
      .filter((row) => row.category)
      .map((row) => ({ name: row.category as string, count: row._count }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return { total, counts };
  },
  ["book-category-counts"],
  { revalidate: REVALIDATE_SECONDS, tags: ["books"] },
);

// Single unified feed of all videos (Services + Cottage Meetings), filterable by
// search/date/category. The site no longer splits these into separate sections.
export const getCachedVideosPage = unstable_cache(
  async (
    skip: number,
    take: number,
    search: string = "",
    dateFrom: string = "",
    dateTo: string = "",
    category: string = "",
  ) => {
    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { titleEn: { contains: search, mode: "insensitive" } },
        { titleTa: { contains: search, mode: "insensitive" } },
        { titleKn: { contains: search, mode: "insensitive" } },
        { preacher: { contains: search, mode: "insensitive" } },
        { locationEn: { contains: search, mode: "insensitive" } },
        { locationTa: { contains: search, mode: "insensitive" } },
        { locationKn: { contains: search, mode: "insensitive" } },
      ];
    }
    if (dateFrom || dateTo) {
      const videoDate: Record<string, Date> = {};
      if (dateFrom) videoDate.gte = new Date(dateFrom);
      if (dateTo) videoDate.lte = new Date(dateTo);
      where.videoDate = videoDate;
    }
    if (category) where.category = category;
    return Promise.all([
      prisma.video.count({ where }),
      prisma.video.findMany({ where, orderBy: { videoDate: "desc" }, skip, take }),
    ]);
  },
  ["videos-list"],
  { revalidate: REVALIDATE_SECONDS, tags: ["videos"] },
);

// Distinct category values actually in use, so the public filter always reflects
// whatever categories admins have added — not just the known playlist names.
export const getCachedVideoCategories = unstable_cache(
  async () => {
    const rows = await prisma.video.findMany({
      where: { category: { not: null } },
      distinct: ["category"],
      select: { category: true },
    });
    const categories = rows.map((row) => row.category).filter((c): c is string => Boolean(c));
    return categories.sort((a, b) => a.localeCompare(b));
  },
  ["video-categories"],
  { revalidate: REVALIDATE_SECONDS, tags: ["videos"] },
);

// Per-category video counts (across Services + Cottage Meetings) for the category tabs,
// plus the overall total so an "All" tab can show a grand total.
export const getCachedCategoryCounts = unstable_cache(
  async () => {
    const [grouped, total] = await Promise.all([
      prisma.video.groupBy({
        by: ["category"],
        where: { category: { not: null } },
        _count: true,
        orderBy: { category: "asc" },
      }),
      prisma.video.count(),
    ]);
    const counts = grouped
      .filter((row) => row.category)
      .map((row) => ({ name: row.category as string, count: row._count }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return { total, counts };
  },
  ["video-category-counts"],
  { revalidate: REVALIDATE_SECONDS, tags: ["videos"] },
);

export const getCachedAnnouncements = unstable_cache(
  async () => {
    return prisma.announcement.findMany({ orderBy: { publishedAt: "desc" } });
  },
  ["announcements-list"],
  { revalidate: REVALIDATE_SECONDS, tags: ["announcements"] },
);

