export type Locale = "en" | "ta" | "kn";

const SUFFIX: Record<Locale, "En" | "Ta" | "Kn"> = {
  en: "En",
  ta: "Ta",
  kn: "Kn",
};

// Reads the `${field}En`/`${field}Ta`/`${field}Kn` column that matches the current locale.
export function localized<T extends Record<string, unknown>>(
  record: T,
  field: string,
  locale: Locale,
): string {
  const key = `${field}${SUFFIX[locale]}`;
  return String(record[key] ?? "");
}
