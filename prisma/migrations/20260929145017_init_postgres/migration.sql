-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleTa" TEXT NOT NULL,
    "titleKn" TEXT NOT NULL,
    "bodyEn" TEXT NOT NULL,
    "bodyTa" TEXT NOT NULL,
    "bodyKn" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleTa" TEXT NOT NULL,
    "titleKn" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionTa" TEXT NOT NULL,
    "descriptionKn" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "coverImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleTa" TEXT NOT NULL,
    "titleKn" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "preacher" TEXT,
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CottageMeeting" (
    "id" SERIAL NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleTa" TEXT NOT NULL,
    "titleKn" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionTa" TEXT NOT NULL,
    "descriptionKn" TEXT NOT NULL,
    "locationEn" TEXT NOT NULL,
    "locationTa" TEXT NOT NULL,
    "locationKn" TEXT NOT NULL,
    "youtubeId" TEXT,
    "meetingDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CottageMeeting_pkey" PRIMARY KEY ("id")
);
