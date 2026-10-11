import { NextResponse } from "next/server";
import { getCachedDevotion } from "@/lib/devotion";

function clampDatePart(value: string | null, max: number, fallback: number): number {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= max ? n : fallback;
}

// GET /api/devotion?mn=10&dn=4&lang=en — proxies the daily devotional feed.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const now = new Date();
  const month = clampDatePart(searchParams.get("mn"), 12, now.getMonth() + 1);
  const day = clampDatePart(searchParams.get("dn"), 31, now.getDate());
  const lang = searchParams.get("lang") ?? "en";

  try {
    const devotion = await getCachedDevotion(month, day, lang);
    return NextResponse.json(devotion);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load devotion" },
      { status: 502 },
    );
  }
}
