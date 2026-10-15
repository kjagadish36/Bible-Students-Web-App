// Category list for the Books library, shown as filter tabs like Services/Cottage
// Meetings. Admins can still type a custom category via the "Other" option.
export const BOOK_CATEGORIES = [
  "Studies in the Scriptures",
  "Tabernacle Shadows",
  "Hymns & Poems of Dawn",
  "Daily Heavenly Manna",
  "Doctrinal Studies",
  "Biography & History",
  "Children's Books",
  "Tracts & Booklets",
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number];
