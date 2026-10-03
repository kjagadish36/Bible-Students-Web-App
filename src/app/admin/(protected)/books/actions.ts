"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function revalidateBooks() {
  updateTag("books");
  for (const locale of ["en", "ta", "kn"]) {
    revalidatePath(`/${locale}/books`);
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
    language: String(formData.get("language")),
    fileUrl: String(formData.get("fileUrl") || ""),
    coverImageUrl: String(formData.get("coverImageUrl") || "") || null,
  };
}

export async function createBook(formData: FormData) {
  const data = readFields(formData);
  await prisma.book.create({ data });
  revalidateBooks();
  redirect("/admin/books");
}

export async function updateBook(id: number, formData: FormData) {
  const data = readFields(formData);
  await prisma.book.update({ where: { id }, data });
  revalidateBooks();
  redirect("/admin/books");
}

export async function deleteBook(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.book.delete({ where: { id } });
  revalidateBooks();
}
