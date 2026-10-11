import { unstable_cache } from "next/cache";
import enReadings from "@/content/classic-readings/en.json";
import taReadings from "@/content/classic-readings/ta.json";
import knReadings from "@/content/classic-readings/kn.json";

const DEVOTIONS_URL = "https://bibleresources.info/devotions/";
// Undocumented JSON endpoint behind the public page above — confirmed via network inspection.
const AJAX_URL = "https://bibleresources.info/wp-content/plugins/morning_devotions/ajax_data.php";

export type DevotionCategory = "manna" | "songsnight" | "promises";

export interface DevotionEntry {
  category: DevotionCategory;
  verse: string | null;
  content: string;
}

export interface DevotionDay {
  title: string;
  entries: DevotionEntry[];
  sourceUrl: string;
}

export interface ClassicReading {
  title: string;
  content: string;
}

interface RawDevotionResponse {
  top_title?: string;
  manna_verse?: string;
  manna_content?: string;
  songsnight_verse?: string;
  songsnight_content?: string;
  promises_verse?: string;
  promises_content?: string;
}

// The upstream API returns the literal strings "verse"/"content" as placeholders
// when no devotion exists for that category/date/language combination.
const PLACEHOLDERS = new Set(["", "verse", "content", "0:"]);

function isUsable(value: string | undefined | null): value is string {
  return typeof value === "string" && !PLACEHOLDERS.has(value.trim());
}

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchDevotion(month: number, day: number, lang: string): Promise<DevotionDay> {
  const body = new URLSearchParams({
    month: String(month),
    day: String(day),
    language: lang,
    category: "manna",
  });

  const response = await fetch(AJAX_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error(`Devotion fetch failed with status ${response.status}`);
  }

  const raw = (await response.json()) as RawDevotionResponse;

  const entries: DevotionEntry[] = [];
  if (isUsable(raw.manna_verse) && isUsable(raw.manna_content)) {
    entries.push({ category: "manna", verse: stripTags(raw.manna_verse), content: stripTags(raw.manna_content) });
  }
  if (isUsable(raw.songsnight_verse) && isUsable(raw.songsnight_content)) {
    entries.push({
      category: "songsnight",
      verse: stripTags(raw.songsnight_verse),
      content: stripTags(raw.songsnight_content),
    });
  }
  // The "promises" (Morning Devotions) verse field is unreliable upstream; the content stands alone.
  if (isUsable(raw.promises_content)) {
    entries.push({ category: "promises", verse: null, content: stripTags(raw.promises_content) });
  }

  return {
    title: raw.top_title ? stripTags(raw.top_title) : "",
    entries,
    sourceUrl: `${DEVOTIONS_URL}?mn=${month}&dn=${day}&lang=${lang}`,
  };
}

// Content only changes once a day per (month, day, lang); cache generously.
const REVALIDATE_SECONDS = 60 * 60 * 6;

export const getCachedDevotion = unstable_cache(fetchDevotion, ["devotion"], {
  revalidate: REVALIDATE_SECONDS,
});

// Fixed, non-date-specific classic readings (resolve, vow, psalms, etc.), supplied
// per-locale in src/content/classic-readings/*.json rather than fetched at runtime.
type ReadingsMap = Record<string, ClassicReading>;

const READINGS_BY_LOCALE: Record<string, ReadingsMap> = {
  en: enReadings,
  ta: taReadings,
  kn: knReadings,
};

const READING_ORDER = [
  "morningResolve",
  "vowUntoLord",
  "corinthians13",
  "closeYourEyes",
  "jehovahOurGod",
  "psalm23",
  "matthew5",
];

export function getClassicReadings(locale: string): ClassicReading[] {
  const map = READINGS_BY_LOCALE[locale] ?? READINGS_BY_LOCALE.en;
  return READING_ORDER.map((key) => map[key]).filter((reading): reading is ClassicReading => Boolean(reading));
}
