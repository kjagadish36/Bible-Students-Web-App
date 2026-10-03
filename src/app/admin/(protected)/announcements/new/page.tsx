import { TextField, TextAreaField } from "@/components/admin/form-fields";
import { createAnnouncement } from "../actions";

export default function NewAnnouncementPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-brand-900">Add Announcement</h1>

      <form action={createAnnouncement} className="mt-6 max-w-lg space-y-4">
        <TextField label="Title (English)" name="titleEn" />
        <TextField label="Title (Tamil)" name="titleTa" />
        <TextField label="Title (Kannada)" name="titleKn" />
        <TextAreaField label="Body (English)" name="bodyEn" />
        <TextAreaField label="Body (Tamil)" name="bodyTa" />
        <TextAreaField label="Body (Kannada)" name="bodyKn" />
        <TextField label="Publish date" name="publishedAt" type="date" required={false} />

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
