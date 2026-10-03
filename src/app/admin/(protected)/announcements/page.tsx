import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteAnnouncement } from "./actions";

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-brand-900">Announcements</h1>
        <Link
          href="/admin/announcements/new"
          className="flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-brand-950 hover:bg-gold-400"
        >
          <Plus size={16} />
          Add announcement
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {announcements.length === 0 && (
          <p className="text-brand-800/60">No announcements yet.</p>
        )}
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="flex items-center justify-between rounded-xl border border-brand-900/10 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-medium text-brand-900">{announcement.titleEn}</p>
              <p className="text-sm text-brand-800/60">
                {announcement.publishedAt.toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/announcements/${announcement.id}/edit`}
                className="rounded-full border border-brand-900/15 p-2 text-brand-800 hover:bg-brand-50"
                aria-label="Edit"
              >
                <Pencil size={16} />
              </Link>
              <form action={deleteAnnouncement}>
                <input type="hidden" name="id" value={announcement.id} />
                <button
                  type="submit"
                  className="rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
