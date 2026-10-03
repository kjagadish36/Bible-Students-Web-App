import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TextField, TextAreaField } from "@/components/admin/form-fields";
import { CategorySelectField } from "@/components/admin/category-select-field";
import { updateCottageMeeting } from "../../actions";
import { VIDEO_CATEGORIES } from "@/lib/video-categories";

export default async function EditCottageMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = await prisma.video.findFirst({ where: { id: Number(id), kind: "COTTAGE_MEETING" } });
  if (!meeting) notFound();

  const updateWithId = updateCottageMeeting.bind(null, meeting.id);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-brand-900">Edit Cottage Meeting</h1>

      <form action={updateWithId} className="mt-6 max-w-lg space-y-4">
        <TextField label="Title (English)" name="titleEn" defaultValue={meeting.titleEn} />
        <TextField label="Title (Tamil)" name="titleTa" defaultValue={meeting.titleTa} />
        <TextField label="Title (Kannada)" name="titleKn" defaultValue={meeting.titleKn} />
        <TextAreaField
          label="Description (English)"
          name="descriptionEn"
          defaultValue={meeting.descriptionEn ?? ""}
        />
        <TextAreaField
          label="Description (Tamil)"
          name="descriptionTa"
          defaultValue={meeting.descriptionTa ?? ""}
        />
        <TextAreaField
          label="Description (Kannada)"
          name="descriptionKn"
          defaultValue={meeting.descriptionKn ?? ""}
        />
        <TextField label="Location (English)" name="locationEn" defaultValue={meeting.locationEn ?? ""} />
        <TextField label="Location (Tamil)" name="locationTa" defaultValue={meeting.locationTa ?? ""} />
        <TextField label="Location (Kannada)" name="locationKn" defaultValue={meeting.locationKn ?? ""} />
        <TextField
          label="YouTube video ID (optional recording)"
          name="youtubeId"
          defaultValue={meeting.youtubeId ?? ""}
          required={false}
        />
        <CategorySelectField
          label="Category (optional)"
          name="category"
          defaultValue={meeting.category ?? ""}
          options={VIDEO_CATEGORIES}
        />
        <TextField
          label="Meeting date"
          name="meetingDate"
          type="date"
          defaultValue={meeting.videoDate.toISOString().slice(0, 10)}
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
