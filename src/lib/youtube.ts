// Accepts a bare video ID or any common YouTube URL shape and returns just the 11-char ID.
export function extractYoutubeId(input: string): string {
  const trimmed = input.trim();

  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/watch\?v=([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }

  try {
    const url = new URL(trimmed);
    const v = url.searchParams.get("v");
    if (v && /^[\w-]{11}$/.test(v)) return v;
  } catch {
    // Not a URL - fall through and treat input as already a bare ID/placeholder.
  }

  return trimmed;
}
