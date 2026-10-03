"use client";

import { useState } from "react";
import { Play, PlayCircle, ExternalLink } from "lucide-react";

const PLACEHOLDER_PREFIX = "TODO_REPLACE_";

export function YoutubeCard({
  title,
  youtubeId,
  watchLabel,
  meta,
  category,
}: {
  title: string;
  youtubeId: string;
  watchLabel: string;
  meta?: string;
  category?: string;
}) {
  const isReal = !youtubeId.startsWith(PLACEHOLDER_PREFIX);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="glass-panel group overflow-hidden rounded-2xl border border-brand-900/10 bg-[var(--background)] shadow-sm transition hover:shadow-lg">
      <div className="relative aspect-video w-full bg-brand-950">
        {isReal ? (
          playing ? (
            <iframe
              title={title}
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group/play relative block h-full w-full cursor-pointer"
              aria-label={`${watchLabel}: ${title}`}
            >
              <img
                src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover/play:bg-black/35">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 shadow-lg transition group-hover/play:scale-110">
                  <Play size={22} className="ml-1 fill-white text-white" />
                </span>
              </span>
            </button>
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center text-sm text-brand-100/60">
            <PlayCircle size={28} className="text-gold-500/70" />
            Video will appear here once {youtubeId} is set.
          </div>
        )}
      </div>
      <div className="p-4">
        {category && (
          <span className="label mb-2 inline-block rounded-full bg-gold-100 px-2.5 py-1 text-[10px] text-gold-700">
            {category}
          </span>
        )}
        <p className="font-medium text-brand-900">{title}</p>
        {meta && <p className="mt-1 text-sm text-brand-800/60">{meta}</p>}
        {isReal && (
          <a
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline"
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            rel="noreferrer"
          >
            {watchLabel}
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

