-- CreateTable
CREATE TABLE "Announcement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleEn" TEXT NOT NULL,
    "titleTa" TEXT NOT NULL,
    "titleKn" TEXT NOT NULL,
    "bodyEn" TEXT NOT NULL,
    "bodyTa" TEXT NOT NULL,
    "bodyKn" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleEn" TEXT NOT NULL,
    "titleTa" TEXT NOT NULL,
    "titleKn" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionTa" TEXT NOT NULL,
    "descriptionKn" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "coverImageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Sermon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleEn" TEXT NOT NULL,
    "titleTa" TEXT NOT NULL,
    "titleKn" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "preacher" TEXT,
    "sermonDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CottageMeeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "meetingDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
