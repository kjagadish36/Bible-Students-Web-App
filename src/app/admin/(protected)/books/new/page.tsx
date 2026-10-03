import { TextField, TextAreaField } from "@/components/admin/form-fields";
import { BlobUploadField } from "@/components/admin/blob-upload-field";
import { createBook } from "../actions";

export default function NewBookPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-brand-900">Add Book</h1>

      <form action={createBook} className="mt-6 max-w-lg space-y-4">
        <TextField label="Title (English)" name="titleEn" />
        <TextField label="Title (Tamil)" name="titleTa" />
        <TextField label="Title (Kannada)" name="titleKn" />
        <TextAreaField label="Description (English)" name="descriptionEn" />
        <TextAreaField label="Description (Tamil)" name="descriptionTa" />
        <TextAreaField label="Description (Kannada)" name="descriptionKn" />

        <label className="block text-sm font-medium text-brand-900">
          Book&apos;s primary language
          <select
            name="language"
            required
            className="mt-1 w-full rounded-lg border border-brand-900/15 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <option value="en">English</option>
            <option value="ta">Tamil</option>
            <option value="kn">Kannada</option>
          </select>
        </label>

        <BlobUploadField
          label="Upload book file (PDF or EPUB, up to 50MB)"
          name="fileUrl"
          accept=".pdf,.epub"
        />
        <BlobUploadField
          label="Upload cover image (optional)"
          name="coverImageUrl"
          accept=".jpg,.jpeg,.png,.webp"
        />

        <button
          type="submit"
          className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-brand-950 hover:bg-gold-400"
        >
          Save
        </button>
      </form>
    </div>
  );
}
