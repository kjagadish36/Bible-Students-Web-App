import { BookOpen, Cross, Sparkle } from "lucide-react";

/**
 * Decorative, non-photographic Bible-themed background layer (cross, open book, light rays).
 * Pure SVG/CSS so it needs no external image assets or licensing.
 */
export function BibleMotif() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="motif-glow absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-400/20 blur-3xl" />

      <Cross
        size={220}
        strokeWidth={1}
        className="motif-float absolute -left-10 top-6 text-gold-200/10 sm:left-4 sm:text-gold-200/[0.08]"
      />
      <BookOpen
        size={160}
        strokeWidth={1}
        className="motif-float-delayed absolute -right-6 bottom-0 text-gold-200/10 sm:right-8 sm:text-gold-200/[0.08]"
      />
      <Sparkle
        size={28}
        strokeWidth={1.5}
        className="motif-twinkle absolute left-[18%] top-[22%] text-gold-300/40"
      />
      <Sparkle
        size={18}
        strokeWidth={1.5}
        className="motif-twinkle-delayed absolute right-[22%] top-[38%] text-gold-300/30"
      />
      <Sparkle
        size={22}
        strokeWidth={1.5}
        className="motif-twinkle absolute left-[32%] bottom-[18%] text-gold-300/30"
      />
    </div>
  );
}
