"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { extractYoutubeId } from "@/lib/youtube";

function revalidateServicesPage() {
  updateTag("videos");
  for (const locale of ["en", "ta", "kn"]) {
    revalidatePath(`/${locale}/services`);
  }
}

function readFields(formData: FormData) {
  return {
    titleEn: String(formData.get("titleEn")),
    titleTa: String(formData.get("titleTa")),
    titleKn: String(formData.get("titleKn")),
    descriptionEn: String(formData.get("descriptionEn")),
    descriptionTa: String(formData.get("descriptionTa")),
    descriptionKn: String(formData.get("descriptionKn")),
    locationEn: String(formData.get("locationEn")),
    locationTa: String(formData.get("locationTa")),
    locationKn: String(formData.get("locationKn")),
    youtubeId: String(formData.get("youtubeId") || "")
      ? extractYoutubeId(String(formData.get("youtubeId")))
      : null,
    category: String(formData.get("category") || "") || null,
    videoDate: new Date(String(formData.get("meetingDate"))),
  };
}

export async function createCottageMeeting(formData: FormData) {
  await prisma.video.create({ data: { kind: "COTTAGE_MEETING", ...readFields(formData) } });
  revalidateServicesPage();
  redirect("/admin/cottage-meetings");
}

export async function updateCottageMeeting(id: number, formData: FormData) {
  await prisma.video.update({
    where: { id, kind: "COTTAGE_MEETING" },
    data: readFields(formData),
  });
  revalidateServicesPage();
  redirect("/admin/cottage-meetings");
}

export async function deleteCottageMeeting(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.video.delete({ where: { id, kind: "COTTAGE_MEETING" } });
  revalidateServicesPage();
}
