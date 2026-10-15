import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteBook } from "./actions";

export default async function AdminBooksPage() {
  const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-brand-900">Books</h1>
        <Link
          href="/admin/books/new"
          className="flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-brand-950 hover:bg-gold-400"
        >
          <Plus size={16} />
          Add book
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {books.length === 0 && <p className="text-brand-800/60">No books yet.</p>}
        {books.map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between rounded-xl border border-brand-900/10 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-medium text-brand-900">{book.titleEn}</p>
              <p className="text-sm text-brand-800/60">
                {book.language} · {book.category ?? "No category"} · {book.fileUrl}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/books/${book.id}/edit`}
                className="rounded-full border border-brand-900/15 p-2 text-brand-800 hover:bg-brand-50"
                aria-label="Edit"
              >
                <Pencil size={16} />
              </Link>
              <form action={deleteBook}>
                <input type="hidden" name="id" value={book.id} />
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
