"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { extractYoutubeId } from "@/lib/youtube";

function revalidateServices() {
  updateTag("videos");
  for (const locale of ["en", "ta", "kn"]) {
    revalidatePath(`/${locale}/services`);
  }
}

export async function createService(formData: FormData) {
  await prisma.video.create({
    data: {
      kind: "SERVICE",
      titleEn: String(formData.get("titleEn")),
      titleTa: String(formData.get("titleTa")),
      titleKn: String(formData.get("titleKn")),
      youtubeId: extractYoutubeId(String(formData.get("youtubeId"))),
      preacher: String(formData.get("preacher") || "") || null,
      category: String(formData.get("category") || "") || null,
      videoDate: new Date(String(formData.get("serviceDate"))),
    },
  });
  revalidateServices();
  redirect("/admin/services");
}

export async function updateService(id: number, formData: FormData) {
  await prisma.video.update({
    where: { id, kind: "SERVICE" },
    data: {
      titleEn: String(formData.get("titleEn")),
      titleTa: String(formData.get("titleTa")),
      titleKn: String(formData.get("titleKn")),
      youtubeId: extractYoutubeId(String(formData.get("youtubeId"))),
      preacher: String(formData.get("preacher") || "") || null,
      category: String(formData.get("category") || "") || null,
      videoDate: new Date(String(formData.get("serviceDate"))),
    },
  });
  revalidateServices();
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.video.delete({ where: { id, kind: "SERVICE" } });
  revalidateServices();
}

