-- Rename Sermon -> Service (table + column), preserving existing data.
ALTER TABLE "Sermon" RENAME TO "Service";
ALTER TABLE "Service" RENAME COLUMN "sermonDate" TO "serviceDate";
