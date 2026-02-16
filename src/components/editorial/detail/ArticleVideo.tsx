"use client";

import { motion } from "framer-motion";
import type { ArticleVideo as ArticleVideoType } from "@/lib/data/articles";

interface ArticleVideoProps {
  video: ArticleVideoType;
}

export function ArticleVideo({ video }: ArticleVideoProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
        <span className="h-px w-4 bg-amber-400" />
        Vidéo intégrée
      </h2>

      <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/40">
        {/* Thumbnail avec bouton play */}
        <button className="group relative w-full">
          <div
            className={`aspect-video w-full bg-gradient-to-br ${video.gradient} transition-transform duration-500 group-hover:scale-[1.02]`}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/30">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 shadow-2xl shadow-amber-400/30 transition-transform duration-300 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 h-7 w-7 text-black"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Durée */}
          <div className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {video.duration}
          </div>
        </button>

        {/* Infos vidéo */}
        <div className="flex items-center gap-3 border-t border-neutral-800/40 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-red-400"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{video.title}</p>
            <p className="text-[11px] text-neutral-500">
              Durée : {video.duration}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
