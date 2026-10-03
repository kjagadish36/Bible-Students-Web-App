import { TextField, TextAreaField } from "@/components/admin/form-fields";
import { CategorySelectField } from "@/components/admin/category-select-field";
import { createCottageMeeting } from "../actions";
import { VIDEO_CATEGORIES } from "@/lib/video-categories";

export default function NewCottageMeetingPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-brand-900">Add Cottage Meeting</h1>

      <form action={createCottageMeeting} className="mt-6 max-w-lg space-y-4">
        <TextField label="Title (English)" name="titleEn" />
        <TextField label="Title (Tamil)" name="titleTa" />
        <TextField label="Title (Kannada)" name="titleKn" />
        <TextAreaField label="Description (English)" name="descriptionEn" />
        <TextAreaField label="Description (Tamil)" name="descriptionTa" />
        <TextAreaField label="Description (Kannada)" name="descriptionKn" />
        <TextField label="Location (English)" name="locationEn" />
        <TextField label="Location (Tamil)" name="locationTa" />
        <TextField label="Location (Kannada)" name="locationKn" />
        <TextField
          label="YouTube video ID (optional recording)"
          name="youtubeId"
          required={false}
        />
        <CategorySelectField label="Category (optional)" name="category" options={VIDEO_CATEGORIES} />
        <TextField label="Meeting date" name="meetingDate" type="date" />

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
