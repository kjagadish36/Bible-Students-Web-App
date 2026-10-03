import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TextField, TextAreaField } from "@/components/admin/form-fields";
import { updateAnnouncement } from "../../actions";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const announcement = await prisma.announcement.findUnique({ where: { id: Number(id) } });
  if (!announcement) notFound();

  const updateWithId = updateAnnouncement.bind(null, announcement.id);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-brand-900">Edit Announcement</h1>

      <form action={updateWithId} className="mt-6 max-w-lg space-y-4">
        <TextField label="Title (English)" name="titleEn" defaultValue={announcement.titleEn} />
        <TextField label="Title (Tamil)" name="titleTa" defaultValue={announcement.titleTa} />
        <TextField label="Title (Kannada)" name="titleKn" defaultValue={announcement.titleKn} />
        <TextAreaField label="Body (English)" name="bodyEn" defaultValue={announcement.bodyEn} />
        <TextAreaField label="Body (Tamil)" name="bodyTa" defaultValue={announcement.bodyTa} />
        <TextAreaField label="Body (Kannada)" name="bodyKn" defaultValue={announcement.bodyKn} />
        <TextField
          label="Publish date"
          name="publishedAt"
          type="date"
          defaultValue={announcement.publishedAt.toISOString().slice(0, 10)}
          required={false}
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
