-- CreateEnum
CREATE TYPE "VideoKind" AS ENUM ('SERVICE', 'COTTAGE_MEETING');

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "kind" "VideoKind" NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleTa" TEXT NOT NULL,
    "titleKn" TEXT NOT NULL,
    "youtubeId" TEXT,
    "preacher" TEXT,
    "descriptionEn" TEXT,
    "descriptionTa" TEXT,
    "descriptionKn" TEXT,
    "locationEn" TEXT,
    "locationTa" TEXT,
    "locationKn" TEXT,
    "category" TEXT,
    "videoDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- Migrate existing rows before dropping the old tables
INSERT INTO "Video" ("kind", "titleEn", "titleTa", "titleKn", "youtubeId", "preacher", "category", "videoDate", "createdAt")
SELECT 'SERVICE', "titleEn", "titleTa", "titleKn", "youtubeId", "preacher", "category", "serviceDate", "createdAt"
FROM "Service";

INSERT INTO "Video" ("kind", "titleEn", "titleTa", "titleKn", "youtubeId", "descriptionEn", "descriptionTa", "descriptionKn", "locationEn", "locationTa", "locationKn", "category", "videoDate", "createdAt")
SELECT 'COTTAGE_MEETING', "titleEn", "titleTa", "titleKn", "youtubeId", "descriptionEn", "descriptionTa", "descriptionKn", "locationEn", "locationTa", "locationKn", "category", "meetingDate", "createdAt"
FROM "CottageMeeting";

-- DropTable
DROP TABLE "CottageMeeting";

-- DropTable
DROP TABLE "Service";

