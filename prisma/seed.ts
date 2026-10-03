// Placeholder content so pages aren't empty. Replace via a future admin UI or direct DB edits.
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.video.create({
    data: {
      kind: "SERVICE",
      titleEn: "TODO_REPLACE_SERVICE_TITLE",
      titleTa: "TODO_REPLACE_SERVICE_TITLE",
      titleKn: "TODO_REPLACE_SERVICE_TITLE",
      youtubeId: "TODO_REPLACE_YOUTUBE_ID",
      preacher: "TODO_REPLACE_PREACHER_NAME",
      videoDate: new Date(),
    },
  });

  await prisma.video.create({
    data: {
      kind: "COTTAGE_MEETING",
      titleEn: "TODO_REPLACE_COTTAGE_MEETING_TITLE",
      titleTa: "TODO_REPLACE_COTTAGE_MEETING_TITLE",
      titleKn: "TODO_REPLACE_COTTAGE_MEETING_TITLE",
      descriptionEn: "TODO_REPLACE_DESCRIPTION",
      descriptionTa: "TODO_REPLACE_DESCRIPTION",
      descriptionKn: "TODO_REPLACE_DESCRIPTION",
      locationEn: "TODO_REPLACE_HOST_ADDRESS",
      locationTa: "TODO_REPLACE_HOST_ADDRESS",
      locationKn: "TODO_REPLACE_HOST_ADDRESS",
      youtubeId: "TODO_REPLACE_YOUTUBE_ID",
      videoDate: new Date(),
    },
  });

  await prisma.announcement.create({
    data: {
      titleEn: "TODO_REPLACE_ANNOUNCEMENT_TITLE",
      titleTa: "TODO_REPLACE_ANNOUNCEMENT_TITLE",
      titleKn: "TODO_REPLACE_ANNOUNCEMENT_TITLE",
      bodyEn: "TODO_REPLACE_ANNOUNCEMENT_BODY",
      bodyTa: "TODO_REPLACE_ANNOUNCEMENT_BODY",
      bodyKn: "TODO_REPLACE_ANNOUNCEMENT_BODY",
    },
  });

  await prisma.book.create({
    data: {
      titleEn: "TODO_REPLACE_BOOK_TITLE",
      titleTa: "TODO_REPLACE_BOOK_TITLE",
      titleKn: "TODO_REPLACE_BOOK_TITLE",
      descriptionEn: "TODO_REPLACE_BOOK_DESCRIPTION",
      descriptionTa: "TODO_REPLACE_BOOK_DESCRIPTION",
      descriptionKn: "TODO_REPLACE_BOOK_DESCRIPTION",
      language: "en",
      fileUrl: "TODO_REPLACE_BOOK_FILE_URL",
    },
  });

  console.log("Seeded placeholder content.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
