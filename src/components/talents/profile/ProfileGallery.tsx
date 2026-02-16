"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Talent } from "@/lib/data/talents";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface ProfileGalleryProps {
  gallery: Talent["gallery"];
}

export function ProfileGallery({ gallery }: ProfileGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "photo" | "video">("all");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const filtered = gallery.filter(
    (item) => activeFilter === "all" || item.type === activeFilter
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
          <span className="h-px w-4 bg-amber-400" />
          Galerie
        </h2>

        {/* Filtres */}
        <div className="flex gap-1">
          {(["all", "photo", "video"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
                activeFilter === f
                  ? "bg-amber-400 text-black"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {f === "all" ? "Tout" : f === "photo" ? "Photos" : "Vidéos"}
            </button>
          ))}
        </div>
      </div>

      {/* Grille */}
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, idx) => (
            <motion.button
              key={`${item.caption}-${idx}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease }}
              onClick={() => setSelectedIdx(idx)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <div
                className={`h-full w-full bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />

              {/* Type indicator */}
              {item.type === "video" && (
                <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3 w-3 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-xs font-medium text-white">{item.caption}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`aspect-video w-full bg-gradient-to-br ${filtered[selectedIdx]?.gradient}`}
              />
              <div className="bg-neutral-900 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {filtered[selectedIdx]?.caption}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {filtered[selectedIdx]?.type === "video" ? "Vidéo" : "Photo"}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedIdx(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Nav arrows */}
              {selectedIdx > 0 && (
                <button
                  onClick={() => setSelectedIdx(selectedIdx - 1)}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}
              {selectedIdx < filtered.length - 1 && (
                <button
                  onClick={() => setSelectedIdx(selectedIdx + 1)}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
