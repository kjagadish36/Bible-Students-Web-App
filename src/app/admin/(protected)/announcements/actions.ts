"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function revalidateAnnouncements() {
  updateTag("announcements");
  for (const locale of ["en", "ta", "kn"]) {
    revalidatePath(`/${locale}/announcements`);
  }
}

function readFields(formData: FormData) {
  const publishedAtRaw = String(formData.get("publishedAt") || "");
  return {
    titleEn: String(formData.get("titleEn")),
    titleTa: String(formData.get("titleTa")),
    titleKn: String(formData.get("titleKn")),
    bodyEn: String(formData.get("bodyEn")),
    bodyTa: String(formData.get("bodyTa")),
    bodyKn: String(formData.get("bodyKn")),
    publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : new Date(),
  };
}

export async function createAnnouncement(formData: FormData) {
  await prisma.announcement.create({ data: readFields(formData) });
  revalidateAnnouncements();
  redirect("/admin/announcements");
}

export async function updateAnnouncement(id: number, formData: FormData) {
  await prisma.announcement.update({ where: { id }, data: readFields(formData) });
  revalidateAnnouncements();
  redirect("/admin/announcements");
}

export async function deleteAnnouncement(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.announcement.delete({ where: { id } });
  revalidateAnnouncements();
}
