import Link from "next/link";
import { FileText, Home, Megaphone, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [serviceCount, cottageCount, announcementCount, bookCount] = await Promise.all([
    prisma.video.count({ where: { kind: "SERVICE" } }),
    prisma.video.count({ where: { kind: "COTTAGE_MEETING" } }),
    prisma.announcement.count(),
    prisma.book.count(),
  ]);

  const cards = [
    { href: "/admin/services", label: "Services", count: serviceCount, icon: <FileText size={20} /> },
    { href: "/admin/cottage-meetings", label: "Cottage Meetings", count: cottageCount, icon: <Home size={20} /> },
    { href: "/admin/announcements", label: "Announcements", count: announcementCount, icon: <Megaphone size={20} /> },
    { href: "/admin/books", label: "Books", count: bookCount, icon: <BookOpen size={20} /> },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-brand-900">Dashboard</h1>
      <p className="mt-1 text-sm text-brand-800/60">
        Add or edit content here. Changes appear on the site immediately.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="flex items-center justify-between rounded-2xl border border-brand-900/10 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                {card.icon}
              </span>
              <span className="font-medium text-brand-900">{card.label}</span>
            </span>
            <span className="text-lg font-semibold text-brand-800/60">{card.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
