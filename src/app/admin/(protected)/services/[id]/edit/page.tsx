import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TextField } from "@/components/admin/form-fields";
import { CategorySelectField } from "@/components/admin/category-select-field";
import { updateService } from "../../actions";
import { VIDEO_CATEGORIES } from "@/lib/video-categories";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.video.findFirst({ where: { id: Number(id), kind: "SERVICE" } });
  if (!service) notFound();

  const updateWithId = updateService.bind(null, service.id);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-brand-900">Edit Service</h1>

      <form action={updateWithId} className="mt-6 max-w-lg space-y-4">
        <TextField label="Title (English)" name="titleEn" defaultValue={service.titleEn} />
        <TextField label="Title (Tamil)" name="titleTa" defaultValue={service.titleTa} />
        <TextField label="Title (Kannada)" name="titleKn" defaultValue={service.titleKn} />
        <TextField label="YouTube video ID" name="youtubeId" defaultValue={service.youtubeId ?? ""} />
        <TextField
          label="Preacher (optional)"
          name="preacher"
          defaultValue={service.preacher ?? ""}
          required={false}
        />
        <CategorySelectField
          label="Category (optional)"
          name="category"
          defaultValue={service.category ?? ""}
          options={VIDEO_CATEGORIES}
        />
        <TextField
          label="Service date"
          name="serviceDate"
          type="date"
          defaultValue={service.videoDate.toISOString().slice(0, 10)}
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
