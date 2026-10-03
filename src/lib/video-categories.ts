// Mirrors the playlist categories on the church's YouTube channel so Services
// and Cottage Meetings can be tagged and filtered by the same category names.
export const VIDEO_CATEGORIES = [
  "Testimony Meeting",
  "Teenagers/Youths Bible Study",
  "Golden Rule | Berean Study",
  "Resurrection Classes",
  "Memorial Subjects",
  "General Subjects (Weekly Class)",
  "Life Of David (Berean Study)",
  "What Pastor Russel Said (Berean Study)",
  "Children's Program",
  "Youth Meetings & Workshops",
  "Topical Berean Study",
  "New Creation",
  "Life of David (Book Study)",
  "One Day Meetings & Conventions",
  "Morning Devotion",
  "Tabernacle Study Anton Frey",
  "The Mysteries of the Bible",
  "5th Volume Study",
  "Joseph Our Example",
  "Cottage Meeting",
  "Photo Drama of Creation",
  "1st Volume - Youth Meeting",
  "Life of Christ",
  "Mark Of New Creation",
  "Character Development Book Study",
  "Sunday Worship",
] as const;

export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];
