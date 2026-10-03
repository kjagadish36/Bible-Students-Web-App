import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TextField, TextAreaField } from "@/components/admin/form-fields";
import { BlobUploadField } from "@/components/admin/blob-upload-field";
import { updateBook } from "../../actions";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await prisma.book.findUnique({ where: { id: Number(id) } });
  if (!book) notFound();

  const updateWithId = updateBook.bind(null, book.id);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-brand-900">Edit Book</h1>

      <form action={updateWithId} className="mt-6 max-w-lg space-y-4">
        <TextField label="Title (English)" name="titleEn" defaultValue={book.titleEn} />
        <TextField label="Title (Tamil)" name="titleTa" defaultValue={book.titleTa} />
        <TextField label="Title (Kannada)" name="titleKn" defaultValue={book.titleKn} />
        <TextAreaField
          label="Description (English)"
          name="descriptionEn"
          defaultValue={book.descriptionEn}
        />
        <TextAreaField
          label="Description (Tamil)"
          name="descriptionTa"
          defaultValue={book.descriptionTa}
        />
        <TextAreaField
          label="Description (Kannada)"
          name="descriptionKn"
          defaultValue={book.descriptionKn}
        />

        <label className="block text-sm font-medium text-brand-900">
          Book&apos;s primary language
          <select
            name="language"
            required
            defaultValue={book.language}
            className="mt-1 w-full rounded-lg border border-brand-900/15 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <option value="en">English</option>
            <option value="ta">Tamil</option>
            <option value="kn">Kannada</option>
          </select>
        </label>

        <BlobUploadField
          label="Upload a new book file (PDF or EPUB, up to 50MB, optional)"
          name="fileUrl"
          accept=".pdf,.epub"
          defaultValue={book.fileUrl}
        />
        <BlobUploadField
          label="Upload a new cover image (optional)"
          name="coverImageUrl"
          accept=".jpg,.jpeg,.png,.webp"
          defaultValue={book.coverImageUrl ?? ""}
        />

        <button
          type="submit"
          className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-brand-950 hover:bg-gold-400"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
