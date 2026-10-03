import { TextField } from "@/components/admin/form-fields";
import { CategorySelectField } from "@/components/admin/category-select-field";
import { createService } from "../actions";
import { VIDEO_CATEGORIES } from "@/lib/video-categories";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-brand-900">Add Service</h1>

      <form action={createService} className="mt-6 max-w-lg space-y-4">
        <TextField label="Title (English)" name="titleEn" />
        <TextField label="Title (Tamil)" name="titleTa" />
        <TextField label="Title (Kannada)" name="titleKn" />
        <TextField label="YouTube video ID (e.g. dQw4w9WgXcQ)" name="youtubeId" />
        <TextField label="Preacher (optional)" name="preacher" required={false} />
        <CategorySelectField label="Category (optional)" name="category" options={VIDEO_CATEGORIES} />
        <TextField label="Service date" name="serviceDate" type="date" />

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

